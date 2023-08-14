const read = require("./SqlFunctions/Read.js");
const create = require("./SqlFunctions/Create.js");
const deleteRow = require("./SqlFunctions/Delete.js");
const update = require("./SqlFunctions/Update.js");
const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
dotenv.config();
const upload = multer();

var mysql = require("mysql");
const e = require("express");
const { connect } = require("http2");

const connection = mysql.createConnection({
  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.Database,
});

// Needs the .bind so that the this keyword always refers to the connection variable, as if it were called as connection.query
// There's a chance that query refers to this, and in that case, calling promiseQuery without a bind would result in this being undefined
const promiseQuery = promisify(connection.query).bind(connection);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../frontend")));
app.use(express.json());

//Home functions
app.get("/api/home", async (req, res) => {
  await read(req, res, "SELECT * FROM homepage");
});

app.get("/api/home/:id", async (req, res) => {
  const { id } = req.params;

  await read(req, res, "SELECT * FROM homepage WHERE id = ?", id);
});

app.post("api/home", async (req, res) => {
  await create(req, res, "INSERT INTO homepage set ?");
});

app.delete("/api/home/:id", async (req, res) => {
  const { id } = req.params;
  await deleteRow(req, res, "DELETE FROM homepage WHERE id = ?", id);
});

// Blog Functions!
app.get("/blogs", async (req, res) => {
  await read(req, res, "SELECT * FROM blogs");
});

app.get("/blogs/:BlogId", async (req, res) => {
  const { BlogId } = req.params;
  await read(
    req,
    res,
    "SELECT * FROM blogs LEFT JOIN comments ON blogs.BlogId = comments.BlogId WHERE blogs.BlogId = ?",
    BlogId
  );
});

app.post("/blogs", async (req, res) => {
  await create(req, res, "INSERT INTO blogs SET ?");
});

app.delete("/blogs/:BlogId", async (req, res) => {
  const { BlogId } = req.params;
  await deleteRow(req, res, "DELETE FROM blogs WHERE BlogId = ?", BlogId);
});

app.put("/blogs/:BlogId", async (req, res) => {
  const { BlogId } = req.params;
  const Title = req.body.title;
  const Body = req.body.body;
  const Author = req.body.author;
  await update(
    req,
    res,
    "UPDATE blogs SET Title = ?, Body = ?, Author = ? WHERE BlogId = ?",
    BlogId,
    Title,
    Body,
    Author
  );
});

//login functions!!
console.log("hello");
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Received email:", email);
  console.log("Received password:", password);

  const connection = mysql.createConnection({
    host: process.env.Host,
    user: process.env.User,
    password: process.env.Password,
    database: process.env.Database,
  });
  //finds user w this email in db
  connection.query(
    "SELECT * FROM login_app WHERE email = ?",
    [email],
    (err, result) => {
      //if err in query, status code & err message returned
      if (err) {
        console.error("Database error:", err);
        res.status(500).send({ err: err });
      } else {
        //otherwise, checks result length, makes sure theres one matching user. then retrieves stored HASHED pwd. uses compare to make sure theyre the same
        if (result.length === 1) {
          const storedHashedPassword = result[0].password;
          bcrypt.compare(
            password,
            storedHashedPassword,
            (bcryptErr, bcryptResult) => {
              if (bcryptErr || !bcryptResult) {
                res.send({ message: "Wrong email/password." });
              } else {
                res.send({ message: "Login successful." });
              }
              connection.end();
            }
          );
        } else {
          res.send({ message: "Wrong email/password." });
          connection.end();
        }
      }
    }
  );
});

//registration functions!

app.post("/Profile", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //hashes the password, 10 salt rounds
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    //if there's an error, its console logged
    if (hashErr) {
      console.error(hashErr);
      //error status code
      res.status(500).json({ message: "Error hashing password." });
    } else {
      //store pwd and em in db
      db.query(
        "INSERT INTO login_app (email, password) VALUES (?,?)",
        [email, hashedPassword],
        (dbErr, dbResult) => {
          //db errors
          if (dbErr) {
            console.error(dbErr);
            res.status(500).json({ message: "Error storing user data." });
          } else {
            //yay!! success code
            res.status(201).json({ message: "Registration successful." });
          }
        }
      );
    }
  });
});

// Comment Function
app.get("/comments", async (req, res) => {
  await read(req, res, "SELECT * FROM comments");
});

app.get("/comments/:BlogId", async (req, res) => {
  const { BlogId } = req.params;
  await read(
    req,
    res,
    "SELECT * FROM comments WHERE comments.BlogId = ?",
    BlogId
  );
});

app.post("/comments", async (req, res) => {
  await create(req, res, "INSERT INTO comments SET ?");
});

app.delete("/comments/:CommentId", async (req, res) => {
  const { CommentId } = req.params;
  await deleteRow(
    req,
    res,
    "DELETE FROM comments WHERE CommentId = ?",
    CommentId
  );
});

app.put("/comments/:CommentId", async (req, res) => {
  const { CommentId } = req.params;
  const Body = req.body.Comment_Body;
  const Author = req.body.Comment_Author;
  await update(
    req,
    res,
    "UPDATE comments SET Comment_Body = ?, Comment_Author = ? WHERE CommentId = ?",
    CommentId,
    Body,
    Author
  );
});

const contentTypes = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  bmp: "image/bmp",
  heic: "image/heic",
  webp: "image/webp",
};

app.post("/images", upload.single("image"), async (req, res, next) => {
  const extension = req.file?.originalname?.split(".").pop();
  if (!req.file?.buffer) {
    res.status(400);
    return next("No file provided");
  } else if (!contentTypes[extension]) {
    res.status(400);
    return next("File type not allowed");
  }
  const image = {
    BlogId: req.body.BlogId,
    content_type: contentTypes[extension],
    Image_Data: req.file.buffer,
  };

  connection.query(
    "INSERT INTO images SET ?",
    image,
    function (err, data, fields) {
      if (err) throw err;
      res.status(201).send();
    }
  );
});

app.get("/images/:BlogId", async (req, res, next) => {
  const image = await connection.query(
    "SELECT * FROM images WHERE BlogId = ?",
    req.params.BlogId,
    (err, data, fields) => {
      if (!data[0]) {
        res.status(404);
        return next("Not found");
      }
      res.setHeader("Content-Type", data[0].Content_Type);
      res.send(data[0].Image_Data);
    }
  );
});

app.put("/images/:BlogId", upload.single("image"), async (req, res, next) => {
  const extension = req.file?.originalname?.split(".").pop();
  if (!req.file?.buffer) {
    res.status(400);
    return next("No file provided");
  } else if (!contentTypes[extension]) {
    res.status(400);
    return next("File type not allowed");
  }
  const updatedImage = {
    BlogId: req.body.BlogId,
    content_type: contentTypes[extension],
    Image_Data: req.file.buffer,
  };

  await promiseQuery("DELETE FROM images WHERE BlogId = ?", [
    updatedImage.BlogId,
  ]);

  await promiseQuery("INSERT INTO images SET ?", [
    updatedImage
  ]);

  res.status(201).send();
});

app.delete("/images/:BlogId", async (req, res) => {
  const { BlogId } = req.params;
  await deleteRow(
    req,
    res,
    "DELETE FROM images WHERE BlogId = ?",
    BlogId
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
