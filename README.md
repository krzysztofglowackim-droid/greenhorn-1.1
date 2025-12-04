## Puzzle Sequence Creator (Template)

This folder contains a **self‑contained web template** for building and playing a *puzzle chain* consisting of:

- **Intro slides** (any number)
- For each step:
  - **Main riddle** (any of 5 puzzle types)
  - **Second Chance Riddle** (always a closed question)
  - **Explanation** (short text with restart / continue options)

Everything is defined as **plain JavaScript data** in `app.js`, so you can edit puzzles without touching the engine.

### How to Run

- Open `index.html` in a modern browser (Chrome, Edge, etc.).
- You’ll see:
  - Intro slide 1
  - Intro slide 2
  - Main riddle 1 → Second chance → Explanation (if needed)
  - Main riddle 2, etc.

No build tools or server are required.

### Where to Edit Puzzles

Open `app.js` and find the `puzzleSequence` object near the top. It has:

- `title`: name of the whole sequence
- `introSlides`: array of intro slides:
  - `{ type: "intro", title?: string, text: string }`
- `steps`: array of **chain steps**, each with:
  - `name`: label like `"Main riddle I"`
  - `main`: one of the five puzzle types
  - `secondChance`: **closedQuestion** puzzle
  - `explanation`: `{ title?: string, text: string }`

You can **add / remove / reorder** steps by editing this array.

### Puzzle Type Templates

You can copy‑paste and adjust these shapes when editing `steps`:

- **Closed question** – two options, one correct:

```js
{
  type: "puzzle",
  puzzleKind: "closedQuestion",
  question: "Your question here?",
  options: ["Answer A", "Answer B"],
  correctIndex: 0 // or 1
}
```

- **Basket question** – 2 baskets, 5 items:

```js
{
  type: "puzzle",
  puzzleKind: "basketQuestion",
  prompt: "Sort the items into the correct baskets.",
  baskets: ["Left basket label", "Right basket label"],
  items: [
    { label: "Item 1", correctBasketIndex: 0 },
    { label: "Item 2", correctBasketIndex: 1 },
    { label: "Item 3", correctBasketIndex: 0 },
    { label: "Item 4", correctBasketIndex: 1 },
    { label: "Item 5", correctBasketIndex: 0 }
  ]
}
```

- **Chain builder** – 3 elements, correct order:

```js
{
  type: "puzzle",
  puzzleKind: "chainBuilder",
  prompt: "Place the events in the correct order.",
  elements: ["First in order", "Second in order", "Third in order"]
}
```

- **Pair matching** – 4 left, 4 right:

```js
{
  type: "puzzle",
  puzzleKind: "pairMatching",
  prompt: "Match each item on the left with one on the right.",
  left: ["L1", "L2", "L3", "L4"],
  right: ["R1", "R2", "R3", "R4"],
  // mapping[i] = index in right[] that correctly matches left[i]
  mapping: [2, 0, 3, 1]
}
```

- **Logic minefield** – 4 statements, 1 correct:

```js
{
  type: "puzzle",
  puzzleKind: "logicMinefield",
  prompt: "Only one of these statements is true.",
  statements: [
    "Statement A",
    "Statement B",
    "Statement C",
    "Statement D"
  ],
  correctIndex: 2
}
```

### Flow Logic (Player Mode)

For each step:

1. **Main riddle** is shown.
2. If answer is **correct** → jump to **next step’s main riddle** (or to the end if it was the last).
3. If answer is **incorrect** → go to **Second Chance Riddle** (closed question).
4. On second chance:
   - If correct → jump to **next step’s main riddle**.
   - If incorrect → go to **Explanation** screen.
5. On **Explanation**:
   - Player can **restart from the beginning** (back to intro 1).
   - Or **continue to next step’s main riddle** (or end, if it was the last).

You now have a reusable **template + engine**: just adjust the data in `puzzleSequence` and reload the page to get a new puzzle chain.


