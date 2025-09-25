import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/UserContext'
import { useAuthContext } from '../../auth/contexts/AuthContext'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const UsersList: React.FC = () => {
  const { 
    users, 
    isLoadingUsers, 
    getAllUsers, 
    deleteUser, 
    isDeletingUser 
  } = useUserContext()
  const { authUser } = useAuthContext()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    getAllUsers((response) => {
      if (!response.success) {
        setError(response.error)
      }
    })
  }

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId, (response) => {
        if (response.success) {
          setSuccess(response.message)
          setError('')
        } else {
          setError(response.error)
          setSuccess('')
        }
      })
    }
  }

  if (isLoadingUsers) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Loading users...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          All Users ({users.length})
        </h2>
        <Button variant="outline" onClick={loadUsers}>
          Refresh
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-2 rounded bg-red-100 text-red-600 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-2 rounded bg-green-100 text-green-600 text-sm">
          {success}
        </div>
      )}

      {users.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {authUser?._id === user._id && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {/* navigate to edit */}}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={isDeletingUser}
                        >
                          {isDeletingUser ? 'Deleting...' : 'Delete'}
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No users found.
        </div>
      )}
    </div>
  )
}

export default UsersList
