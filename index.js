require('dotenv').config()
require('./db/conn.js')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const port = 3001
const bodyParser = require('body-parser');



app.set('view engine', 'ejs');

//Middlewares
app.use(express.json()) //accept data in json format
app.use(express.urlencoded({extended: true}))  //decode the data sent through the form
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(require('./router/auth.js'))





//Sasta database
const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]},
    {
      title: "Mango Lover",
      description: "After eating 5 mangoes, how many mangoes are left, if there were X mangoes earlier?",
      testCases:[{
          input: "20",
          output: 15
      }]}
  ];


const SUBMISSION = [

]




//Routes
// app.get('/users',(req,res) =>{
//   res.json(USERS)
// })

// //-----------------------------------------SIGNUP--------------------------------
// app.get('/signup', function(req,res){
//     // res.render("signup1")
//     res.render('signup1')
// });
// app.post('/signup', function(req, res) {
//     // const { email, password } = req.body;
//     const email = req.body.email
//     const password = req.body.password


//     // Check if user already exists
//     const userExists = USERS.find(user => user.email === email);
  
//     if (userExists) {
//       return res.status(401).redirect('/signup?userExists=true');
//     }
  
//     // Store email and password (as is for now) in the USERS array
//     USERS.push({ "email" : email, "password": password, "role" : req.body.role });
  
    
//     res.status(200).redirect('/login');
//     // res.status(201).send()
//   });


//-----------------------------------------LOGIN--------------------------------
app.get('/login', function(req, res){
    res.render('login1');
});
app.post('/login', function(req, res) {
  // Add logic to decode body
  const email1 = req.body.email
  const password1 = req.body.password

  // Check if the user with the given email exists in the USERS array
  const userExists1 = USERS.find(user => user.email === email1)
 
  if(!userExists1)
    res.status(401).redirect('/login?userExists=false');
  else if(userExists1.password === password1)
  {
    const accessToken = jwt.sign( email1 , process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({userRole: userExists1.role,accessToken: accessToken});
  }
  else
    res.status(401).redirect('/login?wrongpass=true');   

})




//-----------------------------------------QUESTIONS--------------------------------

app.get('/questions', authenticated, function(req, res) {
  res.render('ques1', { questions: QUESTIONS });
});

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
});



//-----------------------------------------SUBMISSIONS--------------------------------

app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
   
  res.send("Hello World from route 4!")
});




//------------------------------MIDDLEWARE FUNCTION---------------------------
function authenticated(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(token == null) return res.send("You need to Login first...")

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email1) => {
    if(err) return res.sendStatus(403)
    req.email = email1
    next()
  })
}


app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})