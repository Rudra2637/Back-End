import express from "express";
import bodyParser from "body-parser";
import pg from 'pg'

const db = new pg.Client({
  database:'permalist',
  host:'localhost',
  user:'postgres',
  password:'Rudra_db',
  port:5432
})

db.connect()
let items = [];

async function fetchItems(){
  try {
    const res = await db.query('SELECT * FROM items');  
    console.log("Items fetched from database: ",res.rows)  
    res.rows.forEach((item) => {
      items.push(item)
    })
  } catch (error) {
    console.error("Error in fetching items : ",error.stack)
  }
}


async function addItem(item){
  try {
    const response = await db.query("INSERT INTO items (title) VALUES ($1)",[item])
    items.push({title:item})
  } catch (error) {
    console.error("Error in adding item: ",error.stack)
  }
}

async function updateItem(itemId,itemTitle){
  try {
    console.log(itemId,itemTitle)
    const response = await db.query("UPDATE items SET title  = $1 WHERE id = $2", [itemTitle,itemId])
    // items = []
    // fetchItems()
    items = items.map((item) => item.id === parseInt(itemId) ? {...item,title:itemTitle} : item)
    
  } catch (error) {
    console.error("Error in updating item: ",error.stack)
  }
}

fetchItems()

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
  
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  addItem(item)
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  // console.log("Edit response ",req.body)
  const itemId = req.body.updatedItemId
  const itemTitle = req.body.updatedItemTitle
  
  updateItem(itemId,itemTitle)
  res.redirect("/")
});

app.post("/delete", (req, res) => {
  console.log("Delete ",req.body)
  const itemId = req.body.deleteItemId

  try {
    const response = db.query("DELETE FROM items WHERE id = $1 ",[itemId])
    items = items.filter(item => item.id !== parseInt(itemId))
    res.redirect("/")
  } catch (error) {
    console.error("Error in deleteing item : ",error.stack)
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
