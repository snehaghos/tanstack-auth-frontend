import React, { useState } from 'react'
import { useUserContext } from '../contexts/UserContext'
import { useAuthContext } from '../../auth/contexts/AuthContext'

const EditProfile: React.FC = () => {
  const { updateUser, isUpdatingUser } = useUserContext()
  const { authUser } = useAuthContext()
  const [name, setName] = useState(authUser?.name || '')
  const [email, setEmail] = useState(authUser?.email || '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!authUser) {
      setError('User not authenticated')
      return
    }

    if (!name.trim() || !email.trim()) {
      setError('Name and email are required')
      return
    }

    updateUser(authUser._id, { name, email }, (response) => {
      if (response.success) {
        setSuccess(response.message)
        setError('')
      } else {
        setError(response.error)
        setSuccess('')
      }
    })
  }

  if (!authUser) {
    return (
      <div className="edit-profile-container">
        <div className="error-message">Please log in to edit your profile</div>
      </div>
    )
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2>Edit Profile</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isUpdatingUser}>
            {isUpdatingUser ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  )
}

export default EditProfile