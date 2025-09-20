## Backstory

Nestled in a leafy block in the heart of Oakland, CA, sits Craft, one of the most talked-about restaurants in California.

The food? Phenomenal. The vibe? Effortlessly cool. The kitchen? Total, beautiful chaos.

At the center of it all is the culinary enigma himself: Chef Marvin. He's a genius. A visionary. A man who once plated a fennel salad so moving it made a food critic weep mid-bite. But he has one tiny quirk: He's deeply, violently opposed to writing anything down.

Pencils? "Tasteless."

Pens? "Too corporate."

Laptops? "They radiate doubt."

Instead, Chef Marvin sings his recipes. Or tells long, meandering stories that begin decades ago in his grandmother's garden and end, somehow, with a perfectly emulsified aioli. Sometimes, he whispers them while reorganizing the walk-in fridge by "emotional frequency."

The only person who's managed to turn this chaos into a functioning kitchen is Sous Chef Lane. Relentlessly competent, fiercely caffeinated, and fluent in Chef Marvin's stream-of-consciousness cuisine, Lane has been the quiet force behind Craft's success.

For years, she's kept it all together—decoding ballads about beurre blanc, jotting notes on napkins, and occasionally recording voice memos of Chef Marvin explaining a lamb reduction using only bird metaphors.

But last week, after an especially abstract monologue on "the ephemeral crunch of betrayal" (it was about croutons), Lane broke.

That night, she opened her laptop in a dark corner of the walk-in fridge and, using AI, built a bare-bones app. No bells. No whistles. Just a simple list of dishes, Chef Marvin's ramblings for reference, instructions, and ingredients—her attempt to keep the kitchen from imploding.

It's a humble start. But Lane has bigger dreams. That's where you come in...

---

## Feature Requests

Lane knows what she wants, but she's never built software before. Here's her list of ideas, straight from her notes app between shifts:

- **📝 Transcription and/or Rambling Parsing**
  “I'd love for the app to transcribe Chef’s ramblings and/or automatically turn the text of one into a usable recipe. Bonus points if it can filter out his tangents about the olive oil's emotional baggage.”

- **🔍 Search & Categories**
  “I added navigation items, but I could never get them to work! I want to be able to search for a recipe or filter them by categories. Bonus if I can search by ingredient.”

- **📱 Responsive Layout**
  “I'm often on my phone or iPad when I’m in the kitchen. The site looks pretty rough on anything other than my laptop.”

- **✏️ Editing**
  “Sometimes I just want to add a step or reorder instructions without rewriting the whole thing. A more flexible editing system would save me a ton of time. I like the way Notion handles these things, maybe something like that?”

- **📐 Better Recipe Structure**
  “Right now it’s all just free text. I'd love to break things into consistent sections like Ingredients, Steps, Time, Tools Needed, etc. but I definitely don't want it to be a pain to input it.”

- **🔁 Smart Substitutions**
  “We run out of stuff _all the time_. It’d be amazing if I could click an ingredient and see common swaps (like crème fraîche → sour cream, etc).”

- **➗ Portion Scaling**
  “Being able to scale a recipe from 2 servings to 20 would make prep so much easier.”

- **✨ Improved UI & UX**
  “I spent all my time getting the little chef logo to wink, and didn’t spend enough time making the app actually look and work great!”

She knows it's possible. She just needs help.

---

## Instructions

### Overview

- Please timebox your work to approximately **4–8 hours**. Don’t worry about getting to everything. Prioritization, approach, and communication are more important than completeness.
- You may interpret and reframe the feature requests however you'd like; focus on solving Lane’s core problems in the most thoughtful way you can.

### What We're Looking For

- Clear prioritization and scoping decisions
- Thoughtful, maintainable code
- Pragmatic decision-making and progress
- Usable solutions that make Lane’s life easier
- Bonus: Creativity, polish, and fun
- Don't be afraid to be ambitious!

### Communication

You’ll have access to a private **Slack channel** with our team. We encourage you to:

- Ask questions
- Clarify edge cases
- Share progress
- Get feedback

If you have any issues accessing Slack, reach out to **dan@operate.so**.

### AI Usage

You may use AI for this assessment to assist with coding and features; however, please do so mindfully. We expect all code to be:

- Explainable
- Concise and clearly documented
- Free of AI fluff like unnecessary comments, overly abstracted logic, or verbose boilerplate.

---

## App Setup

The app is scaffolded using:

- **Next.js (App Router)**
- **Tailwind CSS, CVA, & Tailwind Merge**
- **PGLite DB**
- **ESLint & Prettier**

You may remove, replace, or add any libraries/tools as needed.

## Working with the Database

The app uses **PGLite DB** for local database management, which is a lightweight SQL database designed for use in web applications. Note that the data is only stored locally, this means the database will persist in your browser but won’t sync across devices or reloads unless implemented manually.

Documentation can be found here: https://github.com/electric-sql/pglite

### Using PGLite

1. **Installation**: Ensure that `@electric-sql/pglite` is included in your `package.json` dependencies. This is already set up in the project.

2. **Initialization**: The database is initialized in `src/lib/db.ts` using the `PGlite` class. It is configured to persist data in IndexedDB within the browser.

3. **Schema Management**: The `initDatabase` function in `db.ts` sets up the database schema, creating tables and handling migrations, such as adding new columns.

4. **Deleting the DB**: We provide dev tools for simple database interactions, however, you can always delete the database in your browser dev tools under Application > IndexedDB > `/pglite/recipe-db`

### Using DevTools for Database Management

The `DevTools` component located in `src/components/dev-tools.tsx` provides a simple UI for managing the database during development. Here's how you can use it:

- **Opening DevTools**: In development mode, a floating button appears in the bottom-right corner of the app. Click this button to open the DevTools panel.

- **Reset Database**: Use the "Reset Database" button to clear all data and reset the database to its initial state with example data.

- **Clear All Recipes**: The "Clear All Recipes" button allows you to delete all recipe entries from the database without resetting the schema.

- **Database Info**: The panel displays current database statistics, such as the number of tables and recipes.

---

## Example Data

We’ve pre-populated the app with a few ramblings and recipes from Chef Marvin, these can be found in `src/chef-ramblings`

We encourage you to add some favorites of your own.

---

## Submission

When you're ready, please either:

1. Share a GitHub link (public or private, just make sure we have access),
2. Record a short walkthrough video if helpful (Loom, CleanShot, etc.), and
3. Let us know/document what you'd focus on next if you had more time.

We'll review your submission, ask questions via Slack, and provide feedback.

Assuming the submission meets the requirements for the open position, we'll schedule a technical walkthrough with the team.

---

We’re excited to see what you come up with. And on behalf of Lane and the team at Craft—thank you for helping restore a little sanity to the kitchen.
