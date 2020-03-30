import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap'
import { Flex } from '../../components/shared/Flex/Flex'
import {
  fetchCityDataByName,
  addCityForCurrentUser,
  getAllFavoriteCities
} from '../../redux/actions/actions'

export const Favorites = () => {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState('')
  // const [citiesState, setCitiesState] = useState([])

  const inputChangeHandler = event => {
    setFormState({
      ...formState,
      city: event.target.value
    })
  }

  useEffect(() => {
    getAllFavoriteCities()
  }, [])

  const formSubmitHandler = async event => {
    event.preventDefault()
    const cityData = await fetchCityDataByName(formState.city)
    if (cityData) {
      addCityForCurrentUser(cityData)
    } else {
      alert('add a valid city, this one was not found')
    }
  }

  const findCurrentUser = async cityData => {
    const city = await cityData
    // let token = localStorage.getItem('x-auth')

    // const currentUser = await fetch(
    //   `http://localhost:4000/api/v1/user/getSingleUser`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'x-auth': token
    //     }
    //   }
    // )
    //   .then(async header => {
    //     if (!header.ok) {
    //       throw Error(header)
    //     }
    //     return await header.json()
    //   })
    //   .then(async response => {
    //     addCityForCurrentUser(response, city)
    //   })
    //   .catch(e => {
    //     console.log(e)
    //   })
  }
  // const addToCartHandler = () => {
  //   const productIndex = cart.findIndex(cartItem => cartItem.id === id)
  //   if (productIndex >= 0) {
  //     // Sitas if'as praeina kai produktas jau yra krepselyje
  //     const newCart = [...cart]
  //     newCart[productIndex].cartQuantity += 1
  //     dispatch({
  //       type: actionTypes.REPLACE_CART,
  //       newCart
  //     })
  //   }
  //   if (productIndex === -1) {
  //     dispatch({
  //       type: actionTypes.ADD_TO_CART,
  //       newCartItem: { ...product, cartQuantity: 1 }
  //     })
  //   }
  // }

  return (
    <Flex justify='center' align='center'>
      <form>
        <input type='text' onChange={inputChangeHandler}></input>
        <Button type='submit' color='secondary' onClick={formSubmitHandler}>
          Add city to favorites
        </Button>
      </form>
    </Flex>
  )
}
