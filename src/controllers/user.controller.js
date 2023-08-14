import {
    db
} from "../database/database.js";
import bcrypt from "bcrypt";
import {
    v4 as uuid
} from "uuid";

export async function signUp(req, res) {
    const {
        email,
        name,
        cpf,
        number,
        password,
        confirmPassword     
    } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    if (password != confirmPassword) {
        res.status(422).send("As senhas devem ser iguais")
        return
    }

    try {
        const emailExist = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
        if (emailExist.rowCount > 0) {
            res.status(409).send("E-mail já cadastrado");
            return
        }

        await db.query(`INSERT INTO users ("name", "email", "cpf","number", "password") VALUES ($1, $2, $3, $4, $5)`, [name, email,cpf, number, hash])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const {
        email,
        password
    } = req.body;
    
    try {
        const searchEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!searchEmail.rowCount > 0) {
            res.status(401).send("e-mail não cadastrado")
            return
        }

        const userId = searchEmail.rows[0].id;
        if (searchEmail.rows[0].password && bcrypt.compareSync(password, searchEmail.rows[0].password)) {
            const token = uuid();
            await db.query(`INSERT INTO sessions ("token", "userId") VALUES ($1, $2)`, [token, userId])
            const meuToken = {
                token: token,
                name: searchEmail.rows[0].name

            }
            res.status(200).send(meuToken)
        } else {
            res.status(401).send("senhas incorreta");
        }


    } catch (err) {
        res.status(500).send(err.message);
    }
}
