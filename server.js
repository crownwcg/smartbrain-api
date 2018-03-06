const express    = require('express');
const bodyParser = require('body-parser');
const bcrypt     = require('bcrypt-nodejs');
const cors       = require('cors');
const db         = require('knex') ({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'Crown',
        password: '',
        database: 'smartbrain'
    }
})

const register = require('./controllers/register');
const signin   = require('./controllers/signin');
const profile  = require('./controllers/profile');
const image    = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send(database.users)})

/**
 * -->res = this is working
 * /signin --> POST = success/fail
 * /register --> POST = user
 * /profiel/:userId --> GET = user
 * /image --> PUT --> user
 */
app.post('/signin',     (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register',   (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get ('/profile/:id',(req, res) => {profile.handleProfile(req, res, db)})
app.put ('/image',      (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl',   (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, () => {console.log('success running')});
