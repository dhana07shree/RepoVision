import { useState } from 'react'
import { startInterview, answerInterviewQuestion, stopInterview } from '../api.js'

function Interview({ repoName }) {
  const [numQuestions, setNumQuestions] = useState(3)
  const [sessionId, setSessionId] = useState(null)
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState("")
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
      alert("Could not start interview.")
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
      setAnswer("")
    } catch (err) {
      alert("Could not submit answer.")
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
      alert("Could not stop interview.")
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
      <h2>Mock Interview</h2>

      {!sessionId && !report && (
        <div>
          <label>Number of Questions: </label>
          <input
            type="number"
            min="1"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
          />
          <button onClick={handleStart} disabled={loading}>
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </div>
      )}

      {question && (
        <div>
          <p>Question {progress?.current} of {progress?.total}</p>
          <p><b>Category:</b> {question.category} | <b>Difficulty:</b> {question.difficulty}</p>
          <p><b>Q:</b> {question.question}</p>

          <textarea
            rows="4"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleAnswer} disabled={loading}>
            {loading ? "Submitting..." : "Submit Answer"}
          </button>
          <button onClick={handleStop} disabled={loading}>
            Stop Interview
          </button>
        </div>
      )}

      {lastEvaluation && (
        <div className="card">
          <h3>Last Evaluation</h3>
          <p>Overall Score: {lastEvaluation.overall_score}</p>
          <p>Technical Accuracy: {lastEvaluation.technical_accuracy}</p>
          <p>Communication: {lastEvaluation.communication}</p>
          <p>Confidence: {lastEvaluation.confidence}</p>
          <p>Completeness: {lastEvaluation.completeness}</p>
          <p>Strengths: {lastEvaluation.strengths.join(", ")}</p>
          <p>Weaknesses: {lastEvaluation.weaknesses.join(", ")}</p>
          <p>Suggestions: {lastEvaluation.suggestions.join(", ")}</p>
        </div>
      )}

      {report && (
        <div className="card">
          <h3>Final Report</h3>
          <p>Overall Score: {report.overall_score}</p>
          <p>Technical Accuracy: {report.technical_accuracy}</p>
          <p>Communication: {report.communication}</p>
          <p>Confidence: {report.confidence}</p>
          <p>Completeness: {report.completeness}</p>
          <p>Strengths: {report.strengths.join(", ")}</p>
          <p>Weaknesses: {report.weaknesses.join(", ")}</p>
          <p>Improvements: {report.improvements.join(", ")}</p>
          <p>Hiring Recommendation: {report.hiring_recommendation}</p>
          <p>Final Feedback: {report.final_feedback}</p>
        </div>
      )}
    </div>
  )
}

export default Interview
