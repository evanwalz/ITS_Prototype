import React, { useState } from 'react';
import { Question } from './types';

interface Props {
  question: Question;
  questionNumber: number;
  total: number;
  onAnswer: (correct: boolean) => void;
}

export default function QuestionCard({ question, questionNumber, total, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const isCorrect = selected === question.correct;

  function handleSubmit() {
    if (!selected) return;
    setSubmitted(true);
    setAttempts((a) => a + 1);

    if (!isCorrect && hintsShown < question.hints.length) {
      setHintsShown((h) => h + 1);
    }
  }

  function handleNext() {
    onAnswer(isCorrect);
  }

  function handleTryAgain() {
    setSelected(null);
    setSubmitted(false);
  }

  const typeLabel: Record<string, string> = {
    'multiple-choice': 'Multiple Choice',
    'code-completion': 'Code Completion',
    'debug': 'Debugging',
  };

  const difficultyDots = Array.from({ length: 3 }, (_, i) => (
    <span
      key={i}
      className={`dot ${i < question.difficulty ? 'dot-filled' : ''}`}
    />
  ));

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className="tag">{typeLabel[question.type]}</span>
        <span className="difficulty">{difficultyDots}</span>
        <span className="progress-text">Question {questionNumber} of {total}</span>
      </div>

      <h2 className="question-text">{question.question}</h2>

      {question.codeSnippet && (
        <pre className="code-block"><code>{question.codeSnippet}</code></pre>
      )}

      <div className="options">
        {question.options.map((opt) => {
          let cls = 'option-btn';
          if (submitted) {
            if (opt === question.correct) cls += ' correct';
            else if (opt === selected) cls += ' wrong';
          } else if (opt === selected) {
            cls += ' selected';
          }
          return (
            <button
              key={opt}
              className={cls}
              onClick={() => !submitted && setSelected(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {hintsShown > 0 && (
        <div className="hints">
          {question.hints.slice(0, hintsShown).map((hint, i) => (
            <div key={i} className="hint">
              <span className="hint-icon">💡</span> <strong>Hint {i + 1}:</strong> {hint}
            </div>
          ))}
        </div>
      )}

      {submitted && isCorrect && (
        <div className="feedback correct-feedback">
          <p>✅ <strong>Correct!</strong> {question.explanation}</p>
          {attempts > 1 && (
            <p className="attempt-note">Got it in {attempts} attempt{attempts > 1 ? 's' : ''}.</p>
          )}
          <button className="btn-primary" onClick={handleNext}>
            {questionNumber < total ? 'Next Question →' : 'Finish'}
          </button>
        </div>
      )}

      {submitted && !isCorrect && (
        <div className="feedback wrong-feedback">
          <p>❌ <strong>Not quite.</strong> {hintsShown < question.hints.length
            ? 'A hint has been revealed above — read it and try again.'
            : 'Check the hints above and try once more.'}</p>
          <button className="btn-secondary" onClick={handleTryAgain}>Try Again</button>
          {attempts >= 2 && (
            <button className="btn-skip" onClick={handleNext} style={{ marginLeft: 8 }}>
              Skip &amp; move on
            </button>
          )}
        </div>
      )}

      {!submitted && (
        <button
          className="btn-primary"
          disabled={!selected}
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}
