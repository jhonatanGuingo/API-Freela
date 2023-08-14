import { db } from "../database/database.js";

export async function addProduct(req, res){
    const {nameProd, description, category, img, price} = req.body;
    const {user} = res.locals;

    try {
        await db.query(`INSERT INTO products ("nameProd", "description","category", "img", "userId", "price") VALUES ($1, $2, $3, $4, $5, $6)`, [nameProd, description, category, img, user.id, price] )
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getProducts(req, res){
    try {
        const products = await db.query (`SELECT * FROM products`);
        res.status(200).send(products.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getProductsByUser(req, res){
    const {user} = res.locals;
    const {token} = req.header;

    try {
        const searchProducts = await db.query(`SELECT * FROM products WHERE "userId" = $1`, [user.id]);
        console.log(searchProducts.rows)
        if(!searchProducts.rowCount > 0){
            res.status(404).send("O usuario n tem nenhum produto cadastrado")
            return
        }
        res.status(200).send(searchProducts.rows)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function updateIsSold(req, res){
    const {id} = req.body;
    const {user} = res.locals;
    try {
        const searchProduct = await db.query(`SELECT * FROM products WHERE id = $1`, [id])

        console.log(searchProduct.rows);

       // if(!searchProduct.rowCount > 0 || searchProduct.rows[0].userId != user.id){
       //     res.status(404).send('O id do produto não existe');
       //     return
      //  }

        await db.query(`UPDATE products SET sold = true WHERE id = $1`, [id]);
        res.sendStatus(200)
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function viewProduct(req, res){
    const {id} = req.params;
    try {
        const searchInfoProduct = await db.query(`SELECT products.*, users.name, users.number FROM products JOIN users ON "userId" = users.id WHERE products.id = $1;`, [id])
        res.status(200).send(searchInfoProduct.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}