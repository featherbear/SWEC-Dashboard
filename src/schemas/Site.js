import mongoose from 'mongoose'

export const Schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  location: String
})

export const Model = mongoose.model('Site', Schema)

export default {
  Schema,
  Model
}
