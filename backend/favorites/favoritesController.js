const User = require('../user/userModel')

const addCity = async (req, res) => {
  const user = req.user
  const cityObj = req.body

  let result = await checkForDuplicate(cityObj, user)

  if (result === 'OK') {
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
  } else {
    return res.json('City is already in your favorite List')
  }
}

const checkForDuplicate = (cityObj, user) => {
  let citiesArr = user.favoriteWeather.city
  let result = (citiesArr || []).find(city => city.name === cityObj.name)
  if (!result) {
    return 'OK'
  }
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
  const id = req.user._id

  try {
    let result = await User.findById(id)
    let loadedCities = await res
      .status(200)
      .json(result.favoriteWeather.city || [])
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = { addCity, removeCity, getCities }
