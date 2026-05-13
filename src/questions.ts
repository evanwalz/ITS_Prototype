import { Question } from './types';

const questions: Question[] = [
  // ── BASICS ──────────────────────────────────────────────────────────────────
  {
    id: 'b1',
    type: 'multiple-choice',
    concept: 'basics',
    difficulty: 1,
    question: 'A user needs to type in their full name. Which input type should you use?',
    options: ['Textbox', 'Checkbox', 'Dropdown', 'Radio button'],
    correct: 'Textbox',
    hints: [
      'Think about whether the answer is open-ended or from a fixed list.',
      'The user can type anything they want — their name is unique to them.',
    ],
    explanation:
      'A textbox is best for free-form text input where the user types their own value, like a name or address.',
  },
  {
    id: 'b2',
    type: 'multiple-choice',
    concept: 'basics',
    difficulty: 1,
    question: 'A form asks "Do you agree to the Terms of Service?" with a yes/no answer. Which input type fits best?',
    options: ['Textbox', 'Checkbox', 'Dropdown', 'Number input'],
    correct: 'Checkbox',
    hints: [
      'The answer is simply true or false.',
      'Checkboxes represent a boolean (on/off) state.',
    ],
    explanation:
      'Checkboxes are perfect for boolean (true/false) questions. Checking the box means "yes", leaving it unchecked means "no".',
  },
  {
    id: 'b3',
    type: 'multiple-choice',
    concept: 'basics',
    difficulty: 1,
    question: 'A user must pick their country from a list of 195 options. Which input type is most appropriate?',
    options: ['Textbox', 'Checkbox', 'Dropdown', 'Radio button'],
    correct: 'Dropdown',
    hints: [
      'There are too many options to show all at once on screen.',
      'The list is fixed — the user cannot invent a new country.',
    ],
    explanation:
      'Dropdowns are ideal when users must choose one item from a large, fixed list. They save space and prevent invalid input.',
  },
  {
    id: 'b4',
    type: 'multiple-choice',
    concept: 'basics',
    difficulty: 2,
    question: 'A pizza order form lets customers pick multiple toppings (e.g. pepperoni, mushrooms, onions). Which input type should you use for each topping?',
    options: ['Textbox', 'Checkbox', 'Dropdown', 'Radio button'],
    correct: 'Checkbox',
    hints: [
      'The customer can select more than one topping.',
      'Each topping is independently on or off.',
    ],
    explanation:
      'Checkboxes allow multiple independent selections. Radio buttons only allow one selection at a time, so they would be wrong here.',
  },
  {
    id: 'b5',
    type: 'multiple-choice',
    concept: 'basics',
    difficulty: 2,
    question: 'Which of these scenarios is the WRONG use of a dropdown?',
    options: [
      'Choosing a U.S. state from 50 options',
      'Typing a custom message to a friend',
      'Selecting a font size (Small, Medium, Large)',
      'Picking a product category',
    ],
    correct: 'Typing a custom message to a friend',
    hints: [
      'A dropdown only lets you pick from pre-defined options.',
      'Can you type anything you want into a dropdown?',
    ],
    explanation:
      'Dropdowns only work for fixed choices. Free-form text — like a custom message — needs a textbox because the value is unique to the user.',
  },

  // ── IMPLEMENTATION ───────────────────────────────────────────────────────────
  {
    id: 'i1',
    type: 'code-completion',
    concept: 'implementation',
    difficulty: 2,
    question: 'Complete the controlled textbox. What goes in the blank so React tracks the input value?',
    codeSnippet:
`const [name, setName] = useState('');

<input
  type="text"
  ___={name}
  onChange={(e) => setName(e.target.value)}
/>`,
    options: ['value', 'checked', 'defaultValue', 'text'],
    correct: 'value',
    hints: [
      'A controlled component ties the input to a state variable.',
      'For text inputs, the prop that holds the current text is called...',
    ],
    explanation:
      '`value={name}` makes this a controlled input — React owns the displayed text. Without it, the input is uncontrolled and React cannot read or set its value.',
  },
  {
    id: 'i2',
    type: 'code-completion',
    concept: 'implementation',
    difficulty: 2,
    question: 'Complete the controlled checkbox. Which prop should be used instead of `value` to reflect its on/off state?',
    codeSnippet:
`const [agreed, setAgreed] = useState(false);

<input
  type="checkbox"
  ___={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>`,
    options: ['checked', 'value', 'selected', 'active'],
    correct: 'checked',
    hints: [
      'Checkboxes are either checked or unchecked — it\'s a boolean.',
      'The prop name matches the HTML attribute used for checkboxes.',
    ],
    explanation:
      'Checkboxes use `checked` (not `value`) to reflect their boolean state. Using `value` here would not toggle the checkbox correctly.',
  },
  {
    id: 'i3',
    type: 'code-completion',
    concept: 'implementation',
    difficulty: 2,
    question: 'Complete the controlled dropdown. What prop on <select> holds the currently selected option?',
    codeSnippet:
`const [size, setSize] = useState('medium');

<select
  ___={size}
  onChange={(e) => setSize(e.target.value)}
>
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
</select>`,
    options: ['value', 'checked', 'selected', 'defaultValue'],
    correct: 'value',
    hints: [
      'Like a textbox, a <select> uses the same prop to track its current choice.',
      'It\'s the same prop you use for a controlled textbox.',
    ],
    explanation:
      '`value={size}` on a <select> tells React which <option> is currently active. When the user picks a new option, onChange updates the state.',
  },
  {
    id: 'i4',
    type: 'code-completion',
    concept: 'implementation',
    difficulty: 3,
    question: 'Inside an onChange handler for a checkbox, how do you read whether it is now checked?',
    codeSnippet:
`<input
  type="checkbox"
  checked={isAdmin}
  onChange={(e) => setIsAdmin(___)}
/>`,
    options: ['e.target.checked', 'e.target.value', 'e.checked', 'e.target.selected'],
    correct: 'e.target.checked',
    hints: [
      'The event object `e` has a `target` that refers to the DOM element.',
      'For checkboxes the boolean state is stored in a different property than `value`.',
    ],
    explanation:
      '`e.target.checked` gives you the boolean (true/false) for a checkbox. `e.target.value` gives a string and is used for text inputs and selects.',
  },

  // ── DEBUGGING ────────────────────────────────────────────────────────────────
  {
    id: 'd1',
    type: 'debug',
    concept: 'debugging',
    difficulty: 2,
    question: 'This textbox is read-only — the user cannot type in it. What is the bug?',
    codeSnippet:
`const [email, setEmail] = useState('');

<input
  type="text"
  value={email}
/>`,
    options: [
      'Missing onChange handler',
      'Should use defaultValue instead of value',
      'useState should start with null, not an empty string',
      'The input needs a name attribute',
    ],
    correct: 'Missing onChange handler',
    hints: [
      'React controlled inputs need two things: a value prop AND a way to update it.',
      'When the user types, something needs to call the state setter.',
    ],
    explanation:
      'Without an `onChange` handler, React keeps setting the input back to the state value on every keystroke, making it appear read-only. Fix: add `onChange={(e) => setEmail(e.target.value)}`.',
  },
  {
    id: 'd2',
    type: 'debug',
    concept: 'debugging',
    difficulty: 2,
    question: 'This checkbox never appears checked, even when `accepted` is `true`. What is wrong?',
    codeSnippet:
`const [accepted, setAccepted] = useState(false);

<input
  type="checkbox"
  value={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>`,
    options: [
      'Should use `checked` instead of `value`',
      'onChange should use e.target.value',
      'useState default should be true',
      'The type attribute should be "check"',
    ],
    correct: 'Should use `checked` instead of `value`',
    hints: [
      'Which prop controls whether a checkbox is visually ticked?',
      '`value` is for text; checkboxes have their own boolean prop.',
    ],
    explanation:
      'Checkboxes use `checked={accepted}`, not `value`. The `value` prop sets the string submitted in a form, but it has no effect on whether the box is ticked.',
  },
  {
    id: 'd3',
    type: 'debug',
    concept: 'debugging',
    difficulty: 3,
    question: 'The dropdown always shows "apple" no matter what the user picks. What is the bug?',
    codeSnippet:
`const [fruit, setFruit] = useState('apple');

<select value={fruit}>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</select>`,
    options: [
      'Missing onChange — state never updates so value is always "apple"',
      'Should use defaultValue instead of value',
      'The options need a selected attribute',
      'useState initial value must be empty string',
    ],
    correct: 'Missing onChange — state never updates so value is always "apple"',
    hints: [
      'The select is controlled, meaning React drives what it shows.',
      'If the state never changes, what will the dropdown always display?',
    ],
    explanation:
      'Because there is no `onChange`, `fruit` stays "apple" forever. Fix: add `onChange={(e) => setFruit(e.target.value)}` so the state updates when the user picks a new option.',
  },
  {
    id: 'd4',
    type: 'debug',
    concept: 'debugging',
    difficulty: 3,
    question: 'A developer wants to collect multiple checkbox selections into an array. What is wrong with this code?',
    codeSnippet:
`const [toppings, setToppings] = useState([]);

function handleChange(e) {
  setToppings(e.target.value);  // bug is here
}

<input type="checkbox" value="pepperoni" onChange={handleChange} />
<input type="checkbox" value="mushrooms" onChange={handleChange} />`,
    options: [
      'setToppings should toggle the item in/out of the array, not replace with e.target.value',
      'Checkboxes cannot have a value attribute',
      'Should use e.target.checked instead of e.target.value',
      'useState must be initialized with null for arrays',
    ],
    correct: 'setToppings should toggle the item in/out of the array, not replace with e.target.value',
    hints: [
      'What is the current type of `e.target.value` here?',
      'The state is an array — replacing it with a single string loses all other selections.',
    ],
    explanation:
      '`e.target.value` is a string like "pepperoni". Calling `setToppings("pepperoni")` replaces the whole array. Instead, toggle: if checked, add the value to the array; if unchecked, filter it out.',
  },
];

export default questions;
