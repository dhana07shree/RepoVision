import { useState } from 'react'
import { askQuestion } from '../api.js'

function Chat({ repoName }) {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    try {
      const data = await askQuestion(repoName, question)
      setMessages([...messages, { question, answer: data.answer }])
      setQuestion('')
    } catch (err) {
      setMessages([...messages, { question, answer: 'Error getting answer.' }])
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
    <div className="card">
      {messages.length === 0 && (
        <p className="empty-state" style={{ marginBottom: 14 }}>
          No questions asked yet. Try something like "What does the auth flow look like?"
        </p>
      )}

      {messages.map((m, i) => (
        <div className="qa" key={i}>
          <div className="q">{m.question}</div>
          <div className="a">{m.answer}</div>
        </div>
      ))}

      <input
        type="text"
        placeholder="Ask a question about the repository…"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Thinking…' : 'Ask'}
      </button>
    </div>
  )
}

export default Chat
