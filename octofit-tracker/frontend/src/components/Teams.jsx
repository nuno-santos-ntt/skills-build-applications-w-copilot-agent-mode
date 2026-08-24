import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { fetchCollection } from '../services/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTeams() {
      try {
        const data = await fetchCollection('teams')
        if (isMounted) {
          setTeams(data)
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

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Roster</p>
        <h2>Teams</h2>
      </div>
      <DataState isLoading={isLoading} error={error} emptyMessage={teams.length === 0 ? 'No teams found.' : ''}>
        <div className="data-grid teams-grid">
          {teams.map((team) => (
            <article className="record-card" key={team._id ?? team.name}>
              <h3>{team.name}</h3>
              <p>{team.mascot}</p>
              <span>{team.memberCount ?? 0} members</span>
            </article>
          ))}
        </div>
      </DataState>
    </section>
  )
}

export default Teams