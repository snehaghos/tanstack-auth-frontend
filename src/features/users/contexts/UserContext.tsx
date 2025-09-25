import React, { createContext, useContext, useState } from 'react'
import type { IUserContext, IUser, UpdateUserData } from '@/types/UserTypes'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

const UserContext = createContext<IUserContext | null>(null)

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
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isUpdatingUser, setIsUpdatingUser] = useState(false)
  const [isDeletingUser, setIsDeletingUser] = useState(false)

  const getAllUsers = async (callback?: (res: any) => void) => {
    setIsLoadingUsers(true)
    try {
      const response = await apiClient.get('/users')
      
      if (response.data) {
        setUsers(response.data)
        
        if (callback) {
          callback({
            success: true,
            users: response.data,
            message: 'Users fetched successfully'
          })
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch users'
      console.error('Get users error:', errorMessage)
      
      if (callback) {
        callback({
          success: false,
          error: errorMessage
        })
      }
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const getUserById = async (id: string, callback?: (res: any) => void) => {
    try {
      const response = await apiClient.get(`/users/${id}`)
      
      if (response.data) {
        setSelectedUser(response.data)
        
        if (callback) {
          callback({
            success: true,
            user: response.data,
            message: 'User fetched successfully'
          })
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch user'
      console.error('Get user error:', errorMessage)
      
      if (callback) {
        callback({
          success: false,
          error: errorMessage
        })
      }
    }
  }

  const updateUser = async (id: string, data: UpdateUserData, callback?: (res: any) => void) => {
    setIsUpdatingUser(true)
    try {
      const response = await apiClient.put(`/users/${id}`, data)
      
      if (response.data) {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user._id === id ? response.data : user
          )
        )
        
        if (selectedUser?._id === id) {
          setSelectedUser(response.data)
        }
        
        if (callback) {
          callback({
            success: true,
            user: response.data,
            message: 'User updated successfully'
          })
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to update user'
      console.error('Update user error:', errorMessage)
      
      if (callback) {
        callback({
          success: false,
          error: errorMessage
        })
      }
    } finally {
      setIsUpdatingUser(false)
    }
  }

  const deleteUser = async (id: string, callback?: (res: any) => void) => {
    setIsDeletingUser(true)
    try {
      const response = await apiClient.delete(`/users/${id}`)
      
      if (response.data) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id))
        
        if (selectedUser?._id === id) {
          setSelectedUser(null)
        }
        
        if (callback) {
          callback({
            success: true,
            message: response.data.message || 'User deleted successfully'
          })
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to delete user'
      console.error('Delete user error:', errorMessage)
      
      if (callback) {
        callback({
          success: false,
          error: errorMessage
        })
      }
    } finally {
      setIsDeletingUser(false)
    }
  }

  const clearSelectedUser = () => {
    setSelectedUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        isLoadingUsers,
        isUpdatingUser,
        isDeletingUser,

        getAllUsers,
        getUserById,
        updateUser,
        deleteUser,
        clearSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}