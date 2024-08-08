const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { handleError } = require('./errorHandler');

const getOrderDetails = async (req, res) => {
    try {
        const orders = await prisma.orders.findMany({
            include: {
                user: true,
                address: true,
                paymentMethod: true,
                currentStatus: {
                    include: {
                        status: true
                    }
                }
            },
            where: {
                isDeleted: false
            },
            orderBy: {
                orderDate: 'desc'
            }
        });
        res.json({
            orders, 
            msg: 'Get orders success'
        });
    } catch (error) {
        console.log(error);
        handleError(null, error.message, res);
    }
};

const setOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const orderStatus = await prisma.orderStatus.findFirst({
            where: {
                status
            }
        })

        const updatedStatus = await prisma.currentStatus.create({
            data: {
                orderId: id,
                orderStatusId: orderStatus.id
            }
        })

        res.json({
            updatedStatus,
            orderStatus,
            msg: 'Order successfully updated!'
        });
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await prisma.orders.findMany({
            where: {
                userId,
                isDeleted: false
            },
            include: {
                address: true,
                paymentMethod: true,
                currentStatus: {
                    include : {
                        status: true
                    }
                },
                carts: {
                    include: {
                        productItem: true
                    }
                }
            },
            orderBy: {
                orderDate: 'desc'
            }
        });

        res.json({
            orders,
            msg: 'Get user order successfull'
        });
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
};

const getUserAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await prisma.userAddress.findMany({
            where: {
                userId
            }
        });

        res.json({
            addresses,
            msg: 'Get user addresses succsessfull'
        })
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
};

const getAddressDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await prisma.userAddress.findUnique({
            where: {
                id: Number(id)
            }
        });

        res.json({
            address,
            msg: 'Get address successfully'
        });
    } catch (error) {
        handleError(null, error.message, res);
        console.log(error);
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma.orders.findUnique({
            where: {
                orderId: id,
                isDeleted: false
            },
            include: {
                carts: {
                    include: {
                        productItem: {
                            include: {
                                product: true,
                                variationOption: {
                                    include: {
                                        variations: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true,
                shipping: {
                    include: {
                        user: true
                    }
                },
                paymentMethod: true,
                address: true,
                currentStatus: {
                    include: {
                        status: true
                    }, 
                    orderBy: {
                        updateAt: 'asc'
                    }
                },
            }
        })

        res.json({
            order,
            msg: 'Success get order detail'
        })
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};


module.exports = {
    getOrderDetails,
    setOrderStatus,
    getUserOrders,
    getUserAddress,
    getAddressDetail,
    getOrderById,
    
}