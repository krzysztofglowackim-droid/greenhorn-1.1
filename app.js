// Simple puzzle-sequence engine
// You can edit the `puzzleSequence` object below to define your own content.

const STORAGE_KEY = "puzzleSequence_v1"; // legacy single-sequence key (kept for migration)
const LIBRARY_KEY = "puzzleSequenceLibrary_v1";
const MUSIC_SPARTANS = "Dance of the Spartans - Ancient Greek Music.mp3";
const MUSIC_FOREST = "Fairy Lands _ FANTASY MUSIC in a Magical Forest _ Fantasy Ambience [syp6Lsd8HOo].mp3";
const SFX_FAIL = "Fail sound effect.mp3";
const SFX_REWARD = "Video Game Reward Sound  Sound Effect (HD).mp3";

/**
 * Types reference (for your content editing):
 *
 * Slide:
 * - { type: "intro", title?: string, text: string }
 *
 * Puzzle types (type: "puzzle", puzzleKind: "..."):
 *
 * - Closed question
 *   { type: "puzzle", puzzleKind: "closedQuestion",
 *     question: string,
 *     options: [string, string],
 *     correctIndex: 0 | 1 }
 *
 * - Basket question (2 baskets, 5 items)
 *   { type: "puzzle", puzzleKind: "basketQuestion",
 *     prompt: string,
 *     baskets: [string, string],
 *     items: [{ label: string, correctBasketIndex: 0 | 1 }, ...5] }
 *
 * - Chain builder (3 elements, correct order)
 *   { type: "puzzle", puzzleKind: "chainBuilder",
 *     prompt: string,
 *     elements: [string, string, string] } // correct order
 *
 * - Pair matching (4 left, 4 right)
 *   { type: "puzzle", puzzleKind: "pairMatching",
 *     prompt: string,
 *     left: [string, string, string, string],
 *     right: [string, string, string, string],
 *     // mapping[i] is index in right[] that correctly matches left[i]
 *     mapping: [number, number, number, number] }
 *
 * - Logic minefield (4 statements, only 1 correct)
 *   { type: "puzzle", puzzleKind: "logicMinefield",
 *     prompt: string,
 *     statements: [string, string, string, string],
 *     correctIndex: 0 | 1 | 2 | 3 }
 *
 * Step (one "main riddle" with second chance, explanation and optional context between steps):
 * - {
 *     name: string, // for display, e.g. "Main riddle 1"
 *     main: Puzzle,
 *     secondChance: ClosedQuestionPuzzle,
 *     explanation: { title?: string, text: string },
 *     context?: { title?: string, text: string } // scientific context shown between this step and the next main riddle
 *   }
 *
 * Full sequence:
 * - {
 *     title: string,
 *     introSlides: Array<IntroSlide>,
 *     steps: Array<Step>,
 *     endScreen?: { title?: string, text: string }
 *   }
 */

const defaultPuzzleSequence = {
  title: "The Nile That Carves Power",
  introSlides: [
    {
      type: "intro",
      title: "The River That Organizes Lives",
      text:
        "Each year a brown wall of water creeps over the sand, then crawls back and leaves a thin green scar.\n\n" +
        "People cling to that strip; beyond it, only stone and heat.\n\n" +
        "If the river’s mood decides hunger or plenty, who really commands the valley—the villages, or something larger?",
    },
    {
      type: "intro",
      title: "You, the Watcher of Water",
      text:
        "You are **Tarek**, a quiet observer who walks the Nile’s edge with ink-stained fingers and sharp eyes.\n\n" +
        "You watch fields, gates, and quarrels, caring only about who eats and who starves.\n\n" +
        "Again and again, people ask your advice. Your task is simple: follow the water, and decide which kind of power must grow along it.",
    },
  ],
  steps: [
    {
      name: "Step 1 – Rhythm of the Flood",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You walk a long, thin strip of green pinned between burning desert and the Nile. Each year the river swells over its banks, " +
          "drowns the fields, then quietly falls and leaves a brief moment of wet, black mud; if families miss that moment, their crops fail.\n\n" +
          "Some elders boast they can follow their own private moons and lucky days, while others beg you to help them shape the year around the river’s rise and fall.\n\n" +
          "What rhythm for the valley’s work do you advise them to follow?",
        options: [
          "A) Hold to one shared rhythm set by the flood.",
          "B) Let each family follow its own private calendar and ignore the river’s timing.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Water comes only once on its own schedule, soaking the fields and then draining away while one family plants too early into dry dust and another too late into cracked ground.\n\n" +
          "In a land where water visits briefly and leaves, how tightly must families fit their work to that visiting water?",
        options: ["A) Plant whenever they like.", "B) Fit their work tightly to the visiting water."],
        correctIndex: 1,
      },
      explanation: {
        title: "The River’s Clock",
        text:
          "You realise the flood is the real clock: if people ignore its brief, wet moment, no belief or private date can make seeds grow in dry sand.\n\n" +
          "To eat, they must bend their year to the river’s rhythm, not the other way around.",
      },
      context: {
        title: "Rhythm and environmental determinism",
        text:
          "This step illustrates environmental determinism in floodplain agriculture: crop success depends on synchronising labour with a regular but narrow natural window.\n\n" +
          "Calendrical coordination arises from the need to match human activity to an exogenous hydrological cycle. It foreshadows how shared timekeeping becomes a precondition for survival in the Nile valley.",
      },
    },
    {
      name: "Step 2 – Valley Jobs, Village Hands",
      main: {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt:
          "You travel downstream past many villages strung like beads along the same river. At a meeting of elders they hand you five little clay job‑cards and two baskets.\n\n" +
          "Basket 1 is for jobs one village can mostly handle alone. Basket 2 is for jobs that many villages or the whole river must share.\n\n" +
          "Look at the job‑cards and baskets below and decide where each job belongs.",
        baskets: ["One village mostly alone", "Many villages / whole river together"],
        items: [
          { label: "Fixing a tiny ditch into one family’s field.", correctBasketIndex: 0 },
          { label: "Measuring flood height along the river and warning if it is too high or too low.", correctBasketIndex: 1 },
          { label: "Cleaning mud from a small village well.", correctBasketIndex: 0 },
          { label: "Storing spare grain from many villages together for bad years.", correctBasketIndex: 1 },
          {
            label: "Choosing one shared ‘New Year’s Day’ when everyone starts counting the flood and farm year.",
            correctBasketIndex: 1,
          },
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Picture a single village, far up the valley, deciding alone how high the flood is “for everyone”, building its own tiny grain pile and setting its own New Year while dozens of other villages do something different.\n\n" +
          "In that picture, can one village by itself really decide the flood height for all, store food for many, and fix the calendar for the whole valley?",
        options: ["A) Yes, one village can do all that alone.", "B) No, those tasks must be shared along the river."],
        correctIndex: 1,
      },
      explanation: {
        title: "Jobs that stretch along the river",
        text:
          "You see that mending a ditch or cleaning one well serves just that village, but knowing the river’s behaviour, sharing grain across bad years, and sharing a starting day all bind many villages at once.\n\n" +
          "Those river-wide jobs must live in Basket 2, where many hands and shared rules reach along the Nile.",
      },
      context: {
        title: "Local versus supra-local public goods",
        text:
          "This step distinguishes local public goods (village wells, field ditches) from supra-local or regional public goods (flood monitoring, inter-village storage, shared calendars).\n\n" +
          "The latter require coordination across communities because benefits and risks are distributed along the river system. Such tasks naturally push societies toward larger-scale institutions.",
      },
    },
    {
      name: "Step 3 – When Rivers Cross Wills",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now know some flood jobs—measuring the whole river, storing grain from many places, choosing a shared calendar—tie dozens of villages together, each with its own proud elders.\n\n" +
          "Each year their arguments over rules send different opening and closing times down the line so that up‑river choices can flood or starve down‑river farmers.\n\n" +
          "The elders ask your advice about how decisions along the river should be made.",
        options: [
          "A) We need one shared center whose flood rules everyone along the river follows, even if some complain.",
          "B) It is enough to let equal villages argue from scratch every year and hope they agree in time.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You imagine one village opening its canals early to grab water while a neighbour opens late to save theirs, and far down‑river farmers watching the level jerk and lurch instead of flowing steadily.\n\n" +
          "In that picture, can down‑river people count on a fair, predictable flow if every village just argues each year?",
        options: ["A) Yes, argument is enough.", "B) No, they need one shared rule-giver."],
        correctIndex: 1,
      },
      explanation: {
        title: "Why a center appears",
        text:
          "You realise that when one shared river links many fields, uncoordinated local rules become weapons, not customs, and down‑river farmers pay for up‑river quarrels.\n\n" +
          "A single, valley‑wide rule‑giver reduces those clashes, even if some villages grumble.",
      },
      context: {
        title: "Central coordination and externalities",
        text:
          "This step introduces the need for central coordination in managing common‑pool resources that cross jurisdictions.\n\n" +
          "Upstream–downstream externalities mean local decisions impose costs on others, making purely decentralised governance fragile. Central authority emerges as a solution to coordination and conflict in river‑basin management.",
      },
    },
    {
      name: "Step 4 – From Flood to Throne",
      main: {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt:
          "Sitting by the river at dusk, you line up three clay tiles that tell parts of one story (shown below).\n\n" +
          "Drag the tiles into the correct because → therefore order.",
        elements: [
          "The Nile flood is strong, helpful, but risky and must be watched each year.",
          "People need valley‑wide planning: shared calendar, big canals, grain stores that link many villages.",
          "A permanent high authority (pharaoh plus officials) appears to organise and enforce that planning along the whole river.",
        ],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Do people first invent a high authority and wide planning for no reason and only later notice that the river is dangerous, " +
          "or do they first face a powerful, risky flood and then build broader planning and, at last, someone to run it?\n\n" +
          "Which ordering feels more natural to you?",
        options: [
          "A) Authority and planning appear before the flood problem.",
          "B) The flood pushes people into planning, which then calls for authority.",
        ],
        correctIndex: 1,
      },
      explanation: {
        title: "Tiles in the causal chain",
        text:
          "You see that the ever‑returning, risky flood is the first shove, forcing villages into valley‑wide planning, and that once those wide tasks exist, a permanent authority grows to hold them together.\n\n" +
          "The throne is the last tile in a chain whose first piece is water, not ambition.",
      },
      context: {
        title: "Hydraulic state hypotheses",
        text:
          "This step sketches a causal narrative consistent with aspects of the “hydraulic state” hypothesis: environmental pressures (regular but risky floods) motivate large‑scale infrastructure and coordination.\n\n" +
          "Complex, valley‑wide projects then create demand for enduring central authority to plan and enforce them.",
      },
    },
    {
      name: "Step 5 – Tools for a Long River",
      main: {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt:
          "You now picture the Nile as a long, narrow ribbon of green with villages stretched in a line, all bound to the same flood.\n\n" +
          "Below you see four problems on the left and four social tools on the right. Drag each tool from the right onto the problem on the left that it best answers.",
        left: [
          "1) The river is long, with many villages one behind another that all need rules that reach far.",
          "2) In good flood years there is extra grain; in bad years there is almost none, and people risk starving.",
          "3) Huge canals and dikes need thousands of workers at the same time, not just one village’s few people.",
          "4) Farmers far apart share the same river water and must match their farm year if they open and close gates together.",
        ],
        right: [
          "A) Central storehouses that take some grain as tax and release it during famines.",
          "B) A shared written calendar announced for all Egypt.",
          "C) Officials who can call up labour from many villages at once.",
          "D) A single ruler whose commands are meant to run along the whole river.",
        ],
        // mapping[i] is index of right[] that correctly matches left[i]
        mapping: [3, 0, 2, 1],
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Focus on the problem of feast and famine: in fat years grain overflows, in thin years people face empty jars.\n\n" +
          "For that specific problem, which tool directly moves grain **through time**?",
        options: [
          "A) A storehouse that fills in good years and empties in bad.",
          "B) A calendar that names the months.",
          "C) A ruler’s order with no granary behind it.",
        ],
        correctIndex: 0,
      },
      explanation: {
        title: "Matching problems to tools",
        text:
          "You realise long‑distance rules need commands that travel (the ruler), feast–famine cycles need granaries, giant works need officials to gather labour, and synchronised farming needs a shared calendar.\n\n" +
          "Each social tool answers a different wound that the river’s length and rhythm cut into village life.",
      },
      context: {
        title: "Functional responses to environmental problems",
        text:
          "This step maps concrete environmental and organisational problems to institutional responses: monarchy provides unified command, granaries smooth intertemporal shocks, bureaucrats mobilise large labour forces, and calendars synchronise distributed activities.\n\n" +
          "It illustrates functionalist reasoning: specific state tools evolve to solve specific coordination and risk‑management problems.",
      },
    },
    {
      name: "Step 6 – Why the Center Hardens",
      main: {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt:
          "You have traced a chain: dangerous but regular floods → need for valley‑wide planning and tools (calendars, canals, granaries) → need for someone whose orders and records stretch along the whole Nile.\n\n" +
          "Now four storytellers speak, and you must choose the one who doesn’t insult this chain:",
        statements: [
          "“The Nile’s flood made strong kings inevitable because people really loved fancy crowns and wanted kings only for decoration.”",
          "“The Nile’s flood made strong kings likely because only a central authority could reliably coordinate flood works, record harvests, and move food along the whole river year after year.”",
          "“The Nile’s flood had nothing to do with power; central rule came only from wars with neighbours, and flood work was added later just for fun.”",
          "“The Nile’s flood removed the need for any rulers, because the river watered farms perfectly without human planning.”",
        ],
        correctIndex: 1,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Look back at your own tiles: flood → planning → authority. Ask whether the central authority in that chain appears as a toy added on top, or as the thing that keeps the whole flood‑planning system working.\n\n" +
          "What role best fits the ruler in that chain: decoration, or necessary glue for valley‑wide work?",
        options: ["A) Decoration.", "B) Necessary glue for valley‑wide work."],
        correctIndex: 1,
      },
      explanation: {
        title: "Kings as organisers, not ornaments",
        text:
          "You see that crowns alone explain nothing: in your chain, central power is the organiser of calendars, canals, and granaries that the flood demands, not a bauble pinned on later.\n\n" +
          "The sensible story is the one that treats kings as likely outcomes of managing the Nile, not as random ornaments or enemies of planning.",
      },
      context: {
        title: "Evaluating causal narratives",
        text:
          "This step evaluates competing causal narratives for state formation in ancient Egypt.\n\n" +
          "Environmental‑management accounts tie central power to the need for coordinated irrigation, taxation, and redistribution, whereas purely decorative or flood‑independent stories ignore those structural pressures.",
      },
    },
    {
      name: "Step 7 – Why Power Becomes a Cage",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "You now stand on a narrow strip of green pinned between deserts, where villages cannot easily wander off to find new farmland. Flood jobs and grain storing must be done every single year, and over centuries people grow used to central calendars, scribes, and granaries that help them survive bad times.\n\n" +
          "Which explanation better captures why, once built, strong central authority became hard to escape in Egypt?",
        options: [
          "A) Repeating flood work, narrow geography and dependence on granaries and scribes tie people into the system.",
          "B) Farmers simply enjoy being ordered about.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Think of the farmers you have watched: do they obey because commands feel fun, or because their water, grain, and timing now run through central hands that they rely on to live?\n\n" +
          "Is their obedience better explained by enjoyment of being ordered, or by dependence on a system that manages floods and famine?",
        options: ["A) Enjoyment of being ordered.", "B) Dependence on the flood‑management system."],
        correctIndex: 1,
      },
      explanation: {
        title: "Exit is costly",
        text:
          "You recognise that repeating flood work, narrow geography, and dependence on granaries and scribes all tie people into the central web, while the idea that farmers obey “for fun” ignores the hard facts of hunger and desert.\n\n" +
          "Power hardens because exit is costly and the system holds crucial survival tools, not because subjects love commands.",
      },
      context: {
        title: "Path dependence and structural coercion",
        text:
          "This step explores path dependence and structural coercion in state formation.\n\n" +
          "Annual tasks, geographic constraints, and institutional dependence create high exit costs and make central authority sticky.",
      },
    },
    {
      name: "Step 8 – The Shape Carved by Water",
      main: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "At last you gather what you have seen: (1) life clings to a narrow Nile strip with desert on both sides; (2) a risky but regular flood forces everyone into one shared rhythm; (3) big, repeated river jobs and grain storage link many villages; (4) a central ruler and officials are the simplest way found so far to keep these valley‑wide tasks running every year.\n\n" +
          "When someone says, “Egyptian central authority was just a random habit—villages could easily have done all flood work separately without long‑lasting rulers if they had simply chosen to,” how do you respond?",
        options: [
          "A) No, the Nile’s flood cycle and valley shape strongly pushed Egypt toward lasting central authority.",
          "B) Yes, it was just a habit; the river and valley didn’t push them much at all.",
        ],
        correctIndex: 0,
      },
      secondChance: {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question:
          "Imagine each village suddenly “going solo” with its own canals, its own calendar, its own grain store, all on a single shared river whose water and silt ignore village borders.\n\n" +
          "In that picture, would the shared river, shared canals, shared grain stores, and shared rhythm still work smoothly for everyone?",
        options: ["A) Yes, they would still work smoothly.", "B) No, the shared system would quickly break down."],
        correctIndex: 1,
      },
      explanation: {
        title: "The shape carved by water",
        text:
          "You see that the Nile’s narrow line and tireless floods carve a certain shape into human life, making valley‑wide planning not a luxury but a condition for survival.\n\n" +
          "Central authority is not an accident here; it is the simplest way these people found to live with their river.",
      },
      context: {
        title: "Structure versus whim",
        text:
          "This capstone contrasts voluntarist explanations (“they just chose kings”) with structural ones that stress environmental and infrastructural constraints.\n\n" +
          "In a tightly constrained ecology, decentralised alternatives may be technically possible but practically unstable. Centralisation becomes a likely outcome of Nile hydrology and valley geography rather than pure cultural whim.",
      },
    },
  ],
  endScreen: {
    title: "Your Walk Along the Nile",
    text:
      "Your walk along the Nile ends as the flood quietly drains back into its bed, leaving a green ribbon and a web of rules behind.\n\n" +
      "You have watched how a dangerous, regular river forces people into shared calendars, canals, granaries, and labour, and how those valley‑wide jobs call forth a central authority to hold them together.\n\n" +
      "You have seen that local versus regional tasks, upstream–downstream conflicts, geography, and institutional dependence all shape whether power can stay scattered or must harden into a pharaoh and officials.\n\n" +
      "In the end, the Nile is not just water: it is a machine that carves calendars, granaries, and kings out of mud, showing how environment, coordination, and centralised rule can grow from the same flood.",
  },
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadSequenceFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // basic sanity check
    if (!parsed || typeof parsed !== "object" || !parsed.steps || !parsed.introSlides) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function loadLibraryFromStorage() {
  let library = [];

  // Try new library format first
  try {
    const rawLib = window.localStorage.getItem(LIBRARY_KEY);
    if (rawLib) {
      const parsedLib = JSON.parse(rawLib);
      if (Array.isArray(parsedLib)) {
        library = parsedLib;
      }
    }
  } catch {
    // ignore and fall back
  }

  // Legacy single-sequence storage as an extra sequence, if nothing else exists
  if (library.length === 0) {
    const single = loadSequenceFromStorage();
    if (single) {
      single.id = "seq-legacy-1";
      library.push(single);
    }
  }

  // Always ensure the Nile default sequence is present at least once
  const hasNile = library.some((seq) => seq && seq.title === defaultPuzzleSequence.title);
  if (!hasNile) {
    const def = deepClone(defaultPuzzleSequence);
    def.id = `seq-${library.length + 1}`;
    library.unshift(def);
  }

  // Ensure every sequence has an id
  library.forEach((seq, idx) => {
    if (seq && !seq.id) {
      seq.id = `seq-${idx + 1}`;
    }
  });

  return library;
}

function saveLibraryToStorage(library) {
  try {
    window.localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  } catch {
    // ignore storage errors
  }
}

// Backwards-compatible wrapper used in editor code: just saves the whole library.
function saveSequenceToStorage() {
  saveLibraryToStorage(sequenceLibrary);
}

// --- Global sequence library ---

let sequenceLibrary = loadLibraryFromStorage();
let currentSequenceIndex = 0;
let puzzleSequence = sequenceLibrary[currentSequenceIndex];
let musicAudio = null;
let currentMusicTrack = null;
let musicEnabled = true;
let sfxFailAudio = null;
let sfxRewardAudio = null;

// --- Lightweight Markdown renderer (bold, italics, line breaks) ---

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function markdownToHtml(text) {
  if (!text) return "";
  let out = escapeHtml(String(text));
  // bold **text**
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // italic *text*
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // line breaks
  out = out.replace(/\r\n|\r|\n/g, "<br>");
  return out;
}

function setMarkdown(el, text) {
  el.innerHTML = markdownToHtml(text);
}

function splitIntoSentences(text) {
  if (!text) return [];
  const normalized = String(text).replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const sentences = [];

  normalized.split(/\n{2,}/).forEach((para) => {
    let acc = "";
    const parts = para.split(/([.!?])/);
    for (let i = 0; i < parts.length; i++) {
      const chunk = parts[i];
      if (!chunk) continue;
      acc += chunk;
      if (/[.!?]/.test(chunk)) {
        const s = acc.trim();
        if (s) sentences.push(s);
        acc = "";
      }
    }
    const tail = acc.trim();
    if (tail) sentences.push(tail);
  });

  return sentences;
}

// Pharaoh question helper

function createPharaohQuestionContainer(markdownText) {
  const opts = arguments[1] || {};
  const row = document.createElement("div");
  row.className = "pharaoh-row" + (opts.mode === "prelude" ? " pharaoh-row-prelude" : "");

  const avatar = document.createElement("div");
  avatar.className = "pharaoh-avatar";
  const icon = document.createElement("div");
  icon.className = "pharaoh-icon";
  avatar.appendChild(icon);

  const column = document.createElement("div");
  column.className = "pharaoh-column";

  const bubble = document.createElement("div");
  bubble.className = "pharaoh-bubble";

  const textEl = document.createElement("div");
  textEl.className = "question-text pharaoh-text";
  bubble.appendChild(textEl);

  const nav = document.createElement("div");
  nav.className = "bubble-nav";

  const prevBtn = document.createElement("button");
  prevBtn.type = "button";
  prevBtn.className = "bubble-arrow";
  prevBtn.textContent = "‹";

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "bubble-arrow";
  nextBtn.textContent = "›";

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  column.appendChild(bubble);
  column.appendChild(nav);

  const list = (() => {
    const s = splitIntoSentences(markdownText);
    return s.length ? s : [markdownText];
  })();

  let currentIndex = 0;
  let timerId = null;

  function renderSentence() {
    setMarkdown(textEl, list[currentIndex]);
    bubble.classList.remove("bubble-fx");
    // force reflow
    void bubble.offsetWidth;
    bubble.classList.add("bubble-fx");
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === list.length - 1;
  }

  function clearTimer() {
    if (timerId != null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function startAutoAdvance() {
    clearTimer();
    if (list.length <= 1) {
      // Single bubble – immediately signal completion for prelude use
      if (opts.onSequenceDone) {
        opts.onSequenceDone();
      }
      return;
    }
    timerId = setInterval(() => {
      if (currentIndex < list.length - 1) {
        currentIndex += 1;
        renderSentence();
      } else {
        clearTimer();
        if (opts.onSequenceDone) {
          opts.onSequenceDone();
        }
      }
    }, 3000);
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderSentence();
      startAutoAdvance();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < list.length - 1) {
      currentIndex += 1;
      renderSentence();
      startAutoAdvance();
    }
  });

  renderSentence();
  startAutoAdvance();

  row.appendChild(avatar);
  row.appendChild(column);

  return { container: row };
}

// Thinker context helper

function createThinkerContextContainer(markdownText) {
  const row = document.createElement("div");
  row.className = "thinker-row";

  const avatar = document.createElement("div");
  avatar.className = "thinker-avatar";
  const icon = document.createElement("div");
  icon.className = "thinker-icon";
  avatar.appendChild(icon);

  const bubble = document.createElement("div");
  bubble.className = "thinker-bubble";

  const textEl = document.createElement("div");
  textEl.className = "explanation-text thinker-text";
  setMarkdown(textEl, markdownText);

  bubble.appendChild(textEl);
  row.appendChild(avatar);
  row.appendChild(bubble);

  return { container: row, textEl };
}

function hasContext(step) {
  if (!step || !step.context) return false;
  const ctx = step.context;
  const text = (ctx.text || "").trim();
  const title = (ctx.title || "").trim();
  return text.length > 0 || title.length > 0;
}

function showScoreFlash(delta, customText) {
  if (typeof document === "undefined") return;
  const overlay = document.createElement("div");
  overlay.className = "score-flash " + (delta >= 0 ? "gain" : "loss");
  if (customText) {
    overlay.textContent = customText;
  } else {
    const sign = delta > 0 ? "+" : delta < 0 ? "-" : "";
    overlay.textContent = `${sign}${Math.abs(delta)} pts`;
  }
  document.body.appendChild(overlay);
  setTimeout(() => {
    if (overlay.parentElement) {
      overlay.parentElement.removeChild(overlay);
    }
  }, 2000);
}

function getMaxBasePointsForStep(step) {
  if (!step || !step.main) return 15;
  const p = step.main;
  switch (p.puzzleKind) {
    case "closedQuestion":
      return 8;
    case "basketQuestion":
      return 20;
    case "chainBuilder":
      return 30;
    default:
      return 15;
  }
}

function getStepSummaryText() {
  const step = puzzleSequence.steps[state.stepIndex];
  const maxPerStep = getMaxBasePointsForStep(step);
  const earned = state.lastStepScore || 0;
  const sign = earned > 0 ? "+" : earned < 0 ? "-" : "";
  return `This riddle: ${sign}${Math.abs(earned)} / ${maxPerStep} points. Total score: ${state.score} points.`;
}

function showSequenceCountdown(onDone) {
  if (typeof document === "undefined") {
    if (onDone) onDone();
    return;
  }
  const overlay = document.createElement("div");
  overlay.className = "sequence-countdown";

  const numEl = document.createElement("div");
  numEl.className = "sequence-countdown-number";
  overlay.appendChild(numEl);

  document.body.appendChild(overlay);

  const values = ["3", "2", "1"];
  let idx = 0;

  function step() {
    numEl.textContent = values[idx];
    idx += 1;
    if (idx < values.length) {
      setTimeout(step, 1000);
    } else {
      setTimeout(() => {
        if (overlay.parentElement) {
          overlay.parentElement.removeChild(overlay);
        }
        if (onDone) onDone();
      }, 400);
    }
  }

  step();
}

// --- Music helpers ---

function ensureMusicUI() {
  if (typeof document === "undefined") return;
  if (musicAudio) return;

  musicAudio = document.createElement("audio");
  musicAudio.loop = true;
  musicAudio.volume = 0.4;
  musicAudio.style.display = "none";
  document.body.appendChild(musicAudio);

  const btn = document.createElement("button");
  btn.className = "music-toggle";
  btn.type = "button";
  btn.textContent = "Music: on";
  btn.addEventListener("click", () => {
    musicEnabled = !musicEnabled;
    btn.textContent = musicEnabled ? "Music: on" : "Music: off";
    if (musicEnabled) {
      updateMusicForState(true);
    } else if (musicAudio) {
      musicAudio.pause();
    }
  });
  document.body.appendChild(btn);

  // Try to satisfy autoplay policies: once the user interacts anywhere,
  // attempt to start the appropriate background track.
  document.addEventListener(
    "click",
    () => {
      updateMusicForState(true);
    },
    { once: true }
  );
}

function ensureSfxAudio() {
  if (typeof document === "undefined") return;
  if (!sfxFailAudio) {
    sfxFailAudio = new Audio(SFX_FAIL);
    sfxFailAudio.preload = "auto";
    sfxFailAudio.volume = 0.7;
  }
  if (!sfxRewardAudio) {
    sfxRewardAudio = new Audio(SFX_REWARD);
    sfxRewardAudio.preload = "auto";
    sfxRewardAudio.volume = 0.8;
  }
}

function playAnswerSound(isCorrect) {
  ensureSfxAudio();
  const audio = isCorrect ? sfxRewardAudio : sfxFailAudio;
  if (!audio) return;
  try {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch {
    // ignore
  }
}

function desiredTrackForState() {
  if (state.screen === "library") return MUSIC_SPARTANS;
  if (state.screen === "sequence") return MUSIC_FOREST;
  return null;
}

function updateMusicForState(forcePlay) {
  if (!musicAudio) return;
  const track = desiredTrackForState();
  if (!track || !musicEnabled) {
    musicAudio.pause();
    currentMusicTrack = null;
    return;
  }
  if (currentMusicTrack !== track) {
    currentMusicTrack = track;
    musicAudio.src = track;
    // Try to play; browsers may block until user interaction
    musicAudio
      .play()
      .catch(() => {
        // ignore autoplay errors
      });
  } else if (forcePlay) {
    musicAudio
      .play()
      .catch(() => {
        // ignore
      });
  }
}

// --- Engine state ---

const state = {
  screen: "modeSelect", // "modeSelect" | "library" | "sequence"
  mode: "play", // "play" | "edit"
  phase: "intro", // "intro" | "main" | "secondChance" | "explanation" | "context" | "done"
  introIndex: 0,
  stepIndex: 0,
  lastAnswerCorrect: null,
  score: 0,
  currentStepScore: 0,
  lastStepScore: 0, // total score earned in the last completed riddle
  mainCorrectStreak: 0, // consecutive correct main riddles
  sequenceStatsRecorded: false, // to avoid double-counting stats
  viewMode: null, // "mobile" | "desktop" | null (not chosen yet)
};

const appEl = document.getElementById("app");

function applyViewModeToBody() {
  if (typeof document === "undefined") return;
  const body = document.body;
  if (!body) return;
  body.classList.toggle("mode-mobile", state.viewMode === "mobile");
  body.classList.toggle("mode-desktop", state.viewMode === "desktop");
}

function render() {
  if (!appEl) return;
  applyViewModeToBody();
  appEl.innerHTML = "";

  let card;
  if (state.screen === "modeSelect") {
    card = renderModeSelect();
  } else if (state.screen === "library") {
    card = renderLibrary();
  } else if (state.mode === "edit") {
    card = renderEditor();
  } else {
    switch (state.phase) {
      case "intro":
        card = renderIntroSlide();
        break;
      case "main":
        card = renderCurrentStep("main");
        break;
      case "secondChance":
        card = renderCurrentStep("secondChance");
        break;
      case "explanation":
        card = renderExplanation();
        break;
      case "context":
        card = renderContext();
        break;
      case "done":
        card = renderEndScreen();
        break;
      default:
        card = document.createElement("div");
        card.textContent = "Unknown phase.";
    }
  }

  appEl.appendChild(card);
  ensureMusicUI();
  updateMusicForState();
}

// --- Intro slides ---

function renderIntroSlide() {
  const slide = puzzleSequence.introSlides[state.introIndex];
  const totalSlides = puzzleSequence.introSlides.length;
  const stepInfo = `Intro ${state.introIndex + 1} of ${totalSlides}`;

  const card = createCardShell({
    badgeText: "Sequence intro",
    badgeSecondary: `${state.stepIndex + 1}/${puzzleSequence.steps.length} riddles ahead`,
    title: slide.title || puzzleSequence.title,
    subtitle: puzzleSequence.title,
    progressText: stepInfo,
  });

  const content = card.querySelector(".content");

  const pharaoh = createPharaohQuestionContainer(slide.text);
  content.appendChild(pharaoh.container);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = "Read the story, then continue.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const backBtn = document.createElement("button");
  backBtn.className = "btn-ghost";
  backBtn.textContent = "Back";
  backBtn.disabled = state.introIndex === 0;
  backBtn.addEventListener("click", () => {
    if (state.introIndex > 0) {
      state.introIndex -= 1;
      render();
    }
  });

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn-primary";
  nextBtn.textContent = state.introIndex === totalSlides - 1 ? "Begin first riddle" : "Next intro";
  nextBtn.addEventListener("click", () => {
    if (state.introIndex < totalSlides - 1) {
      state.introIndex += 1;
      render();
    } else {
      // move into first main riddle
      state.phase = "main";
      state.stepIndex = 0;
      state.lastAnswerCorrect = null;
      state.currentStepScore = 0;
      render();
    }
  });

  right.appendChild(backBtn);
  right.appendChild(nextBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- Steps (main + second chance) ---

function renderCurrentStep(kind) {
  const step = puzzleSequence.steps[state.stepIndex];
  const puzzle = kind === "main" ? step.main : step.secondChance;

  const isSecondChance = kind === "secondChance";

  const badgeText = isSecondChance ? "Second chance riddle" : "Main riddle";
  const card = createCardShell({
    badgeText,
    badgeSecondary: step.name,
    title: step.name,
    subtitle: puzzleSequence.title,
    progressText: `Step ${state.stepIndex + 1} of ${puzzleSequence.steps.length}`,
  });

  const content = card.querySelector(".content");

  // Puzzle renderer returns an object with root element and getResult function
  const puzzleResult = renderPuzzle(puzzle);
  content.appendChild(puzzleResult.root);

  const feedbackEl = document.createElement("div");
  feedbackEl.className = "feedback";
  content.appendChild(feedbackEl);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = isSecondChance
    ? "If you miss again, the temple will reveal its secret."
    : "You have one attempt. Think carefully.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn-primary";
  checkBtn.textContent = "Check answer";

  const skipBtn = document.createElement("button");
  skipBtn.className = "btn-secondary";
  skipBtn.textContent = isSecondChance ? "Skip to explanation" : "Skip to next";

  checkBtn.addEventListener("click", () => {
    const { valid, correct, message } = puzzleResult.getResult();
    if (!valid) {
      feedbackEl.textContent = message || "Please answer the riddle first.";
      feedbackEl.className = "feedback incorrect";
      return;
    }
    state.lastAnswerCorrect = !!correct;
    playAnswerSound(!!correct);

    // streak tracking for main riddles
    let usedDouble = false;
    if (!isSecondChance) {
      if (correct) {
        state.mainCorrectStreak = (state.mainCorrectStreak || 0) + 1;
        if (state.mainCorrectStreak === 3) {
          usedDouble = true;
          state.mainCorrectStreak = 0; // reset after granting double points
        }
      } else {
        state.mainCorrectStreak = 0;
      }
    }

    // base scoring (with possible double points on main riddles)
    let delta = 0;
    if (isSecondChance) {
      // second chance: unchanged
      delta = correct ? 5 : -5;
    } else {
      // main riddle: scoring depends on puzzle type
      let baseGain = 15;
      let baseLoss = -10;
      switch (puzzle.puzzleKind) {
        case "closedQuestion":
          baseGain = 8;
          baseLoss = -8;
          break;
        case "basketQuestion":
          baseGain = 20;
          baseLoss = -15;
          break;
        case "chainBuilder":
          baseGain = 30;
          baseLoss = -10;
          break;
        default:
          baseGain = 15;
          baseLoss = -10;
      }

      if (correct) {
        delta = usedDouble ? baseGain * 2 : baseGain;
      } else {
        delta = baseLoss;
      }
    }

    state.score += delta;
    state.currentStepScore = (state.currentStepScore || 0) + delta;
    state.lastStepScore = state.currentStepScore;

    const flashMessage =
      !isSecondChance && correct && usedDouble ? `Double Points! +${delta}` : undefined;
    showScoreFlash(delta, flashMessage);

    feedbackEl.textContent = correct ? "Correct! The gate opens onward." : "Not quite. The stones remain still.";
    feedbackEl.className = "feedback " + (correct ? "correct" : "incorrect");

    // Advance after short delay so player can read feedback
    setTimeout(() => {
      if (correct) {
        goToNextMainStep();
      } else {
        if (isSecondChance) {
          // Go to explanation
          state.phase = "explanation";
          render();
        } else {
          // Go to second chance
          state.phase = "secondChance";
          render();
        }
      }
    }, 700);
  });

  skipBtn.addEventListener("click", () => {
    if (isSecondChance) {
      state.phase = "explanation";
    } else {
      // Skipping main goes straight to second chance as an easier variant
      state.phase = "secondChance";
    }
    state.lastAnswerCorrect = null;
    render();
  });

  right.appendChild(skipBtn);
  right.appendChild(checkBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

function goToNextMainStep() {
  if (state.stepIndex < puzzleSequence.steps.length - 1) {
    const step = puzzleSequence.steps[state.stepIndex];
    if (hasContext(step)) {
      // show scientific context before moving to next main riddle
      state.phase = "context";
    } else {
      state.stepIndex += 1;
      state.phase = "main";
      state.lastAnswerCorrect = null;
      state.currentStepScore = 0;
    }
  } else {
    state.phase = "done";
  }
  render();
}

// --- Explanation phase ---

function renderExplanation() {
  const step = puzzleSequence.steps[state.stepIndex];
  const expl = step.explanation;

  const card = createCardShell({
    badgeText: "Explanation",
    badgeSecondary: step.name,
    title: expl.title || "The Temple Speaks",
    subtitle: puzzleSequence.title,
    progressText: `Step ${state.stepIndex + 1} of ${puzzleSequence.steps.length}`,
  });

  const content = card.querySelector(".content");

  const pharaoh = createPharaohQuestionContainer(expl.text);
  content.appendChild(pharaoh.container);

  const summary = document.createElement("div");
  summary.className = "score-summary";
  summary.textContent = getStepSummaryText();
  content.appendChild(summary);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = "You may start the journey again or continue deeper into the temple.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const restartBtn = document.createElement("button");
  restartBtn.className = "btn-secondary";
  restartBtn.textContent = "Restart from beginning";
  restartBtn.addEventListener("click", () => {
    state.phase = "intro";
    state.introIndex = 0;
    state.stepIndex = 0;
    state.lastAnswerCorrect = null;
    state.score = 0;
    state.currentStepScore = 0;
    state.lastStepScore = 0;
    state.mainCorrectStreak = 0;
    state.sequenceStatsRecorded = false;
    render();
  });

  const continueBtn = document.createElement("button");
  continueBtn.className = "btn-primary";
  continueBtn.textContent =
    state.stepIndex < puzzleSequence.steps.length - 1 ? "Continue to next riddle" : "Finish sequence";
  continueBtn.addEventListener("click", () => {
    if (state.stepIndex < puzzleSequence.steps.length - 1) {
      const currentStep = puzzleSequence.steps[state.stepIndex];
      if (hasContext(currentStep)) {
        state.phase = "context";
      } else {
        state.stepIndex += 1;
        state.phase = "main";
        state.currentStepScore = 0;
      }
    } else {
      state.phase = "done";
    }
    state.lastAnswerCorrect = null;
    render();
  });

  right.appendChild(restartBtn);
  right.appendChild(continueBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- End screen ---

function renderEndScreen() {
  const end = puzzleSequence.endScreen || defaultPuzzleSequence.endScreen;

  const card = createCardShell({
    badgeText: "Sequence finished",
    badgeSecondary: `${puzzleSequence.steps.length} riddles completed`,
    title: (end && end.title) || "You have passed the temple",
    subtitle: puzzleSequence.title,
    progressText: "End of chain",
  });

  const content = card.querySelector(".content");

  const p = document.createElement("p");
  p.className = "intro-text";
  setMarkdown(p, (end && end.text) || defaultPuzzleSequence.endScreen.text);
  content.appendChild(p);

  const summary = document.createElement("div");
  summary.className = "score-summary";
  const stepsArr = Array.isArray(puzzleSequence.steps) ? puzzleSequence.steps : [];
  const maxTotal = stepsArr.reduce((sum, step) => sum + getMaxBasePointsForStep(step), 0);
  const sign = state.score > 0 ? "+" : state.score < 0 ? "-" : "";
  summary.textContent = `Final score: ${sign}${Math.abs(state.score)} / ${maxTotal} points.`;
  content.appendChild(summary);

  // Record stats once per run
  if (!state.sequenceStatsRecorded && Array.isArray(sequenceLibrary) && puzzleSequence) {
    state.sequenceStatsRecorded = true;
    const seq = sequenceLibrary[currentSequenceIndex];
    if (seq) {
      const stepsCount = Array.isArray(puzzleSequence.steps) ? puzzleSequence.steps.length : 0;
      const rawPoints = state.score || 0;
      seq.statsRuns = (seq.statsRuns || 0) + 1;
      seq.statsPointsAccum = (seq.statsPointsAccum || 0) + rawPoints;
      seq.statsRiddlesAccum = (seq.statsRiddlesAccum || 0) + stepsCount;
      saveLibraryToStorage(sequenceLibrary);
    }
  }
  const rawPoints = state.score || 0;

  const divisionBox = document.createElement("div");
  divisionBox.className = "division-box";

  const line1 = document.createElement("div");
  line1.className = "division-line division-line-1";
  line1.textContent = `You scored ${rawPoints} points in this sequence.`;

  const line2 = document.createElement("div");
  line2.className = "division-line division-line-2";
  line2.textContent = "Points are all that matters here – we no longer track time.";

  const line3 = document.createElement("div");
  line3.className = "division-line division-line-3";
  line3.textContent = "Replay the sequence if you want to push your total score even higher.";

  divisionBox.appendChild(line1);
  divisionBox.appendChild(line2);
  divisionBox.appendChild(line3);
  content.appendChild(divisionBox);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = "You can replay the same sequence with the button below.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const restartBtn = document.createElement("button");
  restartBtn.className = "btn-primary";
  restartBtn.textContent = "Play again";
  restartBtn.addEventListener("click", () => {
    state.phase = "intro";
    state.introIndex = 0;
    state.stepIndex = 0;
    state.lastAnswerCorrect = null;
    state.score = 0;
    state.currentStepScore = 0;
    state.lastStepScore = 0;
    state.mainCorrectStreak = 0;
    state.sequenceStatsRecorded = false;
    startSequenceTimer();
    render();
  });

  right.appendChild(restartBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- Context slide between main riddles ---

function renderContext() {
  const step = puzzleSequence.steps[state.stepIndex];
  const ctx = step.context || {};

  const card = createCardShell({
    badgeText: "Scientific context",
    badgeSecondary: step.name,
    title: ctx.title || "Context",
    subtitle: puzzleSequence.title,
    progressText:
      state.stepIndex < puzzleSequence.steps.length - 1
        ? `Between step ${state.stepIndex + 1} and ${state.stepIndex + 2}`
        : `After final step`,
  });

  const content = card.querySelector(".content");
  const thinker = createThinkerContextContainer(ctx.text || "");
  content.appendChild(thinker.container);

  const summary = document.createElement("div");
  summary.className = "score-summary";
  summary.textContent = getStepSummaryText();
  content.appendChild(summary);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent =
    state.stepIndex < puzzleSequence.steps.length - 1
      ? "When you are ready, continue to the next main riddle."
      : "Continue to the end of the sequence.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn-primary";
  nextBtn.textContent =
    state.stepIndex < puzzleSequence.steps.length - 1 ? "Go to next riddle" : "Finish sequence";
  nextBtn.addEventListener("click", () => {
    if (state.stepIndex < puzzleSequence.steps.length - 1) {
      state.stepIndex += 1;
      state.phase = "main";
      state.lastAnswerCorrect = null;
      render();
    } else {
      state.phase = "done";
      render();
    }
  });

  right.appendChild(nextBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- Editor mode helpers ---

function createEmptyPuzzleOfKind(kind) {
  switch (kind) {
    case "closedQuestion":
      return {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question: "Your question here?",
        options: ["Answer A", "Answer B"],
        correctIndex: 0,
      };
    case "basketQuestion":
      return {
        type: "puzzle",
        puzzleKind: "basketQuestion",
        prompt: "Sort the items into the correct baskets.",
        baskets: ["Basket A", "Basket B"],
        items: [
          { label: "Item 1", correctBasketIndex: 0 },
          { label: "Item 2", correctBasketIndex: 0 },
          { label: "Item 3", correctBasketIndex: 0 },
          { label: "Item 4", correctBasketIndex: 0 },
          { label: "Item 5", correctBasketIndex: 0 },
        ],
      };
    case "chainBuilder":
      return {
        type: "puzzle",
        puzzleKind: "chainBuilder",
        prompt: "Place the events in the correct order.",
        elements: ["First element", "Second element", "Third element"],
      };
    case "pairMatching":
      return {
        type: "puzzle",
        puzzleKind: "pairMatching",
        prompt: "Match each item on the left with one on the right.",
        left: ["Left 1", "Left 2", "Left 3", "Left 4"],
        right: ["Right 1", "Right 2", "Right 3", "Right 4"],
        mapping: [0, 1, 2, 3],
      };
    case "logicMinefield":
      return {
        type: "puzzle",
        puzzleKind: "logicMinefield",
        prompt: "Only one of these statements is true.",
        statements: ["Statement 1", "Statement 2", "Statement 3", "Statement 4"],
        correctIndex: 0,
      };
    default:
      return {
        type: "puzzle",
        puzzleKind: "closedQuestion",
        question: "Your question here?",
        options: ["Answer A", "Answer B"],
        correctIndex: 0,
      };
  }
}

function ensureMainPuzzle(step, kind) {
  if (!step.main || step.main.puzzleKind !== kind) {
    step.main = createEmptyPuzzleOfKind(kind);
  }
}

function ensureSecondChance(step) {
  if (!step.secondChance || step.secondChance.puzzleKind !== "closedQuestion") {
    step.secondChance = createEmptyPuzzleOfKind("closedQuestion");
  }
}

// --- Editor mode ---

function renderEditor() {
  const card = createCardShell({
    badgeText: "Creator mode",
    badgeSecondary: "Edit puzzle sequence",
    title: "Puzzle Sequence Editor",
    subtitle: puzzleSequence.title,
    progressText: "Editor",
  });

  const content = card.querySelector(".content");

  const info = document.createElement("p");
  info.className = "muted";
  info.textContent =
    "Fill in the fields below to change the riddles. These changes are saved only in this browser.";
  content.appendChild(info);

  // Sequence title
  const seqGroup = document.createElement("div");
  seqGroup.className = "field-group";
  const seqLabel = document.createElement("label");
  seqLabel.className = "field-label";
  seqLabel.textContent = "Sequence title";
  const seqInput = document.createElement("input");
  seqInput.className = "input";
  seqInput.type = "text";
  seqInput.value = puzzleSequence.title || "";
  seqInput.addEventListener("input", (e) => {
    puzzleSequence.title = e.target.value;
  });
  seqGroup.appendChild(seqLabel);
  seqGroup.appendChild(seqInput);
  content.appendChild(seqGroup);

  // Intro slides editor
  const introSection = document.createElement("div");
  introSection.className = "editor-section";
  const introHeader = document.createElement("div");
  introHeader.className = "editor-section-header";
  introHeader.textContent = "Intro slides (shown before the first riddle)";
  introSection.appendChild(introHeader);

  if (!Array.isArray(puzzleSequence.introSlides)) {
    puzzleSequence.introSlides = [];
  }

  puzzleSequence.introSlides.forEach((slide, idx) => {
    if (!slide || typeof slide !== "object") {
      puzzleSequence.introSlides[idx] = { type: "intro", title: "", text: "" };
    }
    const box = document.createElement("div");
    box.className = "field-group";

    const label = document.createElement("div");
    label.className = "field-label";
    label.textContent = `Intro slide ${idx + 1}`;

    const titleInput = document.createElement("input");
    titleInput.className = "input";
    titleInput.type = "text";
    titleInput.placeholder = "Title (optional)";
    titleInput.value = slide.title || "";
    titleInput.addEventListener("input", (e) => {
      puzzleSequence.introSlides[idx].title = e.target.value;
      puzzleSequence.introSlides[idx].type = "intro";
    });

    const textArea = document.createElement("textarea");
    textArea.className = "editor-textarea";
    textArea.placeholder = "Intro text...";
    textArea.value = slide.text || "";
    textArea.addEventListener("input", (e) => {
      puzzleSequence.introSlides[idx].text = e.target.value;
      puzzleSequence.introSlides[idx].type = "intro";
    });

    box.appendChild(label);
    box.appendChild(titleInput);
    box.appendChild(textArea);
    introSection.appendChild(box);
  });

  const introButtonsWrapper = document.createElement("div");
  introButtonsWrapper.className = "field-group inline";
  const introHint = document.createElement("div");
  introHint.className = "muted";
  introHint.textContent = "You can add or remove intro slides.";

  const introButtons = document.createElement("div");
  introButtons.className = "buttons-right";

  const addIntroBtn = document.createElement("button");
  addIntroBtn.className = "btn-ghost";
  addIntroBtn.type = "button";
  addIntroBtn.textContent = "Add intro slide";
  addIntroBtn.addEventListener("click", () => {
    puzzleSequence.introSlides.push({
      type: "intro",
      title: "New intro slide",
      text: "",
    });
    render();
  });

  const removeIntroBtn = document.createElement("button");
  removeIntroBtn.className = "btn-ghost";
  removeIntroBtn.type = "button";
  removeIntroBtn.textContent = "Remove last intro";
  removeIntroBtn.disabled = puzzleSequence.introSlides.length === 0;
  removeIntroBtn.addEventListener("click", () => {
    if (puzzleSequence.introSlides.length > 0) {
      puzzleSequence.introSlides.pop();
      if (state.introIndex >= puzzleSequence.introSlides.length) {
        state.introIndex = Math.max(0, puzzleSequence.introSlides.length - 1);
      }
      render();
    }
  });

  introButtons.appendChild(addIntroBtn);
  introButtons.appendChild(removeIntroBtn);
  introButtonsWrapper.appendChild(introHint);
  introButtonsWrapper.appendChild(introButtons);
  introSection.appendChild(introButtonsWrapper);
  content.appendChild(introSection);

  // Step navigation
  const stepNav = document.createElement("div");
  stepNav.className = "step-nav";
  const stepInfo = document.createElement("span");
  stepInfo.textContent = `Editing step ${state.stepIndex + 1} of ${puzzleSequence.steps.length}`;
  const stepButtons = document.createElement("div");
  stepButtons.className = "buttons-right";
  const prevBtn = document.createElement("button");
  prevBtn.className = "btn-ghost";
  prevBtn.textContent = "Previous step";
  prevBtn.disabled = state.stepIndex === 0;
  prevBtn.addEventListener("click", () => {
    if (state.stepIndex > 0) {
      state.stepIndex -= 1;
      render();
    }
  });
  const nextBtn = document.createElement("button");
  nextBtn.className = "btn-ghost";
  nextBtn.textContent = "Next step";
  nextBtn.disabled = state.stepIndex >= puzzleSequence.steps.length - 1;
  nextBtn.addEventListener("click", () => {
    if (state.stepIndex < puzzleSequence.steps.length - 1) {
      state.stepIndex += 1;
      render();
    }
  });

  const addStepBtn = document.createElement("button");
  addStepBtn.className = "btn-secondary";
  addStepBtn.textContent = "Add step";
  addStepBtn.addEventListener("click", () => {
    const idx = puzzleSequence.steps.length;
    const newStep = {
      name: `Main riddle ${idx + 1}`,
      main: createEmptyPuzzleOfKind("closedQuestion"),
      secondChance: createEmptyPuzzleOfKind("closedQuestion"),
      explanation: { title: "Explanation", text: "" },
      context: { title: "Scientific context", text: "" },
    };
    puzzleSequence.steps.push(newStep);
    state.stepIndex = idx;
    saveSequenceToStorage(puzzleSequence);
    render();
  });

  stepButtons.appendChild(prevBtn);
  stepButtons.appendChild(nextBtn);
  stepButtons.appendChild(addStepBtn);
  stepNav.appendChild(stepInfo);
  stepNav.appendChild(stepButtons);
  content.appendChild(stepNav);

  const step = puzzleSequence.steps[state.stepIndex];
  ensureSecondChance(step);

  // Step name
  const nameGroup = document.createElement("div");
  nameGroup.className = "field-group";
  const nameLabel = document.createElement("label");
  nameLabel.className = "field-label";
  nameLabel.textContent = "Step name (shown to player)";
  const nameInput = document.createElement("input");
  nameInput.className = "input";
  nameInput.type = "text";
  nameInput.value = step.name || "";
  nameInput.addEventListener("input", (e) => {
    step.name = e.target.value;
  });
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  content.appendChild(nameGroup);

  // Main riddle section
  const mainSection = document.createElement("div");
  mainSection.className = "editor-section";
  const mainHeader = document.createElement("div");
  mainHeader.className = "editor-section-header";
  mainHeader.textContent = "Main riddle";
  mainSection.appendChild(mainHeader);

  const kindGroup = document.createElement("div");
  kindGroup.className = "field-group inline";
  const kindLabel = document.createElement("label");
  kindLabel.className = "field-label";
  kindLabel.textContent = "Puzzle type";
  const kindSelect = document.createElement("select");
  kindSelect.className = "select";
  const kinds = [
    { value: "closedQuestion", label: "Closed question (2 answers)" },
    { value: "basketQuestion", label: "Basket question (2 baskets, 5 items)" },
    { value: "chainBuilder", label: "Chain builder (3 elements)" },
    { value: "pairMatching", label: "Pair matching (4 pairs)" },
    { value: "logicMinefield", label: "Logic minefield (4 statements)" },
  ];
  const currentKind = (step.main && step.main.puzzleKind) || "closedQuestion";
  kinds.forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k.value;
    opt.textContent = k.label;
    if (k.value === currentKind) opt.selected = true;
    kindSelect.appendChild(opt);
  });
  kindSelect.addEventListener("change", (e) => {
    ensureMainPuzzle(step, e.target.value);
    render();
  });
  kindGroup.appendChild(kindLabel);
  kindGroup.appendChild(kindSelect);
  mainSection.appendChild(kindGroup);

  ensureMainPuzzle(step, currentKind);
  const mainFields = document.createElement("div");
  buildPuzzleEditorFields(step.main, mainFields, "main");
  mainSection.appendChild(mainFields);
  content.appendChild(mainSection);

  // Second chance section (always closed question)
  const scSection = document.createElement("div");
  scSection.className = "editor-section";
  const scHeader = document.createElement("div");
  scHeader.className = "editor-section-header";
  scHeader.textContent = "Second Chance riddle (always closed question)";
  scSection.appendChild(scHeader);

  const scFields = document.createElement("div");
  buildClosedQuestionEditor(step.secondChance, scFields, "Second chance");
  scSection.appendChild(scFields);
  content.appendChild(scSection);

  // Explanation
  const exSection = document.createElement("div");
  exSection.className = "editor-section";
  const exHeader = document.createElement("div");
  exHeader.className = "editor-section-header";
  exHeader.textContent = "Explanation shown after two wrong answers";
  exSection.appendChild(exHeader);

  if (!step.explanation) {
    step.explanation = { title: "Explanation", text: "" };
  }

  const exTitleGroup = document.createElement("div");
  exTitleGroup.className = "field-group";
  const exTitleLabel = document.createElement("label");
  exTitleLabel.className = "field-label";
  exTitleLabel.textContent = "Explanation title";
  const exTitleInput = document.createElement("input");
  exTitleInput.className = "input";
  exTitleInput.type = "text";
  exTitleInput.value = step.explanation.title || "";
  exTitleInput.addEventListener("input", (e) => {
    step.explanation.title = e.target.value;
  });
  exTitleGroup.appendChild(exTitleLabel);
  exTitleGroup.appendChild(exTitleInput);

  const exTextGroup = document.createElement("div");
  exTextGroup.className = "field-group";
  const exTextLabel = document.createElement("label");
  exTextLabel.className = "field-label";
  exTextLabel.textContent = "Explanation text";
  const exTextArea = document.createElement("textarea");
  exTextArea.className = "editor-textarea";
  exTextArea.value = step.explanation.text || "";
  exTextArea.addEventListener("input", (e) => {
    step.explanation.text = e.target.value;
  });
  exTextGroup.appendChild(exTextLabel);
  exTextGroup.appendChild(exTextArea);

  exSection.appendChild(exTitleGroup);
  exSection.appendChild(exTextGroup);
  content.appendChild(exSection);

  // Context between this step and the next main riddle
  const ctxSection = document.createElement("div");
  ctxSection.className = "editor-section";
  const ctxHeader = document.createElement("div");
  ctxHeader.className = "editor-section-header";
  ctxHeader.textContent = "Scientific context (shown between this riddle and the next one)";
  ctxSection.appendChild(ctxHeader);

  if (!step.context) {
    step.context = { title: "Scientific context", text: "" };
  }

  const ctxTitleGroup = document.createElement("div");
  ctxTitleGroup.className = "field-group";
  const ctxTitleLabel = document.createElement("label");
  ctxTitleLabel.className = "field-label";
  ctxTitleLabel.textContent = "Context title";
  const ctxTitleInput = document.createElement("input");
  ctxTitleInput.className = "input";
  ctxTitleInput.type = "text";
  ctxTitleInput.value = step.context.title || "";
  ctxTitleInput.addEventListener("input", (e) => {
    step.context.title = e.target.value;
  });
  ctxTitleGroup.appendChild(ctxTitleLabel);
  ctxTitleGroup.appendChild(ctxTitleInput);

  const ctxTextGroup = document.createElement("div");
  ctxTextGroup.className = "field-group";
  const ctxTextLabel = document.createElement("label");
  ctxTextLabel.className = "field-label";
  ctxTextLabel.textContent =
    state.stepIndex < puzzleSequence.steps.length - 1
      ? "Context text (this will appear before the next main riddle)"
      : "Context text (not shown after the last riddle)";
  const ctxTextArea = document.createElement("textarea");
  ctxTextArea.className = "editor-textarea";
  ctxTextArea.value = step.context.text || "";
  ctxTextArea.addEventListener("input", (e) => {
    step.context.text = e.target.value;
  });
  ctxTextGroup.appendChild(ctxTextLabel);
  ctxTextGroup.appendChild(ctxTextArea);

  ctxSection.appendChild(ctxTitleGroup);
  ctxSection.appendChild(ctxTextGroup);
  content.appendChild(ctxSection);

  // Final slide editor
  const endSection = document.createElement("div");
  endSection.className = "editor-section";
  const endHeader = document.createElement("div");
  endHeader.className = "editor-section-header";
  endHeader.textContent = "Final slide (shown after the last riddle)";
  endSection.appendChild(endHeader);

  if (!puzzleSequence.endScreen) {
    puzzleSequence.endScreen = deepClone(defaultPuzzleSequence.endScreen);
  }

  const endTitleGroup = document.createElement("div");
  endTitleGroup.className = "field-group";
  const endTitleLabel = document.createElement("label");
  endTitleLabel.className = "field-label";
  endTitleLabel.textContent = "Final slide title";
  const endTitleInput = document.createElement("input");
  endTitleInput.className = "input";
  endTitleInput.type = "text";
  endTitleInput.value = puzzleSequence.endScreen.title || "";
  endTitleInput.addEventListener("input", (e) => {
    puzzleSequence.endScreen.title = e.target.value;
  });
  endTitleGroup.appendChild(endTitleLabel);
  endTitleGroup.appendChild(endTitleInput);

  const endTextGroup = document.createElement("div");
  endTextGroup.className = "field-group";
  const endTextLabel = document.createElement("label");
  endTextLabel.className = "field-label";
  endTextLabel.textContent = "Final slide text";
  const endTextArea = document.createElement("textarea");
  endTextArea.className = "editor-textarea";
  endTextArea.value = puzzleSequence.endScreen.text || "";
  endTextArea.addEventListener("input", (e) => {
    puzzleSequence.endScreen.text = e.target.value;
  });
  endTextGroup.appendChild(endTextLabel);
  endTextGroup.appendChild(endTextArea);

  endSection.appendChild(endTitleGroup);
  endSection.appendChild(endTextGroup);
  content.appendChild(endSection);

  // Feedback + buttons
  const feedback = document.createElement("div");
  feedback.className = "feedback";
  content.appendChild(feedback);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const left = document.createElement("div");
  left.className = "muted";
  left.textContent = "When you're ready, save and return to player mode.";

  const right = document.createElement("div");
  right.className = "buttons-right";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn-secondary";
  cancelBtn.textContent = "Back to player";
  cancelBtn.addEventListener("click", () => {
    state.mode = "play";
    render();
  });

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn-primary";
  saveBtn.textContent = "Save & play";
  saveBtn.addEventListener("click", () => {
    saveSequenceToStorage();
    state.mode = "play";
    state.phase = "intro";
    state.introIndex = 0;
    state.stepIndex = 0;
    state.lastAnswerCorrect = null;
    state.score = 0;
    state.currentStepScore = 0;
    state.lastStepScore = 0;
    feedback.textContent = "Saved. Returning to player…";
    feedback.className = "feedback correct";
    setTimeout(() => render(), 500);
  });

  right.appendChild(cancelBtn);
  right.appendChild(saveBtn);
  buttonsRow.appendChild(left);
  buttonsRow.appendChild(right);
  content.appendChild(buttonsRow);

  return card;
}

// --- Library / landing page ---

function renderModeSelect() {
  const card = createCardShell({
    badgeText: "Choose version",
    badgeSecondary: "Same riddles, two layouts",
    title: "Ancient Riddles",
    subtitle: "Pick the layout that fits your device.",
    progressText: "Version selection",
  });

  const content = card.querySelector(".content");

  const info = document.createElement("p");
  info.className = "intro-text";
  info.textContent =
    "You can play with a layout tuned for phones (touch-friendly, stacked) or for larger desktop screens. The content is identical in both.";
  content.appendChild(info);

  const chooser = document.createElement("div");
  chooser.className = "mode-chooser";

  const mobileBtn = document.createElement("button");
  mobileBtn.className = "btn-primary mode-btn";
  mobileBtn.type = "button";
  mobileBtn.textContent = "Mobile version (phones)";
  mobileBtn.addEventListener("click", () => {
    state.viewMode = "mobile";
    state.screen = "library";
    render();
  });

  const desktopBtn = document.createElement("button");
  desktopBtn.className = "btn-secondary mode-btn";
  desktopBtn.type = "button";
  desktopBtn.textContent = "Desktop version";
  desktopBtn.addEventListener("click", () => {
    state.viewMode = "desktop";
    state.screen = "library";
    render();
  });

  chooser.appendChild(mobileBtn);
  chooser.appendChild(desktopBtn);
  content.appendChild(chooser);

  return card;
}

function renderLibrary() {
  const total = sequenceLibrary.length;
  const card = createCardShell({
    badgeText: "Sequence library",
    badgeSecondary: `${total} sequence${total === 1 ? "" : "s"}`,
    title: "Ancient Riddles – Puzzle Sequences",
    subtitle: "Choose a sequence to play or edit, or create a new one.",
    progressText: "Library",
  });

  const content = card.querySelector(".content");

  // Overall stats across all sequences
  let overallPoints = 0;
  sequenceLibrary.forEach((seq) => {
    overallPoints += seq.statsPointsAccum || 0;
  });

  const info = document.createElement("p");
  info.className = "intro-text";
  info.textContent =
    "Each sequence is a self-contained chain of intro slides, main riddles, second chances, explanations and scientific context. " +
    "Pick one to enter player mode, or open it in Creator mode to adjust the content.";
  content.appendChild(info);

  const overall = document.createElement("div");
  overall.className = "overall-stats";
  overall.textContent =
    overallPoints > 0
      ? `Overall: ${overallPoints} points collected across all sequences.`
      : "Overall: no results yet – play a sequence to start collecting points.";
  content.appendChild(overall);

  const list = document.createElement("div");
  list.className = "sequence-list";

  sequenceLibrary.forEach((seq, idx) => {
    const item = document.createElement("div");
    item.className = "sequence-item";

    const left = document.createElement("div");
    left.className = "sequence-item-main";
    const title = document.createElement("div");
    title.className = "sequence-title";
    title.textContent = seq.title || `Sequence ${idx + 1}`;

    const meta = document.createElement("div");
    meta.className = "sequence-meta";
    const steps = Array.isArray(seq.steps) ? seq.steps.length : 0;
    const intros = Array.isArray(seq.introSlides) ? seq.introSlides.length : 0;

    const runs = seq.statsRuns || 0;
    const totalPts = seq.statsPointsAccum || 0;

    const statsText =
      runs > 0
        ? ` • Played ${runs} time${runs === 1 ? "" : "s"} • ${totalPts} pts total`
        : "";

    meta.textContent = `${steps} riddles • ${intros} intro slide${intros === 1 ? "" : "s"}${statsText}`;

    left.appendChild(title);
    left.appendChild(meta);

    const right = document.createElement("div");
    right.className = "buttons-right";

    const editBtn = document.createElement("button");
    editBtn.className = "btn-secondary";
    editBtn.textContent = "Creator mode";
    editBtn.addEventListener("click", () => {
      currentSequenceIndex = idx;
      puzzleSequence = sequenceLibrary[currentSequenceIndex];
      state.screen = "sequence";
      state.mode = "edit";
      state.stepIndex = 0;
      state.introIndex = 0;
      state.phase = "intro";
      state.score = 0;
      state.currentStepScore = 0;
      state.lastStepScore = 0;
      render();
    });

    const playBtn = document.createElement("button");
    playBtn.className = "btn-primary";
    playBtn.textContent = "Play";
    playBtn.addEventListener("click", () => {
      currentSequenceIndex = idx;
      puzzleSequence = sequenceLibrary[currentSequenceIndex];
      state.screen = "sequence";
      state.mode = "play";
      state.phase = "intro";
      state.introIndex = 0;
      state.stepIndex = 0;
      state.lastAnswerCorrect = null;
      state.score = 0;
      state.currentStepScore = 0;
      state.lastStepScore = 0;
      state.mainCorrectStreak = 0;
      state.sequenceStatsRecorded = false;
      render();
      showSequenceCountdown(() => {
        // After countdown, intro slides are already prepared; nothing else needed
      });
    });

    right.appendChild(editBtn);
    right.appendChild(playBtn);

    item.appendChild(left);
    item.appendChild(right);
    list.appendChild(item);
  });

  content.appendChild(list);

  const buttonsRow = document.createElement("div");
  buttonsRow.className = "buttons-row";

  const leftInfo = document.createElement("div");
  leftInfo.className = "muted";
  leftInfo.textContent = "Create a new, empty sequence to design a fresh chain of riddles.";

  const rightButtons = document.createElement("div");
  rightButtons.className = "buttons-right";

  const newBtn = document.createElement("button");
  newBtn.className = "btn-primary";
  newBtn.textContent = "Create new sequence";
  newBtn.addEventListener("click", () => {
    const def = deepClone(defaultPuzzleSequence);
    def.id = `seq-${sequenceLibrary.length + 1}`;
    sequenceLibrary.push(def);
    saveLibraryToStorage(sequenceLibrary);
    currentSequenceIndex = sequenceLibrary.length - 1;
    puzzleSequence = sequenceLibrary[currentSequenceIndex];
    state.screen = "sequence";
    state.mode = "edit";
    state.phase = "intro";
    state.introIndex = 0;
    state.stepIndex = 0;
    state.lastAnswerCorrect = null;
    state.score = 0;
    state.currentStepScore = 0;
    state.lastStepScore = 0;
    render();
  });

  rightButtons.appendChild(newBtn);
  buttonsRow.appendChild(leftInfo);
  buttonsRow.appendChild(rightButtons);
  content.appendChild(buttonsRow);

  return card;
}

function buildPuzzleEditorFields(puzzle, container, prefix) {
  switch (puzzle.puzzleKind) {
    case "closedQuestion":
      buildClosedQuestionEditor(puzzle, container, prefix);
      break;
    case "basketQuestion":
      buildBasketEditor(puzzle, container);
      break;
    case "chainBuilder":
      buildChainEditor(puzzle, container);
      break;
    case "pairMatching":
      buildPairMatchingEditor(puzzle, container);
      break;
    case "logicMinefield":
      buildLogicMinefieldEditor(puzzle, container);
      break;
    default:
      buildClosedQuestionEditor(puzzle, container, prefix);
  }
}

function buildClosedQuestionEditor(puzzle, container, labelPrefix) {
  if (!puzzle.options || puzzle.options.length < 2) {
    puzzle.options = ["Answer A", "Answer B"];
    puzzle.correctIndex = 0;
  }
  const qGroup = document.createElement("div");
  qGroup.className = "field-group";
  const qLabel = document.createElement("label");
  qLabel.className = "field-label";
  qLabel.textContent = labelPrefix ? `${labelPrefix} question` : "Question";
  const qInput = document.createElement("input");
  qInput.className = "input";
  qInput.type = "text";
  qInput.value = puzzle.question || "";
  qInput.addEventListener("input", (e) => {
    puzzle.question = e.target.value;
  });
  qGroup.appendChild(qLabel);
  qGroup.appendChild(qInput);
  container.appendChild(qGroup);

  const answersGroup = document.createElement("div");
  answersGroup.className = "field-group";
  const answersLabel = document.createElement("div");
  answersLabel.className = "field-label";
  answersLabel.textContent = "Answers (choose which one is correct)";
  answersGroup.appendChild(answersLabel);

  const answersList = document.createElement("div");
  answersList.className = "answers-list";

  puzzle.options.forEach((opt, idx) => {
    const row = document.createElement("div");
    row.className = "answer-row";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `${labelPrefix || "cq"}-correct`;
    radio.checked = puzzle.correctIndex === idx;
    radio.addEventListener("change", () => {
      puzzle.correctIndex = idx;
    });

    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = opt || "";
    input.addEventListener("input", (e) => {
      puzzle.options[idx] = e.target.value;
    });

    row.appendChild(radio);
    row.appendChild(input);
    answersList.appendChild(row);
  });

  answersGroup.appendChild(answersList);
  container.appendChild(answersGroup);
}

function buildBasketEditor(puzzle, container) {
  if (!Array.isArray(puzzle.baskets) || puzzle.baskets.length < 2) {
    puzzle.baskets = ["Basket A", "Basket B"];
  }
  if (!Array.isArray(puzzle.items) || puzzle.items.length < 5) {
    puzzle.items = Array.from({ length: 5 }, (_, i) => ({
      label: `Item ${i + 1}`,
      correctBasketIndex: 0,
    }));
  }

  const promptGroup = document.createElement("div");
  promptGroup.className = "field-group";
  const pLabel = document.createElement("label");
  pLabel.className = "field-label";
  pLabel.textContent = "Prompt (what should the player do?)";
  const pInput = document.createElement("input");
  pInput.className = "input";
  pInput.type = "text";
  pInput.value = puzzle.prompt || "";
  pInput.addEventListener("input", (e) => {
    puzzle.prompt = e.target.value;
  });
  promptGroup.appendChild(pLabel);
  promptGroup.appendChild(pInput);
  container.appendChild(promptGroup);

  const basketsGroup = document.createElement("div");
  basketsGroup.className = "field-group";
  const bLabel = document.createElement("div");
  bLabel.className = "field-label";
  bLabel.textContent = "Basket names";
  basketsGroup.appendChild(bLabel);

  const basketsRow = document.createElement("div");
  basketsRow.className = "answers-list";

  puzzle.baskets.forEach((bName, idx) => {
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = bName || "";
    input.addEventListener("input", (e) => {
      puzzle.baskets[idx] = e.target.value;
    });
    basketsRow.appendChild(input);
  });

  basketsGroup.appendChild(basketsRow);
  container.appendChild(basketsGroup);

  const itemsGroup = document.createElement("div");
  itemsGroup.className = "field-group";
  const itemsLabel = document.createElement("div");
  itemsLabel.className = "field-label";
  itemsLabel.textContent = "Items (and which basket they belong to)";
  itemsGroup.appendChild(itemsLabel);

  const itemsList = document.createElement("div");
  itemsList.className = "answers-list";

  puzzle.items.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "answer-row";

    const itemInput = document.createElement("input");
    itemInput.className = "input";
    itemInput.type = "text";
    itemInput.value = item.label || "";
    itemInput.addEventListener("input", (e) => {
      puzzle.items[idx].label = e.target.value;
    });

    const select = document.createElement("select");
    select.className = "select";
    puzzle.baskets.forEach((bName, bIdx) => {
      const opt = document.createElement("option");
      opt.value = String(bIdx);
      opt.textContent = bName || `Basket ${bIdx + 1}`;
      if (bIdx === item.correctBasketIndex) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", (e) => {
      puzzle.items[idx].correctBasketIndex = Number(e.target.value);
    });

    row.appendChild(itemInput);
    row.appendChild(select);
    itemsList.appendChild(row);
  });

  itemsGroup.appendChild(itemsList);
  container.appendChild(itemsGroup);
}

function buildChainEditor(puzzle, container) {
  if (!Array.isArray(puzzle.elements) || puzzle.elements.length < 3) {
    puzzle.elements = ["First element", "Second element", "Third element"];
  }

  const promptGroup = document.createElement("div");
  promptGroup.className = "field-group";
  const pLabel = document.createElement("label");
  pLabel.className = "field-label";
  pLabel.textContent = "Prompt (what should the player do?)";
  const pInput = document.createElement("input");
  pInput.className = "input";
  pInput.type = "text";
  pInput.value = puzzle.prompt || "";
  pInput.addEventListener("input", (e) => {
    puzzle.prompt = e.target.value;
  });
  promptGroup.appendChild(pLabel);
  promptGroup.appendChild(pInput);
  container.appendChild(promptGroup);

  const elementsGroup = document.createElement("div");
  elementsGroup.className = "field-group";
  const eLabel = document.createElement("div");
  eLabel.className = "field-label";
  eLabel.textContent = "Correct order of elements";
  elementsGroup.appendChild(eLabel);

  const list = document.createElement("div");
  list.className = "answers-list";

  puzzle.elements.forEach((el, idx) => {
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = el || "";
    input.addEventListener("input", (e) => {
      puzzle.elements[idx] = e.target.value;
    });
    list.appendChild(input);
  });

  elementsGroup.appendChild(list);
  container.appendChild(elementsGroup);
}

function buildPairMatchingEditor(puzzle, container) {
  if (!Array.isArray(puzzle.left) || puzzle.left.length < 4) {
    puzzle.left = ["Left 1", "Left 2", "Left 3", "Left 4"];
  }
  if (!Array.isArray(puzzle.right) || puzzle.right.length < 4) {
    puzzle.right = ["Right 1", "Right 2", "Right 3", "Right 4"];
  }
  if (!Array.isArray(puzzle.mapping) || puzzle.mapping.length < 4) {
    puzzle.mapping = [0, 1, 2, 3];
  }

  const promptGroup = document.createElement("div");
  promptGroup.className = "field-group";
  const pLabel = document.createElement("label");
  pLabel.className = "field-label";
  pLabel.textContent = "Prompt (what should the player do?)";
  const pInput = document.createElement("input");
  pInput.className = "input";
  pInput.type = "text";
  pInput.value = puzzle.prompt || "";
  pInput.addEventListener("input", (e) => {
    puzzle.prompt = e.target.value;
  });
  promptGroup.appendChild(pLabel);
  promptGroup.appendChild(pInput);
  container.appendChild(promptGroup);

  const leftGroup = document.createElement("div");
  leftGroup.className = "field-group";
  const leftLabel = document.createElement("div");
  leftLabel.className = "field-label";
  leftLabel.textContent = "Left side items";
  leftGroup.appendChild(leftLabel);

  const leftList = document.createElement("div");
  leftList.className = "answers-list";
  puzzle.left.forEach((val, idx) => {
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = val || "";
    input.addEventListener("input", (e) => {
      puzzle.left[idx] = e.target.value;
    });
    leftList.appendChild(input);
  });
  leftGroup.appendChild(leftList);
  container.appendChild(leftGroup);

  const rightGroup = document.createElement("div");
  rightGroup.className = "field-group";
  const rightLabel = document.createElement("div");
  rightLabel.className = "field-label";
  rightLabel.textContent = "Right side items";
  rightGroup.appendChild(rightLabel);

  const rightList = document.createElement("div");
  rightList.className = "answers-list";
  puzzle.right.forEach((val, idx) => {
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = val || "";
    input.addEventListener("input", (e) => {
      puzzle.right[idx] = e.target.value;
    });
    rightList.appendChild(input);
  });
  rightGroup.appendChild(rightList);
  container.appendChild(rightGroup);

  const mappingGroup = document.createElement("div");
  mappingGroup.className = "field-group";
  const mapLabel = document.createElement("div");
  mapLabel.className = "field-label";
  mapLabel.textContent = "Which right-side item is the correct match for each left-side item?";
  mappingGroup.appendChild(mapLabel);

  const mapList = document.createElement("div");
  mapList.className = "answers-list";
  puzzle.left.forEach((leftItem, idx) => {
    const row = document.createElement("div");
    row.className = "answer-row";
    const label = document.createElement("span");
    label.textContent = leftItem || `Left ${idx + 1}`;
    const select = document.createElement("select");
    select.className = "select";
    puzzle.right.forEach((rItem, rIdx) => {
      const opt = document.createElement("option");
      opt.value = String(rIdx);
      opt.textContent = rItem || `Right ${rIdx + 1}`;
      if (rIdx === puzzle.mapping[idx]) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener("change", (e) => {
      puzzle.mapping[idx] = Number(e.target.value);
    });
    row.appendChild(label);
    row.appendChild(select);
    mapList.appendChild(row);
  });

  mappingGroup.appendChild(mapList);
  container.appendChild(mappingGroup);
}

function buildLogicMinefieldEditor(puzzle, container) {
  if (!Array.isArray(puzzle.statements) || puzzle.statements.length < 4) {
    puzzle.statements = ["Statement 1", "Statement 2", "Statement 3", "Statement 4"];
  }

  const promptGroup = document.createElement("div");
  promptGroup.className = "field-group";
  const pLabel = document.createElement("label");
  pLabel.className = "field-label";
  pLabel.textContent = "Prompt (explain the logic puzzle)";
  const pInput = document.createElement("input");
  pInput.className = "input";
  pInput.type = "text";
  pInput.value = puzzle.prompt || "";
  pInput.addEventListener("input", (e) => {
    puzzle.prompt = e.target.value;
  });
  promptGroup.appendChild(pLabel);
  promptGroup.appendChild(pInput);
  container.appendChild(promptGroup);

  const statementsGroup = document.createElement("div");
  statementsGroup.className = "field-group";
  const sLabel = document.createElement("div");
  sLabel.className = "field-label";
  sLabel.textContent = "Statements (choose which one is true)";
  statementsGroup.appendChild(sLabel);

  const list = document.createElement("div");
  list.className = "answers-list";

  puzzle.statements.forEach((st, idx) => {
    const row = document.createElement("div");
    row.className = "answer-row";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "logic-correct";
    radio.checked = puzzle.correctIndex === idx;
    radio.addEventListener("change", () => {
      puzzle.correctIndex = idx;
    });
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.value = st || "";
    input.addEventListener("input", (e) => {
      puzzle.statements[idx] = e.target.value;
    });
    row.appendChild(radio);
    row.appendChild(input);
    list.appendChild(row);
  });

  statementsGroup.appendChild(list);
  container.appendChild(statementsGroup);
}

// --- Puzzle renderers ---

function renderPuzzle(puzzle) {
  switch (puzzle.puzzleKind) {
    case "closedQuestion":
      return renderClosedQuestion(puzzle);
    case "basketQuestion":
      return renderBasketQuestion(puzzle);
    case "chainBuilder":
      return renderChainBuilder(puzzle);
    case "pairMatching":
      return renderPairMatching(puzzle);
    case "logicMinefield":
      return renderLogicMinefield(puzzle);
    default: {
      const root = document.createElement("div");
      root.textContent = "Unknown puzzle type.";
      return {
        root,
        getResult: () => ({ valid: false, correct: false, message: "Unknown puzzle type." }),
      };
    }
  }
}

function renderClosedQuestion(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(puzzle.question);
  root.appendChild(container);

  const options = document.createElement("div");
  options.className = "options";

  const name = `cq-${Math.random().toString(36).slice(2)}`;

  puzzle.options.forEach((optText, idx) => {
    const row = document.createElement("label");
    row.className = "option-row";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = String(idx);

    const span = document.createElement("span");
    span.className = "option-label";
    setMarkdown(span, optText);

    row.appendChild(input);
    row.appendChild(span);
    options.appendChild(row);
  });

  root.appendChild(options);

  return {
    root,
    getResult: () => {
      const checked = root.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        return { valid: false, correct: false, message: "Choose one of the two answers." };
      }
      const idx = Number(checked.value);
      const correct = idx === puzzle.correctIndex;
      return { valid: true, correct };
    },
  };
}

function renderBasketQuestion(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(puzzle.prompt);
  root.appendChild(container);

  const hint = document.createElement("div");
  hint.className = "muted";
  hint.textContent = "Drag each item into the correct basket.";
  root.appendChild(hint);

  const dndWrapper = document.createElement("div");
  dndWrapper.className = "basket-dnd";

  const pool = document.createElement("div");
  pool.className = "basket-pool";
  const poolLabel = document.createElement("div");
  poolLabel.className = "field-label";
  poolLabel.textContent = "Items to sort";
  pool.appendChild(poolLabel);

  const poolArea = document.createElement("div");
  poolArea.className = "basket-drop";
  pool.appendChild(poolArea);

  const columns = document.createElement("div");
  columns.className = "basket-columns";

  const assignments = Array(puzzle.items.length).fill(null); // basket index or null
  const itemEls = [];

  function makeItemChip(idx) {
    const chip = document.createElement("div");
    chip.className = "item-chip";
    chip.draggable = true;
    chip.dataset.index = String(idx);
    chip.textContent = puzzle.items[idx].label;

    chip.addEventListener("dragstart", (e) => {
      chip.classList.add("dragging");
      e.dataTransfer?.setData("text/plain", String(idx));
    });
    chip.addEventListener("dragend", () => {
      chip.classList.remove("dragging");
    });
    return chip;
  }

  function handleDrop(targetBasketIndex, dropZone, event) {
    event.preventDefault();
    dropZone.classList.remove("hover");
    const data = event.dataTransfer?.getData("text/plain");
    const idx = data != null && data !== "" ? Number(data) : null;
    if (idx == null || Number.isNaN(idx)) return;
    const chip = itemEls[idx];
    if (!chip) return;

    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }

    dropZone.appendChild(chip);
    assignments[idx] = targetBasketIndex;
  }

  // Pool for "no basket yet"
  poolArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    poolArea.classList.add("hover");
  });
  poolArea.addEventListener("dragleave", () => {
    poolArea.classList.remove("hover");
  });
  poolArea.addEventListener("drop", (e) => {
    handleDrop(null, poolArea, e);
  });

  // Stationary baskets
  puzzle.baskets.forEach((basketLabel, bIdx) => {
    const col = document.createElement("div");
    col.className = "basket";

    const title = document.createElement("div");
    title.className = "basket-title";
    title.textContent = basketLabel;
    col.appendChild(title);

    const drop = document.createElement("div");
    drop.className = "basket-drop";
    drop.dataset.basketIndex = String(bIdx);

    drop.addEventListener("dragover", (e) => {
      e.preventDefault();
      drop.classList.add("hover");
    });
    drop.addEventListener("dragleave", () => {
      drop.classList.remove("hover");
    });
    drop.addEventListener("drop", (e) => handleDrop(bIdx, drop, e));

    col.appendChild(drop);
    columns.appendChild(col);
  });

  // Create items in pool
  puzzle.items.forEach((_, idx) => {
    const chip = makeItemChip(idx);
    itemEls[idx] = chip;
    poolArea.appendChild(chip);
  });

  dndWrapper.appendChild(pool);
  dndWrapper.appendChild(columns);
  root.appendChild(dndWrapper);

  return {
    root,
    getResult: () => {
      // Ensure every item assigned
      for (let i = 0; i < assignments.length; i++) {
        if (assignments[i] === null || assignments[i] === undefined) {
          return {
            valid: false,
            correct: false,
            message: "Place every item into one of the baskets.",
          };
        }
      }
      // Check correctness
      let correct = true;
      for (let i = 0; i < puzzle.items.length; i++) {
        if (assignments[i] !== puzzle.items[i].correctBasketIndex) {
          correct = false;
          break;
        }
      }
      return { valid: true, correct };
    },
  };
}

function renderChainBuilder(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(puzzle.prompt);
  root.appendChild(container);

  const hint = document.createElement("div");
  hint.className = "muted";
  hint.textContent = "Drag the tiles into the correct order.";
  root.appendChild(hint);

  const layout = document.createElement("div");
  layout.className = "chain-layout";

  const slotsRow = document.createElement("div");
  slotsRow.className = "chain-slots-row";

  const pool = document.createElement("div");
  pool.className = "chain-pool basket-drop";

  const assignments = [null, null, null]; // slot -> element index
  const usedBy = Array(puzzle.elements.length).fill(null); // element -> slot index
  const chips = [];

  function makeChip(idx) {
    const chip = document.createElement("div");
    chip.className = "item-chip";
    chip.draggable = true;
    chip.dataset.index = String(idx);
    chip.textContent = puzzle.elements[idx];

    chip.addEventListener("dragstart", (e) => {
      chip.classList.add("dragging");
      e.dataTransfer?.setData("text/plain", String(idx));
    });
    chip.addEventListener("dragend", () => {
      chip.classList.remove("dragging");
    });

    return chip;
  }

  function clearAssignmentForElement(elementIdx) {
    const slotIdx = usedBy[elementIdx];
    if (slotIdx == null) return;
    usedBy[elementIdx] = null;
    assignments[slotIdx] = null;
  }

  function handleDropOnSlot(slotIdx, slotEl, event) {
    event.preventDefault();
    slotEl.classList.remove("hover");
    const data = event.dataTransfer?.getData("text/plain");
    const elementIdx = data != null && data !== "" ? Number(data) : null;
    if (elementIdx == null || Number.isNaN(elementIdx)) return;
    const chip = chips[elementIdx];
    if (!chip) return;

    // free chip from previous usage
    clearAssignmentForElement(elementIdx);

    // if slot already had element, move it back to pool
    if (assignments[slotIdx] != null) {
      const oldElementIdx = assignments[slotIdx];
      usedBy[oldElementIdx] = null;
      const oldChip = chips[oldElementIdx];
      if (oldChip && oldChip.parentElement) {
        oldChip.parentElement.removeChild(oldChip);
        pool.appendChild(oldChip);
      }
    }

    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
    slotEl.appendChild(chip);

    assignments[slotIdx] = elementIdx;
    usedBy[elementIdx] = slotIdx;
  }

  // Create three slots with arrows between
  for (let i = 0; i < 3; i++) {
    const slotWrapper = document.createElement("div");
    slotWrapper.className = "chain-slot-wrapper";

    const slot = document.createElement("div");
    slot.className = "basket-drop chain-slot";
    slot.dataset.slotIndex = String(i);

    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
      slot.classList.add("hover");
    });
    slot.addEventListener("dragleave", () => {
      slot.classList.remove("hover");
    });
    slot.addEventListener("drop", (e) => handleDropOnSlot(i, slot, e));

    const label = document.createElement("div");
    label.className = "muted chain-slot-label";
    label.textContent = ["First", "Second", "Third"][i];

    slotWrapper.appendChild(slot);
    slotWrapper.appendChild(label);
    slotsRow.appendChild(slotWrapper);

    if (i < 2) {
      const arrow = document.createElement("div");
      arrow.className = "chain-arrow";
      arrow.textContent = "➜";
      slotsRow.appendChild(arrow);
    }
  }

  // Pool with tiles underneath
  puzzle.elements.forEach((_, idx) => {
    const chip = makeChip(idx);
    chips[idx] = chip;
    pool.appendChild(chip);
  });

  // dropping back to pool
  pool.addEventListener("dragover", (e) => {
    e.preventDefault();
    pool.classList.add("hover");
  });
  pool.addEventListener("dragleave", () => {
    pool.classList.remove("hover");
  });
  pool.addEventListener("drop", (e) => {
    e.preventDefault();
    pool.classList.remove("hover");
    const data = e.dataTransfer?.getData("text/plain");
    const elementIdx = data != null && data !== "" ? Number(data) : null;
    if (elementIdx == null || Number.isNaN(elementIdx)) return;
    const chip = chips[elementIdx];
    if (!chip) return;

    clearAssignmentForElement(elementIdx);
    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
    pool.appendChild(chip);
  });

  layout.appendChild(slotsRow);
  layout.appendChild(pool);
  root.appendChild(layout);

  return {
    root,
    getResult: () => {
      if (assignments.some((a) => a == null)) {
        return { valid: false, correct: false, message: "Fill all three positions in the chain." };
      }
      // correct order is the original array order
      let correct = true;
      for (let i = 0; i < 3; i++) {
        if (assignments[i] !== i) {
          correct = false;
          break;
        }
      }
      return { valid: true, correct };
    },
  };
}

function renderPairMatching(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(puzzle.prompt);
  root.appendChild(container);

  const hint = document.createElement("div");
  hint.className = "muted";
  hint.textContent = "Drag each item from the right onto its matching item on the left.";
  root.appendChild(hint);

  const layout = document.createElement("div");
  layout.className = "match-layout";

  const leftCol = document.createElement("div");
  leftCol.className = "match-column";

  const rightCol = document.createElement("div");
  rightCol.className = "match-column match-right-pool";

  const rightTitle = document.createElement("div");
  rightTitle.className = "field-label";
  rightTitle.textContent = "Right side items";
  rightCol.appendChild(rightTitle);

  const rightPool = document.createElement("div");
  rightPool.className = "basket-drop";
  rightCol.appendChild(rightPool);

  const matches = Array(puzzle.left.length).fill(null); // right index or null
  const usedBy = Array(puzzle.right.length).fill(null); // left index or null
  const rightChips = [];

  function makeRightChip(idx) {
    const chip = document.createElement("div");
    chip.className = "item-chip";
    chip.draggable = true;
    chip.dataset.index = String(idx);
    chip.textContent = puzzle.right[idx];

    chip.addEventListener("dragstart", (e) => {
      chip.classList.add("dragging");
      e.dataTransfer?.setData("text/plain", String(idx));
    });
    chip.addEventListener("dragend", () => {
      chip.classList.remove("dragging");
    });

    return chip;
  }

  function removeAssignmentForRight(rightIdx) {
    const leftIdx = usedBy[rightIdx];
    if (leftIdx == null) return;
    usedBy[rightIdx] = null;
    matches[leftIdx] = null;
  }

  function handleDropOnLeft(leftIdx, dropZone, event) {
    event.preventDefault();
    dropZone.classList.remove("hover");
    const data = event.dataTransfer?.getData("text/plain");
    const rightIdx = data != null && data !== "" ? Number(data) : null;
    if (rightIdx == null || Number.isNaN(rightIdx)) return;
    const chip = rightChips[rightIdx];
    if (!chip) return;

    // clear previous assignment of this right item
    removeAssignmentForRight(rightIdx);

    // clear any previous right item attached to this left
    if (matches[leftIdx] != null) {
      const oldRightIdx = matches[leftIdx];
      usedBy[oldRightIdx] = null;
      const oldChip = rightChips[oldRightIdx];
      if (oldChip && oldChip.parentElement) {
        oldChip.parentElement.removeChild(oldChip);
        rightPool.appendChild(oldChip);
      }
    }

    // move chip into this left row
    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
    dropZone.appendChild(chip);

    matches[leftIdx] = rightIdx;
    usedBy[rightIdx] = leftIdx;
  }

  // Left side items with drop targets
  puzzle.left.forEach((leftLabel, idx) => {
    const row = document.createElement("div");
    row.className = "match-left-row";

    const label = document.createElement("div");
    label.className = "item-label";
    setMarkdown(label, leftLabel);

    const target = document.createElement("div");
    target.className = "basket-drop match-target";
    target.dataset.leftIndex = String(idx);

    target.addEventListener("dragover", (e) => {
      e.preventDefault();
      target.classList.add("hover");
    });
    target.addEventListener("dragleave", () => {
      target.classList.remove("hover");
    });
    target.addEventListener("drop", (e) => handleDropOnLeft(idx, target, e));

    row.appendChild(label);
    row.appendChild(target);
    leftCol.appendChild(row);
  });

  // Right side chips
  puzzle.right.forEach((rightLabel, idx) => {
    const chip = makeRightChip(idx);
    rightChips[idx] = chip;
    rightPool.appendChild(chip);
  });

  // Allow dropping back to right pool to unassign
  rightPool.addEventListener("dragover", (e) => {
    e.preventDefault();
    rightPool.classList.add("hover");
  });
  rightPool.addEventListener("dragleave", () => {
    rightPool.classList.remove("hover");
  });
  rightPool.addEventListener("drop", (e) => {
    e.preventDefault();
    rightPool.classList.remove("hover");
    const data = e.dataTransfer?.getData("text/plain");
    const rightIdx = data != null && data !== "" ? Number(data) : null;
    if (rightIdx == null || Number.isNaN(rightIdx)) return;
    const chip = rightChips[rightIdx];
    if (!chip) return;
    // remove from left if assigned
    removeAssignmentForRight(rightIdx);
    if (chip.parentElement) {
      chip.parentElement.removeChild(chip);
    }
    rightPool.appendChild(chip);
  });

  layout.appendChild(leftCol);
  layout.appendChild(rightCol);
  root.appendChild(layout);

  return {
    root,
    getResult: () => {
      if (matches.some((m) => m == null)) {
        return { valid: false, correct: false, message: "Create all four pairs before checking." };
      }

      let correct = true;
      for (let i = 0; i < puzzle.left.length; i++) {
        if (matches[i] !== puzzle.mapping[i]) {
          correct = false;
          break;
        }
      }
      return { valid: true, correct };
    },
  };
}

function renderLogicMinefield(puzzle) {
  const root = document.createElement("div");

  const { container } = createPharaohQuestionContainer(puzzle.prompt);
  root.appendChild(container);

  const hint = document.createElement("div");
  hint.className = "muted";
  hint.textContent = "Only one inscription can be true. Choose carefully.";
  root.appendChild(hint);

  const options = document.createElement("div");
  options.className = "options";

  const name = `lm-${Math.random().toString(36).slice(2)}`;

  puzzle.statements.forEach((text, idx) => {
    const row = document.createElement("label");
    row.className = "option-row";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = String(idx);

    const span = document.createElement("span");
    span.className = "option-label";
    setMarkdown(span, text);

    row.appendChild(input);
    row.appendChild(span);
    options.appendChild(row);
  });

  root.appendChild(options);

  return {
    root,
    getResult: () => {
      const checked = root.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        return { valid: false, correct: false, message: "Choose exactly one inscription." };
      }
      const idx = Number(checked.value);
      const correct = idx === puzzle.correctIndex;
      return { valid: true, correct };
    },
  };
}

// --- UI helpers ---

function createCardShell({ badgeText, badgeSecondary, title, subtitle, progressText }) {
  const card = document.createElement("div");
  card.className = "card";

  const header = document.createElement("div");
  header.className = "card-header";

  const left = document.createElement("div");

  const badgeRow = document.createElement("div");
  badgeRow.style.display = "flex";
  badgeRow.style.gap = "8px";
  badgeRow.style.alignItems = "center";

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = badgeText;

  const badge2 = document.createElement("div");
  badge2.className = "badge badge-secondary";
  badge2.textContent = badgeSecondary;

  badgeRow.appendChild(badge);
  badgeRow.appendChild(badge2);

  const titleEl = document.createElement("h2");
  titleEl.className = "title";
  titleEl.textContent = title;

  const subtitleEl = document.createElement("p");
  subtitleEl.className = "subtitle";
  subtitleEl.textContent = subtitle;

  left.appendChild(badgeRow);
  left.appendChild(titleEl);
  left.appendChild(subtitleEl);

  const right = document.createElement("div");
  right.className = "progress";

  const progressSpan = document.createElement("span");
  progressSpan.textContent = progressText;
  right.appendChild(progressSpan);

  if (state.screen === "sequence") {
    const scoreWrap = document.createElement("div");
    scoreWrap.className = "score-thermo";

    const labelSpan = document.createElement("span");
    labelSpan.className = "score-thermo-label";
    labelSpan.textContent = "Score";

    const bar = document.createElement("div");
    bar.className = "score-bar";

    const fill = document.createElement("div");
    const isGain = state.score >= 0;
    fill.className = "score-bar-fill " + (isGain ? "gain" : "loss");

    const stepsArr = puzzleSequence && Array.isArray(puzzleSequence.steps) ? puzzleSequence.steps : [];
    const maxAbs =
      stepsArr.length > 0
        ? stepsArr.reduce((sum, step) => sum + getMaxBasePointsForStep(step), 0)
        : 15;
    const absScore = Math.min(maxAbs, Math.abs(state.score));
    const pct = (absScore / maxAbs) * 100;
    fill.style.width = `${Math.max(6, pct)}%`;

    bar.appendChild(fill);

    const valueSpan = document.createElement("span");
    valueSpan.className = "score-thermo-value";
    const sign = state.score > 0 ? "+" : state.score < 0 ? "-" : "";
    valueSpan.textContent = `${sign}${Math.abs(state.score)} pts`;

    scoreWrap.appendChild(labelSpan);
    scoreWrap.appendChild(bar);
    scoreWrap.appendChild(valueSpan);
    right.appendChild(scoreWrap);

  }

  if (state.screen === "sequence") {
    const modeBtn = document.createElement("button");
    modeBtn.className = "btn-ghost btn-compact";
    modeBtn.type = "button";
    modeBtn.textContent = state.mode === "edit" ? "Player mode" : "Creator mode";
    modeBtn.addEventListener("click", () => {
      if (state.mode === "edit") {
        state.mode = "play";
        // keep current phase
      } else {
        state.mode = "edit";
      }
      render();
    });

    const libraryBtn = document.createElement("button");
    libraryBtn.className = "btn-ghost btn-compact";
    libraryBtn.type = "button";
    libraryBtn.textContent = "All sequences";
    libraryBtn.addEventListener("click", () => {
      state.screen = "library";
      state.mode = "play";
      render();
    });

    right.appendChild(modeBtn);
    right.appendChild(libraryBtn);
  }

  header.appendChild(left);
  header.appendChild(right);
  card.appendChild(header);

  const divider = document.createElement("div");
  divider.className = "divider";
  card.appendChild(divider);

  const content = document.createElement("div");
  content.className = "content";
  card.appendChild(content);

  return card;
}

// --- Start ---

(function bootstrap() {
  render();
})();



