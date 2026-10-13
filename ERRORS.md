# Deliberate errors in the broken version

Open any page with `?mode=broken` (for example `/images?mode=broken`). This is the answer key for RGAA Assistant: each line is an error
that was put there on purpose, with the RGAA 4.1 criterion it breaks. The compliant version of the same page has none of them.
Criteria are given as the assistant should map them; an automatic tool will not find all of them (those marked *manual* need a person).

## Every page (the broken shell and `index.html`)

| Error | Criterion |
| --- | --- |
| No `lang` attribute on `<html>` | 8.3 |
| Same `<title>` on every page | 8.5, 8.6 |
| No `<header>`, `<nav>`, `<main>`, `<footer>` landmarks (`div`s) | 9.2 |
| No skip link | 12.7 |
| Navigation links in a pale colour on a pale background | 3.2 |
| No `<h1>` (fake titles are `div`s) | 9.1 |

## Images (`/images`) — theme 1

| Error | Criterion |
| --- | --- |
| `<img>` without `alt` | 1.1 |
| `alt="team.svg"` (a file name) | 1.1, 1.2 *manual* |
| Informative image with `alt=""` | 1.1 |
| Alternative of about 50 words, too long for a short alternative | 1.3 *manual* |
| Decorative image with `alt="décoration bleue"` | 1.2 |
| Informative CSS background image (`.bg-info`) with no `role="img"` and no text alternative | 1.1, 1.2 |
| Link containing only an image without `alt` | 1.1, 6.1 |
| Link with `alt="icône"` next to the text "Accueil" | 1.3 |
| `<svg>` conveying information without `role="img"` or a title | 1.1 |

## Cadres (`/cadres`) — theme 2

| Error | Criterion |
| --- | --- |
| `<iframe>` without `title` | 2.1 |
| Two frames with the same title `cadre`, not relevant | 2.2 |

## Couleurs et présentation (`/presentation`) — themes 3 and 10

| Error | Criterion |
| --- | --- |
| "Les champs en rouge…" and red/green dots with no text | 3.1 |
| Light grey text on white (`#b9b9b9`) | 3.2 |
| White text on a mid blue (`#3b82f6`) | 3.2 |
| Link in a text block distinguished by colour only, nearly the same colour as the text | 10.6 |
| Fixed-height box with `overflow: hidden`: text is clipped when resized or when spacing changes | 10.4, 10.12 |
| Font size in `px` forced to 10 px | 10.4 |
| `outline: none` on a button: no visible focus | 10.7 |
| Content hidden with `display: none` that should not be read | 10.8 *manual* |

## Multimédia (`/multimedia`) — theme 4

| Error | Criterion |
| --- | --- |
| Video with no captions, no transcript, no audio description | 4.1, 4.3, 4.5 |
| Video and audio start automatically, loop, and have no controls | 4.10, 4.13 |

There is no real video file in the repository; the elements exist and carry the attributes the assistant looks at.

## Tableau (`/tableau`) — theme 5

| Error | Criterion |
| --- | --- |
| Data table with no `<caption>`, no `<th>`, no header scope | 5.1, 5.4, 5.6, 5.7 |
| Table used for layout that contains `<th>` | 5.3, 5.8 |
| Pagination made of `<span>` with click handlers: not focusable, no name, no keyboard | 7.1, 7.3, 6.1 |
| Current page shown only by a background colour | 3.1, 7.1 |
| Page change not announced | 7.4 |

## Popin et scripts (`/popin`) — theme 7

| Error | Criterion |
| --- | --- |
| Opening control is a `<div>` with a click handler | 7.1, 7.3 |
| Popin has no `role="dialog"`, no name, does not move the focus, does not trap it, Escape does not close it | 7.1, 7.3, 12.13 |
| Tabs made of `<div>`s without roles or keyboard support | 7.1, 7.3 |
| "Copier le lien" is `<a href="#">` acting as a button | 7.1 |
| Status message in a `<div>`, not announced | 7.4 |
| Help text shown only on mouse hover | 7.3, 10.13 |

## Structuration (`/structure`) — theme 9 (and 8)

| Error | Criterion |
| --- | --- |
| Titles skip levels (`h4` straight after nothing) and fake titles in bold / big `div`s | 9.1 |
| List written with hyphens and `<br>` | 9.3 |
| `<blockquote>` used only to indent | 9.4 |
| Abbreviations with no explanation | 9.4 *manual* |
| Two elements with `id="dup"` | 8.2 |

## Formulaires (`/formulaires`) — theme 11

| Error | Criterion |
| --- | --- |
| Fields with only a `placeholder` as label | 11.1, 11.2 |
| `<label for>` pointing to an id that does not exist | 11.1 |
| Radio buttons with no `fieldset` / `legend` | 11.5, 11.6 |
| `<select>` with no label | 11.1 |
| Required fields signalled by red only | 11.10, 3.1 |
| Error "Champ invalide" with no link to a field and no text saying which | 11.10, 11.11 |
| No `autocomplete` on personal data fields | 11.13 |
| Submit button is a `<div>`; `<input type="image">` without `alt` | 11.9, 1.1 |

## Navigation, liens et consultation (`/navigation`) — themes 6, 12 and 13

| Error | Criterion |
| --- | --- |
| Three links named "cliquez ici" with different destinations; two "Lire la suite" | 6.1, 6.2 |
| `<a>` without `href`, and an empty link | 6.1, 6.2 |
| Links opening a new tab without saying so | 13.2 |
| File link ("rapport") with no format or weight | 13.3 |
| News banner changing every 3 seconds with no way to pause it | 13.8 |
| No breadcrumb, no search, no site map: a single way to reach pages | 12.1, 12.2, 12.3, 12.4 |
