// import { useState } from 'react'
// import { uploadRepository } from '../api.js'

// function Upload({ setRepoName }) {
//   const [githubUrl, setGithubUrl] = useState('')
//   const [result, setResult] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleUpload = async () => {
//     if (!githubUrl) return
//     setLoading(true)
//     setError('')
//     setResult(null)
//     try {
//       const data = await uploadRepository(githubUrl)
//       if (data.error) {
//         setError(data.error)
//       } else {
//         setResult(data)
//         setRepoName(data.repository)
//       }
//     } catch (err) {
//       setError('Something went wrong. Is the backend running on port 8000?')
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="card">
//       <label>GitHub Repository URL</label>
//       <input
//         type="text"
//         placeholder="https://github.com/username/repo"
//         value={githubUrl}
//         onChange={(e) => setGithubUrl(e.target.value)}
//       />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Indexing…' : 'Upload & Index'}
//       </button>

//       {error && (
//         <div className="error" style={{ marginTop: 14 }}>
//           {error}
//         </div>
//       )}

//       {result && (
//         <div className="stat-grid" style={{ marginTop: 18 }}>
//           <div className="stat-box">
//             <div className="num">{result.files}</div>
//             <div className="lbl">Files</div>
//           </div>
//           <div className="stat-box">
//             <div className="num">{result.chunks}</div>
//             <div className="lbl">Chunks</div>
//           </div>
//           <div className="stat-box" style={{ gridColumn: 'span 2' }}>
//             <div className="lbl">Repository</div>
//             <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginTop: 2 }}>
//               {result.repository}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Upload





import { useState } from 'react'
import { uploadRepository } from '../api.js'
import { UploadIcon } from '../icons.jsx'

function Upload({ setRepoName }) {
  const [githubUrl, setGithubUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async () => {
    if (!githubUrl) return
    setLoading(true)
    setError('')
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
      setError('Something went wrong. Is the backend running on port 8000?')
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <label>GitHub Repository URL</label>
      <input
        type="text"
        placeholder="https://github.com/username/repo"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleUpload()}
      />
      <button onClick={handleUpload} disabled={loading}>
        <UploadIcon width="14" height="14" style={{ marginRight: 6, verticalAlign: -2 }} />
        {loading ? 'Indexing…' : 'Upload & Index'}
      </button>

      {error && (
        <div className="error" style={{ marginTop: 14 }}>
          {error}
        </div>
      )}

      {result && (
        <div className="stat-grid" style={{ marginTop: 20 }}>
          <div className="stat-box">
            <div className="num">{result.files}</div>
            <div className="lbl">Files</div>
          </div>
          <div className="stat-box">
            <div className="num">{result.chunks}</div>
            <div className="lbl">Chunks</div>
          </div>
          <div className="stat-box" style={{ gridColumn: 'span 2' }}>
            <div className="lbl">Repository</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, marginTop: 4, color: 'var(--primary-dark)', fontWeight: 600 }}>
              {result.repository}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Upload
