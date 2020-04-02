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
