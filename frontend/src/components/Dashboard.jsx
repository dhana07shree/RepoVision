import { useState } from 'react'
import { getDashboard } from '../api.js'

function Dashboard({ repoName }) {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadDashboard = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getDashboard(repoName)
      if (data.detail) {
        setError(data.detail)
      } else {
        setDashboard(data)
      }
    } catch (err) {
      setError("Something went wrong.")
    }
    setLoading(false)
  }

  if (!repoName) {
    return (
      <div className="card">
        <p>Please upload a repository first.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <button onClick={loadDashboard} disabled={loading}>
        {loading ? "Loading..." : "Load Dashboard"}
      </button>

      {error && <p className="error">{error}</p>}

      {dashboard && (
        <div>
          <h3>Statistics</h3>
          <ul>
            <li>Files: {dashboard.statistics.files}</li>
            <li>Documents: {dashboard.statistics.documents}</li>
            <li>Chunks: {dashboard.statistics.chunks}</li>
            <li>Languages Detected: {dashboard.statistics.languages_detected}</li>
            <li>Frameworks Detected: {dashboard.statistics.frameworks_detected}</li>
          </ul>

          <h3>Analysis</h3>
          <p><b>Project Title:</b> {dashboard.analysis.project_title}</p>
          <p><b>Objective:</b> {dashboard.analysis.project_objective}</p>
          <p><b>Languages:</b> {dashboard.analysis.programming_languages.join(", ")}</p>
          <p><b>Frameworks:</b> {dashboard.analysis.frameworks.join(", ")}</p>
          <p><b>Libraries:</b> {dashboard.analysis.libraries.join(", ")}</p>
          <p><b>Major Features:</b> {dashboard.analysis.major_features.join(", ")}</p>
          <p><b>Specialized Components:</b> {dashboard.analysis.specialized_components.join(", ")}</p>
          <p><b>APIs:</b> {dashboard.analysis.apis.join(", ")}</p>
          <p><b>Database:</b> {dashboard.analysis.database}</p>
          <p><b>Authentication:</b> {dashboard.analysis.authentication}</p>
          <p><b>Deployment:</b> {dashboard.analysis.deployment}</p>
          <p><b>Architecture:</b> {dashboard.analysis.overall_architecture}</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
