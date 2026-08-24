function DataState({ isLoading, error, emptyMessage, children }) {
  if (isLoading) {
    return <p className="state-message">Loading data...</p>
  }

  if (error) {
    return <p className="state-message error">{error}</p>
  }

  if (emptyMessage) {
    return <p className="state-message">{emptyMessage}</p>
  }

  return children
}

export default DataState