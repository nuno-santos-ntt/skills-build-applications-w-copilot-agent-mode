import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { codespaceName, fetchCollectionFromUrl, getEndpointUrl } from '../services/api.js'

const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : getEndpointUrl('leaderboard')

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      try {
        const data = await fetchCollectionFromUrl(leaderboardEndpoint)
        if (isMounted) {
          setEntries(data)
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

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      <DataState isLoading={isLoading} error={error} emptyMessage={entries.length === 0 ? 'No leaderboard entries found.' : ''}>
        <ol className="leaderboard-list">
          {entries.map((entry) => (
            <li key={entry._id}>
              <span className="rank">#{entry.rank}</span>
              <div>
                <strong>{entry.user?.displayName ?? 'Unknown athlete'}</strong>
                <small>@{entry.user?.username ?? 'unassigned'}</small>
              </div>
              <span className="score">{entry.score} pts</span>
            </li>
          ))}
        </ol>
      </DataState>
    </section>
  )
}

export default Leaderboard