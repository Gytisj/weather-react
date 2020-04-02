const router = require('express').Router()
const userController = require('../user/userController.js')
const middleware = require('../middleware/middleware.js')
const favoritesController = require('../favorites/favoritesController')

router.get('/', (req, res) => {
  res.json('Api is working')
})

//user routes
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.get('/user/logout', middleware.authenticate, userController.logout)
router.get(
  '/user/getSingleUser',
  middleware.authenticate,
  userController.getSingleUserById
)

//favorite cities routes
router.patch(
  '/favorites/addCity',
  middleware.authenticate,
  favoritesController.addCity
)
router.patch(
  '/favorites/removeCity',
  middleware.authenticate,
  favoritesController.removeCity
)
router.get(
  '/favorites/getAllCities',
  middleware.authenticate,
  favoritesController.getCities
)

module.exports = router
