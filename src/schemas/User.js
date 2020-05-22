import mongoose from 'mongoose'
import mongoose_bcrypt from 'mongoose-bcrypt'

let User = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  isLocal: {type: Boolean, default: false},
  password: {type: String, bcrypt: true},
  admin: { type: Boolean, default: false }
})
User.plugin(mongoose_bcrypt)

export default User