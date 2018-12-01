const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')
const Moment = require('moment')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')

    if (purchaseAd.purchaseBy) {
      return res.json('Ad solded!')
    }

    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      content,
      buyer: req.userId,
      ad
    })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }

  async sold (req, res) {
    const purchase = await Purchase.findOneAndUpdate(req.params.id, {
      sold_at: new Moment()
    })

    const ad = await Ad.findOneAndUpdate(purchase.ad, {
      purchaseBy: purchase.id
    })
    return res.json(ad)
  }
}

module.exports = new PurchaseController()
