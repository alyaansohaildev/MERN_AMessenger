const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const PORT = 5000;

const {HandleLogin,HandleSession} = require('./chat_login_handler')

app.use(cors({
  origin: 'http://localhost:3000', // or your frontend domain
  credentials: true,
})); 
app.use(express.json());
app.use(session({
  secret: 'alyaanrubyrails1#2g',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

const { MongoClient } = require('mongodb');
const MONGO_URI = 'mongodb://localhost:27017'; // Update if needed
const DB_NAME = 'ChatByAlyaanSoh';

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});

app.get('/api/myprojects', (req, res) => {
  res.json(
    { 
        message:
        [
            {
                id:1,
                name: "Chatting System",
                link: "/AMessenger"
            }
            ,
            {
                id:2,
                name: "Commerce System",
                link: "/ACommerce"
            }
        ] 
    }
    );
});




app.post('/api/chat_login',(req,res) => {

    const loginEmail = req.body['loginEmail'];
    const loginPass = req.body['loginPass'];

    const responseHandleLogin = HandleLogin(loginEmail,loginPass);
    console.log("recieved a req")
    res.json(
        {
            message: "done"
        }
    )

});


app.get('/api/login_check', (req,res) => {

    if (!req.session || !req.session.userId) {
        return res.status(401).json({ loggedIn: false });
    }else{
        return res.status(200).json({loggedIn: true});
    }

});

app.post('/api/signup', async (req,res) => {

    rec_email = req.body['email'];
    rec_pass = req.body['password'];
    rec_username = req.body['username'];

    if (!rec_email || !rec_pass || !rec_username) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try{
        const existingUser = await db.collection('users').findOne({
            $or: [
                { email: rec_email },
                { username: rec_username },
            ]
        });

        if (existingUser) {
            if (existingUser.email === rec_email) {
                return res.status(409).json({ message: 'Email already exists.' });
            }
            if (existingUser.username === rec_username) {
                return res.status(409).json({ message: 'Username already exists.' });
            }
            
        }

        await db.collection('users').insertOne({
                email: rec_email,
                password: rec_pass,
                username: rec_username
        });
        res.status(201).json({ message: 'Signup successful.' });

    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
    


})
app.post('/api/login_with_params', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required.' });
    }

    try {
        const user = await db.collection('users').findOne({email});
        if( !user || user.password !== password) {
            return res.status(401).json({ message: 'Icorrect PAss' });
        }
        if (user) {
            req.session.userId = user._id;
            res.json({ message: 'Login successful', loggedIn: true });
        } else {
            res.status(401).json({ message: 'Invalid credentials', loggedIn: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

