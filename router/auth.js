const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
require('../db/conn')
const User = require('../model/userSchema')

router.get('/users',(req,res) =>{
    // res.json(USERS)
    res.send(`Hi from auth/user`)
  })


//-----------------------------------------SIGNUP--------------------------------
router.get('/signup', function(req,res){
    // res.render("signup1")
    res.render('signup1')
});
router.post('/signup', async(req, res) => {
    // const { username, email, password, role  } = req.body;
    username = req.body.username
    email = req.body.email
    password = req.body.password
    role = req.body.role

    try{
        const userExists = await User.findOne({ $or: [{ email: email }, { username: username }] })
        // console.log(userExists)
        if(userExists)
        {
            if (userExists.email === email) {
                return res.status(401).redirect('/signup?duplicateEmail=true');
            } else if (userExists.username === username) {
                return res.status(401).redirect('/signup?duplicateUserName=true');
            }
        }
        
        const user = new User({username,email,password,role})
        //hashing (authjs)
        await user.save()
        res.status(201).redirect('/login') //201 denotes that user is created successfully
    }catch(err){
        console.log(err)
    }

})



//-----------------------------------------LOGIN--------------------------------
router.get('/login', function(req, res){
    res.render('login1');
});
router.post('/login', async(req, res) => {

    const email1 = req.body.email
    const password1 = req.body.password
    try{
        const userLogin = await User.findOne({email:email1})
        if(userLogin){
            const isMatch = await bcrypt.compare(password1,userLogin.password)
            if(isMatch){
                res.status(201).send({message: `Welcome ${userLogin.username}`})
            }else{
                res.status(401).redirect('/login?wrongpass=true');
            }
        }else{
                res.status(401).redirect('/login?userExists=false');
            }
            
    }catch(err){
        console.log(err)
    }

})


module.exports = router