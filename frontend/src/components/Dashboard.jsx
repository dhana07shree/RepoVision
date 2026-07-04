import { useState } from 'react'
import { getDashboard } from '../api.js'

function Dashboard({ repoName }) {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadDashboard = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getDashboard(repoName)
      if (data.detail) {
        setError(data.detail)
      } else {
        setDashboard(data)
      }
    } catch (err) {
      setError('Something went wrong.')
    }
    setLoading(false)
  }

  if (!repoName) {
    return (
      <div className="card">
        <p className="empty-state">Upload a repository first, then come back here.</p>
      </div>
    )
  }

  return (
    <div>
      <button onClick={loadDashboard} disabled={loading}>
        {loading ? 'Loading…' : 'Load Dashboard'}
      </button>

      {error && (
        <div className="error" style={{ marginTop: 14 }}>
          {error}
        </div>
      )}

      {dashboard && (
        <>
          <div className="card">
            <h3>Statistics</h3>
            <div className="stat-grid">
              <div className="stat-box">
                <div className="num">{dashboard.statistics.files}</div>
                <div className="lbl">Files</div>
              </div>
              <div className="stat-box">
                <div className="num">{dashboard.statistics.chunks}</div>
                <div className="lbl">Chunks</div>
              </div>
              <div className="stat-box">
                <div className="num">{dashboard.statistics.languages_detected}</div>
                <div className="lbl">Languages</div>
              </div>
              <div className="stat-box">
                <div className="num">{dashboard.statistics.frameworks_detected}</div>
                <div className="lbl">Frameworks</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Analysis</h3>
            <div className="field-row">
              <span className="k">Project:</span>
              {dashboard.analysis.project_title}
            </div>
            <div className="field-row">
              <span className="k">Objective:</span>
              {dashboard.analysis.project_objective}
            </div>

            <div className="field-row">
              <span className="k">Languages</span>
              <div className="tag-list">
                {dashboard.analysis.programming_languages.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="field-row">
              <span className="k">Frameworks</span>
              <div className="tag-list">
                {dashboard.analysis.frameworks.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="field-row">
              <span className="k">Libraries</span>
              <div className="tag-list">
                {dashboard.analysis.libraries.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="field-row">
              <span className="k">APIs</span>
              <div className="tag-list">
                {dashboard.analysis.apis.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="field-row">
              <span className="k">Major Features</span>
              <div className="tag-list">
                {dashboard.analysis.major_features.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="field-row">
              <span className="k">Specialized Components</span>
              <div className="tag-list">
                {dashboard.analysis.specialized_components.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="field-row"><span className="k">Database:</span>{dashboard.analysis.database}</div>
            <div className="field-row"><span className="k">Authentication:</span>{dashboard.analysis.authentication}</div>
            <div className="field-row"><span className="k">Deployment:</span>{dashboard.analysis.deployment}</div>
            <div className="field-row"><span className="k">Architecture:</span>{dashboard.analysis.overall_architecture}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
