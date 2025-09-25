import React, { createContext, useContext, useEffect, useState } from 'react'
import type { IAuthContext, IUser } from '@/types/AuthTypes'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

const AuthContext = createContext<IAuthContext | null>(null)


const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
    return Promise.reject(error)
  }
)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [authUser, setAuthUser] = useState<IUser | null>(null)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const checkAuth = async () => {
    console.log(' auth loadding')
    const token = localStorage.getItem('accessToken')
    
    
    if (!token) {
      console.log(' no token ')
      setAuthUser(null)
      setIsCheckingAuth(false)
      return
    }

    try {
      const response = await apiClient.get('/auth/me')
      if (response.data.user) {
        console.log('auth  is there', response.data.user.name)
        setAuthUser(response.data.user) 
      } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setAuthUser(null)
      }
    } catch (error: any) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setAuthUser(null)
    } finally {
      setIsCheckingAuth(false)
      console.log('auth checkinh done')
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const register = async (data: any, callback?: (res: any) => void) => {
    setIsSigningUp(true)
    try {
      const response = await apiClient.post('/auth/register', data)
      
      if (response.data.accessToken && response.data.user) {
        setAuthUser(response.data.user)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        
        if (callback) {
          callback({
            success: true,
            user: response.data.user,
            message: response.data.message || 'Registration successful'
          })
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Registration failed'
      console.error('Registration error:', errorMessage)
      
      if (callback) {
        callback({
          success: false,
          error: errorMessage
        })
      }
    } finally {
      setIsSigningUp(false)
    }
  }

  const login = async (data: any, callback?: (res: any) => void) => {
    setIsLoggingIn(true)
    try {
      const response = await apiClient.post('/auth/login', data)
      
      if (response.data.accessToken && response.data.user) {
        setAuthUser(response.data.user)
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        
        if (callback) {
          callback({
            success: true,
            user: response.data.user,
            message: response.data.message || 'Login successful'
          })
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login failed'
      console.error('Login error:', errorMessage)
      
      if (callback) {
        callback({
          success: false,
          error: errorMessage
        })
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  const logout = async () => {
    setIsLoggingOut(true)
    try {
      setAuthUser(null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    } catch (error: any) {
      console.error('Logout error:', error.response?.data?.error || error.message)
      setAuthUser(null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    } finally {
      setIsLoggingOut(false)
    }
  }

 

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isSigningUp,
        isLoggingIn,
       
        isCheckingAuth,
        isLoggingOut,
        register,
        login,
        logout,
        checkAuth,
    
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}