const express = require('express');
const cors = require('cors');
const {pool} = require('./db');
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

// API for get all products
app.get('/product', async (req, res) => {
    try {
        const response = await pool.query(
            `
                SELECT 
                    p.id,
                    p.product_name,
                    pc.category_name,
                    p.description,
                    pi.price,
                    pi.image,
                    pi.stock,
                    pi.manufacturer,
                    pi.status,
                    v.variation_name,
                    vo.variation_value
                FROM 
                    product p
                JOIN 
                    product_category pc ON p.category_id = pc.id
                JOIN 
                    product_item pi ON p.id = pi.product_id
                JOIN
                    variation_option vo ON pi.variation_option_id = vo.id
                JOIN
                    variation v ON vo.variation_id = v.id;
            `
        );
        res.json(response.rows);
    } catch (error) {
        console.log(error.messege);
    }
});

// API for get product detail by id
app.get('/product/detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await pool.query(
            `
                SELECT 
                    pi.id,
                    p.product_name,
                    pc.category_name,
                    p.description,
                    pi.price,
                    pi.image,
                    pi.stock,
                    pi.manufacturer,
                    pi.status,
                    v.variation_name,
                    vo.variation_value
                FROM 
                    product p
                JOIN 
                    product_category pc ON p.category_id = pc.id
                JOIN 
                    product_item pi ON p.id = pi.product_id
                JOIN
                    variation_option vo ON pi.variation_option_id = vo.id
                JOIN
                    variation v ON vo.variation_id = v.id
                WHERE
                    p.id = ${id};
            `
        );
        res.json(response.rows);
    } catch (error) {
        console.log(error.messege);
    }
})

// API for add new product
app.post('/product/add', async (req, res) => {
    const { created_by, created_at, category, product_name, description, stock, imageURL, price, manufacturer, status, variation_option} = req.body;

    try {
        const response = await pool.query(
            `
                INSERT INTO product (category_id, product_name, description)
                VALUES ((SELECT id FROM product_category WHERE category_name = '${category}'), '${product_name}', '${description}');
    
                INSERT INTO product_info (created_by, created_at)
                VALUES((SELECT id FROM user_list WHERE name = '${created_by}'), '${created_at}');
    
                INSERT INTO product_item (product_id, stock, image, price, manufacturer, status, variation_option_id, product_info_id)
                VALUES(
                    (SELECT id FROM product WHERE product_name = '${product_name}'),
                    ${stock},
                    '${imageURL}',
                    ${price},
                    '${manufacturer}',
                    '${status}',
                    (SELECT id FROM variation_option WHERE variation_value = '${variation_option}'),
                    (SELECT id FROM product_info WHERE created_at = '${created_at}')
                );
            `
        );
        res.json(response.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(PORT, () => {
    console.log(`Listening to port http://localhost:${PORT}`);
})