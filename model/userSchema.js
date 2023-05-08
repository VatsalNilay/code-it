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
    }
})


//below method is called whenever .save method is called
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){ //only execute when password is changed, .save may be called for other cases also
        this.password = await bcrypt.hash(this.password,12)
    }
    next()
})



const User = mongoose.model('USER', userSchema)
module.exports = User
