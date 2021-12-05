const express = require('express');
const path = require('path');
const controller = require("./controller"); 
const http = require('http');

// database
const cors = require('cors');
const db = require('./db/db_config');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


const app = express();


app.set('port', 3000);

const server = http.createServer(app);


server.listen(3000);

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Goodwill Donation Service' });
});

app.post(
  '/api/users/', 
  async (req, res) => {
      let username = req.body.username;
      let password = req.body.password;
      const user = await controller.addUserWithCredentials(username, password);
      let status = 200; // status code for ok
      if (typeof user == "string") {
          status = 500; // status code for internal server error

      }
      res.status(status).json(user).end();
});

app.get('/api/users/:username?/:password?', 
  async (req, res) => {
      let username = req.params.username;
      let password = req.params.password;
      const user = await controller.getUserWithCredentials(username, password);
      let status = 200; // status code for ok
      if (typeof user == "string") {
        status = 500; // status code for internal server error
      }
      res.status(status).json(user).end();
});

app.get('/api/clothing/', [], async (req, res) => {
    const clothing = await controller.getAllClothingItems();
    let status = 200; // status code for ok
    if (typeof clothing == "string") {
      status = 500; // status code for internal server error
    }
    res.status(status).json(clothing).end(); 
})

app.delete('/api/clothing/:id?', [], async (req, res) => {
    const deleted = await controller.deleteClothingItem(req.params.id);
    let status = 200;
    if (typeof deleted == "string") {
      status = 500; // status code for internal server error
    }
    res.status(status).json(deleted).end();
})

app.get('/api/clothing/donated/:username?', [], async (req, res) => {
  let username = req.params.username;
  const clothing = await controller.getUserDonatedClothingItems(username);
  let status = 200; // status code for ok
  if (typeof clothing == "string") {
      status = 500; // status code for internal server error
  }
  res.status(status).json(clothing).end(); 
})

app.get('/api/clothing/pending/:username?', [], async (req, res) => {
    let username = req.params.username;
    const clothing = await controller.getUserPendingClothingItems(username);
    let status = 200; // status code for ok
    if (typeof clothing == "string") {
        status = 500; // status code for internal server error
    }
    res.status(status).json(clothing).end(); 
  })

app.get('/api/clothing/pickedup/:username?', [], async (req, res) => {
    let username = req.params.username;
    const clothing = await controller.getUserPickedUpClothingItems(username);
    let status = 200; // status code for ok
    if (typeof clothing == "string") {
        status = 500; // status code for internal server error
    }
    res.status(status).json(clothing).end(); 
  })

app.post('/api/clothing/', [], async (req, res) => {
  let clothing_type = req.body.clothing_type;
  let condition = req.body.condition;
  let size = req.body.size;
  let brand = req.body.brand;
  let image = req.body.image;
  let donator = req.body.donator;
  let title = req.body.title;
  const clothing_item = await controller.donateClothingItem(clothing_type, condition, size, brand, image, donator, title);
  let status = 200; // status code for ok
  if (typeof clothing_item == "string") {
      status = 500; // status code for internal server error
  }
  res.status(status).json(clothing_item).end(); 
})

module.exports = app;
