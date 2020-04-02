const defaultUrl = 'http://localhost:4000/api/v1'

const getToken = () => window.localStorage.getItem('x-auth')

const composeHeaders = () => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['x-auth'] = token
  }
  return headers
}

export const GET = async endpoint => {
  const headers = composeHeaders()
  const response = await fetch(defaultUrl + endpoint, {
    headers
  })
  if (response.ok) {
    return await response.json()
  } else console.log(response.text)
}

export const getAllCities = async () => await GET('/favorites/getAllCities')

const requestOptions = data => {
  const method = 'PATCH'
  const body = JSON.stringify(data)
  return { body, method }
}

export const PATCH = async (endpoint, data) => {
  const { body, method } = requestOptions(data)
  const headers = composeHeaders()
  const response = await fetch(defaultUrl + endpoint, {
    method: method,
    body: body,
    headers
  })
  if (response !== '') return response.json()
  else alert('city is already on you favorites list')
}

export const addToFavorites = async data =>
  await PATCH('/favorites/addCity', data)

export const removeFromFavorites = async data =>
  await PATCH('/favorites/removeCity', data)
