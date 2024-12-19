"use client"

import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'
import api from '@/lib/api'
import { useAuthStore } from '@/store/use-auth-store'

export const AuthContex = createContext<any>({})

export function AuthProvider({ children }: any) {

  const [authState, setAuthState] = useState({
    _auth: Cookies.get('_auth'),
    _is_auth: Cookies.get('_is_auth'),
  })
  const {setIsLogin, setUser}:any = useAuthStore()

  const initState = async () => {
    try {
      const res = await api.get('/customer/me')
      setIsLogin(true)
      setUser(res.data)
    } catch (error:any) {
      setIsLogin(false)
      setUser({})
      // Cookies.remove('_auth')
      // Cookies.remove('_is_auth')
      // setAuthState({
      //   _auth: '',
      //   _is_auth: ''
      // })
    }
  }
  

  useEffect(() => {
    initState()
  }
  , [])
  
  return <AuthContex.Provider value={{ authState, setAuthState }} >{children}</AuthContex.Provider>
}