import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../services/api'

interface UserStat {
  id: string
  name: string
  email: string
  role: string
  lastLogin: string
  recordCount: number
}

export default function AdminDashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserStat[]>([])
  const [stats, setStats] = useState({ totalUsers: 0, totalRecords: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersResponse, statsResponse] = await Promise.all([
        adminService.getUsers(),
        adminService.getUserStats(),
      ])
      setUsers(usersResponse.data)
      setStats(statsResponse.data)
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-purple-800">🌸 Mama Uhai - Admin</h1>
            <p className="text-gray-600">Welcome, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">👥 Total Users</h3>
            <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">📋 Total Records</h3>
            <p className="text-4xl font-bold text-primary">{stats.totalRecords}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Registered Users</h2>
          
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-600">No users found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Records</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userItem) => (
                    <tr key={userItem.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">{userItem.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{userItem.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          userItem.role === 'mother'
                            ? 'bg-pink-100 text-pink-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {userItem.role === 'mother' ? '👶 Mother' : '📊 Admin'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{userItem.recordCount}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(userItem.lastLogin).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
