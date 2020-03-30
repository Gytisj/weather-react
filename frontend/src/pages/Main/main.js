import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap'
import { Flex } from '../../components/shared/Flex/Flex'
import { getCitiesWeatherData } from '../../redux/actions/actions'
import { random } from 'faker'
import c from './main.module.css'

export const Main = () => {
  const [regionState, setRegionState] = useState('')
  const [regionCapitalState, setRegionCapitalState] = useState([])

  useEffect(() => {
    setRegionCapitalState([])
  }, [regionState])

  const inputChangeHandler = event => {
    setRegionState({
      ...regionState,
      region: event.target.value
    })
  }

  const formSubmitHandler = async event => {
    event.preventDefault()
    const regionData = await fetch(
      `https://restcountries.eu/rest/v2/region/${regionState.region}`
    )
    if (regionData.status === 200) {
      const newRegionData = await regionData.json()
      const resultNotChecked = await getCapitalsData(newRegionData)
      const result = resultNotChecked.filter(city => {
        if (city.cod === '404') {
          return null
        }
        if (city.cod === '400') {
          return null
        } else {
          return city
        }
      })
      result.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
      setRegionCapitalState(...regionCapitalState, result)
    } else {
      alert(
        'please enter a valid region etc. Europe, Asia, Africa, Oceania or Americas'
      )
    }
  }

  const getCapitalsData = newRegionData => {
    const citiesData = newRegionData.map(city => {
      return city.capital
    })
    return getCitiesWeatherData(citiesData)
  }

  return (
    <>
      <Flex justify='center' align='center'>
        <form>
          <input type='text' onChange={inputChangeHandler}></input>
          <Button type='submit' color='secondary' onClick={formSubmitHandler}>
            Search Region
          </Button>
        </form>
      </Flex>
      <Flex justify='space-around' wrap='wrap'>
        {regionCapitalState.map(city => {
          return (
            <div className={c.card} key={random.uuid()}>
              <Flex>
                <img
                  className={c.image}
                  src={
                    'http://openweathermap.org/img/w/' +
                    city.weather[0].icon +
                    '.png'
                  }
                  alt=''
                />
                <img
                  className={c.image}
                  src={
                    'http://openweathermap.org/img/w/' +
                    city.weather[0].icon +
                    '.png'
                  }
                  alt=''
                />
                <img
                  className={c.image}
                  src={
                    'http://openweathermap.org/img/w/' +
                    city.weather[0].icon +
                    '.png'
                  }
                  alt=''
                />
              </Flex>
              <h2>{city.name}</h2>
              <p>
                Temperature is: {Math.round(city.main.temp)}°C <br /> Feels
                Like: {Math.round(city.main.feels_like)}°C
              </p>
              <p>Description: {city.weather[0].description}</p>
              <Button color='primary'>Add To Favorites!</Button>
            </div>
          )
        })}
      </Flex>
    </>
  )
}
