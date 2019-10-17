const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const session = require('express-session')
const reactViews = require('express-react-views')
const {check,validationResult}= require('express-validator')
//connect database cloud mongodb atlas
connectDB()

var app = express()
app.use(express.json({extend:false}))


app.use(express.static(path.join(__dirname,'client/public')))


// bodyparser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())
// express session middleware
app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie:{secure:true}
}))




//set routes

app.use('/admin/pages',require('./routes/admin_pages'))
app.use('/pages',require('./routes/pages'))





//start the server 
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log('App listening on port 5001!');
});