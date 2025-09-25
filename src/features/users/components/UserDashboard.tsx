import React, { useState } from 'react'
import { useAuthContext } from '../../auth/contexts/AuthContext'
import UsersList from './UserList'
import EditProfile from './EditProfile'
import UserProfile from './UserProfile'

type TabType = 'users' | 'profile' | 'edit'

const UserDashboard: React.FC = () => {
  const { authUser, logout } = useAuthContext()
  const [activeTab, setActiveTab] = useState<TabType>('users')

  const handleLogout = () => {
    logout()
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersList />
      case 'profile':
        return authUser ? <UserProfile userId={authUser._id} /> : null
      case 'edit':
        return <EditProfile />
      default:
        return <UsersList />
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome, {authUser?.name}!</h1>
        </div>
        <div className="header-right">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          All Users
        </button>
        <button 
          className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
        <button 
          className={`nav-btn ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Profile
        </button>
      </nav>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default UserDashboard