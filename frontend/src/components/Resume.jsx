import { useState } from 'react'
import { getResume } from '../api.js'

function Resume({ repoName }) {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const data = await getResume(repoName)
      setResume(data)
    } catch (err) {
      alert('Could not generate resume.')
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
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating…' : 'Generate Resume'}
      </button>

      {resume && (
        <div className="card">
          <h3>{resume.project_title}</h3>
          <p style={{ color: 'var(--text-muted)' }}>{resume.project_description}</p>

          <div className="field-row" style={{ marginTop: 14 }}>
            <span className="k">Resume Bullet Points</span>
          </div>
          <ul style={{ paddingLeft: 20, margin: '4px 0 14px 0' }}>
            {resume.resume_points.map((point, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{point}</li>
            ))}
          </ul>

          <div className="field-row">
            <span className="k">Technologies</span>
            <div className="tag-list">
              {resume.technologies.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Resume
