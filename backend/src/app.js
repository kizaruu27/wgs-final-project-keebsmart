const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
dotenv.config();  

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;

// Middleware for authenticate with JWT
const accessValidation = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'Token not found! Please add a token!'});

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid Token'})
    }
}

// Middleware multer for disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage })

// API for image test
app.post('/product/images', upload.array('images', 20), (req, res) => {
    try {
        const { nama, role } = req.body;
        const imageUrls = req.files.map(file => `http://localhost:${PORT}/images/${file.filename}`);
        res.status(200).json({
            nama, role,
            message: 'Images uploaded successfully',
            imageUrls: imageUrls
        });
    } catch (error) {
        res.status(500).json({
            message: 'Image upload failed',
            error: error.message
        });
    }
});

// API for see all users
app.get('/users', accessValidation, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                orders: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json({
            users,
            msg: 'Get all users success'
        })
    } catch (error) {
        console.log(error.messege);
    }
});

// API for change user status
app.patch('/user/:id', accessValidation, async (req, res) => {
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
        res.json(error);
    }
});

// API for delete user
app.delete('/user/:id', accessValidation, async (req, res) => {
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
        console.log(error);
        res.json(error);
    }
})

// API for user registration
app.post('/registration', async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body;
    
        // Validate email
        const similarEmail = await prisma.user.findUnique({
            where: {
                email
            }
        });
    
        if (similarEmail) {
            return res.json({
                msg: 'Email sudah digunakan! Silahkan gunakan email yg berbeda!'
            })
        };

        const hashPassword = await bcrypt.hash(password, 10);
    
        const newUser = await prisma.user.create({
            data: {
                name, email, password: hashPassword, phoneNumber, isActive: true, access: 'customer'
            }
        });

        res.status(201);
        res.json({
            user: newUser,
            msg: 'Akun berhasil dibuat!'
        })
    } catch (error) {
        console.log(error);
    }
});

// API for admin registration
app.post('/registration/admin', accessValidation, async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body;
    
        // Validate email
        const similarEmail = await prisma.user.findUnique({
            where: {
                email
            }
        });
    
        if (similarEmail) {
            return res.json({
                msg: 'Email sudah digunakan! Silahkan gunakan email yg berbeda!'
            })
        };

        const hashPassword = await bcrypt.hash(password, 10);
    
        const newAdmin = await prisma.user.create({
            data: {
                name, email, password: hashPassword, phoneNumber, isActive: true, access: 'admin'
            }
        });

        res.status(201);
        res.json({
            newAdmin,
            msg: 'Akun berhasil dibuat!'
        })
    } catch (error) {
        console.log(error);
    }
});

// API for delete admin
app.delete('/delete/admin/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await prisma.user.delete({
            where: {
                id
            }
        });

        res.json({
            deletedAdmin,
            msg: 'Admin successfully deleted'
        });
    } catch (error) {
        res.json(error);
        console.log(error);
    }
})

// API for admin registration
app.post('/admin/registration', async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body;
    
        // Validate email
        const similarEmail = await prisma.user.findUnique({
            where: {
                email
            }
        });
    
        if (similarEmail) {
            return res.json({
                msg: 'Email sudah digunakan! Silahkan gunakan email yg berbeda!'
            })
        };

        const hashPassword = await bcrypt.hash(password, 10);
    
        const newUser = await prisma.user.create({
            data: {
                name, email, password: hashPassword, phoneNumber, isActive: true, access: 'admin'
            }
        });

        res.status(201);
        res.json({
            user: newUser,
            msg: 'Akun berhasil dibuat!'
        })
    } catch (error) {
        console.log(error);
    }
});

// API for login
app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.json('Akun tidak terdaftar!');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.json('Password salah!');
    }

    const payload = {
        userId: user.id,
        name: user.name,
        access: user.access,
    }
    const expiresIn = 60 * 60 * 24;
    const token = jwt.sign(payload, SECRET, {expiresIn});

    res.json({
        user,
        token,
        msg: 'Login Berhasil!'
    })
});

// API for logout
app.post('/logout', accessValidation, (req, res) => {
    try {
        res.json('Logout success');
    } catch (error) {
        console.log(error);
        res.json(error.messege);
    }
})

// API for get login user data
app.get('/user', accessValidation, async (req, res) => {
    try {
        const id = req.userId;
        const response = await prisma.user.findUnique({
            where: {id}
        });
        res.json({
            user: response,
            msg: 'Successfull get user data!'
        })
    } catch (error) {
        res.json({
            msg: error
        })
    }
    
})

// API for get all products
app.get('/products', async (req, res) => {
    try {
        const response = await prisma.products.findMany({
            include: {
                category: true,
                productItem: true,
                productImage: true
            } 
        });

        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
});

// API for get product item by id
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await prisma.products.findUnique({
            select: {
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
                    }
                }
            },
            where: {
                id: Number(id)
            }
        });
        
        res.json(response);
    } catch (error) {
        console.log(error);
    }
});

// API for get product sales
app.get('/sales', async (req, res) => {
    const products = await prisma.products.findMany({
        select: {
            id: true,
            productName: true,
            soldTotal: true,
            category: {
                select: {
                    categoryName: true
                }
            },
            productItem: {
                select: {
                    sold: true,
                    price: true
                }
            }
        }
    });

    let totalIncome = 0;

    const updatedProducts = products.map(product => {
        const soldTotal = product.productItem.reduce((acc, item) => acc + item.sold, 0);
        const productIncome = product.productItem.reduce((acc, item) => acc + (item.sold * item.price), 0);
        totalIncome += productIncome;
        return {
        ...product,
        soldTotal: soldTotal
        };
    });

    await Promise.all(updatedProducts.map(product => {
        return prisma.products.update({
            where: { id: product.id },
            data: { soldTotal: product.soldTotal }
        });
    }));

    res.json(updatedProducts);
})

// API for add new product
app.post('/product', accessValidation, upload.fields([
    { name: 'imagePreview', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), 
    async (req, res) => {
        try {
            const { productName, description, brand, categoryId } = req.body;
            const imagePreviewUrl = `http://localhost:${PORT}/images/${req.files['imagePreview'][0].filename}`;
            const imageUrls = req.files['images'].map(file => `http://localhost:${PORT}/images/${file.filename}`);

            const newProduct = await prisma.products.create({
                data: {
                    productName, description, brand, categoryId: Number(categoryId),
                    productImage: {
                        create: {
                            imagePreviewUrl, imageUrls
                        }
                    }
                }
            });

            res.status(201);
            res.json({
                product: newProduct,
                msg: 'Product berhasil ditambah!'
            });
        } catch (error) {
            res.json({
                error
            })
        }
});

// API for add product item
app.post('/product/item/add', accessValidation, upload.array('images', 10), async (req, res) => {
    try {
        const imageURLs = req.files.map(file => `http://localhost:${PORT}/images/${file.filename}`);
        const { productId, qty, price, manufacturer, status, process, variationValue, variationId } = req.body;
        const id = req.userId;

        const productLog = await prisma.productLog.create({
            data: {
                userId: id, 
                process
            }
        });

        const variationOption = await prisma.variationOptions.create({
            data: {
                variationValue, 
                variationId: Number(variationId)
            }
        })

        const newProductItem = await prisma.productItem.create({
            data: {
                productId: Number(productId), 
                variationOptionId: variationOption.id,
                productLogId: productLog.id,
                imageURLs,
                price: Number(price),
                manufacturer,
                qty: Number(qty),
                status
            }
        })

        res.status(201);
        res.json({
            data: newProductItem,
            msg: 'Product Item berhasil ditambah!'
        });
    } catch (error) {
        console.log(error.message);
    }
});

// API for get all category
app.get('/category', async (req, res) => {
    try {
        const response = await prisma.productCategory.findMany();
        res.json(response);
    } catch (error) {
        res.json({error});
    }
})


// API for get variation from product
app.get('/product/variation/:id', async (req, res) => {
    const { id } = req.params;

    const variation = await prisma.variations.findMany({
        where: {
            categoryId: Number(id)
        } 
    }); 

    res.json(variation);
});

// API for get switch products
app.get('/products/switch', async (req, res) => {
    try {
        const switches = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Switch'
                }
            },
            include: {
                productItem: true,
                productImage: true,
                category: true
            }
        });
        
        res.json({
            switches,
            msg: 'Berhasil mendapatkan data switches!'
        })
    } catch (error) {
        res.json({error})
    }
});

// API for get keyboards
app.get('/products/keyboards', async (req, res) => {
    try {
        const keyboards = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Keyboard'
                }
            },
            include: {
                productItem: {
                    include: {
                        variationOption: true
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
        res.json({error})
    }
});

// API for get product keycaps
app.get('/products/keycaps', async (req, res) => {
    try {
        const keycaps = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Keycaps'
                }
            },
            include: {
                productItem: true,
                productImage: true,
                category: true
            }
        });
        
        res.json({
            keycaps,
            msg: 'Berhasil mendapatkan data switches!'
        })
    } catch (error) {
        res.json({error})
    }
})


// API for edit product data
app.put('/product/update/:id', accessValidation, upload.fields([
    { name: 'imagePreview', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), 
    async (req, res) => {
        try {
            const { id } = req.params;
            const { productName, description, brand, categoryId } = req.body;
            const imagePreviewUrl = `http://localhost:${PORT}/images/${req.files['imagePreview'][0].filename}`;
            const imageUrls = req.files['images'].map(file => `http://localhost:${PORT}/images/${file.filename}`);

            const updatedProduct = await prisma.products.update({
                data: {
                    productName, description, brand, categoryId: Number(categoryId),
                    productImage: {
                        update: {
                            imagePreviewUrl, 
                            imageUrls
                        }
                    }
                },
                where: {
                    id: Number(id)
                }
            });

            const productLog = await prisma.productLog.create({
                data: {
                    userId: req.userId,
                    process: `Delete ${updatedProduct.productName}`
                }
            })

            res.status(201);
            res.json({
                updatedProduct,
                productLog,
                msg: 'Product berhasil diubah!'
            });
        } catch (error) {
            res.json({
                error
            });
            console.log(error);
        }
});

// API for edit product item
app.put('/product/item/update/:id', accessValidation, upload.array('images', 10), async (req, res) => {
    try {
        const { id } = req.params;
        const imageURLs = req.files.map(file => `http://localhost:${PORT}/images/${file.filename}`);
        const { qty, price, manufacturer, status, variationValue, variationId } = req.body;
        const userId = req.userId;

        const productItem = await prisma.productItem.findUnique({
            where: {
                id: Number(id)
            }
        })

        const updatedVariationOption = await prisma.variationOptions.update({
            data: {
                variationValue, 
                variationId: Number(variationId)
            },
            where: {
                id: productItem.variationOptionId
            }
        })

        const productLog = await prisma.productLog.create({
            data: {
                userId, 
                process: `Edit product item ${productItem.unitId}`
            }
        });

        const updatedProductItem = await prisma.productItem.update({
            data: {
                productLogId: productLog.id,
                variationOptionId: updatedVariationOption.id,
                imageURLs,
                price: Number(price),
                manufacturer,
                qty: Number(qty),
                status
            },
            where: {
                id: Number(id)
            }
        })

        res.status(201);
        res.json({
            updatedProductItem,
            updatedVariationOption,
            productLog,
            msg: 'Product item berhasil diubah!'
        });
    } catch (error) {
        res.json(error);
        console.log(error.message);
    }
});

// API for set active a product
app.patch('/product/activate/:id', accessValidation, async (req, res) => {
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
        res.json(error);
    }
})

// API for Delete Product Item
app.delete('/product/item/:id', accessValidation,  async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const deleteProductItem = await prisma.productItem.delete({
            where: {
                id: Number(id)
            },
            include: {
                variationOption: true
            }
        });
    
        const productVariation = await prisma.variationOptions.findUnique({
            where: {
                id: Number(deleteProductItem.variationOptionId)
            }
        });
        if (productVariation) {
            await prisma.variationOptions.delete({
                where: {
                    id: Number(deleteProductItem.variationOptionId)
                }
            })
        }

        const productLog = await prisma.productLog.create({
            data: {
                userId,
                process: `Delete product item ${deleteProductItem.variationOption.variationValue}`
            }
        })
    
        res.json({
            deleteProductItem,
            productVariation,
            productLog,
            msg: 'Berhasil menghapus productitem'
        });
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }

});

// API for delete Products
app.delete('/product/:id', accessValidation, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const productImage = await prisma.productImage.findFirst({
            where: {
                productId: Number(id)
            }
        })

        if (productImage) {
            await prisma.productImage.delete({
                where: {
                    productId: Number(id)
                }
            });
        }

        const productItem = await prisma.productItem.findMany({
            where: {
                productId: Number(id)
            }
        })

        if (productItem) {
            await prisma.productItem.deleteMany({
                where: {
                    productId: Number(id)
                }
            })
        }

        const deleteProduct = await prisma.products.delete({
            where: {
                id: Number(id)
            }
        });

        if (deleteProduct) {
            await prisma.productLog.create({
                data: {
                    userId,
                    process: `Delete product ${deleteProduct.productName}`
                }
            })
        }
        res.json('Product Berhasil Dihapus!');

    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// API for get order details
app.get('/orders', async (req, res) => {
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
        res.json(error);
    }
});

// API for set order status
app.patch('/order/status/:id', accessValidation, async (req, res) => {
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
        res.json(error);
    }
});

// API for get order by id
app.get('/order/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma.orders.findUnique({
            where: {
                orderId: id
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
                shipping: true,
                paymentMethod: true,
                address: true,
                currentStatus: {
                    include: {
                        status: true
                    }
                }
            }
        })

        res.json({
            order,
            msg: 'Success get order detail'
        })
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// API for create new shipment
app.post('/shipment', accessValidation, async (req, res) => {
    try {
        const { userId, orderId } = req.body;
        const newShipment = await prisma.shipping.create({
            data: {
                userId, orderId
            }
        })
        res.status(201).json({
            newShipment,
            msg: 'New Shipment Added'
        })
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

// API for get all shipments
app.get('/shipments', accessValidation, async (req, res) => {
    try {
        const shipments = await prisma.shipping.findMany({
            include: {
                order: {
                    include: {
                        currentStatus: {
                            include: {
                                status: true
                            }
                        }
                    }
                }
            }
        });

        res.json({
            shipments,
            msg: 'Get shipment data successfull'
        })
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// API for get shipment detail
app.get('/shipment/:id', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
})

// API for get all cart
app.get('/cart', async (req, res) => {
    try {
        const cart = await prisma.cart.findMany();
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// API for get user cart
app.get('/user/cart', accessValidation, async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await prisma.cart.findMany({
            where: {
                userId
            }
        });
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// API for create new cart
app.post('/cart', accessValidation, async (req, res) => {
    try {
        const userId = req.userId;
        const { productItemId, qty } = req.body;

        const productItem = await prisma.productItem.findUnique({
            where: {
                id: productItemId
            }
        });

        const newCart = await prisma.cart.create({
            data: {
                userId, productItemId, qty, 
                subTotalPrice: productItem.price * qty,
            }
        })

        res.json({
            newCart,
            productItem
        });  

    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

// API for get cart detail
app.get('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await prisma.cart.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(cart);
    } catch (error) {
        res.json(error);
        console.log(error);
    }
});

// API for making new orders
app.post('/order', accessValidation, async (req, res) => {
    try {
        const userId = req.userId;
        const { targetedCartIds, paymentMethodId, addressId, orderNotes } = req.body;
        
        const targetCarts = await prisma.cart.findMany({
            where: {
                id: {
                    in: targetedCartIds
                }
            },
            include: {
                productItem: {
                    select: {
                        id: true,
                        qty: true,
                        sold: true
                    }
                }
            }
        });

        const totalPrice = targetCarts.map((item) => item.subTotalPrice).reduce((acc, accValue) => acc + accValue, 0);
        const orderTotal = targetCarts.map((item) => item.qty).reduce((acc, accValue) => acc+ accValue, 0);

        const newOrder = await prisma.orders.create({
            data: {
                userId,
                paymentMethodId,
                addressId,
                orderTotal,
                totalPrice,
                orderNotes,
                carts: {
                    connect: targetCarts
                }
            }
        });

        const setOrderStatus = await prisma.currentStatus.create({
            data: {
                orderId: newOrder.orderId,
                orderStatusId: 1
            }
        })

        const productItemIds = [];
        for (const item of targetCarts) {
            await prisma.productItem.update({
                data: {
                    qty: item.productItem.qty - item.qty,
                    sold: item.productItem.sold + item.qty
                },
                where: {
                    id: item.productItem.id
                }
            });
            productItemIds.push(item.productItemId);
        }

        const updatedProductItem = await prisma.productItem.findMany({
            where: {
                id: {
                    in: productItemIds
                }
            }
        })

        res.json({
            newOrder,
            setOrderStatus,
            targetCarts,
            totalPrice,
            updatedProductItem,
            orderTotal
        });

    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// API for delete order
app.delete('/order/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const currentStatus = await prisma.currentStatus.deleteMany({
            where: {
                orderId: id
            }
        })

        const deletedOrder = await prisma.orders.delete({
            where: {
                orderId: id
            }
        });

        res.json({deletedOrder, msg: 'Order deleted successfully'});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})


app.listen(PORT, () => {
    console.log(`Listening to port http://localhost:${PORT}`);
})