import React, { useState, useEffect } from 'react'
import { Flex } from '../shared/Flex/Flex'
import { random } from 'faker'
import c from './card.module.css'
import { useSelector } from 'react-redux'
import { getLoadedCities } from '../../redux/selectors'
import { Button } from 'reactstrap'
import { useDispatch } from 'react-redux'

import {
  removeFromFavorites,
  addToFavorites,
  getAllCities
} from '../../redux/api'
import { loadFavoriteCitiesAction } from '../../redux/actionCreators'

export function Card({ cities, component }) {
  const dispatch = useDispatch()
  const favoriteCities = useSelector(getLoadedCities)

  const [citiesThatAreOnFavList, setCitiesThatAreOnFavList] = useState([])

  useEffect(() => {
    favoriteCitiesLoad()
  }, [])

  const removeCityHandler = async event => {
    event.persist()
    const clickedCityName = event.target.parentElement.children[1].textContent
    const favoriteStateCopy = [...cities]
    const city = favoriteStateCopy.find(city => city.name === clickedCityName)
    await removeFromFavorites(city)
    favoriteCitiesLoad()
  }
  const addToFavoritesHandler = async event => {
    event.persist()
    const clickedCityName = event.target.parentElement.children[1].textContent
    const regionStateCopy = [...cities]
    const city = regionStateCopy.find(city => city.name === clickedCityName)
    await addToFavorites(city)
    favoriteCitiesLoad()
  }

  const favoriteCitiesLoad = async () => {
    const allFavoriteCities = await getAllCities()
    allFavoriteCities.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
    dispatch(loadFavoriteCitiesAction(allFavoriteCities))
  }

  useEffect(() => {
    if (component === 'main' && cities.length > 0) {
      const citiesThatAreOnFavoriteList = cities.filter(city =>
        favoriteCities.some(favCity => {
          return favCity.id === city.id
        })
      )
      setCitiesThatAreOnFavList(citiesThatAreOnFavoriteList)
    }
  }, [cities, favoriteCities])

  return (
    <div className={c.container}>
      <Flex justify='space-around' wrap='wrap'>
        {cities.length === 0 ? (
          <h1 className={c.fullScreen}>
            {' '}
            ↑ There is yet nothing to show, try adding something by searching in
            the input above ↑{' '}
          </h1>
        ) : (
          cities.map(city => {
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
                {component === 'favorites' ||
                citiesThatAreOnFavList.some(favCity => {
                  if (favCity === city) {
                    return true
                  } else if (component === 'favorites') {
                    return true
                  } else if (component === 'main') {
                    return false
                  }
                }) ? (
                  <Button color='danger' onClick={removeCityHandler}>
                    Remove From Favorites
                  </Button>
                ) : (
                  <Button color='primary' onClick={addToFavoritesHandler}>
                    Add To Favorites
                  </Button>
                )}
              </div>
            )
          })
        )}
      </Flex>
    </div>
  )
}

export const Cards = React.memo(Card)
