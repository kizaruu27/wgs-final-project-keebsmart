const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { handleError } = require('./errorHandler');

const getAllProducts = async (req, res) => {
    try {
        const response = await prisma.products.findMany({
            include: {
                category: true,
                productItem: {
                    where: {
                        isDeleted: false
                    }
                },
                productImage: true
            },
            where: {
                isDeleted: false
            }
        });

        res.json(response);
    } catch (error) {
        handleError(null, error.message, res);
        console.log(error.message);
    }
};

const getProductsForCustomer = async (req, res) => {
    try {
        const products = await prisma.products.findMany({
            include: {
                category: true,
                productItem: {
                    where: {
                        isDeleted: false
                    }
                },
                productImage: true
            },
            where: {
                isDeleted: false,
                isActive: true
            }
        });

        res.json(products);
    } catch (error) {
        handleError(null, error.message, res);
        console.log(error.message);
    }
};

const searchProduct = async (req, res) => {
    try {
        const { key } = req.query;
        const products = await prisma.products.findMany({
            where: {
                productName: {
                    search: key
                },
                isDeleted: false,
                isActive: true
            },
            include: {
                productImage: true
            }
        });

        res.json({
            products,
            msg: 'Successfully find product'
        })
    } catch (error) {
        handleError(null, error.message, res);
        console.log(error);
        
    }
};

const getProductItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await prisma.products.findUnique({
            select: {
                specs: true,
                productName: true,
                description: true,
                brand: true,
                category: true,
                productImage: true,
                isActive: true,
                productItem: {
                    include: {
                        variationOption: {
                            include: {
                                variations: true
                            }
                        },
                    },
                    where: {
                        isDeleted: false
                    }
                },
                inventory: {
                    where: {
                        isDeleted: false
                    },
                    include: {
                        item: {
                            where: {
                                isDeleted: false
                            }
                        }
                    }
                }
            },
            where: {
                id: Number(id),
                isDeleted: false
            }
        });
        
        res.json(response);
    } catch (error) {
        console.log(error);
        handleError(null, error.message, res);
    }
};

const getAllProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await prisma.products.findUnique({
            select: {
                specs: true,
                productName: true,
                description: true,
                brand: true,
                category: true,
                productImage: true,
                productItem: {
                    include: {
                        variationOption: {
                            include: {
                                variations: true
                            }
                        },
                    },
                },
                inventory: {
                    where: {
                        isDeleted: false
                    },
                    include: {
                        item: {
                            where: {
                                isDeleted: false
                            }
                        }
                    }
                }
            },
            where: {
                id: Number(id),
            }
        });
        
        res.json(response);
    } catch (error) {
        handleError(null, error.message, res);
        console.log(error);
    }
};

const getAllCategory = async (req, res) => {
    try {
        const response = await prisma.productCategory.findMany();
        res.json(response);
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const getSwitchesDataForCustomer = async (req, res) => {
    try {
        const switches = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Switches',
                },
                isActive: true,
                isDeleted: false
            },
            include: {
                productItem: {
                    where: {
                        isDeleted: false
                    }
                },
                productImage: true,
                category: true
            }
        });
        
        res.json({
            switches,
            msg: 'Berhasil mendapatkan data switches!'
        })
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const getKeyboardsDataForCustomer = async (req, res) => {
    try {
        const keyboards = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Keyboards',
                },
                isActive: true,
                isDeleted: false
            },
            include: {
                productItem: {
                    where: {
                        isDeleted: false
                    }
                },
                productImage: true,
                category: true
            }
        });
        
        res.json({
            keyboards,
            msg: 'Berhasil mendapatkan data keyboards!'
        })
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const getKeycapsDataForCustomer = async (req, res) => {
    try {
        const keycaps = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Keycaps',
                },
                isActive: true,
                isDeleted: false
            },
            include: {
                productItem: {
                    where: {
                        isDeleted: false
                    }
                },
                productImage: true,
                category: true
            }
        });
        
        res.json({
            keycaps,
            msg: 'Berhasil mendapatkan data keycaps!'
        })
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const getKeyboardsDataForAdmin = async (req, res) => {
    try {
        const keyboards = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Keyboards'
                },
                isDeleted: false
            },
            include: {
                productItem: {
                    include: {
                        variationOption: true
                    },
                    where: {
                        isDeleted: false
                    }
                },
                productImage: true,
                category: true
            }
        });
        
        res.json({
            keyboards,
            soldTotal: '',
            msg: 'Berhasil mendapatkan data keyboards!'
        })
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const getKeycapsDataForAdmin = async (req, res) => {
    try {
        const keycaps = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Keycaps'
                },
                // isActive: true,
                isDeleted: false
            },
            include: {
                productItem: {
                    where: {
                        isDeleted: false
                    }
                },
                productImage: true,
                category: true
            }
        });
        
        res.json({
            keycaps,
            msg: 'Berhasil mendapatkan data keycaps!'
        })
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const getSwitchesDataForAdmin = async (req, res) => {
    try {
        const switches = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Switches',
                },
                // isActive: true,
                isDeleted: false
            },
            include: {
                productItem: {
                    where: {
                        isDeleted: false
                    }
                },
                productImage: true,
                category: true
            }
        });
        
        res.json({
            switches,
            msg: 'Berhasil mendapatkan data switches!'
        })
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const productActivation = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        
        const activatedProduct = await prisma.products.update({
            data: {
                isActive
            },
            where: {
                id: Number(id)
            }
        });

        res.json({
            activatedProduct,
            msg: 'Product Activated!'
        })
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};

const deleteProductItem = async (req, res) => {
    try {
        const { id } = req.params;

        const targetProductItem = await prisma.productItem.findUnique({
            where: {
                id: Number(id)
            },
        });

        const inventoryItem = await prisma.inventoryItem.update({
            where: {
                id: targetProductItem.inventoryItemId
            },
            data: {
                isUsed: false
            }
        })

        const deletedProductItem = await prisma.productItem.update({
            where: {
                id: Number(id)
            },
            data: {
                isDeleted: true,
                inventoryItemId: null,
            },
        })

        res.json({
            deletedProductItem,
            msg: 'Berhasil menghapus productitem'
        });
        
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        res.json(error)
    }
};

const getProductItemDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const productItem = await prisma.productItem.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                product: {
                    include: {
                        inventory: {
                            include: {
                                item: {
                                    where: {
                                        isDeleted: false
                                    }
                                }
                            },
                            where: {
                                isDeleted: false
                            }
                        }
                    }
                },
                variationOption: {
                    include: {
                        variations: true
                    }
                }
            },
        });

        res.json(productItem);
    } catch (error) {
        handleError(null, error.message, res);
        console.error(error);
    }
};

const deleteProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await prisma.products.update({
            where: {
                id: Number(id),
            },
            data: {
                isDeleted: true,
                inventory: {
                    update: {
                        data: {
                            isUsed: false,
                        }
                    },
                }
            },
            include: {
                inventory: {
                    include: {
                        item: true
                    }
                },
                productItem:true
            }
        }); 

        const updateProductItem = await prisma.productItem.updateMany({
            where: {
                productId: deletedProduct.id
            },
            data: {
                inventoryItemId: null
            }
        })

        const inventoryItemIds = deletedProduct.inventory.item.map(item => item.id);
        const updatedInventoryItem = await prisma.inventoryItem.updateMany({
            where: {
                id: {
                    in: inventoryItemIds
                }
            },
            data: {
                isUsed: false
            }
        })

        const setClearInventory = await prisma.products.update({
            where: {
                id: Number(id),
            },
            data: {
                inventoryId: null
            }
        })

        res.json({deletedProduct, msg: 'Product Berhasil Dihapus!'});

    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
};

module.exports = {
    getAllProducts,
    getProductsForCustomer,
    searchProduct,
    getProductItemById,
    getAllProductDetail,
    getAllCategory,
    getSwitchesDataForCustomer,
    getKeyboardsDataForCustomer,
    getKeycapsDataForCustomer,
    getKeyboardsDataForAdmin,
    getKeycapsDataForAdmin,
    getSwitchesDataForAdmin,
    productActivation,
    deleteProductItem,
    getProductItemDetail,
    deleteProducts,
    

}