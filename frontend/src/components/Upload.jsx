import { useState } from 'react'
import { uploadRepository } from '../api.js'

function Upload({ setRepoName }) {
  const [githubUrl, setGithubUrl] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleUpload = async () => {
    if (!githubUrl) return
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const data = await uploadRepository(githubUrl)
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
        setRepoName(data.repository)
      }
    } catch (err) {
      setError("Something went wrong. Is the backend running on port 8000?")
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h2>Upload GitHub Repository</h2>
      <input
        type="text"
        placeholder="https://github.com/username/repo"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div>
          <p>Message: {result.message}</p>
          <p>Repository: {result.repository}</p>
          <p>Files: {result.files}</p>
          <p>Chunks: {result.chunks}</p>
        </div>
      )}
    </div>
  )
}

export default Upload
