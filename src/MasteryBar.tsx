import React from 'react';
import { MasteryState } from './types';

interface Props {
  mastery: MasteryState;
}

const labels: Record<keyof MasteryState, string> = {
  basics: 'Basics',
  implementation: 'Implementation',
  debugging: 'Debugging',
};

export default function MasteryBar({ mastery }: Props) {
  return (
    <div className="mastery-panel">
      <h3>Your Mastery</h3>
      {(Object.keys(mastery) as (keyof MasteryState)[]).map((key) => (
        <div key={key} className="mastery-row">
          <span className="mastery-label">{labels[key]}</span>
          <div className="mastery-track">
            <div
              className="mastery-fill"
              style={{ width: `${mastery[key]}%` }}
            />
          </div>
          <span className="mastery-pct">{mastery[key]}%</span>
        </div>
      ))}
    </div>
  );
}
