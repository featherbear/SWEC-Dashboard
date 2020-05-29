import mongoose from 'mongoose'

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: { select: ['firstName', 'lastName'] }
  },
  sites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      autopopulate: { select: ['title'] }
    }
  ],
  active: Boolean
})
NoticeSchema.plugin(require('mongoose-autopopulate'))

export const Schema = NoticeSchema
export const Model = mongoose.model('Notice', NoticeSchema)

export default {
  Schema,
  Model
}
