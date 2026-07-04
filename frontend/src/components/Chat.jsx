// import { useState } from 'react'
// import { askQuestion } from '../api.js'

// function Chat({ repoName }) {
//   const [question, setQuestion] = useState('')
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(false)

//   const handleAsk = async () => {
//     if (!question) return
//     setLoading(true)
//     try {
//       const data = await askQuestion(repoName, question)
//       setMessages([...messages, { question, answer: data.answer }])
//       setQuestion('')
//     } catch (err) {
//       setMessages([...messages, { question, answer: 'Error getting answer.' }])
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
//     <div className="card">
//       {messages.length === 0 && (
//         <p className="empty-state" style={{ marginBottom: 14 }}>
//           No questions asked yet. Try something like "What does the auth flow look like?"
//         </p>
//       )}

//       {messages.map((m, i) => (
//         <div className="qa" key={i}>
//           <div className="q">{m.question}</div>
//           <div className="a">{m.answer}</div>
//         </div>
//       ))}

//       <input
//         type="text"
//         placeholder="Ask a question about the repository…"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
//       />
//       <button onClick={handleAsk} disabled={loading}>
//         {loading ? 'Thinking…' : 'Ask'}
//       </button>
//     </div>
//   )
// }

// export default Chat




import { useState } from 'react'
import { askQuestion } from '../api.js'
import { InboxIcon } from '../icons.jsx'

function Chat({ repoName }) {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question) return
    const q = question
    setLoading(true)
    setQuestion('')
    try {
      const data = await askQuestion(repoName, q)
      setMessages((prev) => [...prev, { question: q, answer: data.answer }])
    } catch (err) {
      setMessages((prev) => [...prev, { question: q, answer: 'Error getting answer.' }])
    }
    setLoading(false)
  }

  if (!repoName) {
    return (
      <div className="card">
        <div className="empty-panel">
          <div className="icon-circle"><InboxIcon /></div>
          <p>Upload a repository first, then come back here to chat with it.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      {messages.length === 0 && (
        <p className="empty-state" style={{ marginBottom: 16 }}>
          No questions asked yet. Try something like "What does the auth flow look like?"
        </p>
      )}

      {messages.map((m, i) => (
        <div key={i}>
          <div className="bubble-row user">
            <div className="avatar user">YOU</div>
            <div className="bubble">{m.question}</div>
          </div>
          <div className="bubble-row ai">
            <div className="avatar ai">AI</div>
            <div className="bubble">{m.answer}</div>
          </div>
        </div>
      ))}

      <input
        type="text"
        placeholder="Ask a question about the repository…"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        style={{ marginTop: messages.length ? 8 : 0 }}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? 'Thinking…' : 'Ask'}
      </button>
    </div>
  )
}

export default Chat
