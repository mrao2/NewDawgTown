const read = require("./SqlFunctions/Read.js");
const create = require("./SqlFunctions/Create.js");
const deleteRow = require("./SqlFunctions/Delete.js");
const update = require("./SqlFunctions/Update.js");
const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

// promisify is a node.js component in the latest editions useful when you have three inputs and the final one being a call back function. I use this later when using connection.query
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

try {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected to mysql server!");
  });
} catch (error) {
  console.error("error connecting to mysql:", error);
}

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../frontend")));
app.use(express.json());

//Home functions
app.get("/api/home", async (req, res) => {
  await read(req, res, "SELECT * FROM homepage");
});

app.delete("/api/breeds/:breedid", async (req, res, next) => {
  try {
    const { breedid } = req.params;
    await deleteRow(
      req,
      res,
      "DELETE FROM homepage WHERE breedid = ?",
      breedid
    );
  } catch (err) {
    next(err);
  }
});

app.post("/api/home", async (req, res, next) => {
  try {
    await create(req, res, "INSERT INTO homepage SET ?");
  } catch (err) {
    next(err);
  }
});

app.put("/api/breeds/:breedid", async (req, res, next) => {
  try {
    const { breedid } = req.params;
    const breed = req.body.breed;
    await update(
      req,
      res,
      "UPDATE homepage SET breed = ? WHERE breedid = ?",
      breedid,
      breed
    );
  } catch (err) {
    next(err);
  }
});

//appointment functions
app.post("/api/appointments", async (req, res) => {
  await create(req, res, "INSERT INTO appointments SET ?");
});
app.get("/api/appointments", async (req, res) => {
  await read(req, res, "SELECT * FROM appointments");
});
app.delete("/api/appointments/:appointment_id", async (req, res) => {
  const { appointment_id } = req.params;
  await deleteRow(
    req,
    res,
    "DELETE FROM appointments WHERE appointment_id = ?",
    appointment_id
  );
});
// app.get("/api/appointments/:appointment_id", async (req, res) => {
//   const { appointment_id } = req.params;
//   await read(req, res, 'SELECT * FROM appointments WHERE appointment_id = ?', appointment_id);});
//   app.put('/api/appointments/:appointment_id', async (req, res) => {
//   const { appointment_id } = req.params;
//   const description = req.body.description;
//   const email = req.body.email;
//   const end_date = req.body.end_date;
//   const end_time = req.body.end_time;
//   const first_name = req.body.first_name;
//   const id = req.body.id;
//   const is_confirmed = req.body.is_confirmed;
//   const is_consultation = req.body.is_consultation;
//   const is_rejected = req.body.is_rejected;
//   const last_name = req.body.last_name;
//   const start_date = req.body.start_date;
//   const start_time = req.body.start_time;
//   const username = req.body.username;
//   await update(req, res, 'UPDATE appointments SET description = ?, email = ?, end_date = ?, end_time = ?, first_name = ?, id = ?, is_confirmed = ?, is_consultation = ?, is_rejected = ?, last_name = ?, start_date = ?, start_date = ?, username = ? WHERE appointment_id = ?', appointment_id, description, email, end_date, end_time, first_name, id, is_confirmed, is_consultation, is_rejected, last_name, start_date, start_time, username)
// })

//end appointment functions

// Blog Functions!
app.get("/blogs", async (req, res, next) => {
  try {
    await read(req, res, "SELECT * FROM blogs");
  } catch (err) {
    next(err);
  }
});

app.get("/blogs/:BlogId", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
  const { BlogId } = req.params;
  await read(
    req,
    res,
    "SELECT * FROM blogs LEFT JOIN comments ON blogs.BlogId = comments.BlogId WHERE blogs.BlogId = ?",
    BlogId
  );
});

app.post("/blogs", async (req, res, next) => {
  try {
    await create(req, res, "INSERT INTO blogs SET ?");
  } catch (err) {
    next(err);
  }
});

app.delete("/blogs/:BlogId", async (req, res, next) => {
  try {
    const { BlogId } = req.params;
    await deleteRow(req, res, "DELETE FROM blogs WHERE BlogId = ?", BlogId);
  } catch (err) {
    next(err);
  }
});

app.put("/blogs/:BlogId", async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

//Sign up
app.post("/api/sign-up", async (req, res, next) => {
  //await create(req, res, "INSERT INTO login_app SET ?");
  connection.query(
    "INSERT INTO login_app SET ?",
    req.body,
    function (err, result, fields) {
      try {
        if (err) throw err;
        res.json({
          id: result.insertId,
        });
      } catch (err) {
        next(err);
      }
    }
  );
});

//Fetch profile
app.get("/api/profile/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await read(
      req,
      res,
      `SELECT 
    la.id,
    la.username,
    la.hashed_password as "hashedPassword",
    la.email,
    la.first_name as "firstName",
    la.last_name as "lastName",
    la.phone,
    up.id as "userProfileId",
    up.owner_address as "ownerAddress",
    up.owner_city as "ownerCity",
    up.owner_state as "ownerState",
    up.owner_zip as "ownerZip",
    up.dog_name as "dogName",
    up.dog_age as "dogAge",
    up.dog_breed as "dogBreed",
    up.dog_gender as "dogGender",
    up.dog_color as "dogColor",
    up.dog_birthdate as "dogBirthdate",
    up.dog_allergies as "dogAllergies",
    up.dog_weight as "dogWeight",
    up.dog_friendly as "dogFriendly",
    up.amt_meals as "amtMeals",
    up.amt_per_meal as "amtPerMeal",
    up.amt_walks as "amtWalks",
    up.dog_potty_trained as "dogPottyTrained",
    up.dog_fixed as "dogFixed"
    FROM login_app as la LEFT JOIN user_profile as up ON la.id = up.login_app_id WHERE la.id = ?;`,
      id
    );
  } catch (err) {
    next(err);
  }
});

//Save profile data
app.put("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  const username = req.body.username;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  await update(
    req,
    res,
    `INSERT INTO login_app (id, username, email, first_name, last_name, phone)
    VALUES (?, ?, ?, ?, ?, ?) AS new
    ON DUPLICATE KEY UPDATE
        username = new.username,
        email = new.email,
        first_name = new.first_name,
        last_name = new.last_name,
        phone = new.phone;`,
    phone,
    id,
    username,
    email,
    firstName,
    lastName
  );
});

app.put("/api/profile/:id", async (req, res) => {
  const { id } = req.params;
  const address = req.body.ownerAddress;
  const city = req.body.ownerCity;
  const state = req.body.ownerState;
  const zip = req.body.ownerZip;
  const dogName = req.body.dogName;
  const dogAge = req.body.dogAge;
  const dogBreed = req.body.dogBreed;
  const dogGender = req.body.dogGender;
  const dogColor = req.body.dogColor;
  const dogBirthday = req.body.dogBirthday;
  const dogAllergies = req.body.dogAllergies;
  const dogWeight = req.body.dogWeight;
  const dogFriendly = req.body.dogFriendly;
  const amtMeals = req.body.amtMeals;
  const amtWalks = req.body.amtWalks;
  const amtPerMeal = req.body.amtPerMeal;
  const dogPottyTrained = req.body.dogPottyTrained;
  const dogFixed = req.body.dogFixed;
  await update(
    req,
    res,
    `INSERT INTO user_profile (login_app_id, owner_address, owner_city, owner_state, owner_zip, dog_name, dog_age, dog_breed, 
    dog_gender, dog_color, dog_birthdate, dog_allergies, dog_weight, dog_friendly, amt_walks, amt_meals, amt_per_meal, dog_potty_trained, dog_fixed)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS new
  ON DUPLICATE KEY UPDATE
      owner_address = new.owner_address,
      owner_city = new.owner_city,
      owner_state = new.owner_state,
      owner_zip = new.owner_zip,
      dog_name = new.dog_name,
      dog_age = new.dog_age,
      dog_breed = new.dog_breed,
      dog_gender = new.dog_gender,
      dog_color =  new.dog_color,
      dog_birthdate = new.dog_birthdate,
      dog_allergies = new.dog_allergies,
      dog_weight = new.dog_weight,
      dog_friendly = new.dog_friendly,
      amt_meals = new.amt_meals,
      amt_per_meal = new.amt_per_meal,
      amt_walks = new.amt_walks,
      dog_potty_trained = new.dog_potty_trained,
      dog_fixed = new.dog_fixed;`,
    dogFixed,
    id,
    address,
    city,
    state,
    zip,
    dogName,
    dogAge,
    dogBreed,
    dogGender,
    dogColor,
    dogBirthday,
    dogAllergies,
    dogWeight,
    dogFriendly,
    amtWalks,
    amtMeals,
    amtPerMeal,
    dogPottyTrained
  );
});

//login functions!!
// console.log("hello");
const testPassword = "hashed_password";
const hashedPassword = bcrypt.hashSync(testPassword, 10);

// console.log(hashedPassword);
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.hashed_password;
  console.log("Received email:", email);
  console.log("Received password:", password);

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
          const storedHashedPassword = result[0].hashed_password;
          bcrypt.compare(
            password,
            storedHashedPassword,
            (bcryptErr, bcryptResult) => {
              console.log("Stored hashed password:", storedHashedPassword);
              console.log("Bcrypt result:", bcryptResult);
              if (bcryptErr || !bcryptResult) {
                res.send({ message: "Wrong email/password." });
              } else {
                res.send({ message: "Login successful." });
              }
              // connection.end();
            }
          );
        } else {
          res.send({ message: "Wrong email/password." });
          // connection.end();
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
app.get("/comments", async (req, res, next) => {
  try {
    await read(req, res, "SELECT * FROM comments");
  } catch (err) {
    next(err);
  }
});

app.get("/comments/:BlogId", async (req, res, next) => {
  try {
    const { BlogId } = req.params;
    await read(
      req,
      res,
      "SELECT * FROM comments WHERE comments.BlogId = ?",
      BlogId
    );
  } catch (err) {
    next(err);
  }
});

app.post("/comments", async (req, res, next) => {
  try {
    await create(req, res, "INSERT INTO comments SET ?");
  } catch (err) {
    next(err);
  }
});

app.delete("/comments/:CommentId", async (req, res, next) => {
  try {
    const { CommentId } = req.params;
    await deleteRow(
      req,
      res,
      "DELETE FROM comments WHERE CommentId = ?",
      CommentId
    );
  } catch (err) {
    next(err);
  }
});

app.put("/comments/:CommentId", async (req, res, next) => {
  try {
    const { CommentId } = req.params;
    const Body = req.body.Comment_Body;
    const Author = req.body.Comment_Author;
    const submittedDate = new Date(req.body.Comment_Date);
    const formattedDate = submittedDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // Convert to 'YYYY-MM-DD HH:MM:SS'
    await update(
      req,
      res,
      "UPDATE comments SET Comment_Body = ?, Comment_Author = ?, Comment_Date = ? WHERE CommentId = ?",
      CommentId,
      Body,
      Author,
      formattedDate
    );
  } catch (err) {
    next(err);
  }
});

// What types of images will be accepted
const contentTypes = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  bmp: "image/bmp",
  heic: "image/heic",
  webp: "image/webp",
};

// Image CRUD api end points

// Create Image

// I had to use Multer to be able to parse an image into a BLOB type of data into the Sql table, thats why you are seeing upload.singl("image")
app.post("/images", upload.single("image"), async (req, res, next) => {
  try {
    // to get the image type i needed to go into the req and find if there is a file type, then if there is, if there is an original name (what the file is named),
    // it will then split the name into an array and pop the final part of the array which should be just the type of file aka(png,img,jpeg)
    const extension = req.file?.originalname?.split(".").pop();

    // a boolean to check if the req.file.buffer (which would be they bytes of data parsed by multer) is truthy
    if (!req.file?.buffer) {
      // if empty/false return an error
      res.status(400);
      return next("No file provided");
    }
    // if there is a file loaded, it will check if the extension of the file is one that is allowed other wise it will throw an error
    else if (!contentTypes[extension]) {
      res.status(400);
      return next("File type not allowed");
    }

    // at this point I am ready to assign the variables into an object that i will then send to the Sql table
    const image = {
      BlogId: req.body.BlogId,
      content_type: contentTypes[extension],
      Image_Data: req.file.buffer,
    };

    // this is the final product of sending the data to the Sql table, res.status 201 is to say that the data was succesfully added
    connection.query(
      "INSERT INTO images SET ?",
      image,
      function (err, data, fields) {
        if (err) throw err;
        res.status(201).send();
      }
    );
  } catch (err) {
    next(err);
  }
});

// Read Image
app.get("/images/:BlogId", async (req, res, next) => {
  try {
    await connection.query(
      "SELECT * FROM images WHERE BlogId = ?",
      req.params.BlogId,
      // checking if the data exists for the blog id given, otherwise error
      (err, data, fields) => {
        if (!data[0]) {
          res.status(404);
          return next("Not found");
        }
        // at this point, I need to set the Content-Type so that the front end knows how to display the bytes coming from Sql, aka (jpeg,img,png)
        res.setHeader("Content-Type", data[0].Content_Type);
        // once the header is set, i then send the image data
        res.send(data[0].Image_Data);
      }
    );
  } catch (err) {
    next(err);
  }
});

// Update Image
// I had to use Multer to be able to parse an image into a BLOB type of data into the Sql table, thats why you are seeing upload.single("image")
app.put("/images/:BlogId", upload.single("image"), async (req, res, next) => {
  try {
    // to get the image type i needed to go into the req and find if there is a file type, then if there is, if there is an original name (what the file is named),
    // it will then split the name into an array and pop the final part of the array which should be just the type of file aka(png,img,jpeg)
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

    // I needed to break my PUT request into a promise for deleting the image first in case a blog does not currently have an image assigned to it
    await promiseQuery("DELETE FROM images WHERE BlogId = ?", [
      updatedImage.BlogId,
    ]);

    // then I insert into the table
    await promiseQuery("INSERT INTO images SET ?", [updatedImage]);
    // Send a response of status 201 to know that it was added to the table
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

app.delete("/images/:BlogId", async (req, res, next) => {
  try {
    const { BlogId } = req.params;
    await deleteRow(req, res, "DELETE FROM images WHERE BlogId = ?", BlogId);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
