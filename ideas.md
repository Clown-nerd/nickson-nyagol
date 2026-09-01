# Nickson Nyagol Portfolio — Design Direction

## Three visual approaches considered

| Theme Name | Very Brief Intro | Probability |
| --- | --- | --- |
| Terminal Monograph | An editorial developer portfolio inspired by a field notebook and a live terminal: ink-black surfaces, precise technical annotation, and a luminous green signal color. | 0.07 |
| Signal Workshop | A lighter, industrial studio presentation with slate paper, rust-orange indicators, and blueprint-style documentation rhythms. | 0.04 |
| Soft Systems | A quiet, soft-gray visual essay with diffused gradients, humanist typography, and very restrained interface affordances. | 0.09 |

## Chosen approach — Terminal Monograph

**Design Movement:** Technical editorialism: a disciplined collision of Swiss information design and command-line material culture.

**Core Principles:**

1. Treat every section as an artifact from a developer’s working notebook: labeled, purposeful, and easy to scan.
2. Use neon green only as an active signal for interactive paths, states, and meaningful metrics; let near-black and slate do the structural work.
3. Favor asymmetric composition, generous negative space, and fine rules over generic card grids or pill-heavy UI.
4. Keep motion quiet and useful: elements settle into place, interfaces acknowledge input, and nothing delays reading.

**Color Philosophy:** The black ground creates concentration and lets code-like content breathe. Slate-gray layers establish hierarchy without visual noise. Acid green (`#C6FF3F`) is a sparing operational signal rather than a decorative wash, evoking a terminal cursor, a passing build, and a project ready to inspect.

**Layout Paradigm:** A left-aligned editorial rail carries the identity and location marker while the main canvas unfolds in offset “log entries.” Rather than centering each section in a conventional grid, the page alternates from full-width statements to two-column evidence blocks, with a vertical timeline rule connecting the reading sequence.

**Signature Elements:**

1. Monospaced section coordinates and thin terminal-like status lines.
2. Offset lime outline frames that shift slightly on interaction.
3. A scrolling code cursor and circular system-status marker that recur as navigation accents.

**Interaction Philosophy:** Interfaces respond like reliable engineering tools. Links reveal their destination state, project cards lift by a few pixels, and mobile navigation remains explicit. A form submission gives immediate local acknowledgement rather than pretending to send a message.

**Animation:** Use one restrained motion language: a 180–260 ms ease-out for hover/focus, subtle opacity-plus-translate reveal for section entry, and a low-frequency cursor blink. Never conceal content before JavaScript; disable movement under `prefers-reduced-motion`.

**Typography System:** Use `Space Grotesk` for assertive display headings and `IBM Plex Mono` for navigation, metadata, metrics, and technical framing. Headlines use tight tracking and dramatic scale; supporting copy stays generous and readable; all microcopy is uppercase monospaced with increased letter spacing.

**Brand Essence:** Nickson Nyagol is a full-stack developer for product teams that need durable, carefully engineered web systems — **precise, pragmatic, curious**.

**Brand Voice:** Headlines are declarative and concrete; CTAs are short, technical, and forward-moving; microcopy speaks in useful system cues. Examples: “Shipping systems, not just screens.” and “Open the work log.”

**Wordmark & Logo:** A distinctive “MC” monogram built as an open, interlocking terminal prompt: angular lime strokes create a compact mark that feels like a cursor, circuit trace, and initials at once. It never relies on the brand name rendered in a default typeface.

**Signature Brand Color:** **Build Lime** — `#C6FF3F`.

## Style Decisions

- The MC monogram will remain strictly within the black, slate, and Build Lime system; unrelated accent colors are excluded from the core identity.
- Build Lime is reserved for active paths, primary actions, important metrics, and one deliberate headline emphasis per section. Rules, labels, and supporting elements carry slate instead.
- Each major section includes a log cue such as a coordinate, status marker, inspection annotation, or continuous rail reference so the page reads as one technical notebook.
- Dimensionality should feel like inspecting engineered artifacts, not entering a game scene: use subtle perspective, stacked planes, pointer tilt, depth shadows, and scroll-revealed log layers while keeping text stable and readable.
- Scroll animation should clarify sequence and progress. The page may reveal artifacts, advance a top progress signal, and let cards settle into place, but it must not hijack scrolling or delay comprehension.
- The hero’s interactive model is a lightweight WebGL “system artifact”: a rotating stack of abstract wireframe modules with a single Build Lime signal path. It responds gently to pointer position, respects reduced-motion preferences, caps display density for performance, and falls back to the existing static artifact visual if WebGL is unavailable.
- The navigation mark is a compact double-prompt “NN” signal, built only from Build Lime and slate strokes against black; it is designed to read as a deliberate personal signature at header scale.
- The left notebook rail is continuous and segmented, with a visible node and coordinate for each major section. Work entries use varied signal lengths and node shapes so the project log feels inspected and curated rather than mechanically repeated.
- Project evidence bays carry a domain-specific signal phrase and unique wireframe treatment. The College MIS story is the larger highlighted field log, creating an editorial pause in the longer Work sequence.
