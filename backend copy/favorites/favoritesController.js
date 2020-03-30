const UserModel = require('../user/userModel')

const addCity = async (req, res) => {
  const user = req.user
  const cityObj = req.body

  user
    .updateOne({
      $push: {
        favoriteWeather: { city: cityObj }
      }
    })
    .then(addedCity => {
      res.status(200).json(addedCity)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
}

const removeCity = async (req, res) => {
  const user = req.user
  const cityObj = req.body

  user
    .updateOne({
      $pull: {
        favoriteWeather: { city: cityObj }
      }
    })
    .then(removeCity => {
      res.status(200).json(removeCity)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
}

const getCities = async (req, res) => {
  console.log('lbas')
}

module.exports = { addCity, removeCity, getCities }
