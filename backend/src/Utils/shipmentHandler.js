const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { handleError } = require('./errorHandler');

const createShipment = async (req, res) => {
    try {
        const { userId, orderId } = req.body;
        const newShipment = await prisma.shipping.create({
            data: {
                userId, orderId
            }
        });

        const updateOrderShipment = await prisma.orders.update({
            where: {
                orderId,
                isDeleted: false
            },
            data: {
                shippingId: newShipment.id
            }
        })
        res.status(201).json({
            newShipment,
            updateOrderShipment,
            msg: 'New Shipment Added'
        })
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};

const getAllShipments = async (req, res) => {
    try {
        const userId = req.userId;
        const shipments = await prisma.shipping.findMany({
            include: {
                order: {
                    include: {
                        currentStatus: {
                            include: {
                                status: true
                            },
                            orderBy: {
                                updateAt: 'asc'
                            }
                        }
                    }
                }
            },
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json({
            shipments,
            msg: 'Get shipment data successfull'
        })
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};

const getShipmentsByStatus = async (req, res) => {
    try {
        const userId = req.userId;
        const shipments = await prisma.shipping.findMany({
            include: {
                order: {
                    include: {
                        currentStatus: {
                            include: {
                                status: true
                            }
                        },
                        address: true
                    }
                }
            },
            where: {
                userId
            }
        })

        const newShipment = shipments.map(item => {
            const data = {
                userId: item.userId,
                shipmentName: item.shipmentName,
                id: item.id,
                currentStatus: item.order.currentStatus[item.order.currentStatus.length - 1].status.status,
                address: item.order.address
            }
            return data;
        })

        res.json({
            shipment: newShipment.filter(item => item.currentStatus === 'Courier Pick Up' || item.currentStatus ==='On Delivery')
        })
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};

const getFinishedDelivery = async (req, res) => {
    try {
        const shipments = await prisma.shipping.findMany({
            include: {
                order: {
                    include: {
                        currentStatus: {
                            include: {
                                status: true
                            },
                            orderBy: {
                                updateAt: 'asc'
                            }
                        },
                        address: true
                    }
                }
            }
        })

        const newShipment = shipments.map(item => {
            const data = {
                userId: item.userId,
                shipmentName: item.shipmentName,
                id: item.id,
                currentStatus: item.order.currentStatus[item.order.currentStatus.length - 1].status.status,
                address: item.order.address
            }
            return data;
        })

        res.json({
            shipment: newShipment.filter(item => item.currentStatus === 'Delivered')
        })
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};

const getShipmentDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const shipment = await prisma.shipping.findUnique({
            where: {
                id
            },
            include: {
                order: {
                    include: {
                        currentStatus: {
                            include: {
                                status: true
                            },
                            orderBy: {
                                updateAt: 'asc'
                            }
                        },
                        user: true,
                        address: true,
                        paymentMethod: true,
                        carts: {
                            include:{
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
                        }
                    }
                }
            }
        });

        const currentStatus = shipment.order.currentStatus[shipment.order.currentStatus.length - 1].status.status;
        const lastUpdate = shipment.order.currentStatus[shipment.order.currentStatus.length - 1].updateAt;
        const allStatus = shipment.order.currentStatus.map(item => item);
        const buyer = shipment.order.user;

        res.json({
            buyer,
            shipment,
            allStatus,
            currentStatus,
            lastUpdate,
            msg: 'Get shipment detail successfully'
        });
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
};

module.exports = {
    createShipment,
    getAllShipments,
    getShipmentsByStatus,
    getFinishedDelivery,
    getShipmentDetail,
    
}