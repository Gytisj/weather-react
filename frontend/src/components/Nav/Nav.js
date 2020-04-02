import React from 'react'
import c from './Nav.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap'
import { Flex } from '../shared/Flex/Flex'
import { useDispatch } from 'react-redux'
import * as actionTypes from '../../redux/actionTypes'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export const Nav = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const logoutHandler = event => {
    event.preventDefault()
    const token = localStorage.getItem('x-auth')

    fetch('http://localhost:4000/api/v1/user/logout', {
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
        localStorage.removeItem('x-auth')
        alert('LOGOUT: successful')
        dispatch({ type: actionTypes.TOGGLE_LOGGED_IN })
      })
      .catch(e => {
        console.log(e)
        alert('LOGOUT: failed!')
      })
  }

  return (
    <Flex
      justify='space-between'
      className={
        history.location.pathname === '/favorites'
          ? c.favorites
          : c.navContainer
      }
      align='center'
    >
      <div className={c.links}>
        <Link to='/' className={c.link}>
          Region weather
        </Link>
        <Link to='/favorites' className={c.link}>
          Favorites
        </Link>
      </div>

      <Button color='danger' onClick={logoutHandler}>
        Log out
      </Button>
    </Flex>
  )
}
