require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
      session = require('./cartController'),
      authCtrl = require('./authController'),
      cartCtrl = require('./cartController'),
      app = express();
    
app.use(express.json());

app.use(session({
    resave: false,
    saveUninitalized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.get('/api/products', cartCtrl.getProducts);

const port = SERVER_PORT || 4040;
app.listen(port, () => console.log(`Memeing on ${port}`));