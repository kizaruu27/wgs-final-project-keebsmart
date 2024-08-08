const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { handleError } = require('./errorHandler');

const addNewInventory = async (req, res) => {
    const { productName, brand, categoryId, specs, description,items } = req.body;
    const userId = req.userId;
    try {
        const newInventory = await prisma.inventory.create({
            data: {
                productName, brand, categoryId, specs, description, userId,
                item: {
                    create: items
                }
            }
        })

        res.json({
            newInventory,
            msg: 'Success add new stuff in inventory!'
        })
    } catch (error) {
        handleError(userId, error.message, res);
        console.log(error);
    }
};

const getInventory = async (req, res) => {
    try {
        const inventory = await prisma.inventory.findMany({
            include: {
                category: true,
                createdBy: true,
                item: {
                    where: {
                        isDeleted: false
                    }
                }
            },
            where: {
                isDeleted: false,
            },
            orderBy: {
                id: 'desc'
            }
        });

        res.json({
            inventory,
            msg: 'Get inventory success'
        });
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
};

const getUnusedInventory = async (req, res) => {
    try {
        const inventory = await prisma.inventory.findMany({
            include: {
                category: true,
                createdBy: true,
                item: {
                    where: {
                        isDeleted: false
                    }
                }
            },
            where: {
                isDeleted: false,
                isUsed: false
            }
        });

        res.json({
            inventory,
            msg: 'Get inventory success'
        });
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
};

const getInventoryDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await prisma.inventory.findUnique({
            include: {
                category: true,
                createdBy: true,
                item: {
                    include: {
                        variationName: true
                    },
                    where: {
                        isDeleted: false
                    }
                }
            },
            where: {
                id: Number(id)
            }
        });

        res.json({
            inventory,
            msg: 'Get inventory success'
        });
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error.message);
    }
};

const deleteInventory = async (req, res) => {
    const { id } = req.params;
    try {
      // Delete the inventory
        const deletedInventory = await prisma.inventory.update({
            where: {
                id: Number(id),
            },
            data: {
                isDeleted: true
            }
        });

        res.json({
            deletedInventory,
            msg: 'Delete inventory successful',
        });
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
};

const updateInventory = async (req, res) => {
    const { id } = req.params;
    const { productName, brand, categoryId, specs, description, items } = req.body;
    try {
        const updatedInventory = await prisma.inventory.update({
            where: {
                id: Number(id)
            },
            data: {
                productName, brand, categoryId, specs, description,
            }
        });

        const products = await prisma.products.findUnique({
            where: {
                inventoryId: updatedInventory.id
            }
        })

        if (products) {
            await prisma.products.update({
                where: {
                    inventoryId: updatedInventory.id
                },
                data: {
                    productName: updatedInventory.productName,
                    description: updatedInventory.description,
                    brand: updatedInventory.brand,
                    categoryId: updatedInventory.categoryId,
                    specs: updatedInventory.specs
                }
            })
        }

        const newItems = items.map(item => ({
            inventoryId: Number(id),
            qty: item.qty,
            variation: item.variation,
            variationId: item.variationId,
        }));

        const updatedItem = await prisma.inventoryItem.createMany({
            data: newItems,
        });

        res.json({updatedInventory, updatedItem, msg: 'Update success'})
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
};

const updateInventoryItem = async (req, res) => {
    try {
        const { qty, variation, variationId } = req.body;
        const { id } = req.params;
        const updatedInventoryItem = await prisma.inventoryItem.update({
            where: {
                id: Number(id)
            },
            data: {
                qty,
                variation,
                variationId
            }
        });

        res.json({
            updatedInventoryItem,
            msg: 'Inventory item successfully updated'
        })
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
}

const deleteInventoryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInventoryItem = await prisma.inventoryItem.update({
            where: {
                id: Number(id)
            },
            data: {
                isDeleted: true
            }
        });

        res.json(deletedInventoryItem);
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
}

const getInventoryItemDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const inventoryItem = await prisma.inventoryItem.findUnique({
            where: {
                id: Number(id),
                isDeleted: false
            }
        });

        res.json(inventoryItem);
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
}

module.exports = { 
    addNewInventory, 
    getInventory, 
    getUnusedInventory,
    getInventoryDetailById,
    deleteInventory,
    updateInventory,
    updateInventoryItem,
    deleteInventoryItem,
    getInventoryItemDetail
}