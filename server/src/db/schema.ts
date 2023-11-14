import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
      firstName:{type:String, require:true},
      lastName:{type:String, require:true},
      dateOfBirth:{type:String, require:true},
      gender:{type:String, require:true}
})

export const User = mongoose.model('user',UserSchema)