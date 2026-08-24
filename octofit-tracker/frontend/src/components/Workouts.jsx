import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { codespaceName, fetchCollectionFromUrl, getEndpointUrl } from '../services/api.js'

const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : getEndpointUrl('workouts')

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      try {
        const data = await fetchCollectionFromUrl(workoutsEndpoint)
        if (isMounted) {
          setWorkouts(data)
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

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workouts</h2>
      </div>
      <DataState isLoading={isLoading} error={error} emptyMessage={workouts.length === 0 ? 'No workouts found.' : ''}>
        <div className="data-grid workouts-grid">
          {workouts.map((workout) => (
            <article className="record-card" key={workout._id ?? workout.title}>
              <h3>{workout.title}</h3>
              <p>{workout.description}</p>
              <span>{workout.difficulty} | {workout.durationMinutes} min</span>
            </article>
          ))}
        </div>
      </DataState>
    </section>
  )
}

export default Workouts