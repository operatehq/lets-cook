# Let's Cook › Recipe Manager

## 📖 Table of Contents

- [Backstory](#backstory)
- [Feature Requests](#feature-requests)
- [Instructions](#instructions)
  - [Overview](#overview)
  - [What We're Looking For](#what-were-looking-for)
  - [Communication](#communication)
  - [AI Usage](#ai-usage)
- [App Setup](#app-setup)
  - [Prerequisites](#prerequisites)
  - [Basic Setup & Running](#basic-setup--running)
  - [Working with the Database](#working-with-the-database)
  - [Using PGLite](#using-pglite)
  - [Using DevTools for Database Management](#using-devtools-for-database-management)
  - [Example Data](#example-data)
- [Submission](#submission)

---

## Backstory

Nestled in a leafy block in the heart of Oakland, CA, sits **Craft**, one of the most talked-about restaurants in California.

The food? **Phenomenal.**
The vibe? **Effortlessly cool.**
The kitchen? **Total, beautiful chaos.**

At the center of it all is the culinary enigma himself: **Chef Marvin**. He's a genius. A visionary. A man who once plated a fennel salad so moving it made a food critic weep mid-bite. But he has one tiny quirk: He's deeply, violently opposed to writing anything down.

Pencils? _"Tasteless."_

Pens? _"Too corporate."_

Laptops? _"They radiate doubt."_

Instead, Chef Marvin sings his recipes. Or tells long, meandering stories that begin decades ago in his grandmother's garden and end, somehow, with a perfectly emulsified aioli. Sometimes, he whispers them while reorganizing the walk-in fridge by "emotional frequency."

The only person who's managed to turn this chaos into a functioning kitchen is **Sous Chef Lane**. Relentlessly competent, fiercely caffeinated, and fluent in Chef Marvin's stream-of-consciousness cuisine, Lane has been the quiet force behind Craft's success.

For years, she's kept it all together—decoding ballads about beurre blanc, jotting notes on napkins, and occasionally recording voice memos of Chef Marvin explaining a lamb reduction using only bird metaphors.

But last week, after an especially abstract monologue on _"the ephemeral crunch of betrayal"_ (it was about croutons), Lane broke.

That night, she opened her laptop in a dark corner of the walk-in fridge and, using AI, built a bare-bones app. No bells. No whistles. Just a simple list of dishes, Chef Marvin's ramblings for reference, instructions, and ingredients—her attempt to keep the kitchen from imploding.

It's a humble start. But Lane has bigger dreams. **That's where you come in...**

---

## Feature Requests

Lane knows what she wants, but she's never built software before. Here's her list of ideas, straight from her notes app between shifts:

### 📝 Transcription and/or Rambling Parsing

> _"I'd love for the app to transcribe Chef's ramblings and/or automatically turn the text of one into a usable recipe. Bonus points if it can filter out his tangents about the olive oil's emotional baggage."_

### 🔍 Search & Categories

> _"I added navigation items, but I could never get them to work! I want to be able to search for a recipe or filter them by categories. Bonus if I can search by ingredient."_

### 📱 Responsive Layout

> _"I'm often on my phone or iPad when I'm in the kitchen. The site looks pretty rough on anything other than my laptop."_

### ✏️ Editing

> _"Sometimes I just want to add a step or reorder instructions without rewriting the whole thing. A more flexible editing system would save me a ton of time. I like the way Notion handles these things, maybe something like that?"_

### 📐 Better Recipe Structure

> _"Right now it's all just free text. I'd love to break things into consistent sections like Ingredients, Steps, Time, Tools Needed, etc. but I definitely don't want it to be a pain to input it."_

### 🔁 Smart Substitutions

> _"We run out of stuff *all the time*. It'd be amazing if I could click an ingredient and see common swaps (like crème fraîche → sour cream, etc)."_

### ➗ Portion Scaling

> _"Being able to scale a recipe from 2 servings to 20 would make prep so much easier."_

### ✨ Improved UI & UX

> _"I spent all my time getting the little chef logo to wink, and didn't spend enough time making the app actually look and work great!"_

She knows it's possible. She just needs help.

---

## Instructions

### Overview

- **Timebox**: Please timebox your work to approximately **4–8 hours**. Don't worry about getting to everything. Prioritization, approach, and communication are more important than completeness.
- **Interpretation**: You may interpret and reframe the feature requests however you'd like; focus on solving Lane's core problems in the most thoughtful way you can.

### What We're Looking For

- **Clear prioritization and scoping decisions**
- **Thoughtful, maintainable code**
- **Pragmatic decision-making and progress**
- **Usable solutions that make Lane's life easier**
- **Bonus: Creativity, personality, and polish**
- **Don't be afraid to be ambitious!**

### Communication

You'll have access to a private **Slack channel** with our team. We encourage you to:

- Ask questions
- Clarify edge cases
- Share progress
- Get feedback

**Need help?** If you have any issues accessing Slack, reach out to **dan@operate.so**.

### AI Usage

You may use AI for this assessment to assist with coding and features; however, please do so mindfully. We expect all code to be:

- Explainable
- Concise and clearly documented
- Free of AI fluff like unnecessary comments, overly abstracted logic, or verbose boilerplate.

---

## App Setup

### Prerequisites

- **Node.js** (recommended: latest LTS version)
- **Package manager**: pnpm (preferred) or npm

### Basic Setup & Running

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Alternative: Run with npm
npm install
npm run dev
```

### Tech Stack

The app uses:

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS, CVA, & Tailwind Merge**
- **PGLite DB**
- **ESLint & Prettier**

> 💡 **Note**: You may remove, replace, or add any libraries/tools as needed.

### Working with the Database

The app uses **PGLite DB** for local database management, which is a lightweight SQL database designed for use in web applications.

> ⚠️ **Important**: The data is only stored locally, meaning the database will persist in your browser but won't sync across devices or reloads unless implemented manually.

📚 **Documentation**: [PGLite GitHub](https://github.com/electric-sql/pglite)

### Using PGLite

1. **Installation**: Ensure that `@electric-sql/pglite` is included in your `package.json` dependencies. This is already set up in the project.

2. **Initialization**: The database is initialized in `src/lib/db.ts` using the `PGlite` class. It is configured to persist data in IndexedDB within the browser.

3. **Schema Management**: The `initDatabase` function in `db.ts` sets up the database schema, creating tables and handling migrations, such as adding new columns.

4. **Deleting the DB**: We provide dev tools for simple database interactions, however, you can always delete the database in your browser dev tools under Application > IndexedDB > `/pglite/recipe-db`

### Using DevTools for Database Management

The `DevTools` component located in `src/components/dev-tools.tsx` provides a simple UI for managing the database during development. Here's how you can use it:

| Feature               | Description                                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Opening DevTools**  | In development mode, a floating button appears in the bottom-right corner of the app. Click this button to open the DevTools panel. |
| **Reset Database**    | Use the "Reset Database" button to clear all data and reset the database to its initial state with example data.                    |
| **Clear All Recipes** | The "Clear All Recipes" button allows you to delete all recipe entries from the database without resetting the schema.              |
| **Database Info**     | The panel displays current database statistics, such as the number of tables and recipes.                                           |

### Example Data

We've pre-populated the app with a few ramblings and recipes from Chef Marvin, these can be found in `src/chef-ramblings`

**We encourage you to add some favorites of your own!**

---

## Submission

When you're ready, please either:

1. **Share a GitHub link** (public or private, just make sure we have access)
2. **Record a short walkthrough video** if helpful (Loom, CleanShot, etc.)
3. **Let us know/document** what you'd focus on next if you had more time

### Next Steps

- We'll review your submission, ask questions via Slack, and provide feedback
- Assuming the submission meets the requirements for the open position, we'll schedule a technical walkthrough with the team

---

**We're excited to see what you come up with. And on behalf of Lane and the team at Craft—thank you for helping restore a little sanity to the kitchen.**
