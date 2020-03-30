export const getCitiesWeatherData = async cities => {
  return Promise.all(
    cities.map(async cityName => {
      const result = await fetchCityDataByName(cityName)
      return result
    })
  ).then(result => {
    return result
  })
}

export const fetchCityDataByName = async cityName => {
  const url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=bbb8744884025e6b8e1d8c854b9f4566`
  )
  const data = await url.json()
  if (url.status === 200) {
    return data
  }
}

export const addCityForCurrentUser = async city => {
  let token = localStorage.getItem('x-auth')

  fetch(`http://localhost:4000/api/v1/favorites/addCity`, {
    method: 'PATCH',
    body: JSON.stringify(city),
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header)
      }
      return header.json()
    })
    .then(response => {
      console.log(response)
      alert('Event status updated!')
    })
    .catch(e => {
      console.log(e)
      alert('Event set failled!')
    })
}

export const getAllFavoriteCities = () => {
  let token = localStorage.getItem('x-auth')
  fetch(`http://localhost:4000/api/v1/favorites/getAllCities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth': token
    }
  })
    .then(header => {
      if (!header.ok) {
        throw Error(header)
      }
      return header.json()
    })
    .then(response => {
      console.log(response)
      alert('Event status updated!')
    })
    .catch(e => {
      console.log(e)
      alert('Event set failled!')
    })
}
