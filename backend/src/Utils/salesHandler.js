const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { handleError } = require('./errorHandler');

const getProductSales = async (req, res) => {
    try {
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
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const getKeyboardSales = async (req, res) => {
    try {
        const products = await prisma.products.findMany({
            where: {
                categoryId: 1
            },
            include: {
                productItem: true
            },
        });

        const totalSales = products.map(item => ({
            productName: item.productName,
            totalSales: item.productItem.map(item => item.sold).reduce((acc, accValue) => acc + accValue, 0)
        }));

        res.json({
            totalSales: totalSales.sort((a, b) => b.totalSales - a.totalSales).slice(0, 5)
        })
    } catch (error) {
        handleError(null, error.message, res)
    }
}

const getKeycapsSales = async (req, res) => {
    try {
        const products = await prisma.products.findMany({
            where: {
                categoryId: 2
            },
            include: {
                productItem: true
            },
        });

        const totalSales = products.map(item => ({
            productName: item.productName,
            totalSales: item.productItem.map(item => item.sold).reduce((acc, accValue) => acc + accValue, 0)
        }));

        res.json({
            totalSales: totalSales.sort((a, b) => b.totalSales - a.totalSales).slice(0, 5)
        })
    } catch (error) {
        handleError(null, error.message, res)
    }
}

const getSwitchesSales = async (req, res) => {
    try {
        const products = await prisma.products.findMany({
            where: {
                categoryId: 3
            },
            include: {
                productItem: true
            },
        });

        const totalSales = products.map(item => ({
            productName: item.productName,
            totalSales: item.productItem.map(item => item.sold).reduce((acc, accValue) => acc + accValue, 0)
        }));

        res.json({
            totalSales: totalSales.sort((a, b) => b.totalSales - a.totalSales).slice(0, 5)
        })
    } catch (error) {
        handleError(null, error.message, res);
    }
}

module.exports = {
    getProductSales,
    getKeyboardSales,
    getKeycapsSales,
    getSwitchesSales
}