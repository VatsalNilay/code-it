const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]




//Middlewares
app.use(express.json()) //accept data in json format
app.use(express.urlencoded())  //decode the data sent through the form


//Routes
// app.get('/', function(req,res){
//     res.redirect('/signup')
// });
app.get('/signup', function(req,res){
    // res.render("signup1")
    res.sendFile(__dirname + '/public/signup1.html');
});
app.post('/signup', function(req, res) {
    // Add logic to decode body
    // const { email, password } = req.body;
    const email = req.body.email
    const password = req.body.password
    // console.log(req.body)

    // Check if user already exists
    const userExists = USERS.find(user => user.email === email);
  
    if (userExists) {
      return res.status(401).redirect('/signup?userExists=true');
    }
  
    // Store email and password (as is for now) in the USERS array
    USERS.push({ email, password });
  
    // Return success response with HTTP 200 status code
    res.status(200).redirect('/login');
  });
  


app.get('/login', function(req, res){
    res.sendFile(__dirname + '/public/login1.html')
});
app.post('/login', function(req, res) {
  // Add logic to decode body
  const email1 = req.body.email
  const password1 = req.body.password

  // Check if the user with the given email exists in the USERS array
  const userExists1 = USERS.find(user => user.email === email1)
 
  // Also ensure that the password is the same
  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  if(!userExists1)
    res.status(401).redirect('/login?userExists=false');
  else if(userExists1.password === password1)
  {
    const token = 'This is your token';
    res.status(200).json({token});
  }
  else
    res.status(401).redirect('/login?wrongpass=true');   

})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.



app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})