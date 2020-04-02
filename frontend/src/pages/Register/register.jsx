import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import c from './register.module.css'
import { Flex } from '../../components/shared/Flex/Flex'

export const Register = () => {
  const history = useHistory()

  const [formState, setFormState] = useState({
    username: '',
    password: '',
    rPassword: ''
  })

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
  const rPasswordInputHandler = event => {
    setFormState({
      ...formState,
      rPassword: event.target.value
    })
  }

  const registerUser = async event => {
    event.preventDefault()

    let newUser = {
      username: formState.username,
      password: formState.password,
      rPassword: formState.rPassword
    }

    if (newUser.password === newUser.rPassword) {
      try {
        const newUserResponse = await fetch(
          'http://localhost:4000/api/v1/user/register',
          {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (newUserResponse.status === 200) {
          const result = await newUserResponse.json()
          alert('REGISTRATION: success')
          history.push('./login')
          return result
        }
      } catch (err) {
        alert('something is wrong', err)
      }
    } else {
      alert('Password does not match')
    }
  }

  return (
    <Flex justify='center' align='center' className={c.image}>
      <div className={c.registerContainer}>
        <Form>
          <Container>
            <FormGroup>
              <h1 className={c.color} for='exampleEmail'>
                Welcome to brand new WeatherApp!
              </h1>
            </FormGroup>
            <FormGroup>
              <Label className={c.color} sm={2} size='lg' for='exampleEmail'>
                Username
              </Label>
              <Input
                bsSize='lg'
                type='username'
                name='username'
                id='exampleUsername'
                placeholder='Enter Username'
                value={formState.username}
                onChange={usernameInputHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label className={c.color} sm={2} size='lg' for='examplePassword'>
                Password
              </Label>
              <Input
                bsSize='lg'
                type='password'
                name='password'
                id='examplePassword'
                placeholder='Enter Password'
                value={formState.password}
                onChange={passwordInputHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label
                className={c.color}
                sm={4}
                size='lg'
                for='exampleRPassword'
              >
                Repeat your Password
              </Label>
              <Input
                bsSize='lg'
                type='password'
                name='Rpassword'
                id='exampleRPassword'
                placeholder='Repeat Password'
                value={formState.rPassword}
                onChange={rPasswordInputHandler}
              />
            </FormGroup>
            <Button color='primary' onClick={registerUser}>
              Register
            </Button>
          </Container>
        </Form>
      </div>
    </Flex>
  )
}
