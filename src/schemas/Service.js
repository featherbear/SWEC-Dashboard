import mongoose from 'mongoose'

export const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
  data: { type: Map, of: String },
})

export const Model = mongoose.model('Service', Schema)

export default {
  Schema,
  Model
}
