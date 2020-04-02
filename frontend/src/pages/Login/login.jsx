import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as actionTypes from '../../redux/actionTypes'
import { Flex } from '../../components/shared/Flex/Flex'
import c from './login.module.css'

export const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [formState, setFormState] = useState({
    username: '',
    password: ''
  })

  const goToRegister = event => {
    event.preventDefault()
    history.push('/register')
  }

  const usernameInputHandler = event => {
    setFormState({
      ...formState,
      username: event.target.value
    })
  }
  const passwordInputHandler = event => {
    setFormState({
      ...formState,
      password: event.target.value
    })
  }

  const login = event => {
    event.preventDefault()

    let body = {
      username: formState.username,
      password: formState.password
    }

    fetch('http://localhost:4000/api/v1/user/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(header => {
        console.log('labas')
        if (!header.ok) {
          throw Error(header)
        }

        const token = header.headers.get('x-auth')
        localStorage.setItem('x-auth', token)

        return header.json()
      })
      .then(response => {
        alert('LOGIN: success')
        dispatch({ type: actionTypes.TOGGLE_LOGGED_IN })
        history.push('/')
      })
      .catch(e => {
        console.log(e)
        alert('LOGIN: failed')
      })
  }
  return (
    <Flex justify='center' align='center' className={c.image}>
      <div className={c.loginContainer}>
        <h1 className={c.color}> Wheather online, save, check later! </h1>
        <Form inline>
          <FormGroup>
            <Label className={c.color} for='exampleUsername' hidden>
              Email
            </Label>
            <Input
              type='username'
              name='username'
              id='exampleUsername'
              placeholder='Username'
              value={formState.username}
              onChange={usernameInputHandler}
            />
          </FormGroup>{' '}
          <FormGroup>
            <Label lassName={c.color} for='examplePassword' hidden>
              Password
            </Label>
            <Input
              type='password'
              name='password'
              id='examplePassword'
              placeholder='Password'
              value={formState.password}
              onChange={passwordInputHandler}
            />
          </FormGroup>{' '}
          <Button color='primary' onClick={login}>
            Log In
          </Button>
          <Button color='primary' onClick={goToRegister}>
            Register New User
          </Button>
        </Form>
      </div>
    </Flex>
  )
}
