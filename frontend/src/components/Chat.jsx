import { useState } from 'react'
import { askQuestion } from '../api.js'

function Chat({ repoName }) {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    try {
      const data = await askQuestion(repoName, question)
      setMessages([...messages, { question, answer: data.answer }])
      setQuestion("")
    } catch (err) {
      setMessages([...messages, { question, answer: "Error getting answer." }])
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
      <h2>Chat with Repository</h2>

      {messages.map((m, i) => (
        <div className="qa" key={i}>
          <p><b>Q:</b> {m.question}</p>
          <p><b>A:</b> {m.answer}</p>
        </div>
      ))}

      <input
        type="text"
        placeholder="Ask a question about the repository..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Asking..." : "Ask"}
      </button>
    </div>
  )
}

export default Chat
