const mongoose = require('mongoose')
require('mongoose-moment')(mongoose)
const mongoosePaginate = require('mongoose-paginate')

const PurchaseSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  sold_at: 'Moment'
})

PurchaseSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Purchase', PurchaseSchema)
