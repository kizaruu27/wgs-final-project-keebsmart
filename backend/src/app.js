const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const { body, validationResult} = require('express-validator');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
dotenv.config();  

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;

// List of blacklisted tokens
const invalidTokens = new Set();

// Middleware for authenticate with JWT
const accessValidation = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: 'Token not found! Please add a token!'});

    try {
        const decoded = jwt.verify(token, SECRET);
        if (invalidTokens.has(token)) return res.status(401).json('Invalid Token');
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
                orders: true,
                shipment: true
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

// Registration validation
const registrationValidation = [
    body('email').custom(async (value) => {
        const similarEmail = await prisma.user.findUnique({
            where: {
                email: value
            }
        });

        if (similarEmail) {
            throw new Error('Email is already in use');
        }
    }),
    body('password').custom(async (value) => {
        const hasNumber = /\d/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasMinLength = value.length >= 8;

        if (!hasNumber || !hasUppercase || !hasLowercase || !hasMinLength) {
            throw new Error('Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number');
        }
    }),
    body('email').isEmail().withMessage('Email is invalid, please use a valid email!'),
    body('phoneNumber').isMobilePhone('id-ID').withMessage('Phone number is invalid, please input a valid phone number'),
    body('name').custom(async (value) => {
        const hasUppercase = /[A-Z]/.test(value);
        const hasMinLength = value.length > 2;

        if (!hasUppercase || !hasMinLength) throw new Error('Name must be has an uppercase and more than 2 characters');
    })
];

// API for user registration
app.post('/registration', registrationValidation, async (req, res) => {
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
            msg: 'Admin successfulyy added!'
        })
    } catch (error) {
        console.log(error);
    }
});

// API for delete admin
app.delete('/delete/admin/:id', accessValidation, async (req, res) => {
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

// API for courier registration
app.post('/courier/registration', accessValidation, async (req, res) => {
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
                name, email, password: hashPassword, phoneNumber, isActive: true, access: 'courier'
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
})

// API for login
app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(201).json({msg: 'Account not registered!'});
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(201).json({msg: 'Wrong password!'});
    }

    if (!user.isActive) return res.status(201).json({msg: 'Your account has been disabled!'});

    const payload = {
        userId: user.id,
        name: user.name,
        access: user.access,
        isActive: user.isActive
    }

    const expiresIn = 60 * 60 * 24;
    const token = jwt.sign(payload, SECRET, {expiresIn});
    
    res.json({
        user,
        token,
        msg: 'Login Successfull!'
    })
});

// API for logout
app.post('/logout', accessValidation, (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        invalidTokens.add(token);
        res.clearCookie('token');
        res.json({
            msg: 'Logout success', 
            token: token
        });
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
            where: {id},
            include: {
                orders: true
            }
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

// INVENTORY
// API for post new inventory
app.post('/inventory', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
});

// API for get inventory
app.get('/inventory', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
});

// get unused inventory
app.get('/inventory/unused', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
});

// Get inventory detail by id
app.get('/inventory/:id', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
});

// API for delete inventory
app.delete('/inventory/:id', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
});

// API for update inventory
app.put('/inventory/:id', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
});

// UPDATE/edit inventory item by id
app.put('/inventory/item/:id', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
});

// Delete inventory item by id
app.delete('/inventory/item/:id', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
})

// Get inventory item  by id
app.get('/inventory/item/:id', accessValidation, async (req, res) => {
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
        res.json(error);
        console.log(error);
    }
})

// API for get variation data
app.get('/variations', async (req, res) => {
    try {
        const variations = await prisma.variations.findMany();
        res.json(variations);
    } catch (error) {
        console.log(error);
    }
})

// API for get all products
app.get('/products', async (req, res) => {
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
        console.log(error.message);
    }
});

// API for get product item by id
app.get('/product/:id', async (req, res) => {
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
    }
});

// get product detail with deleted data
app.get('/product/sales/:id', async (req, res) => {
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
                where: {
                    isDeleted: false
                },
                select: {
                    sold: true,
                    price: true
                }
            }
        },
        // where: {
        //     isDeleted: false
        // }
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
            const { inventoryId, productName, description, brand, categoryId, specs } = req.body;
            const imagePreviewUrl = `http://localhost:${PORT}/images/${req.files['imagePreview'][0].filename}`;
            const imageUrls = req.files['images'].map(file => `http://localhost:${PORT}/images/${file.filename}`);

            const newProduct = await prisma.products.create({
                data: {
                    inventoryId: Number(inventoryId),
                    productName, description, brand, 
                    categoryId: Number(categoryId), 
                    specs,
                    productImage: {
                        create: {
                            imagePreviewUrl, imageUrls
                        }
                    }
                }
            });

            const updateInventory = await prisma.inventory.update({
                data: {
                    isUsed: true
                },
                where: {
                    id: Number(inventoryId)
                }
            });

            res.status(201);
            res.json({
                product: newProduct,
                updateInventory,
                msg: 'Product berhasil ditambah!'
            });
        } catch (error) {
            console.log(error);
            res.json(error);
        }
});

// API for add product item
app.post('/product/item/add', accessValidation, upload.array('images', 10), async (req, res) => {
    try {
        const imageURLs = req.files.map(file => `http://localhost:${PORT}/images/${file.filename}`);
        const { productId, price, qty, status, manufacturer, inventoryItemId } = req.body;

        // get inventory item
        const inventoryItem = await prisma.inventoryItem.findUnique({
            where: {
                id: Number(inventoryItemId)
            }
        });

        // create variation option
        const newVariationOption = await prisma.variationOptions.create({
            data: {
                variationValue: inventoryItem.variation,
                variationId: inventoryItem.variationId
            }
        });

        // find product item with the similar inventory item
        const similarProductItem = await prisma.productItem.findUnique({
            where: {
                inventoryItemId: Number(inventoryItemId)
            }
        });

        if (similarProductItem) {
            const updatedProductItem = await prisma.productItem.update({
                where: {
                    id: similarProductItem.id
                },
                data: {
                    qty: { increment: Number(qty) },
                    status,
                }
            });

            // update inventory item
            const updatedInventoryItem = await prisma.inventoryItem.update({
                data: {
                    qty: { decrement: Number(qty) },
                    isUsed: true
                },
                where: {
                    id: updatedProductItem.inventoryItemId
                }
            });

            return res.status(201).json({updatedProductItem, updatedInventoryItem});
        } 

        // create new product item
        const newProductItem = await prisma.productItem.create({
            data: {
                productId: Number(productId),
                inventoryItemId: Number(inventoryItemId),
                variationOptionId: newVariationOption.id,
                price: Number(price),
                qty: Number(qty),
                status,
                manufacturer,
                imageURLs
            }
        });

        // update inventory item
        const updatedInventoryItem = await prisma.inventoryItem.update({
            data: {
                qty: { decrement: Number(qty) },
                isUsed: true
            },
            where: {
                id: newProductItem.inventoryItemId
            }
        });

        res.status(201);
        res.json({
            newProductItem,
            updatedInventoryItem,
            msg: 'Product Item berhasil ditambah!'
        });
    } catch (error) {
        console.log(error);
        res.json(error);
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

// API for get switch products - customer
app.get('/switches', async (req, res) => {
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
        res.json({error})
    }
});

// API for get keyboards for customer
app.get('/keyboards', async (req, res) => {
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
        res.json({error})
    }
});

// API for get keycaps for customer
app.get('/keycaps', async (req, res) => {
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
        res.json({error})
    }
});

// API for get keyboards - admin
app.get('/products/keyboards', async (req, res) => {
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
        res.json({error})
    }
});

// API for get product keycaps - admin
app.get('/products/keycaps', async (req, res) => {
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
        res.json({error})
    }
});

// Get switches data for customer
app.get('/products/switch', async (req, res) => {
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
        res.json({error})
    }
});


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
        const { price, qty, status, manufacturer } = req.body;

        // current product item
        const productItem = await prisma.productItem.findUnique({
            where: {
                id: Number(id)
            }
        });
        
        // updated product item
        const updatedProductItem = await prisma.productItem.update({
            where: {
                id: Number(id)
            },
            data: {
                price: Number(price),
                qty: Number(qty),
                status,
                manufacturer,
                imageURLs
            }
        });
        const diff = updatedProductItem.qty - productItem.qty;

        // get inventory item
        const inventoryItem = await prisma.inventoryItem.findUnique({
            where: {
                id: updatedProductItem.inventoryItemId
            }
        });

        if (inventoryItem) {
            // update inventory item qty
            await prisma.inventoryItem.update({
                where: {
                    id: updatedProductItem.inventoryItemId
                },
                data: {
                    qty: { decrement: diff }
                }
            });
        }


        res.status(201);
        res.json({
            updatedProductItem,
            // updatedInventoryItem: updatedInventoryItemQty,
            msg: 'Product item berhasil diubah!'
        });
    } catch (error) {
        res.json(error);
        console.log(error);
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
        console.log(error);
        res.json(error)
    }

});

// API for get product item detail by id
app.get('/product/item/:id', async (req, res) => {
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
        res.json(error);
        console.error(error);
    }
})

// API for delete Products
app.delete('/product/:id', accessValidation, async (req, res) => {
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

// API for get user orders
app.get('/user/orders', accessValidation, async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await prisma.orders.findMany({
            where: {
                userId
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
        res.json(error);
        console.log(error);
    }
})

// API for get order by id
app.get('/order/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma.orders.findUnique({
            where: {
                orderId: id,
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
        res.json(error);
    }
});

// API for create pending order
app.post('/pending-order', accessValidation, async (req, res) => {
    try {
        const { cartIds } = req.body;
        const targetCart = await prisma.cart.findMany({
            where:{
                id: {
                    in: cartIds
                }
            }
        });

        const pendingOrders = await prisma.pendingOrders.create({
            data: {
                cart: {
                    connect: targetCart
                }
            }
        });

        res.json({
            pendingOrders,
            msg: 'Successfull add pending orders'
        })
    } catch (error) {
        res.json(error);
        console.log(error);
    }
})


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
        const userId = req.userId;
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
        res.json(error);
    }
});

// API for get shipments by status
app.get('/shipments/ongoing', accessValidation, async (req, res) => {
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
        res.json(error);
    }
});

// API for get finished delivery
app.get('/shipments/finished', accessValidation, async (req, res) => {
    try {
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
        res.json(error);
    }
})

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
                userId,
                isDeleted: false
            },
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

        const similarCart = await prisma.cart.findFirst({
            where: {
                productItemId,
                isDeleted: false,
                isOrdered: false
            }
        });

        if (similarCart) {
            if (similarCart.qty >= productItem.qty) {
                return res.status(200).json({
                    msg: 'You cant add more cart'
                })
            }
        }

        const newCart = similarCart ? 
            await prisma.cart.update({
                where: {
                    id: similarCart.id,
                },
                data: {
                    qty: similarCart.qty + qty
                }
            }) 
            :
            await prisma.cart.create({
                data: {
                    userId, productItemId, qty, 
                    subTotalPrice: productItem.price * qty,
                }
            })

        res.status(201).json({
            newCart,
            productItem
        });  

    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// API for delete cart
app.delete('/cart/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCart = await prisma.cart.update({
            where: {
                id: Number(id)
            },
            data: {
                isDeleted: true
            }
        });

        res.json(deletedCart);
    } catch (error) {
        res.json(error);
        console.log(error);
    }
})

// API for get cart by user
app.get('/cart/user', accessValidation, async (req, res) => {
    try {
        const userId = req.userId;
        const carts = await prisma.cart.findMany({
            where: {
                userId,
                isOrdered: false,
                isDeleted: false
            },
            include: {
                productItem: {
                    include: {
                        product: true,
                        variationOption: true
                    }
                }
            },
            orderBy: {
                createAt: 'desc'
            }
        });

        res.json(carts);
    } catch (error) {
        res.json(error);
        console.log(error);
    }
});

// API for update user cart
app.patch('/cart/user/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const { qty, price } = req.body;
        const updatedCart = await prisma.cart.update({
            where: {
                id: Number(id)
            },
            data: {
                qty,
                subTotalPrice: price
            }
        });

        res.json(updatedCart);
    } catch (error) {
        res.json(error);
        console.log(error);
    }
})

// API for get cart by id
app.get('/selected/cart', async (req, res) => {
    try {
        const cartIds = req.query.cartIds.split(',').map(id => parseInt(id));
        const cart = await prisma.cart.findMany({
            where: {
                id: {
                    in: cartIds
                }
            },
            include: {
                productItem: {
                    include: {
                        product: true,
                        variationOption: true
                    }
                }
            }
        });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

// API for create new address
app.post('/address', accessValidation, async (req, res) => {
    try {
        const userId = req.userId;
        const { street, kelurahan, kecamatan, city, province, postCode } = req.body;
        const newAddress = await prisma.userAddress.create({
            data: {
                userId, street, kelurahan, kecamatan, city, province, postCode: Number(postCode),
                isDefault: false
            }
        });
        
        res.status(201);
        res.json({
            newAddress,
            msg: 'New address added!'
        })
    } catch (error) {
        console.log(error);
    }
})

// API for making new orders
app.post('/order', accessValidation, async (req, res) => {
    try {
        const userId = req.userId; 
        const { cartIds, buyerName, phoneNumber, paymentMethodId, addressId, totalPrice, orderNotes } = req.body;

        // find coresponding cart
        const carts = await prisma.cart.findMany({
            where: {
                id: {
                    in: cartIds
                }
            }
        });

        // create new order
        const newOrder = await prisma.orders.create({
            data: {
                userId,
                paymentMethodId,
                addressId,
                orderTotal: carts.length,
                totalPrice,
                orderNotes,
                buyerName,
                phoneNumber,
                carts: {
                    connect: carts
                },
                currentStatus: {
                    create: {
                        orderStatusId: 1
                    }
                }
            },
            include: {
                paymentMethod: true
            }
        });

        // set cart status to is ordered
        await Promise.all(
            carts.map(async (item) => {
                await prisma.cart.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        isOrdered: true
                    }
                })
            })
        )

        // update qty stock and sold data
        await Promise.all(
            carts.map(async (item) => {
                await prisma.productItem.update({
                    where:{
                        id: item.productItemId
                    },
                    data: {
                        qty: { decrement: item.qty },
                        sold: { increment: item.qty }
                    }
                })
            })
        )

        res.json({
            carts,
            newOrder,
            msg: 'Making new order successfull'
        })

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