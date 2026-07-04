import { useState } from 'react'
import { startInterview, answerInterviewQuestion, stopInterview } from '../api.js'

function ScoreLine({ label, value }) {
  return (
    <div className="field-row">
      <span className="k">{label}:</span>
      {value}
    </div>
  )
}

function Interview({ repoName }) {
  const [numQuestions, setNumQuestions] = useState(3)
  const [sessionId, setSessionId] = useState(null)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState('')
  const [progress, setProgress] = useState(null)
  const [lastEvaluation, setLastEvaluation] = useState(null)
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    setReport(null)
    setLastEvaluation(null)
    try {
      const data = await startInterview(repoName, Number(numQuestions))
      setSessionId(data.session_id)
      setQuestion(data.question)
      setProgress({ current: data.current_question, total: data.total_questions })
    } catch (err) {
      alert('Could not start interview.')
    }
    setLoading(false)
  }

  const handleAnswer = async () => {
    if (!answer) return
    setLoading(true)
    try {
      const data = await answerInterviewQuestion(sessionId, answer)
      if (data.completed) {
        setReport(data.report)
        setQuestion(null)
      } else {
        setLastEvaluation(data.evaluation)
        setQuestion(data.next_question)
        setProgress({ current: data.current_question, total: data.total_questions })
      }
      setAnswer('')
    } catch (err) {
      alert('Could not submit answer.')
    }
    setLoading(false)
  }

  const handleStop = async () => {
    if (!sessionId) return
    setLoading(true)
    try {
      const data = await stopInterview(sessionId)
      setReport(data.report)
      setQuestion(null)
    } catch (err) {
      alert('Could not stop interview.')
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
      {!sessionId && !report && (
        <div className="card">
          <label>Number of Questions</label>
          <input
            type="number"
            min="1"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            style={{ maxWidth: 120 }}
          />
          <div>
            <button onClick={handleStart} disabled={loading}>
              {loading ? 'Starting…' : 'Start Interview'}
            </button>
          </div>
        </div>
      )}

      {question && (
        <div className="card">
          <p className="empty-state" style={{ marginBottom: 10 }}>
            Question {progress?.current} of {progress?.total}
          </p>
          <span className="pill category">{question.category}</span>
          <span className="pill difficulty">{question.difficulty}</span>
          <p style={{ marginTop: 12, fontWeight: 600 }}>{question.question}</p>

          <textarea
            rows="4"
            placeholder="Type your answer…"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleAnswer} disabled={loading}>
            {loading ? 'Submitting…' : 'Submit Answer'}
          </button>
          <button className="secondary" onClick={handleStop} disabled={loading}>
            Stop Interview
          </button>
        </div>
      )}

      {lastEvaluation && (
        <div className="card">
          <h3>Last Evaluation</h3>
          <div className={`score-badge ${lastEvaluation.overall_score < 5 ? 'low' : ''}`}>
            {lastEvaluation.overall_score}/10
          </div>
          <ScoreLine label="Technical Accuracy" value={lastEvaluation.technical_accuracy} />
          <ScoreLine label="Communication" value={lastEvaluation.communication} />
          <ScoreLine label="Confidence" value={lastEvaluation.confidence} />
          <ScoreLine label="Completeness" value={lastEvaluation.completeness} />
          <div className="field-row">
            <span className="k">Strengths</span>
            <div className="tag-list">
              {lastEvaluation.strengths.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="field-row">
            <span className="k">Weaknesses</span>
            <div className="tag-list">
              {lastEvaluation.weaknesses.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="field-row">
            <span className="k">Suggestions</span>
            <div className="tag-list">
              {lastEvaluation.suggestions.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      )}

      {report && (
        <div className="card">
          <h3>Final Report</h3>
          <div className={`score-badge ${report.overall_score < 5 ? 'low' : ''}`}>
            {report.overall_score}/10
          </div>
          <ScoreLine label="Technical Accuracy" value={report.technical_accuracy} />
          <ScoreLine label="Communication" value={report.communication} />
          <ScoreLine label="Confidence" value={report.confidence} />
          <ScoreLine label="Completeness" value={report.completeness} />
          <ScoreLine label="Hiring Recommendation" value={report.hiring_recommendation} />
          <div className="field-row">
            <span className="k">Strengths</span>
            <div className="tag-list">
              {report.strengths.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="field-row">
            <span className="k">Weaknesses</span>
            <div className="tag-list">
              {report.weaknesses.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="field-row">
            <span className="k">Improvements</span>
            <div className="tag-list">
              {report.improvements.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
          <div className="field-row" style={{ marginTop: 10 }}>
            <span className="k">Final Feedback:</span> {report.final_feedback}
          </div>
        </div>
      )}
    </div>
  )
}

export default Interview
