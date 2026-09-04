# 𐬀𐬎𐬎𐬌𐬙𐬀 Avista

### Learn • Read • Practice • Explore the Avestan Script

**Avista** is an open-source, research-oriented learning platform for studying the **Avestan script (Din Dabireh / دین‌دبیره)**, its characters, transliteration, pronunciation, vocabulary, and textual tradition.

The project brings together an interactive learning experience, a Unicode-aware Avestan character library, an etymological vocabulary collection, spaced repetition, quizzes, and learning progress — all inside a modern, accessible web application.

> **Avista is built to make an ancient writing system approachable without reducing its scholarly depth.**

---

## ✨ Why Avista?

Learning an ancient script shouldn't feel like reading a static table of Unicode characters.

Avista turns the Avestan script into an interactive learning journey:

- 🔤 Explore the complete Avestan Unicode character set
- 🧠 Learn through structured lessons and spaced repetition
- 📖 Explore an etymological Avestan vocabulary
- 🔎 Search words by Avestan form, Persian meaning, transliteration, or root
- 🧪 Test your knowledge through interactive quizzes
- 📊 Track learning progress and streaks locally
- 🌙 Switch between light and dark themes
- 📱 Learn comfortably on mobile, tablet, and desktop
- ✨ Experience a modern interface with motion and micro-interactions
- 🌐 Use Unicode-native Avestan characters instead of images

---

## 🏛️ What is the Avestan Script?

The **Avestan script** is a historical writing system used primarily for recording the Avestan language, the language of the Zoroastrian sacred texts.

Avista focuses specifically on making the script itself easier to approach:

> **Character → Sound → Transliteration → Meaning → Word → Text**

The goal is not to replace academic study, but to provide an accessible interactive layer that can support learners, researchers, developers, and anyone interested in Iranian languages and writing systems.

---

## 🚀 Features

### 🔤 Avestan Character Explorer

Explore the project's Unicode-based Avestan character collection.

Each character can expose information such as:

- Avestan glyph
- Unicode code point
- transliteration
- pronunciation
- IPA
- examples
- related characters
- learning status

Characters are represented using Unicode rather than rasterized images whenever possible.

---

### 📚 Avestan Dictionary

Avista includes an expanding collection of Gathic and Yasna vocabulary.

The dictionary provides:

- Avestan word
- transliteration
- meaning
- root
- morphological / linguistic analysis
- textual context
- related characters
- category-based filtering
- search

The dictionary is designed as a research-oriented educational resource rather than a general-purpose machine dictionary.

---

### 🧠 Spaced Repetition

Learning is reinforced using a lightweight spaced-repetition workflow.

Current review intervals include:

```text
1 → 3 → 7 → 14 days
```

The system is intentionally simple and transparent so that learners can understand why an item appears again.

---

### 🧪 Quizzes

Knowledge can be tested through staged quizzes covering areas such as:

- character recognition
- transliteration
- Unicode
- vocabulary
- meaning
- script recognition

The quiz system is designed to complement learning rather than replace deeper study.

---

### 📈 Learning Progress

Avista keeps track of learning activity locally.

Progress may include:

- learned characters
- completed lessons
- quiz scores
- review progress
- streaks
- total learning activity

The current implementation uses browser storage rather than requiring a user account.

---

### 🌗 Light & Dark Mode

The interface supports both light and dark visual modes.

The design system combines:

- Persian typography
- Avestan glyph typography
- glass surfaces
- subtle gradients
- restrained motion
- responsive layouts
- accessible contrast

---

### 📱 Mobile First

Avista is designed from the beginning for small screens.

The interface includes:

- responsive navigation
- mobile bottom navigation
- touch-friendly controls
- horizontally scrollable filters
- adaptive cards
- responsive typography
- reduced visual density on small screens

---

## 🧩 Technology

Avista is built with modern web technologies:

| Technology          | Purpose                          |
| ------------------- | -------------------------------- |
| Next.js             | Application framework            |
| React               | UI architecture                  |
| JavaScript          | Application language             |
| Tailwind CSS        | Styling                          |
| HeroUI              | UI primitives                    |
| Framer Motion       | Motion and interaction           |
| Lucide React Motion | Animated icons                   |
| Border Beam         | Visual effects                   |
| html-to-image       | Shareable learning cards         |
| Web Storage         | Local learning progress          |
| Unicode             | Avestan character representation |

The project is designed to remain relatively lightweight and understandable for contributors.

---

## 🎨 Design Philosophy

Avista follows a few core principles.

### 1. Ancient subject, modern interface

The interface should feel contemporary without turning the subject into a museum exhibit.

### 2. Typography matters

Avestan is a writing system.

Glyphs should be treated as primary visual content, not decorative symbols.

### 3. Motion should explain

Animation is used to communicate:

- state changes
- navigation
- feedback
- hierarchy
- interaction

—not simply to make the interface move.

### 4. Research over decoration

Visual polish should never come at the expense of linguistic accuracy or source transparency.

### 5. Progressive disclosure

Beginners should see familiar language first, while deeper linguistic information remains available when needed.

---

## 🗂️ Project Structure

A simplified structure looks like:

```text
avista/
├── app/
│   ├── dictionary/
│   ├── learn/
│   ├── quiz/
│   ├── progress/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components/
│   ├── layout/
│   ├── shared/
│   ├── home/
│   ├── dictionary/
│   ├── learning/
│   └── quiz/
│
├── data/
│   ├── dictionary.js
│   ├── characters.js
│   ├── lessons.js
│   └── ...
│
├── public/
│   └── ...
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── pull_request_template.md
│
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── SUPPORT.md
├── CHANGELOG.md
├── LICENSE
├── package.json
└── README.md
```

---

## 🛠️ Getting Started

### Requirements

- Node.js 20+
- npm, pnpm, or another compatible package manager
- Git

### Clone

```bash
git clone https://github.com/itshurad/avista.git
cd avista
```

### Install dependencies

```bash
npm install
```

### Start development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Production Build

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Before opening a pull request, make sure the project builds successfully.

---

## 🤝 Contributing

Avista is open source and welcomes contributions.

There are many ways to contribute:

- improve the UI
- improve accessibility
- add tests
- improve documentation
- improve Persian terminology
- add linguistic research
- review existing linguistic data
- improve Unicode handling
- add educational content
- report bugs
- suggest features
- improve mobile UX
- translate documentation
- improve developer tooling

Please read:

**[CONTRIBUTING.md](CONTRIBUTING.md)**

before submitting a pull request.

---

## 🧠 Research & Linguistic Contributions

Research-oriented contributions are especially valuable.

When contributing linguistic or historical information, please provide:

1. the proposed change
2. the source
3. relevant bibliographic information
4. a short explanation of the reasoning
5. whether the information is established, reconstructed, or interpretive

Please avoid presenting uncertain reconstructions as established facts.

Technical identifiers such as Unicode code points should remain exact.

---

## 📖 Sources & Scholarship

Avista is intended to be a research-oriented educational project.

Relevant scholarly and technical sources may include:

- Unicode Standard
- ISO/IEC 10646
- academic publications on the Avestan language
- academic publications on the Avestan script
- established dictionaries and linguistic resources
- primary textual sources
- peer-reviewed research

Every contributor is encouraged to make source provenance clear when modifying linguistic data.

---

## 🔐 Privacy

Avista currently does not require a user account for its core learning experience.

Learning progress is primarily stored locally in the browser.

This means that, in the current architecture:

- no account is required
- learning progress can remain on the user's device
- there is no mandatory server-side learner profile

Future versions may introduce optional synchronization while preserving user control over learning data.

---

## 🛡️ Security

If you discover a security vulnerability, please **do not open a public issue**.

Instead, follow the instructions in:

**[SECURITY.md](SECURITY.md)**

---

## 📜 License

Avista is released under the **MIT License** unless otherwise stated for a specific file or dataset.

See:

```text
LICENSE
```

for the full license text.

> Note: linguistic datasets, fonts, third-party libraries, and external resources may have their own licenses. Always check the relevant attribution and licensing information before redistributing them.

---

## 🌱 Project Status

Avista is an evolving open-source project.

Some parts of the platform are stable, while others are actively being developed.

Expect:

- new vocabulary
- improved lessons
- additional quizzes
- better linguistic metadata
- accessibility improvements
- new research references
- improved mobile experiences
- additional developer tooling

---

## 🗺️ Roadmap

### Now

- [x] Avestan character exploration
- [x] Unicode-aware character data
- [x] Dictionary
- [x] Search
- [x] Categories
- [x] Learning journey
- [x] Quizzes
- [x] Local progress
- [x] Streak tracking
- [x] Responsive interface
- [x] Light / dark mode
- [x] Motion system

### Next

- [ ] Expanded vocabulary
- [ ] More lessons
- [ ] More quiz types
- [ ] Improved accessibility
- [ ] Automated linguistic data validation
- [ ] Better research references
- [ ] More comprehensive test coverage
- [ ] PWA support
- [ ] Offline-first learning
- [ ] Import / export of learning progress

### Future

- [ ] Optional account synchronization
- [ ] Community annotations
- [ ] Advanced search
- [ ] Text-level Avestan reading tools
- [ ] Research datasets
- [ ] API for educational use

---

## 👥 Maintainers

Avista is maintained as an open-source community project.

Maintainers are responsible for:

- project direction
- reviewing contributions
- protecting the project's research quality
- maintaining the codebase
- coordinating releases
- responding to security reports

See `CODEOWNERS` for repository ownership information.

---

## 💬 Community

Questions, ideas, research discussions, and suggestions are welcome.

For:

- 🐛 bugs → open an issue
- 💡 features → open a feature request
- 🔬 research → open a discussion or research-focused issue
- 🔐 security → follow `SECURITY.md`
- 🤝 contributions → read `CONTRIBUTING.md`

---

## ⭐ Support the Project

If Avista is useful to you:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest improvements
- 📖 Improve documentation
- 🔬 Contribute research
- 🧑‍💻 Submit pull requests
- 📣 Share the project

Open source grows through people who care.

---

## 🏺 Why "Avista"?

The project name is inspired by **Avesta (اوستا)** and the Avestan textual tradition.

The goal is simple:

> **Make the script easier to enter, easier to practice, and easier to explore — while respecting the scholarship behind it.**

---

<p align="center">

### 𐬀𐬎𐬎𐬌𐬙𐬀

**Avista — An open-source learning space for the Avestan script.**

Made for learners, researchers, developers, and everyone curious about ancient Iranian writing.

</p>
