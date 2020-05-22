import mongoose from 'mongoose'

export const Schema = new mongoose.Schema({
  title: String,
  description: String,
  dates: [Date],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  active: Boolean
})

export const Model = mongoose.model('Notice', Schema)

export default {
  Schema,
  Model
}
