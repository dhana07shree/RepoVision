// All backend calls live here in one place.
// If your backend runs on a different port, just change API_BASE.
const API_BASE = "http://127.0.0.1:8000"

export async function uploadRepository(githubUrl) {
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ github_url: githubUrl }),
  })
  return res.json()
}

export async function getDashboard(repoName) {
  const res = await fetch(`${API_BASE}/dashboard/${repoName}`)
  return res.json()
}

export async function askQuestion(repoName, question) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repository: repoName, question }),
  })
  return res.json()
}

export async function startInterview(repoName, numberOfQuestions) {
  const res = await fetch(`${API_BASE}/interview/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      repository: repoName,
      number_of_questions: numberOfQuestions,
    }),
  })
  return res.json()
}

export async function answerInterviewQuestion(sessionId, answer) {
  const res = await fetch(`${API_BASE}/interview/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, answer }),
  })
  return res.json()
}

export async function stopInterview(sessionId) {
  // backend takes session_id as a query param here, not a JSON body
  const res = await fetch(`${API_BASE}/interview/stop?session_id=${sessionId}`, {
    method: "POST",
  })
  return res.json()
}

export async function getResume(repoName) {
  const res = await fetch(`${API_BASE}/resume`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repository: repoName }),
  })
  return res.json()
}
