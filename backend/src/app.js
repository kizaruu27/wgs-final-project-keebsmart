const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const { handleError } = require('./Utils/errorHandler');
const { body, validationResult} = require('express-validator');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { getAlluser, changeUserStatus, deleteUser, registerUser, registerAdmin, deleteAdmin, registerCourier, getLoginUserData, checkEmail, userResetPassword } = require('./Utils/userHandler');
const { login } = require('./Utils/auth');
const { addNewInventory, getInventory, getUnusedInventory, getInventoryDetailById, deleteInventory, updateInventory, updateInventoryItem, deleteInventoryItem, getInventoryDetail, getInventoryItemDetail } = require('./Utils/inventoryHandler');
const { getVariationsData, getVariationFromProduct } = require('./Utils/variationHandler');
const { getAllProducts, getProductsForCustomer, searchProduct, getProductItemById, getAllProductDetail, getAllCategory, getSwitchesDataForCustomer, getKeyboardsDataForCustomer, getKeycapsDataForCustomer, getKeyboardsDataForAdmin, getKeycapsDataFOrAdmin, getKeycapsDataForAdmin, getSwitchesDataForAdmin, productActivation, deleteProductItem, getProductItemDetail, deleteProducts, checkProductItemStock } = require('./Utils/productHandler');
const { getProductSales, getKeyboardSales, getKeycapsSales, getSwitchesSales } = require('./Utils/salesHandler');
const { getOrderDetails, setOrderStatus, getUserOrders, getUserAddress, getAddressDetail, getOrderById, cancelOrder, adminCancelOrder } = require('./Utils/orderHandler');
const { createShipment, getAllShipments, getShipmentsByStatus, getFinishedDelivery, getShipmentDetail } = require('./Utils/shipmentHandler');
const prisma = new PrismaClient();
const app = express();
dotenv.config();  

const PORT = process.env.PORT;
const SECRET = process.env.JWT_SECRET;
const IP_ADDRESS = process.env.IP_ADDRESS;

app.use(cors({
    origin: [
        `http://localhost:${PORT}`, 
        `http:${IP_ADDRESS}:${PORT}`,
        `http://10.10.101.136:${PORT}`,
        'http://localhost:5173',
        `http://${IP_ADDRESS}:5173`
    ],
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

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
        req.access = decoded.access;
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
        const imageUrls = req.files.map(file => `/images/${file.filename}`);
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
app.get('/users', accessValidation, getAlluser);

// API for change user status
app.patch('/user/:id', accessValidation, changeUserStatus);

// API for delete user
app.delete('/user/:id', accessValidation, deleteUser)

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
app.post('/registration', registrationValidation, registerUser);

// API for check user email
app.get('/email/check/:email', checkEmail);

// Function for password validation
const validateNewPassword = [
    body('newPassword').custom(async (value) => {
        const hasNumber = /\d/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasMinLength = value.length >= 8;

        if (!hasNumber || !hasUppercase || !hasLowercase || !hasMinLength) {
            throw new Error('Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number');
        }
    })
]

// API for reset user password
app.patch('/reset/password/:id', validateNewPassword, userResetPassword);

// API for admin registration
app.post('/registration/admin', accessValidation, registrationValidation, registerAdmin);

// API for delete admin
app.delete('/delete/admin/:id', accessValidation, deleteAdmin)

// API for courier registration
app.post('/courier/registration', accessValidation, registrationValidation, registerCourier)

// API for login
app.post('/login', login);

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
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
})

// API for get login user data
app.get('/user', accessValidation, getLoginUserData);

// INVENTORY
// API for post new inventory
app.post('/inventory', accessValidation, addNewInventory);

// API for get inventory
app.get('/inventory', accessValidation, getInventory);

// get unused inventory
app.get('/inventory/unused', accessValidation, getUnusedInventory);

// Get inventory detail by id
app.get('/inventory/:id', accessValidation, getInventoryDetailById);

// API for delete inventory
app.delete('/inventory/:id', accessValidation, deleteInventory);

// API for update inventory
app.put('/inventory/:id', accessValidation, updateInventory);

// UPDATE/edit inventory item by id
app.put('/inventory/item/:id', accessValidation, updateInventoryItem);

// Delete inventory item by id
app.delete('/inventory/item/:id', accessValidation, deleteInventoryItem);

// Get inventory item  by id
app.get('/inventory/item/:id', accessValidation, getInventoryItemDetail);

// API for get variation data
app.get('/variations', getVariationsData);

// API for get all products
app.get('/products', getAllProducts);

// get products for customer
app.get('/products/user', getProductsForCustomer);

// API for search product by search key
app.get('/product/search', searchProduct)

// API for get product item by id
app.get('/product/:id', getProductItemById);

// get product detail with deleted data
app.get('/product/sales/:id', getAllProductDetail);

// check product item qty
app.post('/product/qty', checkProductItemStock);

// API for get product sales
app.get('/sales', getProductSales);

// API for get keyboard sales
app.get('/sales/keyboards', getKeyboardSales);

// API for get keycaps sales
app.get('/sales/keycaps', getKeycapsSales);

// API for get switches sales
app.get('/sales/switches', getSwitchesSales);

// API for add new product
app.post('/product', accessValidation, upload.fields([
    { name: 'imagePreview', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), 
    async (req, res) => {
        try {
            const { inventoryId, productName, description, brand, categoryId, specs } = req.body;
            const imagePreviewUrl = `/images/${req.files['imagePreview'][0].filename}`;
            const imageUrls = req.files['images'].map(file => `/images/${file.filename}`);

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
            const userId = req.userId;
            handleError(userId, error.message, res);
        }
});

// API for add product item
app.post('/product/item/add', accessValidation, upload.array('images', 10), async (req, res) => {
    try {
        const imageURLs = req.files.map(file => `/images/${file.filename}`);
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
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
});

// API for get all category
app.get('/category', getAllCategory)


// API for get variation from product
app.get('/product/variation/:id', getVariationFromProduct);

// API for get switch products - customer
app.get('/switches', getSwitchesDataForCustomer);

// API for get keyboards for customer
app.get('/keyboards', getKeyboardsDataForCustomer);

// API for get keycaps for customer
app.get('/keycaps', getKeycapsDataForCustomer);

// API for get keyboards - admin
app.get('/products/keyboards', getKeyboardsDataForAdmin);

// API for get product keycaps - admin
app.get('/products/keycaps', getKeycapsDataForAdmin);

// Get switches data for customer
app.get('/products/switch', getSwitchesDataForAdmin);


// API for edit product data
app.put('/product/update/:id', accessValidation, upload.fields([
    { name: 'imagePreview', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), 
    async (req, res) => {
        try {
            const { id } = req.params;
            const { productName, description, brand, categoryId } = req.body;
            const imagePreviewUrl = `http://${IP_ADDRESS}:${PORT}/images/${req.files['imagePreview'][0].filename}`;
            const imageUrls = req.files['images'].map(file => `/images/${file.filename}`);

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
            const userId = req.userId;
            handleError(userId, error.message, res);
            console.log(error);
        }
});

// API for edit product item
app.put('/product/item/update/:id', accessValidation, upload.array('images', 10), async (req, res) => {
    try {
        const { id } = req.params;
        const imageURLs = req.files.map(file => `/images/${file.filename}`);
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
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
});

// API for set active a product
app.patch('/product/activate/:id', accessValidation, productActivation);

// API for Delete Product Item
app.delete('/product/item/:id', accessValidation, deleteProductItem);

// API for get product item detail by id
app.get('/product/item/:id', getProductItemDetail);

// API for delete Products
app.delete('/product/:id', accessValidation, deleteProducts);

// API for get order details
app.get('/orders', getOrderDetails);

// API for set order status
app.patch('/order/status/:id', accessValidation, setOrderStatus);

// API for cancel order for customer
app.patch('/order/cancel/:id', accessValidation, cancelOrder);

// API for cancel order for admin
app.patch('/admin/order/cancel/:id', accessValidation, adminCancelOrder);

// API for get user orders
app.get('/user/orders', accessValidation, getUserOrders);

// API for get user address
app.get('/user/address', accessValidation, getUserAddress);

// API for get address detail
app.get('/user/address/:id', getAddressDetail);

// API for get order by id
app.get('/order/:id', accessValidation, getOrderById);

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
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
})


// API for create new shipment
app.post('/shipment', accessValidation, createShipment);

// API for get all shipments
app.get('/shipments', accessValidation, getAllShipments);

// API for get shipments by status
app.get('/shipments/ongoing', accessValidation, getShipmentsByStatus);

// API for get finished delivery
app.get('/shipments/finished', accessValidation, getFinishedDelivery);

// API for get shipment detail
app.get('/shipment/:id', accessValidation, getShipmentDetail);

// API for add moneykeep for courier
app.post('/money', accessValidation, async (req, res) => {
    try {
        const { amount, shippingId } = req.body;
        const userId = req.userId;
        const access = req.access;

        if (access !== 'courier') return res.json('Only courier can access this');

        const moneyKeep = await prisma.moneyKeep.create({
            data: {
                amount,
                userId,
                shippingId
            }
        });

        res.json(moneyKeep);
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
});

// API for set moneykeep is received
app.patch('/money', accessValidation, async (req, res) => {
    try {
        const { id } = req.body;
        const access = req.access;

        if (access !== 'admin') return res.json('Only admin can access this!');

        const moneyKeep = await prisma.moneyKeep.updateMany({
            where: {
                id: {
                    in: id
                }
            },
            data: {
                isReceived: true
            }
        });

        const updatedMoneyKeep = await prisma.moneyKeep.findMany({
            where: {
                id: {
                    in: id
                }
            },
            include: {
                order: {
                    include: {
                        order: true
                    }
                }
            }
        });
        
        const acceptedCashStatus = await prisma.orderStatus.findFirst({
            where: {
                status: 'Cash Payment Accepted'
            }
        });

        const orderCompleteStatus = await prisma.orderStatus.findFirst({
            where: {
                status: 'Order Completed'
            }
        });
        
        const orderIds = updatedMoneyKeep.map(item => item.order.order.orderId);
        const acceptedStatusData = orderIds.map(orderId => ({
            orderId: orderId,
            orderStatusId: acceptedCashStatus.id
        }));

        const orderCompleteData = orderIds.map(orderId => ({
            orderId: orderId,
            orderStatusId: orderCompleteStatus.id
        }));

        const acceptedStatusUpdate = await prisma.currentStatus.createMany({
            data: acceptedStatusData
        });

        const completedOrderStatus = await prisma.currentStatus.createMany({
            data: orderCompleteData
        });
        const totalAmmount = updatedMoneyKeep.map(item => item.amount).reduce((acc, accvalue) => acc + accvalue, 0);

        const month = new Date().toLocaleString('default', {month: 'short'});

        // Find the similar month in the database
        const incomeInSameMonth = await prisma.totalIncome.findFirst({
            where: {
                month
            }
        });

        // Update income
        const updatedIncome = incomeInSameMonth ? await prisma.totalIncome.update({
            data: {
                amount: {increment: totalAmmount}
            },
            where: {
                id: incomeInSameMonth.id
            }
        })
        :
        await prisma.totalIncome.create({
            data: {
                amount: totalAmmount,
                month
            }
        });

        res.json({
            moneyKeep,
            updatedMoneyKeep,
            orderIds,
            completedOrderStatus,
            updatedIncome
        });
    } catch (error) {
        const userId = req.userId;
        handleError(userId, error.message, res);
        console.log(error);
    }
});

// API for get total income
app.get('/income', accessValidation, async (req, res) => {
    try {
        const income = await prisma.totalIncome.findMany({
            select: {
                amount: true,
                month: true
            },
            orderBy: {
                id: 'asc'
            }
        });

        const totalIncome = income.map(item => item.amount).reduce((acc, accValue) => acc + accValue, 0);

        res.json({
            income,
            totalIncome
        });
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
});

// API for get all cart
app.get('/cart', async (req, res) => {
    try {
        const cart = await prisma.cart.findMany();
        res.json(cart);
    } catch (error) {
        console.log(error);
        handleError(null, error.message, res);
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
        const userId = req.userId;
        handleError(userId, error.message, res);
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
                userId: userId,
                productItemId,
                isDeleted: false,
                isOrdered: false
            }
        });

        if (productItem.qty <= 0) {
            return res.status(200).json({
                msg: 'Sorry, this item is no longer available :('
            })
        }

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
                    qty: {increment: qty},
                    subTotalPrice: {increment: productItem.price * qty}
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
        const userId = req.userId;
        handleError(userId, error.message, res);
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
        const userId = req.userId;
        handleError(userId, error.message, res);
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
        const userId = req.userId;
        handleError(userId, error.message, res);
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
        const userId = req.userId;
        handleError(userId, error.message, res);
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
        handleError(null, error.message, res);
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
        const userId = req.userId;
        handleError(userId, error.message, res);
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
        );

        const productItemIds = carts.map(item => item.productItemId);
        const productItem = await prisma.productItem.findMany({
            where: {
                id: {
                    in: productItemIds
                }
            }
        });

        await Promise.all(
            productItem.map(async (item) => item.qty <= 0 && 
                await prisma.productItem.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        status: 'empty'
                    }
                })
            )
        );

        res.json({
            carts,
            newOrder,
            msg: 'Making new order successfull'
        })

    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
});

// API for delete order
app.delete('/order/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await prisma.orders.update({
            where: {
                orderId: id
            },
            data: {
                isDeleted: true
            }
        });

        res.json({deletedOrder, msg: 'Order deleted successfully'});
    } catch (error) {
        console.log(error);
        const userId = req.userId;
        handleError(userId, error.message, res);
    }
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening to port ${PORT}`);
})