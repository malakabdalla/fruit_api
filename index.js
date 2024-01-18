require('dotenv').config()
const cors = require('cors')
const express = require("express");
const app = express();
const port = process.env.PORT;
const fruits = require("./fruits.json");
const logger = require("./logger")

//our routes goes here

//middleware goes first
app.use(cors())
app.use(express.json());
app.use(logger)

app.get("/", (req, res) => {
  res.send("Welcome to the fruit API");
});

app.get("/fruits", (req, res) => {
  //return all fruits
  res.send(fruits);
});

app.get("/fruits/:name", (req, res) => {
  //return one fruit
  const name = req.params.name.toLowerCase();
  const ff = fruits.filter((f) => f.name.toLowerCase() == name); //for good practice and it will be easier and that will help if there is something somewhere case issues

  //res.send(ff[0]) good way but if the fruit does nto exists then it will not work therefore we use what is below
  //   if (ff.length === 0) {
  //     res.status(404).send("the Fruit does not exists");
  //   } else {
  //     res.send(ff[0]);
  //   }
  //we can have this instead of if statement
  //condition ? true : false
  //this has to be if only one line of code
  //makes code more concise and easier to read
  ff.length === 0
    ? res.status(404).send("the Fruit does not exists")
    : res.send(ff[0]);
});

app.post("/fruits", (req, res) => {
  //bad request

  if (!req.body || !req.body.name) {
    return res.status(400).send("fruit name is required");
  }

  try {
    const fruit = fruits.find(
      (f) => f.name.toLowerCase() == req.body.name.toLowerCase()
    );
    if (fruit != undefined) {
      return res.status(409).send("that fruit exists");
    }
    const ids = fruits.map((f) => f.id);
    let maxId = Math.max(...ids);

    req.body.id = maxId + 1;

    fruits.push(req.body);
    res.status(201).send("fruit Created");
  } catch (e) {
    console.error(e);
    res.status(500).send("An error has happened");
  }

  // const fruit = req.body
  //request . body is not defined middleware needs to be used

  //add fruit
  //check if you have similar fruit
});
//.find will try to find the first item in the Array that match if cant fin it it will return undefined

//   console.log(fruit);

// });

app.delete("/fruits/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const fruitIndex = fruits.findIndex(
    (fruit) => fruit.name.toLowerCase() === name
  );
  if (fruitIndex == -1) {
    res.status(404).send("no fruit by that name");
  } else {
    fruits.splice(fruitIndex, 1);
    res.sendStatus(204);
  }
});

app.patch("/fruits/:name", (req, res) => {
  const fruit = fruits.find(
    (fruit) => fruit.name.toLowerCase() == req.params.name.toLowerCase()
  );
  const newFruitName = req.body.name;

  if (fruit == undefined) {
    res.status(404).send("no fruit by that name");
  } else {
    fruit.name = newFruitName;
    res.status(200).send(fruit);
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
