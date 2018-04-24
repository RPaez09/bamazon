DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(80) NOT NULL,
    manufacturer_name VARCHAR(25) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock_quantity INT NOT NULL
);

-- Mock data
INSERT INTO products (product_name, manufacturer_name, department_name, price, stock_quantity)
VALUES 
('Surface Book 2', 'Microsoft', 'Tablet', 1849.99, 15),
('iPad Pro', 'Apple', 'Tablet', 749.99, 10),
('Mate 10 Pro', 'Huawei', 'Cellphone', 799.99, 25),
('iPhone X', 'Apple', 'Cellphone', 899.99, 32),
('Galaxy S9', 'Samsung', 'Cellphone', 699.99, 27),
('GTX 1080', 'MSI', 'GPU', 619.99, 3),
('RX 570', 'Gigabyte', 'GPU', 299.99, 1),
('Core i7 8700K', 'Intel', 'CPU', 349.99, 0),
('Core i3 8350K', 'Intel', 'CPU', 174.99, 2),
('Ryzen 1950X', 'AMD', 'CPU', 899.99, 1),
('Matebook X', 'Huawei', 'Laptop', 999.99, 1),
('ThinkPad X1 Yoga', 'Lenovo', 'Laptop', 1616.46, 5),
('Flex 5', 'Lenovo', 'Laptop', 999.99, 1);