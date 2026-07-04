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
      alert("Could not generate resume.")
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
      <h2>Resume Builder</h2>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Resume"}
      </button>

      {resume && (
        <div>
          <h3>{resume.project_title}</h3>
          <p>{resume.project_description}</p>
          <h4>Resume Points</h4>
          <ul>
            {resume.resume_points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <h4>Technologies</h4>
          <p>{resume.technologies.join(", ")}</p>
        </div>
      )}
    </div>
  )
}

export default Resume
