const mysql     = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect( err => {
    if(err){
        throw err
    }
});

const parse = ( input ) => {
    if( typeof input !== 'string' ){
        input = input.toString();
    }
    if( input.length < 7 ){
        return input.padEnd(7)
    }
    else if( input.length > 15 ){
        return `${input.substring(0,11)}..`
    } else {
        return input
    }
};

const logTable = ( products ) => {
    console.log(`\nID\t\|Name\t\t|Manufacturer\t|Department\t|Price\t\t|Number in stock`);
    for(let i = 0; i<products.length; i++){
        console.log(`${products[i].item_id}\t|${parse( products[i].product_name ) }\t|${parse(products[i].manufacturer_name)}\t|${parse(products[i].department_name)}\t|${parse(products[i].price)}\t|${parse(products[i].stock_quantity)}`);
    }
};

const getAllProducts = () => {
    return new Promise( (resolve, reject) =>{
        connection.query("SELECT * FROM products", ( err, products ) => {
            if( err ){
                reject( err );
            }
            resolve(products);
        });
    })
};

const getProductById = (id) => {
    return new Promise( (resolve, reject) => {
        connection.query("SELECT * FROM products WHERE item_id = ?", [id], ( err, product ) => {
            if( err ){
                reject( err );
            }

            if( product.length > 0 ){
                resolve(product);
            } else {
                reject("Sorry, That product cannot be found.")
            }
        });
    });
};

module.exports = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    logTable: logTable
};