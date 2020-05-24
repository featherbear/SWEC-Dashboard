import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  isLocal: { type: Boolean, required: true },
  password: { type: String, bcrypt: true, min: 15 },
  admin: Boolean,
  disabled: Boolean,
})
UserSchema.plugin(require('mongoose-bcrypt'))

export const Schema = UserSchema
export const Model = mongoose.model('User', Schema)
export default {
  Schema,
  Model
}
