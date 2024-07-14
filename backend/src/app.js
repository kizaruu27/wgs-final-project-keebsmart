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
    if (!token) res.status(401).json({error: 'Token not found! Please add a token!'});

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
        const users = await prisma.user.findMany();
        res.json({
            data: {users},
            msg: 'Get all users success'
        })
    } catch (error) {
        console.log(error.messege);
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
        
        const newCart = await prisma.cart.create({
            data: {
                userId: newUser.id
            }
        })

        res.status(201);
        res.json({
            user: newUser,
            cart: newCart,
            msg: 'Akun berhasil dibuat!'
        })
    } catch (error) {
        console.log(error);
    }
});

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
        access: user.access
    }
    const expiresIn = 60 * 60 * 24;
    const token = jwt.sign(payload, SECRET, {expiresIn});

    res.json({
        user,
        token,
        msg: 'Login Berhasil!'
    })
});

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

// API for get product detail by id
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
                        productLog: {
                            include: {
                                createdBy: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
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
                productImage: true
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
                productImage: true
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

// API for get all keyboards
app.get('/products/keyboards', async (req, res) => {
    try {
        const keyboards = await prisma.products.findMany({
            where: {
                category: {
                    categoryName: 'Keyboard'
                }
            },
            include: {
                productItem: true,
                productImage: true
            }
        });
        
        res.json({
            keyboards,
            msg: 'Berhasil mendapatkan data switches!'
        })
    } catch (error) {
        res.json({error})
    }
})

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