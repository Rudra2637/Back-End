import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Rudra_db",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;


function generateRandomId(max = 100000000) {
  return Math.floor(Math.random() * max);
}

let users = [];

async function getUsers(){
  const result = await db.query("SELECT * FROM users")
  users = result.rows
  return users
  // .find((user) => user.id == currentUserId)
}
let userId = 1

async function checkVisisted(userId) {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1",[userId]);
  // console.log(result)
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  // console.log("Countries visited : ",countries)
  return countries;
}


app.get("/", async (req, res) => {
  const countries = await checkVisisted(userId);
   
  await getUsers()
  
  console.log("Countries visited :",userId,countries)
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});


app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      const newId = generateRandomId(); 
      console.log(userId)
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2)",
        [countryCode,userId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/user", async (req, res) => {
  console.log(req.body)
  userId = req.body.user
  res.redirect("/")
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  
  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
