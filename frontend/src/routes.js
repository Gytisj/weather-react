import { Main } from './pages/Main/main'
import { Register } from './pages/Register/register'
import { Error } from './pages/Error/error'
import { Login } from './pages/Login/login'
import { Favorites } from './pages/Favorites/Favorites'

export const routes = [
  {
    isExact: true,
    component: Main,
    path: '/',
    label: 'Main',
    isProtected: true
  },
  {
    isExact: true,
    component: Favorites,
    path: '/favorites',
    label: 'Favorites',
    isProtected: true
  },
  { isExact: true, component: Login, path: '/login', label: 'Login' },
  { isExact: true, component: Register, path: '/register', label: 'Register' },
  { isExact: true, component: Error, path: '/404', label: '' }
]
