import { db } from "../database/database.js";

export async function addProduct(req, res){
    const {name, description, category, img, price} = req.body;
    const {user} = res.locals;

    try {
        await db.query(`INSERT INTO products ("name", "description","category", "img", "userId", "price") VALUES ($1, $2, $3, $4, $5, $6)`, [name, description, category, img, user.id, price] )
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
        const searchProducts = await db.query(`SELECT * FROM products WHERE "userId" = $1`, [user.id])
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