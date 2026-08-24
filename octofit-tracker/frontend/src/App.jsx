import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, codespaceName } from './services/api.js'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

function App() {
  const navItems = [
    { path: '/users', label: 'Users' },
    { path: '/teams', label: 'Teams' },
    { path: '/activities', label: 'Activities' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/workouts', label: 'Workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <img src={logo} className="app-logo" alt="OctoFit Tracker" />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Team fitness operations</h1>
          </div>
        </div>
        <div className="api-status">
          <span>{codespaceName ? 'Codespaces API' : 'Local API'}</span>
          <code>{apiBaseUrl}</code>
        </div>
      </header>

      <nav className="app-nav" aria-label="OctoFit sections">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
