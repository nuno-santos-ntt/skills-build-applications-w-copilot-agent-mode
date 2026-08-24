import { useEffect, useState } from 'react'
import DataState from './DataState.jsx'
import { fetchCollection } from '../services/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      try {
        const data = await fetchCollection('activities')
        if (isMounted) {
          setActivities(data)
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

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Training log</p>
        <h2>Activities</h2>
      </div>
      <DataState isLoading={isLoading} error={error} emptyMessage={activities.length === 0 ? 'No activities found.' : ''}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Athlete</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.activityType}</td>
                  <td>{activity.user?.displayName ?? 'Unassigned'}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'Not set'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataState>
    </section>
  )
}

export default Activities