const express = require('express');
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "wellness.db");

let db = null;

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(3000, () => {
            console.log("Server Running at http://localhost:3000/");
        });
    } catch (e) {
        console.log(`DB Error : ${e.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();

//MIDDLEWARE

const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
        response.status(401);
        response.send("Invalid JWT Token");
    } else {
        jwt.verify(jwtToken, "MY_SECRET", async (error, payload) => {
            if (error) {
                response.status(401);
                response.send("Invalid JWT Token");
            } else {
                request.username = payload.username;
                next();
            }
        });
    }
}

//REGISTER API

app.post("/register/", async (request, response) => {
    const userDetails = request.body;
    const { username, name, email_id, password, gender, contact_number, address, city, country, age } = userDetails;
    const hashedPassword = await bcrypt.hash(password, 10);
    const selectUserQuery = `SELECT * FROM User WHERE username='${username}';`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
        if (password.length < 6) {
            response.status(400);
            response.send("Password is too short");
        } else {
            const createUserQuery = `
            INSERT INTO 
            User(username, name, email_id, password, gender, contact_number, address, city, country, age)
            VALUES('${username}', '${name}', '${email_id}', '${hashedPassword}', '${gender}', ${contact_number}, '${address}', '${city}', '${country}', ${age})
            ;`;
            const dbResponse = await db.run(createUserQuery);
            response.send("User created successfully");
        }
    } else {
        response.status(400);
        response.send("User already exists");
    }
});

//LOGIN API

app.post("/login/", async (request, response) => {
    const { username, password } = request.body;
    const selectUserQuery = `SELECT * FROM User WHERE username='${username}';`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
        response.status(400);
        response.send("Invalid Username");
    } else {
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        if (isPasswordMatched) {
            const payload = { username: username };
            const jwtToken = jwt.sign(payload, "MY_SECRET");
            response.send({ jwtToken });
        } else {
            response.status(400);
            response.send("Invalid password");
        }
    }

});

//GET POSTS API

app.get("/posts/", authenticateToken, async (request, response) => {
    const {
        offset = 0,
        limit = 5,
        order = "ASC",
        order_by = "post_id",
        keyword = "",
        tag = "",
    } = request.query;
    const getPostQuery = `
    SELECT * 
    FROM Posts 
    WHERE (title LIKE '%${keyword}%' OR desc LIKE '%${keyword}%') AND tag LIKE '%${tag}%' 
    ORDER BY ${order_by} ${order}
    LIMIT ${limit} OFFSET ${offset}
    ;`;
    const postsArray = await db.all(getPostQuery);
    response.send(postsArray);
});

//ADD POST API

app.post("/posts/", authenticateToken, async (request, response) => {
    const postDetails = request.body;
    const { post_id, title, desc, tag, image } = postDetails;
    const addPostQuery = `
    INSERT INTO
        Posts(post_id, title, desc, tag, image)
    VALUES(
        ${post_id}, '${title}', '${desc}', '${tag}', '${image}'
    )
    ;`;
    const dbResponse = await db.run(addPostQuery);
    const postId = dbResponse.lastID;
    response.send(postId + " Post added Successfully");
});

