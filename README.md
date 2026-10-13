# RGAA Testbed

A small Angular 22 site (standalone components, signals, zoneless) made to **test [RGAA Assistant](https://github.com/Kounrisu/rgaa-assistant)**.
Every page exists in two versions:

- **compliant** (default): written to meet RGAA 4.1;
- **with deliberate errors**: add `?mode=broken` to the address (or use the link in the footer). The errors are listed with their criteria in [ERRORS.md](ERRORS.md), which is the answer key for the assistant.

| Page | RGAA themes |
| --- | --- |
| `/` Accueil | the index, and theme 8 on every page |
| `/images` | 1 Images |
| `/cadres` | 2 Cadres |
| `/presentation` | 3 Couleurs, 10 Présentation de l’information |
| `/multimedia` | 4 Multimédia |
| `/tableau` | 5 Tableaux (with pagination) |
| `/popin` | 7 Scripts (modal dialog, tabs, accordion, status messages) |
| `/structure` | 9 Structuration de l’information |
| `/formulaires` | 11 Formulaires |
| `/navigation` | 6 Liens, 12 Navigation, 13 Consultation |

## Run it

```bash
npm install --legacy-peer-deps   # plain `npm install` hits an npm arborist bug with the Vitest peer set on npm 10
npm start                        # http://localhost:4200
npm run build                    # dist/rgaa-testbed/browser
```

Then open a page, press F12, and run the **RGAA Assistant** tab on it, first on the compliant page, then with `?mode=broken`.

## Notes

- Nothing here is a claim of full RGAA compliance: the compliant pages pass axe and are written with care, but only a full manual audit can say more. That is also what the assistant is for.
- The `<video>` elements have a poster and no media file. The audio is a generated one-second tone. Frames use `srcdoc`, so no network is needed.
- Use only the text in the repository as test data; there is no real personal data.
