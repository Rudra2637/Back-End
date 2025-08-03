import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';


const db = new pg.Client({
  user:"postgres",
  host:"localhost",
  password:"Rudra_db",
  database:"world",
  port:5432
})

db.connect()

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


async function callDB() {
  const result  = await db.query("SELECT country_code FROM visited_countries")
  let countries = []
  result.rows.forEach((row) => {
    countries.push(row.country_code)
  })
  return countries
}

app.get("/", async (req, res) => {
  //Write your code here.
  try {
    const countries = await callDB()
    res.render("index.ejs",{countries:countries,total:countries.length})

  } catch (error) {
    console.error("Error in fetching the data ",error.stack);
    res.status(500).send("internal server error")
  }
});


app.post("/add",async(req,res) => {
  const response = req.body.country
  const checkExistence = await db.query('SELECT name from countries where name = $1',[response])
  try {
    console.log("Response ",response)
    if(checkExistence.rows.length === 0) {
      console.log("Reqrite the country name")
    }
    else {
      const result  = await db.query(`SELECT country_code FROM countries WHERE name = $1`,[response])
      const check = await db.query('SELECT country_code FROM visited_countries where country_code  = $1',[result.rows[0].country_code])

      if(check.rows.length !== 0)  console.log("Country already marked");
    
      else {
        const randomId = Math.floor(1000 + Math.random() * 9000);
        
        const code = await db.query('INSERT INTO visited_countries (id,country_code) VALUES ($1,$2)',[randomId,result.rows[0].country_code]);
      }
    }
    
    

    res.redirect("/")
    
  } catch (error) {
    console.error("Error in adding the country ",error.stack);
    res.status(500).send("internal server error")
  }
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
