import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import c from './favorites.module.css'
import { Button } from 'reactstrap'
import { Flex } from '../../components/shared/Flex/Flex'
import { Cards } from '../../components/Card/Card'
import { getAllCities, addToFavorites } from '../../redux/api'
import { useSelector, useDispatch } from 'react-redux'
import { getLoadedCities } from '../../redux/selectors'
import { loadFavoriteCitiesAction } from '../../redux/actionCreators'
import { fetchCityDataByName } from '../../components/shared/utils/utils'

export const Favorites = () => {
  const dispatch = useDispatch()
  const cities = useSelector(getLoadedCities)

  const [formState, setFormState] = useState('')

  const inputChangeHandler = event => {
    setFormState({
      ...formState,
      city: event.target.value
    })
  }
  const favoriteCities = async () => {
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
    favoriteCities()
  }, [])

  const formSubmitHandler = async event => {
    event.preventDefault()
    const cityData = await fetchCityDataByName(formState.city)
    if (cityData) {
      await addToFavorites(cityData)
      favoriteCities()
    } else {
      alert('add a valid city, this one was not found')
    }
  }

  return (
    <>
      <div className={c.container}>
        <Flex justify='center' align='center'>
          <form className={c.form}>
            <input type='text' onChange={inputChangeHandler}></input>
            <Button
              type='submit'
              color='info'
              className={c.btn}
              onClick={formSubmitHandler}
            >
              Add city to favorites
            </Button>
          </form>
        </Flex>
        <Cards cities={cities} component={'favorites'} />
      </div>
    </>
  )
}
