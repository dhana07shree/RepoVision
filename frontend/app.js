// RepoPrep AI frontend
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const state = {
  repository: localStorage.getItem("rp_repo") || null,
  apiBase: localStorage.getItem("rp_api") || "http://localhost:8000",
};

const apiInput = $("#apiBase");
apiInput.value = state.apiBase;
apiInput.addEventListener("change", () => {
  state.apiBase = apiInput.value.trim().replace(/\/$/, "");
  localStorage.setItem("rp_api", state.apiBase);
});

function setRepo(name) {
  state.repository = name;
  localStorage.setItem("rp_repo", name);
  $("#activeRepo").textContent = name || "None";
}
setRepo(state.repository);

// Navigation
$$(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".nav-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const view = btn.dataset.view;
    $$(".view").forEach(v => v.classList.remove("active"));
    $(`#view-${view}`).classList.add("active");
    if (view === "dashboard") loadDashboard();
    if (view === "interview") loadDomains();
  });
});

// Toast
function toast(msg, type = "") {
  const t = $("#toast");
  t.textContent = msg;
  t.className = "toast show " + type;
  clearTimeout(t._t);
  t._t = setTimeout(() => (t.className = "toast"), 3200);
}

// API helper
async function api(path, opts = {}) {
  const url = state.apiBase + path;
  const res = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });
  const ct = res.headers.get("content-type") || "";
  const data = ct.includes("json") ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = (data && (data.detail || data.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

function requireRepo() {
  if (!state.repository) {
    toast("Upload a repository first.", "err");
    return false;
  }
  return true;
}

/* ---------- UPLOAD ---------- */
$("#uploadBtn").addEventListener("click", async () => {
  const url = $("#githubUrl").value.trim();
  const status = $("#uploadStatus");
  if (!url) return toast("Enter a GitHub URL.", "err");
  const btn = $("#uploadBtn");
  btn.disabled = true;
  status.textContent = "Cloning, indexing and embedding — this may take a minute…";
  status.className = "status";
  try {
    const data = await api("/upload", { method: "POST", body: JSON.stringify({ github_url: url }) });
    setRepo(data.repository);
    $("#urRepo").textContent = data.repository;
    $("#urFiles").textContent = data.files;
    $("#urChunks").textContent = data.chunks;
    $("#urDomains").textContent = (data.interview_domains || []).length;
    $("#uploadResult").classList.remove("hidden");
    status.textContent = "Repository indexed successfully.";
    status.className = "status ok";
    toast("Repository ready.", "ok");
  } catch (e) {
    status.textContent = "Failed: " + e.message;
    status.className = "status err";
    toast(e.message, "err");
  } finally {
    btn.disabled = false;
  }
});

/* ---------- DASHBOARD ---------- */
async function loadDashboard() {
  const body = $("#dashboardBody");
  if (!state.repository) {
    body.innerHTML = `<div class="empty">Upload a repository to see the dashboard.</div>`;
    return;
  }
  body.innerHTML = `<div class="empty">Loading dashboard…</div>`;
  try {
    const d = await api(`/dashboard/${encodeURIComponent(state.repository)}`);
    body.innerHTML = renderDashboard(d);
  } catch (e) {
    body.innerHTML = `<div class="empty" style="color:var(--danger)">Error: ${e.message}</div>`;
  }
}

function renderDashboard(d) {

  const stats = d.statistics || {};
  const analysis = d.analysis || {};

  const list = (arr) => {
    if (!arr || arr.length === 0)
      return `<span class="not-found">Not Found</span>`;

    return `
      <div class="chips">
        ${arr.map(x => `<span class="chip primary">${escapeHtml(x)}</span>`).join("")}
      </div>
    `;
  };

  const text = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "Not Found"
    )
      return `<span class="not-found">Not Found</span>`;

    return escapeHtml(String(value));
  };

  return `
  
  <div class="stats-grid">

      ${statCard("Files Scanned", stats.files)}

      ${statCard("Languages", stats.languages_detected)}

      ${statCard("Frameworks", stats.frameworks_detected)}

      ${statCard("Libraries",
        analysis.libraries?.length || 0)}

  </div>

  <div class="analysis-card">

      ${analysisRow("Project Title", text(analysis.project_title))}

      ${analysisRow("Project Objective", text(analysis.project_objective))}

      ${analysisRow("Programming Languages",
        list(analysis.programming_languages))}

      ${analysisRow("Frameworks",
        list(analysis.frameworks))}

      ${analysisRow("Libraries",
        list(analysis.libraries))}

      ${analysisRow("Major Features",
        list(analysis.major_features))}

      ${analysisRow("Specialized Components",
        list(analysis.specialized_components))}

      ${analysisRow("APIs",
        list(analysis.apis))}

      ${analysisRow("Database",
        text(analysis.database))}

      ${analysisRow("Authentication",
        text(analysis.authentication))}

      ${analysisRow("Deployment",
        text(analysis.deployment))}

      ${analysisRow("Overall Architecture",
        text(analysis.overall_architecture))}

  </div>
  `;
}

function statCard(title, value) {

  return `
    <div class="stat-card">
      <div class="stat-title">${title}</div>
      <div class="stat-value">${value ?? "Not Found"}</div>
    </div>
  `;
}

function analysisRow(title, value) {

  return `
    <div class="analysis-row">

        <div class="analysis-title">
            ${title}
        </div>

        <div class="analysis-value">
            ${value}
        </div>

    </div>
  `;
}
function prettyKey(k) { return k.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }
function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

/* ---------- CHAT ---------- */
$("#chatForm").addEventListener("submit", async e => {
  e.preventDefault();
  if (!requireRepo()) return;
  const input = $("#chatInput");
  const q = input.value.trim();
  if (!q) return;
  input.value = "";
  appendMsg(q, "user");
  const loading = appendMsg("Thinking…", "bot loading");
  try {
    const data = await api("/chat", { method: "POST", body: JSON.stringify({ repository: state.repository, question: q }) });
    loading.textContent = typeof data.answer === "string" ? data.answer : JSON.stringify(data.answer, null, 2);
    loading.classList.remove("loading");
  } catch (err) {
    loading.textContent = "Error: " + err.message;
    loading.classList.remove("loading");
    loading.style.color = "var(--danger)";
  }
});
function appendMsg(text, cls) {
  const el = document.createElement("div");
  el.className = "msg " + cls;
  el.textContent = text;
  const log = $("#chatLog");
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
  return el;
}

/* ---------- INTERVIEW ---------- */
async function loadDomains() {
  const sel = $("#domainSelect");
  if (!state.repository) { sel.innerHTML = `<option value="">— Upload a repo first —</option>`; return; }
  sel.innerHTML = `<option value="">Loading domains…</option>`;
  try {
    const d = await api(`/interview/domains/${encodeURIComponent(state.repository)}`);
    const list = d.domains || [];
    sel.innerHTML = `<option value="">— Select domain —</option>` + list.map(x => `<option>${escapeHtml(x)}</option>`).join("");
  } catch (e) {
    sel.innerHTML = `<option value="">Error loading domains</option>`;
    toast(e.message, "err");
  }
}
$("#genQuestionsBtn").addEventListener("click", async () => {
  if (!requireRepo()) return;
  const domain = $("#domainSelect").value;
  if (!domain) return toast("Pick a domain.", "err");
  const body = $("#interviewBody");
  body.innerHTML = `<div class="empty">Generating questions…</div>`;
  try {
    const data = await api("/interview/questions", { method: "POST", body: JSON.stringify({ repository: state.repository, domain }) });
    body.innerHTML = renderInterview(data);
  } catch (e) {
    body.innerHTML = `<div class="empty" style="color:var(--danger)">Error: ${e.message}</div>`;
  }
});
function renderInterview(d) {
  const qs = d.questions || [];
  if (!qs.length) return `<div class="empty">No questions returned.</div>`;
  const category = d.category ? `<h3 style="margin:0 0 8px;color:var(--primary)">${escapeHtml(d.category)}</h3>` : "";
  const cards = qs.map(q => `
    <div class="q-card">
      <div class="q-head">
        <h4>${escapeHtml(q.question || "")}</h4>
        ${q.difficulty ? `<span class="diff ${(q.difficulty || "").toLowerCase()}">${escapeHtml(q.difficulty)}</span>` : ""}
      </div>
      ${q.ideal_answer ? `<div class="q-section"><h5>Ideal answer</h5><p>${escapeHtml(q.ideal_answer)}</p></div>` : ""}
      ${listSection("Follow-up questions", q.follow_up_questions)}
      ${listSection("Common mistakes", q.common_mistakes)}
      ${listSection("Related files", q.related_files)}
    </div>
  `).join("");
  return category + cards;
}
function listSection(title, arr) {
  if (!arr || !arr.length) return "";
  return `<div class="q-section"><h5>${title}</h5><ul>${arr.map(x => `<li>${escapeHtml(String(x))}</li>`).join("")}</ul></div>`;
}

/* ---------- RESUME ---------- */
$("#buildResumeBtn").addEventListener("click", async () => {
  if (!requireRepo()) return;
  const body = $("#resumeBody");
  body.innerHTML = `<div class="empty">Building resume…</div>`;
  try {
    const d = await api("/resume", { method: "POST", body: JSON.stringify({ repository: state.repository }) });
    body.innerHTML = `
      <div class="resume-head">
        <h2>${escapeHtml(d.project_title || "Untitled project")}</h2>
        <p>${escapeHtml(d.project_description || "")}</p>
      </div>
      ${d.resume_points && d.resume_points.length ? `
        <div class="resume-section">
          <h3>Resume Bullet Points</h3>
          <ul>${d.resume_points.map(p => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
        </div>` : ""}
      ${d.technologies && d.technologies.length ? `
        <div class="resume-section">
          <h3>Technologies</h3>
          <div class="chips">${d.technologies.map(t => `<span class="chip primary">${escapeHtml(t)}</span>`).join("")}</div>
        </div>` : ""}
    `;
  } catch (e) {
    body.innerHTML = `<div class="empty" style="color:var(--danger)">Error: ${e.message}</div>`;
  }
});
