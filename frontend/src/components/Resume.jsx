// import { useState } from 'react'
// import { getResume } from '../api.js'

// function Resume({ repoName }) {
//   const [resume, setResume] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const handleGenerate = async () => {
//     setLoading(true)
//     try {
//       const data = await getResume(repoName)
//       setResume(data)
//     } catch (err) {
//       alert('Could not generate resume.')
//     }
//     setLoading(false)
//   }

//   if (!repoName) {
//     return (
//       <div className="card">
//         <p className="empty-state">Upload a repository first, then come back here.</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <button onClick={handleGenerate} disabled={loading}>
//         {loading ? 'Generating…' : 'Generate Resume'}
//       </button>

//       {resume && (
//         <div className="card">
//           <h3>{resume.project_title}</h3>
//           <p style={{ color: 'var(--text-muted)' }}>{resume.project_description}</p>

//           <div className="field-row" style={{ marginTop: 14 }}>
//             <span className="k">Resume Bullet Points</span>
//           </div>
//           <ul style={{ paddingLeft: 20, margin: '4px 0 14px 0' }}>
//             {resume.resume_points.map((point, i) => (
//               <li key={i} style={{ marginBottom: 6 }}>{point}</li>
//             ))}
//           </ul>

//           <div className="field-row">
//             <span className="k">Technologies</span>
//             <div className="tag-list">
//               {resume.technologies.map((t) => (
//                 <span className="tag" key={t}>{t}</span>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Resume



import { useState } from 'react'
import { getResume } from '../api.js'
import { InboxIcon, CheckIcon } from '../icons.jsx'

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
        <div className="empty-panel">
          <div className="icon-circle"><InboxIcon /></div>
          <p>Upload a repository first, then come back here to generate resume points.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating…' : 'Generate Resume'}
      </button>

      {resume && (
        <div className="resume-doc" style={{ marginTop: 20 }}>
          <div className="resume-doc-header">
            <h3>{resume.project_title}</h3>
            <p>{resume.project_description}</p>
          </div>

          <div className="resume-doc-body">
            <div className="section-label">Resume Bullet Points</div>
            <ul className="resume-points">
              {resume.resume_points.map((point, i) => (
                <li key={i}>
                  <span className="check"><CheckIcon /></span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="section-label">Technologies</div>
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
