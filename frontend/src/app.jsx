import { useState } from 'react'
import Upload from './components/Upload.jsx'
import Dashboard from './components/Dashboard.jsx'
import Chat from './components/Chat.jsx'
import Interview from './components/Interview.jsx'
import Resume from './components/Resume.jsx'

function App() {
  const [repoName, setRepoName] = useState("")
  const [activeTab, setActiveTab] = useState("upload")

  const tabs = ["upload", "dashboard", "chat", "interview", "resume"]

  return (
    <div className="app">
      <h1>RepoPrep AI</h1>

      {repoName && (
        <p className="repo-info">
          Active Repository: <b>{repoName}</b>
        </p>
      )}

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="content">
        {activeTab === "upload" && <Upload setRepoName={setRepoName} />}
        {activeTab === "dashboard" && <Dashboard repoName={repoName} />}
        {activeTab === "chat" && <Chat repoName={repoName} />}
        {activeTab === "interview" && <Interview repoName={repoName} />}
        {activeTab === "resume" && <Resume repoName={repoName} />}
      </div>
    </div>
  )
}

export default App
