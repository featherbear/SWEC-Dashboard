import mongoose from 'mongoose'

export default new mongoose.Schema({
  title: String,
  description: String,
  dates: [Date]
})
