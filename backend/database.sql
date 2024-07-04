-- CREATE TABLE --
-- Membuat table product category
CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

-- Membuat table product
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES product_category(id),
    product_name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Membuat table product item
CREATE TABLE product_item (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES product(id),
    stock INT NOT NULL,
    image VARCHAR(255),
    price INT NOT NULL,
    manufacturer VARCHAR(255),
    status VARCHAR(50)
);

-- Membuat table variation
CREATE TABLE variation (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES product_category(id),
    variation_name VARCHAR(50)
);

-- Membuat table variation_option
CREATE TABLE variation_option (
    id SERIAL PRIMARY KEY,
    variation_id INT REFERENCES variation(id),
    variation_value VARCHAR(50)
);

-- Membuat table product_info
CREATE TABLE product_info (
    id SERIAL PRIMARY KEY,
    created_by VARCHAR(30),
    created_at VARCHAR(25)
);

-- Membuat table product_configuration
CREATE TABLE product_configuration(
    product_item_id INT REFERENCES product_item(id),
    variation_option INT REFERENCES variation_option(id)
);

-- INSERT DATA
-- NOTES --
-- [] BERARTI PARAMETER ID YANG HARUS DIINPUTKAN KETIKA QUERY

-- Insert data untuk category
INSERT INTO product_category (category_name) VALUES ('Keyboard');
INSERT INTO product_category (category_name) VALUES ('Keycaps');
INSERT INTO product_category (category_name) VALUES ('Switch');

-- Insert data untuk product
INSERT INTO product (category_id, product_name, description)
VALUES ([id_category], 'Zoom65 Essential Edition', 'A high-end keyboard with many features');

-- Insert data untuk product_item
INSERT INTO product_item (product_id, stock, image, price, manufacturer, status)
VALUES ([id_product], 100, 'smartphone.jpg', 699, 'TechCorp', 'available');

-- Insert untuk data variation
BEGIN;
INSERT INTO variation (category_id, variation_name)  VALUES (1, 'Color');
INSERT INTO variation_option (variation_id, variation_value) VALUES (1, 'Black');
COMMIT;

--
ALTER TABLE product_item
ADD variation_option_id INT REFERENCES variation_option(id);

ALTER TABLE product_item
ADD product_info_id INT REFERENCES product_info(id);

INSERT INTO product (category_id, product_name, description) 
VALUES ((SELECT id FROM product_category WHERE category_name = 'Keyboard'), 'Angry Miao', 'A cute model keyboard');

INSERT INTO product_item (product_id, stock, image, price, manufacturer, status, variation_option_id)
VALUES ((SELECT id FROM product WHERE product_name = 'Angry Miao'), 10, 'angrymiao.jpg', 1000000, 'Chikey', 'available', (SELECT id FROM variation_option WHERE variation_value = 'Blue'));
INSERT INTO product_item (product_id, stock, image, price, manufacturer, status, variation_option_id)
VALUES ((SELECT id FROM product WHERE product_name = 'Angry Miao'), 10, 'angrymiaobrown.jpg', 1000000, 'Chikey', 'available', (SELECT id FROM variation_option WHERE variation_value = 'Brown'));

SELECT 
    p.product_name,
    p.description,
    pc.category_name,
    pi.stock,
    pi.price,
    pi.manufacturer,
    pi.status,
    pi.variation_option_id
FROM
    product p
JOIN 
    product_category pc ON p.category_id = pc.id
JOIN 
    product_item pi ON p.id = pi.product_id
JOIN 
    variation v ON p.category_id = v.category_id
JOIN
    variation_option vo ON v.id = vo.variation_id;

DELETE FROM product WHERE id = 2;

--


-- Show all data product
SELECT 
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



INSERT INTO product (category_id, product_name, description)
VALUES ((SELECT id FROM product_category WHERE category_name = 'Keycaps'), 'GMK Yuzu', 'JapRoot Keycaps');

INSERT INTO product_item(product_info_id)
VALUES(1)
WHERE product_id = 7;

UPDATE variation_option
SET variation_id = 2
WHERE id = 6;

INSERT INTO product (category_id, product_name, description)
VALUES ((SELECT id FROM product_category WHERE category_name = 'Keyboard'), 'Noir Spade 65', 'Mechanical keyboard with compact design');

INSERT INTO product_item (product_id, stock, price, manufacturer, status, image)
VALUES ((SELECT id FROM product WHERE product_name = 'Noir Spade 65'),
        50,
        1500000,
        'Noir',
        'available',
        'spade65_biru.jpg');

INSERT INTO variation (variation_name)
VALUES ('Kit');

INSERT INTO variation_option (variation_value)
VALUES ('108 Keys');

insert INTO product_info (created_by, created_at)
VALUES ('Ujang', 'Senin 20 Juli 2025');

INSERT INTO product_item (product_id, stock, image, price, manufacturer, status, variation_option_id, product_info_id)
VALUES ((SELECT id FROM product WHERE product_name = 'GMK Yuzu'),
        5,
        'gmkyuzy.jgp',
        3000000,
        'GMK',
        'available',
        (SELECT id FROM variation_option WHERE variation_value = '108 Keys'),
        (SELECT id FROM product_info WHERE created_by = 'Ujang')
        );
        
INSERT INTO product_item (product_id, stock, price, manufacturer, status, image)
VALUES ((SELECT id FROM product WHERE product_name = 'Noir Spade 65'),
        50,
        1500000,
        'Noir',
        'available',
        'milkywhite.jpg');

SELECT 
    p.product_name,
    pc.category_name,
    p.description,
    pi.price,
    pi.image,
    pi.stock,
    pi.manufacturer,
    pi.status,
    vo.variation_value AS color
FROM 
    product p
JOIN 
    product_category pc ON p.category_id = pc.id
JOIN 
    product_item pi ON p.id = pi.product_id
JOIN 
    variation v ON p.category_id = v.category_id
JOIN 
    variation_option vo ON v.id = vo.variation_id
WHERE 
    p.product_name = 'Noir Spade 65';