// ===================== DATA =====================

const SEMESTERS = {
  1: [
    { code: "EC",  name: "Essential Chemistry",               color: 0 },
    { code: "AA",  name: "Applied Algebra",                   color: 1 },
    { code: "BEE", name: "Basic of Electrical Engineering",   color: 2 },
    { code: "PSC", name: "Problem Solving Using C",           color: 3 },
    { code: "CS",  name: "Communication Skills",              color: 4 },
  ],
  2: [
    { code: "EP",  name: "Engineering Physics",               color: 0 },
    { code: "EM",  name: "Engineering Mathematics II",        color: 1 },
    { code: "MS",  name: "Mechanics of Solids",               color: 2 },
    { code: "OOP", name: "Object Oriented Programming (Java)",color: 3 },
    { code: "ENV", name: "Environmental Science",             color: 4 },
  ],
  7: [
    { code: "BDA", name: "Big Data Analytics (Elective-I)",                 color: 0 },
    { code: "ACA", name: "Advanced Computer Architecture (Elective-I CBS)", color: 1 },
    { code: "BDB", name: "Basic of DBMS (Open Elective-II)",                color: 2 },
    { code: "BIG", name: "Big Data Analysis & Business Intelligence (CBS)",  color: 3 },
    { code: "CNS", name: "Cryptography & Network Security",                 color: 4 },
  ],
  8: [
    { code: "ML",  name: "Machine Learning",                  color: 0 },
    { code: "CC",  name: "Cloud Computing",                   color: 1 },
    { code: "IOT", name: "Internet of Things",                color: 2 },
    { code: "NLP", name: "Natural Language Processing",       color: 3 },
    { code: "PE",  name: "Project & Entrepreneurship",        color: 4 },
  ]
};

const YEARS = ["Winter 2025", "Summer 2025", "Winter 2024", "Summer 2024", "Winter 2023"];

const PAPERS = {
  "7_BDA_Winter 2023": {
    topLine: "B.Tech. (Computer Science & Engineering / Information Technology) Seventh Semester (C.B.C.S.)",
    title: "Program Elective-V : Big Data Analytics",
    pages: "2", code: "PSM/KW/23/2882/2904",
    time: "Three Hours", marks: "70",
    notes: [
      "All questions carry marks as indicated.",
      "Solve Question 1 OR Questions No. 2.",
      "Solve Question 3 OR Questions No. 4.",
      "Solve Question 5 OR Questions No. 6.",
      "Solve Question 7 OR Questions No. 8.",
      "Solve Question 9 OR Questions No. 10.",
      "Due credit will be given to neatness and adequate dimensions.",
      "Assume suitable data whenever necessary."
    ],
    questions: [
      { num: "1.", parts: [{ l: "a)", t: "Explain types of digital data.", m: "7" }, { l: "b)", t: "What are Challenges of Big Data? Explain.", m: "7" }] },
      { or: true },
      { num: "2.", parts: [{ l: "a)", t: "With neat & clean diagram explain Big Data Analysis Life Cycle.", m: "7" }, { l: "b)", t: "What are different Sources of Big Data.", m: "7" }] },
      { num: "3.", parts: [{ l: "a)", t: "Explain Characteristics & need of Big Data Analytics.", m: "7" }, { l: "b)", t: "Explain in detail classification of Analytics.", m: "7" }] },
      { or: true },
      { num: "4.", parts: [{ l: "a)", t: "What is Business Intelligence? Explain in detail.", m: "8" }, { l: "b)", t: "Explain different analytical operations.", m: "6" }] },
      { num: "5.", parts: [{ l: "a)", t: "What are essentials of Hadoop Ecosystems?", m: "7" }, { l: "b)", t: "Explain with suitable diagram architecture of Hadoop 3.0.", m: "7" }] },
      { or: true },
      { num: "6.", parts: [{ l: "a)", t: "Explain key advantage and Versions of Hadoop.", m: "10" }, { l: "b)", t: "Write short notes on.\n     i)  HIVE.\n     ii) PIG.", m: "4" }] },
      { num: "7.", parts: [{ l: "a)", t: "Enlist & explain common Serialization Formats.", m: "8" }, { l: "b)", t: "Explain MapReduce programming model with suitable example.", m: "6" }] },
      { or: true },
      { num: "8.", parts: [{ l: "a)", t: "Explain MapReduce framework in detail with neat diagram.", m: "8" }, { l: "b)", t: "Write short note on HDFS Architecture.", m: "6" }] },
      { num: "9.", parts: [{ l: "a)", t: "What is NoSQL? Explain its types with examples.", m: "7" }, { l: "b)", t: "Explain CAP Theorem in detail.", m: "7" }] },
      { or: true },
      { num: "10.", parts: [{ l: "a)", t: "Explain HBase architecture with neat diagram.", m: "7" }, { l: "b)", t: "What is Cassandra? Explain its features in detail.", m: "7" }] },
    ]
  }
};

// ===================== PAPER GENERATOR =====================

function makePaper(sem, code, name, year) {
  const key = `${sem}_${code}_${year}`;
  if (PAPERS[key]) return PAPERS[key];
  const yr = year.match(/\d+/)?.[0]?.slice(-2) || '23';
  return {
    topLine: `B.Tech. Semester ${sem} (C.B.C.S.)`,
    title: name,
    pages: "2",
    code: `PSM/KW/${yr}/${Math.floor(1000 + Math.random() * 8999)}/${Math.floor(1000 + Math.random() * 8999)}`,
    time: "Three Hours", marks: "70",
    notes: [
      "All questions carry marks as indicated.",
      "Solve Question 1 OR Questions No. 2.",
      "Solve Question 3 OR Questions No. 4.",
      "Solve Question 5 OR Questions No. 6.",
      "Solve Question 7 OR Questions No. 8.",
      "Solve Question 9 OR Questions No. 10.",
      "Due credit will be given to neatness and adequate dimensions.",
      "Assume suitable data whenever necessary."
    ],
    questions: [
      { num: "1.", parts: [{ l: "a)", t: `Explain fundamental concepts and types in ${name}.`, m: "7" }, { l: "b)", t: `What are the key challenges in ${name}? Explain.`, m: "7" }] },
      { or: true },
      { num: "2.", parts: [{ l: "a)", t: `With neat & clean diagram explain the lifecycle of ${name}.`, m: "7" }, { l: "b)", t: `What are different sources and applications of ${name}?`, m: "7" }] },
      { num: "3.", parts: [{ l: "a)", t: `Explain characteristics and need of ${name}.`, m: "7" }, { l: "b)", t: `Explain in detail the classification and types.`, m: "7" }] },
      { or: true },
      { num: "4.", parts: [{ l: "a)", t: `What is the importance of ${name}? Explain in detail.`, m: "8" }, { l: "b)", t: `Explain different analytical operations and methods.`, m: "6" }] },
      { num: "5.", parts: [{ l: "a)", t: `What are the essential tools and technologies used in ${name}?`, m: "7" }, { l: "b)", t: `Explain with suitable diagram the complete system architecture.`, m: "7" }] },
      { or: true },
      { num: "6.", parts: [{ l: "a)", t: `Explain key advantages, versions and future scope.`, m: "10" }, { l: "b)", t: `Write short notes on any two relevant sub-topics.`, m: "4" }] },
      { num: "7.", parts: [{ l: "a)", t: `Enlist & explain common formats and standards used in ${name}.`, m: "8" }, { l: "b)", t: `Compare different approaches with suitable examples.`, m: "6" }] },
      { or: true },
      { num: "8.", parts: [{ l: "a)", t: `Explain programming or implementation model with example.`, m: "8" }, { l: "b)", t: `Write short note on system components and their roles.`, m: "6" }] },
      { num: "9.", parts: [{ l: "a)", t: `Explain the theoretical foundation and principles of ${name}.`, m: "7" }, { l: "b)", t: `Explain a key theorem or algorithm with proof or example.`, m: "7" }] },
      { or: true },
      { num: "10.", parts: [{ l: "a)", t: `Explain advanced architecture or design with neat diagram.`, m: "7" }, { l: "b)", t: `What are features and use-cases? Explain in detail.`, m: "7" }] },
    ]
  };
}

// ===================== STATE =====================

const state = { sem: null, subject: null, year: null, history: [] };

// ===================== NAVIGATION =====================

function goTo(id) {
  const cur = document.querySelector('.screen.active');
  if (cur) state.history.push(cur.id);
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goBack() {
  if (state.history.length) {
    const prev = state.history.pop();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(prev).classList.add('active');
    window.scrollTo(0, 0);
  }
}

// ===================== RENDER SEM + SUBJECTS =====================

function renderSemScreen() {
  const grid = document.getElementById('sem-grid');
  grid.innerHTML = '';
  [1, 2, 7, 8].forEach(s => {
    const b = document.createElement('button');
    b.className = 'sem-btn' + (state.sem === s ? ' selected' : '');
    b.textContent = `Semester ${s}`;
    b.addEventListener('click', () => {
      state.sem = s;
      renderSemScreen();
    });
    grid.appendChild(b);
  });
  renderSubjectList();
}

function renderSubjectList() {
  const list = document.getElementById('subject-list');
  if (!state.sem) {
    list.innerHTML = '<div class="empty-hint">Please select a semester above</div>';
    return;
  }
  list.innerHTML = '';
  (SEMESTERS[state.sem] || []).forEach(sub => {
    const d = document.createElement('div');
    d.className = 'subject-item';
    d.innerHTML = `<div class="sub-badge badge-${sub.color}">${sub.code}</div><div class="sub-name">${sub.name}</div><span class="sub-arrow">›</span>`;
    d.addEventListener('click', () => {
      state.subject = sub;
      renderYearScreen();
      goTo('screen-year');
    });
    list.appendChild(d);
  });
}

// ===================== RENDER YEAR =====================

function renderYearScreen() {
  document.getElementById('year-topbar').textContent = state.subject?.name || 'Select Year';
  document.getElementById('year-sub-name').textContent = `Sem ${state.sem} · ${state.subject?.name}`;
  const list = document.getElementById('year-list');
  list.innerHTML = '';
  YEARS.forEach(y => {
    const d = document.createElement('div');
    d.className = 'year-item';
    d.innerHTML = `<span class="year-label">📅 ${y}</span><span class="year-tag">${y.split(' ')[0].toUpperCase()}</span>`;
    d.addEventListener('click', () => {
      state.year = y;
      renderPaper();
      goTo('screen-paper');
    });
    list.appendChild(d);
  });
}

// ===================== RENDER PAPER =====================

function makeBarcodeHTML() {
  const h = [18, 28, 14, 24, 10, 26, 16, 22, 12, 20, 28, 14, 18, 26, 10, 22, 18, 28, 14, 20, 12, 24, 16, 26, 18, 22, 10, 28, 14, 20];
  return `<div class="uni-barcode-wrap"><div class="barcode-img">${h.map(x => `<span style="height:${x}px"></span>`).join('')}</div><div class="barcode-label">* 2 6 1 7 *</div></div>`;
}

function renderPaper() {
  const p = makePaper(state.sem, state.subject.code, state.subject.name, state.year);
  document.getElementById('paper-topbar').textContent = state.year;

  let h = '';

  h += `<div class="uni-top-line">${p.topLine}</div>`;
  h += `<div class="uni-main-title">${p.title}</div>`;

  h += `<div class="uni-meta-row">
    <div class="uni-meta-left">P. Pages : ${p.pages}<br>Time : ${p.time}</div>
    ${makeBarcodeHTML()}
    <div class="uni-meta-right">${p.code}<br>Max. Marks : ${p.marks}</div>
  </div>`;

  h += `<hr class="uni-hr-dash">`;

  h += `<div class="uni-notes-wrap"><div class="uni-notes-flex"><span class="uni-notes-head">Notes :&nbsp;</span><div class="uni-notes-list">`;
  p.notes.forEach((n, i) => {
    h += `<div class="uni-note"><span class="uni-note-n">${i + 1}.</span><span>${n}</span></div>`;
  });
  h += `</div></div></div>`;

  h += `<hr class="uni-hr-dash">`;

  p.questions.forEach(q => {
    if (q.or) { h += `<div class="uni-or-line">OR</div>`; return; }
    h += `<div class="uni-q-wrap">`;
    q.parts.forEach((pt, idx) => {
      h += `<div class="uni-q-line">
        <span class="uni-qn">${idx === 0 ? q.num : ''}</span>
        <span class="uni-ql">${pt.l}</span>
        <span class="uni-qt">${pt.t}</span>
        <span class="uni-qm">${pt.m}</span>
      </div>`;
    });
    h += `</div>`;
  });

  h += `<div class="uni-paper-footer">
    <span>${p.code}</span>
    <span>1</span>
    <span>P.T.O</span>
  </div>`;

  document.getElementById('uni-paper-body').innerHTML = h;
}

// ===================== INIT — runs after DOM is ready =====================

document.addEventListener('DOMContentLoaded', function () {

  // Home back button → browser previous page
  document.getElementById('back-home').addEventListener('click', function () {
    history.back();
  });

  // Home → Question Papers button
  document.getElementById('btn-qp').addEventListener('click', function () {
    goTo('screen-semester');
    renderSemScreen();
  });

  // Back buttons
  document.getElementById('back-semester').addEventListener('click', goBack);
  document.getElementById('back-year').addEventListener('click', goBack);
  document.getElementById('back-paper').addEventListener('click', goBack);

});