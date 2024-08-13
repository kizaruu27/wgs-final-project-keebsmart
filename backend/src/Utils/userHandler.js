const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { handleError } = require('./errorHandler');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json(errors.array());
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name, email, password: hashPassword, phoneNumber, isActive: true, access: 'customer'
            }
        });

        res.status(201);
        res.json({
            user: newUser,
            msg: 'Account successfully created!'
        })
    } catch (error) {
        console.log(error);
        handleError(null, error.message, res);
    }
};

const registerAdmin = async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body;
        const access = req.access;
        const errors = validationResult(req);

        if (access !== 'super-admin') return res.json('Only super admin can access this');
    
        if (!errors.isEmpty()) return res.status(200).json(errors.array());

        const hashPassword = await bcrypt.hash(password, 10);
        const newAdmin = await prisma.user.create({
            data: {
                name, email, password: hashPassword, phoneNumber, isActive: true, access: 'admin'
            }
        });

        res.status(201);
        res.json({
            newAdmin,
            msg: 'Admin successfulyy added!'
        })
    } catch (error) {
        console.log(error);
        handleError(null, error.message, res);
    }
};

const registerCourier = async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body;
        const access = req.access;
        const errors = validationResult(req);

        if (access !== 'admin') return res.json('Only admin can access this');
    
        if (!errors.isEmpty()) return res.status(200).json(errors.array());

        const hashPassword = await bcrypt.hash(password, 10);
        const newCourier = await prisma.user.create({
            data: {
                name, email, password: hashPassword, phoneNumber, isActive: true, access: 'courier'
            }
        });

        res.status(201);
        res.json({
            newCourier,
            msg: 'Courier successfulyy added!'
        })
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
}

const getAlluser = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                orders: {
                    where: {
                        isDeleted: false
                    }
                },
                shipment: {
                    include: {
                        moneyKeep: true
                    }
                },
                moneyKeep: {
                    where: {
                        isReceived: false
                    },
                    include: {
                        order: {
                            include: {
                                order: {
                                    include: {
                                        currentStatus: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                isDeleted: false
            }
        });
        res.json({
            users,
            msg: 'Get all users success'
        })
    } catch (error) {
        console.log(error.messege);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
}

const changeUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const updatedUser = await prisma.user.update({
            data: {
                isActive: status
            },
            where: {
                id
            }
        });

        res.json({
            updatedUser,
            msg: 'User status chaged!'
        })
    } catch (error) {
        console.error(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const targetUser = await prisma.user.findUnique({
            where: {
                id
            }
        });

        const userAddress = await prisma.userAddress.findMany({
            where: {
                userId: targetUser.id
            }
        });

        const orders = await prisma.orders.findMany({
            where: {
                userId: targetUser.id
            }
        })

        if (targetUser) {
            const currentStatus = await prisma.currentStatus.deleteMany({
                where: {
                    orderId: {
                        in: orders.map(item => item.orderId)
                    }
                }
            })

            const deleteOrders = await prisma.orders.deleteMany({
                where: {
                    userId: targetUser.id
                }
            })

            const shippping = await prisma.shipping.deleteMany({
                where: {
                    orders: {
                        in: userAddress.map(item => item.id)
                    }
                }
            })

            const deleteAddress = await prisma.userAddress.deleteMany({
                where: {
                    userId: targetUser.id
                }
            });
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        })

        res.json({
            deletedUser,
            msg: 'User deleted!'
        })
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await prisma.user.update({
            where: {
                id
            },
            data: {
                isDeleted: true,
                email: null
            }
        });

        res.json({
            deletedAdmin,
            msg: 'Admin successfully deleted'
        });
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
};

const getLoginUserData = async (req, res) => {
    try {
        const id = req.userId;
        const response = await prisma.user.findUnique({
            where: {id},
            include: {
                orders: {
                    where: {
                        isDeleted: false
                    }
                }
            }
        });
        res.json({
            user: response,
            msg: 'Successfull get user data!'
        })
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
}

const checkEmail = async (req, res) => {
    try {
        const { email } = req.params;
        
        const similarEmail = await prisma.user.findUnique({
            where: {
                email,
                isDeleted: false,
                isActive: true
            }
        });

        if (similarEmail) {
            return res.status(200).json({
                similarEmail,
                msg: 'Email found!'
            });
        } else {
            return res.status(404).json({
                msg: 'Email not found!, please insert a correct email!'
            })
        }
    } catch (error) {
        console.log(error);
        handleError(null, error.message, res)
    }
};

const userResetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json(errors.array());
        }

        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        const passwordIsSame = await bcrypt.compare(newPassword, user.password);

        if (passwordIsSame) {
            return res.status(404).json({
                msg: 'New password cannot be the same as your old password!'
            })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserPassword = await prisma.user.update({
            where: {
                id
            },
            data: {
                password: hashPassword
            }
        })

        res.status(201);
        res.json({
            updatedUser: updatedUserPassword,
            msg: 'Password successfully updated!'
        })
    } catch (error) {
        console.log(error);
        handleError(null, error.message, res);
    }
}

module.exports = {
    getAlluser,
    changeUserStatus,
    deleteUser,
    registerUser,
    registerAdmin,
    deleteAdmin,
    registerCourier,
    getLoginUserData,
    checkEmail,
    userResetPassword,

}