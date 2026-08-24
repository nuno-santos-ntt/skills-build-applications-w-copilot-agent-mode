import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { codespaceName, fetchCollectionFromUrl, getEndpointUrl } from '../services/api.js'

const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : getEndpointUrl('users')

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        const data = await fetchCollectionFromUrl(usersEndpoint)
        if (isMounted) {
          setUsers(data)
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Users</h2>
      </div>
      <DataState isLoading={isLoading} error={error} emptyMessage={users.length === 0 ? 'No users found.' : ''}>
        <div className="data-grid users-grid">
          {users.map((user) => (
            <article className="record-card" key={user._id ?? user.username}>
              <h3>{user.displayName ?? user.username}</h3>
              <p>{user.email}</p>
              <span>@{user.username}</span>
            </article>
          ))}
        </div>
      </DataState>
    </section>
  )
}

export default Users