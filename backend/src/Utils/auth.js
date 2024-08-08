const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { handleError } = require('./errorHandler');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const invalidTokens = new Set();

const login = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        handleError(null, error.message, res);
    }
};

const logout = (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (invalidTokens.has(token)) return res.status(401).json('Invalid Token');

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
};

module.exports = { login, logout }
