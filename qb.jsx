import React, { useEffect, useState, useRef } from "react";

/**
 * QuestionBank.jsx
 * A single-file React component (TailwindCSS) that implements:
 * - default question bank (sample data)
 * - AI-generated predictive question generation (simulated & pluggable to an API)
 * - search, filter, pagination
 * - favorites (localStorage)
 * - export as CSV
 * - mobile-responsive, accessible UI with animations
 *
 * Usage:
 * - Drop this component into a React app that uses Tailwind CSS.
 * - To plug a real AI, replace `simulateAiGenerate` with a fetch to your backend
 *   that calls your AI model (OpenAI / Llama / internal service). See comments below.
 */

const SAMPLE_QUESTIONS = [
  {
    id: "q_001",
    text: "Explain the difference between stack and queue. Provide examples and complexity.",
    topic: "Data Structures",
    difficulty: "Medium",
    source: "default",
  },
  {
    id: "q_002",
    text: "Write a function to reverse a linked list. Provide iterative and recursive solutions.",
    topic: "Algorithms",
    difficulty: "Hard",
    source: "default",
  },
  {
    id: "q_003",
    text: "What is normalization in relational databases? Explain 1NF, 2NF, and 3NF.",
    topic: "Databases",
    difficulty: "Easy",
    source: "default",
  },
  {
    id: "q_004",
    text: "Design a RESTful API for a todo application. Detail endpoints and authentication.",
    topic: "Web",
    difficulty: "Medium",
    source: "default",
  },
];

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function QuestionBank() {
  const [questions, setQuestions] = useState(SAMPLE_QUESTIONS);
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("qb_favs") || "[]");
    } catch (e) {
      return [];
    }
  });

  // AI generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationCount, setGenerationCount] = useState(5);
  const [selectedTopic, setSelectedTopic] = useState("General");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medium");
  const genAbortRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("qb_favs", JSON.stringify(favorites));
  }, [favorites]);

  // Derived lists
  const topics = ["All", ...new Set(questions.map((q) => q.topic))];
  const difficulties = ["All", ...new Set(questions.map((q) => q.difficulty))];

  const filtered = questions.filter((q) => {
    const matchesQuery = q.text.toLowerCase().includes(query.toLowerCase());
    const matchesTopic = topicFilter === "All" || q.topic === topicFilter;
    const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    return matchesQuery && matchesTopic && matchesDifficulty;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleFavorite(id) {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  }

  function exportCSV(list) {
    const header = ["id", "question", "topic", "difficulty", "source"];
    const rows = list.map((q) => [q.id, `"${q.text.replace(/"/g, '""')}"`, q.topic, q.difficulty, q.source]);
    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `question_bank_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /*
   * Simulated AI generator (in-browser). Replace this with an API call to your server
   * Example server contract:
   * POST /api/generate-questions
   * body: { topic, difficulty, count }
   * response: { questions: [{ text, topic, difficulty }] }
   */
  async function simulateAiGenerate({ topic, difficulty, count, onProgress, signal }) {
    // simple mocked generator that yields results over time
    const generated = [];
    for (let i = 0; i < count; i++) {
      if (signal && signal.aborted) throw new DOMException("Aborted", "AbortError");
      // create a varied question using templates
      const templates = [
        `Explain core concepts of ${topic} and give a practical example.`,
        `Create a ${difficulty.toLowerCase()} exercise about ${topic} and explain the expected answer.`,
        `Design a mini-project that teaches ${topic} at a ${difficulty.toLowerCase()} level.`,
        `List 5 important subtopics within ${topic} and why they matter.`,
        `Give a short question about ${topic} that tests basics, and provide hints.`,
      ];
      await new Promise((res) => setTimeout(res, 700 + Math.random() * 500)); // simulate latency
      const text = templates[i % templates.length].replace("${topic}", topic).replace("${difficulty}", difficulty);
      const item = { id: uid("ai"), text, topic, difficulty, source: "ai" };
      generated.push(item);
      onProgress?.(Math.round(((i + 1) / count) * 100));
    }
    return generated;
  }

  async function handleGenerate(e) {
    e.preventDefault();
    if (isGenerating) return;
    setIsGenerating(true);
    setProgress(0);
    const controller = new AbortController();
    genAbortRef.current = controller;

    try {
      // If you have a backend endpoint, call it here instead of simulateAiGenerate
      // const resp = await fetch('/api/generate-questions', { method: 'POST', body: JSON.stringify({topic:selectedTopic, difficulty:selectedDifficulty, count:generationCount}), headers:{'Content-Type':'application/json'}, signal:controller.signal })
      // const data = await resp.json(); // expected: { questions: [...] }

      const generated = await simulateAiGenerate({
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        count: generationCount,
        onProgress: setProgress,
        signal: controller.signal,
      });

      // merge deduplicating by text
      setQuestions((prev) => {
        const texts = new Set(prev.map((p) => p.text));
        const merged = [...prev];
        for (const g of generated) if (!texts.has(g.text)) merged.unshift(g);
        return merged;
      });

      setProgress(100);
      setTimeout(() => setProgress(0), 800);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Generation aborted");
      } else {
        console.error(err);
        alert("Failed to generate questions. See console for details.");
      }
    } finally {
      setIsGenerating(false);
      genAbortRef.current = null;
    }
  }

  function cancelGeneration() {
    if (genAbortRef.current) genAbortRef.current.abort();
    setIsGenerating(false);
    setProgress(0);
  }

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header / Controls */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Question Bank</h1>
          <p className="text-gray-400">AI-assisted and default questions — search, filter, export, favorite.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="flex gap-2 items-center">
            <input
              aria-label="Search questions"
              placeholder="Search questions..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="px-3 py-2 rounded-md bg-white/5 border border-white/6 text-sm focus:outline-none"
            />

            <select value={topicFilter} onChange={(e) => { setTopicFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-md bg-white/5 border border-white/6 text-sm">
              {topics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <select value={difficultyFilter} onChange={(e) => { setDifficultyFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-md bg-white/5 border border-white/6 text-sm">
              {difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => exportCSV(filtered)}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold"
            >Export CSV</button>

            <button
              onClick={() => setQuestions(SAMPLE_QUESTIONS)}
              title="Reset to default questions"
              className="px-4 py-2 rounded-md bg-white/5 border border-white/6 text-sm"
            >Reset</button>
          </div>
        </div>
      </header>

      {/* AI Generation Panel */}
      <section className="mb-8 p-4 rounded-lg bg-gradient-to-r from-white/3 to-white/2 border border-white/5">
        <h2 className="text-xl font-semibold mb-2">Generate Predictive Questions (AI)</h2>
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="md:col-span-1">
            <label className="text-sm block mb-1">Topic</label>
            <input value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/6" />
          </div>

          <div>
            <label className="text-sm block mb-1">Difficulty</label>
            <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/6">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="text-sm block mb-1">Count</label>
            <input type="number" min="1" max="20" value={generationCount} onChange={(e) => setGenerationCount(Number(e.target.value))} className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/6" />
          </div>

          <div className="flex gap-2">
            <button disabled={isGenerating} className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold">{isGenerating ? "Generating..." : "Generate"}</button>
            {isGenerating && <button type="button" onClick={cancelGeneration} className="px-3 py-2 rounded-md bg-red-600 text-white">Cancel</button>}
          </div>

          {/* progress */}
          <div className="md:col-span-4 mt-3">
            <div className="w-full bg-white/6 rounded-full h-3 overflow-hidden">
              <div style={{ width: `${progress}%` }} className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 transition-all" />
            </div>
          </div>
        </form>
      </section>

      {/* Questions Grid */}
      <section>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Questions ({filtered.length})</h3>
            <div className="grid gap-3">
              {paged.map((q) => (
                <article key={q.id} className="p-4 rounded-md bg-white/3 border border-white/5">
                  <div className="flex justify-between gap-2">
                    <div>
                      <h4 className="font-semibold">{q.text}</h4>
                      <div className="flex gap-3 text-sm text-gray-300 mt-2">
                        <span className="px-2 py-1 rounded bg-white/4">{q.topic}</span>
                        <span className="px-2 py-1 rounded bg-white/4">{q.difficulty}</span>
                        <span className="px-2 py-1 rounded bg-white/4">{q.source}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => toggleFavorite(q.id)} className={`px-2 py-1 rounded ${favorites.includes(q.id) ? 'bg-yellow-400 text-black' : 'bg-white/5'}`} aria-pressed={favorites.includes(q.id)}>
                        {favorites.includes(q.id) ? '★ Saved' : '☆ Save'}
                      </button>
                      <button onClick={() => exportCSV([q])} className="text-xs px-2 py-1 rounded bg-white/5">Export</button>
                    </div>
                  </div>
                </article>
              ))}

              {paged.length === 0 && <div className="p-6 text-center text-gray-400">No questions match your filters.</div>}

              {/* pagination */}
              <div className="flex items-center gap-3 justify-between mt-3">
                <div className="text-sm text-gray-300">Page {page} of {totalPages}</div>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded bg-white/5">Prev</button>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded bg-white/5">Next</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Favorites & quick actions */}
          <aside className="space-y-4">
            <div className="p-4 rounded-md bg-white/3 border border-white/5">
              <h4 className="font-semibold">Favorites ({favorites.length})</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-200">
                {favorites.length === 0 && <li className="text-gray-400">No favorites yet — save questions you like.</li>}
                {favorites.map((id) => {
                  const q = questions.find((x) => x.id === id);
                  if (!q) return null;
                  return (
                    <li key={id} className="flex justify-between items-start">
                      <div className="max-w-xs truncate">{q.text}</div>
                      <div className="flex gap-2">
                        <button onClick={() => toggleFavorite(id)} className="text-xs px-2 py-1 rounded bg-white/5">Remove</button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 flex gap-2">
                <button onClick={() => exportCSV(questions.filter((q) => favorites.includes(q.id)))} className="px-3 py-2 rounded bg-amber-400 text-black">Export Fav</button>
                <button onClick={() => { setFavorites([]); }} className="px-3 py-2 rounded bg-white/5">Clear</button>
              </div>
            </div>

            <div className="p-4 rounded-md bg-white/3 border border-white/5">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="mt-3 flex flex-col gap-2">
                <button onClick={() => { setQuestions((prev) => [...SAMPLE_QUESTIONS, ...prev]); }} className="px-3 py-2 rounded bg-white/5">Insert Defaults</button>
                <button onClick={() => exportCSV(filtered)} className="px-3 py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Export All Filtered</button>
              </div>
            </div>

            <div className="p-4 rounded-md bg-white/3 border border-white/5">
              <h4 className="font-semibold">About AI</h4>
              <p className="text-sm text-gray-300 mt-2">The AI generator here is simulated. To use real generation, call your backend which integrates an LLM, then return structured questions.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
