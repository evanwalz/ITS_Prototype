import React, { useState } from 'react';
import questions from './questions';
import { MasteryState, AppScreen } from './types';
import QuestionCard from './QuestionCard';
import MasteryBar from './MasteryBar';
import './App.css';

const MASTERY_LOSS = 5;    // points lost for a wrong answer

function clamp(n: number) {
  return Math.min(100, Math.max(0, n));
}

// calculate gain per question so each concept can reach 100%
function masteryGain(concept: string) {
  const count = questions.filter((q) => q.concept === concept).length;
  return Math.round(100 / count);
}

type ConceptFilter = 'basics' | 'implementation' | 'debugging';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mastery, setMastery] = useState<MasteryState>({
    basics: 0,
    implementation: 0,
    debugging: 0,
  });
  const [selected, setSelected] = useState<ConceptFilter[]>(['basics', 'implementation', 'debugging']);

  function toggleConcept(concept: ConceptFilter) {
    setSelected((prev) =>
      prev.includes(concept)
        ? prev.length > 1 ? prev.filter((c) => c !== concept) : prev  // keep at least one
        : [...prev, concept]
    );
  }

  function buildOrdered(filter: ConceptFilter[]) {
    return [...questions]
      .filter((q) => filter.includes(q.concept as ConceptFilter))
      .map((q) => ({ q, r: Math.random() }))
      .sort((a, b) => a.q.difficulty - b.q.difficulty || a.r - b.r)
      .map(({ q }) => q);
  }

  // shuffle once on mount, sorted by difficulty with randomness within each tier
  const [ordered, setOrdered] = useState(() => buildOrdered(['basics', 'implementation', 'debugging']));

  const current = ordered[currentIndex];

  function handleAnswer(correct: boolean) {
    const concept = current.concept;
    setMastery((prev) => ({
      ...prev,
      [concept]: clamp(prev[concept] + (correct ? masteryGain(concept) : -MASTERY_LOSS)),
    }));

    if (currentIndex + 1 >= ordered.length) {
      setScreen('complete');
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function restart() {
    setCurrentIndex(0);
    setMastery({ basics: 0, implementation: 0, debugging: 0 });
    setSelected(['basics', 'implementation', 'debugging']);
    setScreen('intro');
  }

  function startQuiz() {
    setOrdered(buildOrdered(selected));
    setCurrentIndex(0);
    setMastery({ basics: 0, implementation: 0, debugging: 0 });
    setScreen('quiz');
  }

  const overallMastery = Math.round(
    (mastery.basics + mastery.implementation + mastery.debugging) / 3
  );

  if (screen === 'intro') {
    return (
      <div className="app">
        <div className="intro-screen">
          <h1>📋 React Form Inputs</h1>
          <h2>Interactive Tutoring System</h2>
          <p className="intro-desc">
            Learn <strong>when</strong> and <strong>how</strong> to use textboxes, checkboxes,
            and dropdowns in React. You'll answer questions, complete code snippets, and
            debug broken components.
          </p>

          <div className="intro-modules">
            {([
              { key: 'basics', icon: '📖', label: 'Basics', desc: 'When to use each input type' },
              { key: 'implementation', icon: '⌨️', label: 'Implementation', desc: 'Controlled components in React' },
              { key: 'debugging', icon: '🐛', label: 'Debugging', desc: 'Find and fix common mistakes' },
            ] as { key: ConceptFilter; icon: string; label: string; desc: string }[]).map(({ key, icon, label, desc }) => (
              <div
                key={key}
                className={`module-card ${selected.includes(key) ? 'module-selected' : 'module-unselected'}`}
                onClick={() => toggleConcept(key)}
              >
                <span className="module-icon">{icon}</span>
                <strong>{label}</strong>
                <p>{desc}</p>
                <span className="module-check">{selected.includes(key) ? '✅' : '⬜'}</span>
              </div>
            ))}
          </div>

          <div className="intro-tips">
            <h3>How it works</h3>
            <ul>
              <li>Wrong answers reveal <strong>progressive hints</strong> — try to use them before guessing again.</li>
              <li>Your <strong>mastery score</strong> per topic updates in real time.</li>
              <li>After 2 wrong attempts you can skip a question.</li>
            </ul>
          </div>

          <button className="btn-primary btn-large" onClick={startQuiz}>
            Start Learning ({selected.length === 3 ? 'All modules' : `${selected.length} module${selected.length > 1 ? 's' : ''}`}) →
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'complete') {
    const grade =
      overallMastery >= 80 ? '🎉 Excellent!' :
      overallMastery >= 60 ? '👍 Good job!' :
      overallMastery >= 40 ? '📚 Keep practicing!' :
      '💪 Review the concepts and try again!';

    return (
      <div className="app">
        <div className="complete-screen">
          <h1>Session Complete!</h1>
          <p className="grade">{grade}</p>
          <p className="overall-score">Overall mastery: <strong>{overallMastery}%</strong></p>
          <MasteryBar mastery={mastery} />

          <div className="complete-tips">
            {mastery.basics < 60 && (
              <p>⚠️ Review <strong>when to use each input type</strong> — focus on the Basics section.</p>
            )}
            {mastery.implementation < 60 && (
              <p>⚠️ Practice <strong>controlled components</strong> — pay attention to `value` vs `checked`.</p>
            )}
            {mastery.debugging < 60 && (
              <p>⚠️ Work on <strong>spotting common bugs</strong> — especially missing onChange handlers.</p>
            )}
          </div>

          <button className="btn-primary btn-large" onClick={restart}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-title">Form Inputs ITS</div>
        <MasteryBar mastery={mastery} />
        <div className="sidebar-note">
          <p>+points for correct answers</p>
          <p>−{MASTERY_LOSS}% for wrong answers</p>
        </div>
      </aside>

      <main className="main-content">
        <QuestionCard
          key={current.id}
          question={current}
          questionNumber={currentIndex + 1}
          total={ordered.length}
          onAnswer={handleAnswer}
        />
      </main>
    </div>
  );
}
