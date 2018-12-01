const express = require('express')
const validate = require('express-validation')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

const handle = require('express-async-handler')

const authMiddlaware = require('./app/middlewares/auth')

const routes = express.Router()

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddlaware)

/*
 * Routes of Ads
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/*
 * Purchases
 */

routes.post(
  '/purchase',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

routes.put('/purchase/:id/sold', handle(controllers.PurchaseController.sold))

module.exports = routes
