// import { useState } from 'react'
// import Upload from './components/Upload.jsx'
// import Dashboard from './components/Dashboard.jsx'
// import Chat from './components/Chat.jsx'
// import Interview from './components/Interview.jsx'
// import Resume from './components/Resume.jsx'

// const TABS = [
//   { id: 'upload', index: '01', label: 'upload' },
//   { id: 'dashboard', index: '02', label: 'dashboard' },
//   { id: 'chat', index: '03', label: 'chat' },
//   { id: 'interview', index: '04', label: 'interview' },
//   { id: 'resume', index: '05', label: 'resume' },
// ]

// const TITLES = {
//   upload: ['Upload Repository', 'Point RepoPrep AI at a public GitHub repository to index it.'],
//   dashboard: ['Dashboard', 'Structural stats and an AI-generated analysis of the repository.'],
//   chat: ['Chat', 'Ask questions about the codebase and get grounded answers.'],
//   interview: ['Mock Interview', 'Practice answering interview questions based on this repository.'],
//   resume: ['Resume Builder', 'Turn this project into resume-ready bullet points.'],
// }

// function App() {
//   const [repoName, setRepoName] = useState('')
//   const [activeTab, setActiveTab] = useState('upload')
//   const [title, subtitle] = TITLES[activeTab]

//   return (
//     <div className="layout">
//       <aside className="sidebar">
//         <div className="brand">
//           <span>RepoPrep</span>
//           <span className="dot">AI</span>
//         </div>
//         <div className="brand-sub">$ interview prep for your own code</div>

//         <div className="repo-badge">
//           <span className="label">active repository</span>
//           {repoName || 'none selected'}
//         </div>

//         <nav className="nav">
//           {TABS.map((tab) => (
//             <button
//               key={tab.id}
//               className={activeTab === tab.id ? 'nav-item active' : 'nav-item'}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               <span className="index">{tab.index}</span>
//               {tab.label}
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">repoprep-ai · local prototype</div>
//       </aside>

//       <main className="workspace">
//         <div className="page-header">
//           <h1>{title}</h1>
//           <p>{subtitle}</p>
//         </div>

//         {activeTab === 'upload' && <Upload setRepoName={setRepoName} />}
//         {activeTab === 'dashboard' && <Dashboard repoName={repoName} />}
//         {activeTab === 'chat' && <Chat repoName={repoName} />}
//         {activeTab === 'interview' && <Interview repoName={repoName} />}
//         {activeTab === 'resume' && <Resume repoName={repoName} />}
//       </main>
//     </div>
//   )
// }

// export default App





import { useState } from 'react'
import Upload from './components/Upload.jsx'
import Dashboard from './components/Dashboard.jsx'
import Chat from './components/Chat.jsx'
import Interview from './components/Interview.jsx'
import Resume from './components/Resume.jsx'
import { UploadIcon, GridIcon, ChatIcon, MicIcon, DocIcon } from './icons.jsx'

const TABS = [
  { id: 'upload', index: '01', label: 'upload', Icon: UploadIcon },
  { id: 'dashboard', index: '02', label: 'dashboard', Icon: GridIcon },
  { id: 'chat', index: '03', label: 'chat', Icon: ChatIcon },
  { id: 'interview', index: '04', label: 'interview', Icon: MicIcon },
  { id: 'resume', index: '05', label: 'resume', Icon: DocIcon },
]

const TITLES = {
  upload: ['Upload Repository', 'Point RepoPrep AI at a public GitHub repository to index it.'],
  dashboard: ['Dashboard', 'Structural stats and an AI-generated analysis of the repository.'],
  chat: ['Chat', 'Ask questions about the codebase and get grounded answers.'],
  interview: ['Mock Interview', 'Practice answering interview questions based on this repository.'],
  resume: ['Resume Builder', 'Turn this project into resume-ready bullet points.'],
}

function App() {
  const [repoName, setRepoName] = useState('')
  const [activeTab, setActiveTab] = useState('upload')
  const [title, subtitle] = TITLES[activeTab]

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <span>RepoPrep</span>
          <span className="dot">AI</span>
        </div>
        <div className="brand-sub">
          interview prep for your own code
          <span className="cursor">▍</span>
        </div>

        <div className="repo-badge">
          <span className="label">active repository</span>
          <span className={repoName ? 'repo-value' : 'repo-value empty'}>
            {repoName || 'none selected'}
          </span>
        </div>

        <nav className="nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.Icon className="nav-icon" />
              <span>{tab.label}</span>
              <span className="index">{tab.index}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">repoprep-ai · local prototype</div>
      </aside>

      <main className="workspace">
        <div className="page-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="page-content fade-in" key={activeTab}>
          {activeTab === 'upload' && <Upload setRepoName={setRepoName} />}
          {activeTab === 'dashboard' && <Dashboard repoName={repoName} />}
          {activeTab === 'chat' && <Chat repoName={repoName} />}
          {activeTab === 'interview' && <Interview repoName={repoName} />}
          {activeTab === 'resume' && <Resume repoName={repoName} />}
        </div>
      </main>
    </div>
  )
}

export default App
