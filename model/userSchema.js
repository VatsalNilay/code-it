const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    role:{
        type:String,
        required: ['admin', 'user']
    },
    password:{
        type:String,
        required: true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


//below method is called whenever .save method is called
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){ //only execute when password is changed, .save may be called for other cases also
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this.id}, process.env.ACCESS_TOKEN_SECRET)
        console.log(token);
        this.tokens =  this.tokens.concat({token: token})
        await this.save() //save the changes
        return token
    }catch(err){
        console.log(`this error is from genauthtoken: ${err}`);
    }
}


const User = mongoose.model('USER', userSchema)
module.exports = User
