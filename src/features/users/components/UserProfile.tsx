import React, { useEffect } from 'react'
import { useUserContext } from '../contexts/UserContext'

interface UserProfileProps {
  userId: string
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { selectedUser, getUserById } = useUserContext()

  useEffect(() => {
    if (userId) {
      getUserById(userId, (response) => {
        if (!response.success) {
          console.error('Failed to fetch user:', response.error)
        }
      })
    }
  }, [userId])

  if (!selectedUser) {
    return (
      <div className="user-profile-container">
        <div className="loading">Loading user profile...</div>
      </div>
    )
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h2>User Profile</h2>
        
        <div className="profile-info">
          <div className="info-item">
            <label>Name:</label>
            <span>{selectedUser.name}</span>
          </div>
          
          <div className="info-item">
            <label>Email:</label>
            <span>{selectedUser.email}</span>
          </div>
          
          <div className="info-item">
            <label>Member Since:</label>
            <span>
              {selectedUser.createdAt 
                ? new Date(selectedUser.createdAt).toLocaleDateString() 
                : 'N/A'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile