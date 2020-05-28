import mongoose from 'mongoose'

export const Schema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  custom: { type: Map, of: String },
})

export const Model = mongoose.model('Site', Schema)

export default {
  Schema,
  Model
}
