const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
dotenv.config();  

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// API for get all products
app.get('/products', async (req, res) => {
    try {
        const response = await prisma.products.findMany({
            select: {
                id: true,
                product_name: true,
                description: true,
                category: {
                    select: {
                        category_name: true
                    }
                },
                productItem : {
                    select : {
                        id: true,
                        unitId: true,
                        imageURLs: true,
                        price: true,
                        manufacturer: true,
                        qty: true,
                        status: true,
                        productLog: {
                            select: {
                                createdBy: true,
                                createdAt: true
                            }
                        },
                        variationOption: {
                            select: {
                                variations: {
                                    select: {
                                        variationName: true
                                    }
                                },
                                variationValue: true
                            }
                        }
                    }
                }
            }
        });

        const products = response.map(product => ({
            id: product.id,
            productName: product.product_name,
            description: product.description,
            category: product.category.category_name,
            productItem: product.productItem.map(product => ({
                id: product.id,
                unitId: product.unitId,
                imageURLs: product.imageURLs,
                manufacturer: product.manufacturer,
                qty: product.qty,
                price: product.price,
                status: product.status,
                createdBy: product.productLog.createdBy,
                createdAt: product.productLog.createdAt,
                [product.variationOption.variations.variationName]: product.variationOption.variationValue
            }))
        }));

        res.json(products);
    } catch (error) {
        console.log(error.message);
    }
});

// API for get product detail by id
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await prisma.products.findUnique({
            select: {
                id: true,
                product_name: true,
                description: true,
                category: {
                    select: {
                        category_name: true
                    }
                },
                productItem : {
                    select : {
                        id: true,
                        unitId: true,
                        imageURLs: true,
                        price: true,
                        manufacturer: true,
                        qty: true,
                        status: true,
                        productLog: {
                            select: {
                                createdBy: true,
                                createdAt: true
                            }
                        },
                        variationOption: {
                            select: {
                                variations: {
                                    select: {
                                        variationName: true
                                    }
                                },
                                variationValue: true
                            }
                        }
                    }
                }
            },
            where: {
                id: Number(id)
            }
        });

        const product = {
            id: response.id,
            productName: response.product_name,
            description: response.description,
            category: response.category.category_name,
            productItem: response.productItem.map(product => ({
                id: product.id,
                unitId: product.unitId,
                imageURLs: product.imageURLs,
                manufacturer: product.manufacturer,
                qty: product.qty,
                price: product.price,
                status: product.status,
                createdBy: product.productLog.createdBy,
                createdAt: product.productLog.createdAt,
                [product.variationOption.variations.variationName]: product.variationOption.variationValue
            }))
        };
        
        res.json(product);
    } catch (error) {
        console.log(error.messege);
    }
});

// API for add new product
app.post('/product/add', async (req, res) => {
    const { createdBy, createdAt, categoryId, productName, description, process } = req.body;

    try {
        const productLog = await prisma.productLog.create({
            data: {
                createdAt: createdAt,
                createdBy: createdBy,
                process: process
            }
        });

        const newProduct = await prisma.products.create({
            data: {
                product_name: productName,
                description: description,
                categoryId: categoryId
            }
        });

        res.json({
            data: newProduct,
            msg: 'Product berhasil ditambah!'
        });
    } catch (error) {
        console.log(error.message);
    }
});

// API for add product item
app.post('/product/item/add', async (req, res) => {
    const { createdBy, createdAt, productId, qty, imageURL, price, manufacturer, status, variationOptionId, process } = req.body;

    try {
        const productLog = await prisma.productLog.create({
            data: {
                createdAt: createdAt,
                createdBy: createdBy,
                process: process
            }
        });

        const newProductItem = await prisma.productItem.create({
            data: {
                productId: productId,
                variationOptionId: variationOptionId,
                productLogId: productLog.id,
                imageURLs: imageURL,
                price: price,
                manufacturer: manufacturer,
                qty: qty,
                status: status
            }
        });

        res.json({
            data: newProductItem,
            msg: 'Product Item berhasil ditambah!'
        });
    } catch (error) {
        console.log(error.message);
    }
});

// API for edit product data
app.put('/product/update/:id', async (req, res) => {
    const { createdBy, createdAt, categoryId, productName, description, qty, imageURL, price, manufacturer, status, variationOptionId, process, productItemId} = req.body;
    const { id } = req.params;

    const productLog = await prisma.productLog.create({
        data: {
            createdAt: createdAt,
            createdBy: createdBy,
            process: process
        }
    });

    const updateProduct = await prisma.products.update({
        where: {
            id: Number(id)
        },
        data: {
            product_name: productName,
            description: description,
            categoryId: categoryId
        }
    });

    const updateProductItem = await prisma.productItem.update({
        where: {
            id: productItemId
        },
        data: {
            productId: updateProduct.id,
            variationOptionId: variationOptionId,
            productLogId: productLog.id,
            imageURLs: imageURL,
            price: price,
            manufacturer: manufacturer,
            qty: qty,
            status: status
        }
    });

    res.json({
        data: updateProductItem,
        msg: 'Product Berhasil diedit!'
    })
});

// API for Delete Product Item
app.delete('/product/item/:id', async (req, res) => {
    const { id } = req.params;
    const deleteProductItem = await prisma.productItem.delete({
        where: {
            id: Number(id)
        }
    });

    res.json('Data Berhasil Di hapus!');
});

// API for delete Products
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;

    const product = await prisma.products.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            productItem: true
        }
    });

    if (product.productItem.length != 0) {
        res.json('Product memiliki item! Dianjurkan menghapus item terlebih dahulu');
        return false;
    } 

    const deleteProduct = await prisma.products.delete({
        where: {
            id: Number(id)
        }
    });
    

    res.json('Product Berhasil Dihapus!');
});


app.listen(PORT, () => {
    console.log(`Listening to port http://localhost:${PORT}`);
})