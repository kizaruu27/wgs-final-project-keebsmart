const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { handleError } = require('./errorHandler');

const getVariationsData = async (req, res) => {
    try {
        const variations = await prisma.variations.findMany();
        res.json(variations);
    } catch (error) {
        handleError(null, error.message, res);
    }
};

const getVariationFromProduct = async (req, res) => {
    try {
        const { id } = req.params;
    
        const variation = await prisma.variations.findMany({
            where: {
                categoryId: Number(id)
            } 
        }); 
    
        res.json(variation);
    } catch (error) {
        handleError(null, error.message, res);
    }
};

module.exports = {
    getVariationsData,
    getVariationFromProduct,
    
}