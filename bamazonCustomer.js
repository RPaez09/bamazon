const inquirer  = require('inquirer');
const products  = require('./helpers/productController');

let app = {
    inventory: [],
    cart: {},
    quantity: 0,
    init: function(){
        console.log("Welcome to Bamazon!");

        products.getAllProducts()
        .then( results => {
            app = { ...app, inventory: results };
            products.logTable( app.inventory );
            return askForProduct()
        })
        .then( ( answer ) => {
            return products.getProductById(answer)
        })
        .then( chosenProduct => {
            app = { ...app, cart: chosenProduct };
            products.logTable( app.cart );
            return askHowMany( app.cart[0].stock_quantity )
        })
        .then( answer => {
            if(answer){
                app = {...app, quantity: answer};
                console.log(`Processing order....`);
                return products.processOrder( app.cart[0].item_id , answer );
            }
        })
        .then( result => {
            if( result ){
                console.log(`Your total is: $${(app.cart[0].price * app.quantity)}`);
                console.log(`Your order of ${app.quantity} ${app.cart[0].product_name} is being shipped, Thank you for using Bamazon!`);
            }
        })
        .catch( error => {
            console.log( error );
            app.init();
        });
    }
};

app.init();

const askForProduct = () => {
    return new Promise( (resolve, reject) => {
        inquirer.prompt({
            name: "id",
            type: "input",
            message: "ID of product you'd like to purchace?"
        }).then( answer => {
            resolve(answer.id);
        });
    })
};

const askHowMany = ( stock ) => {
    if( stock === 0 ){
        console.log('Sorry, that item is sold out.');
        app.init();
    } else{
        return new Promise( (resolve, reject) => {
            inquirer.prompt({
                name: "quantity",
                type: "input",
                message: `How many would you like to purchase? Limit: ${stock}`
            }).then( answer => {
                if( answer.quantity <= stock ){
                    resolve(answer.quantity);
                } else {
                    reject("Sorry, that's an invalid amount");
                }
            });
        })
    }
};