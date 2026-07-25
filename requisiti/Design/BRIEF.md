# Brief per Claude Design — Sito Fraido

> Materiale di handoff per la realizzazione del sito **Fraido**. Questa cartella contiene tutto il necessario: testo requisiti, logo, deck, GIF, foto team e advisor. Leggere questo file per primo.

---

## 1. Cos'è Fraido
Startup **medtech**. Prodotto: un dispositivo per l'**intubazione difficile**.
Proposta di valore: **"One step, one device, for all the anatomy."**
Un tubo sottile che viene inserito e poi dilatato una volta in posizione, adattandosi all'anatomia del paziente — hardware completamente meccanico con controllo continuo del diametro. Trasforma una procedura a 2 step / 2 dispositivi in una a **step singolo, dispositivo singolo**.

Payoff (dalla hero del deck): **Intubation — Easy · Fast · Safe.**
Contatto: **Info@fraido.it**

## 2. Tipo di sito richiesto
- **Single-page, one-page a scorrimento** (si compone scendendo dall'alto verso il basso).
- **Semplice**: il cliente ha chiesto esplicitamente di NON complicarlo più di questo riferimento → https://tomthias.github.io/fraido-website/
- Deploy attuale: https://fraido-website.vercel.app/ (andrà poi ri-puntato su **fraido.it**).

## 3. Struttura dei contenuti (dall'alto in basso)

**Hero (PAR 1)** — riprodurre lo stile della prima slide del deck: sfondo navy, logo "Fraido" bianco in box arrotondato, payoff blu. Riferimento visivo: `07-Hero/Hero_slide.png`.

**Prima riga di pulsanti** (sotto l'immagine hero): due pulsanti → **`The Challenge`** · **`Our Idea`**.

**Menu / seconda riga di link** (navigazione):
`Challenge · Main problem · Idea · Team · Advisors · Resources · Contacts`
> Nota: nel testo originale del cliente "Contacts" era stato omesso per una svista — **va incluso** (confermato da Mattia).

**Sezione — Challenge: Difficult Intubation**
> Intubation is a medical procedure in which a tube is inserted through the mouth or nose into the trachea to maintain an open airway. It is a critical intervention used to support breathing, deliver oxygen, and administer medication. This life-saving technique is performed in hospital and in an extra-hospital environment, in civil and military settings, on critically ill patients who are unable to breathe adequately on their own.
>
> Intubation becomes difficult due to: stenosis · anatomical abnormalities · a foreign body · or in an emergency.

**Sezione — Main problems**
> **NO space — no time — no oxygen.**
> The key determinants of outcome are: the number of attempts, and the time to effective ventilation.

**Sezione — State of the art**
> A combination of fixed-diameter devices is often used to reach an anatomical spot — like a guidewire and a tube. A 2-step, 2-device procedure.

**Sezione — Our Idea**
> **One step, one device, for all the anatomy.**
> [Affiancare la **GIF** (`04-Gif/GIF_Fraido-Video.gif`) alla descrizione:]
> Fraido turns intubation into a single-step, single-device procedure: inserting the device thin and dilating it once in place, adapting it to the patient anatomy. A full mechanical hardware with continuous diameter control.

**Sezione — Team** (foto in `05-Team/`)
| | |
|---|---|
| **Antonio Maria Vizioli** — CEO | **Elia Fregonese** — CTO |
| Nurse · 5Y Emergency department | Mat & Nanotech Engineer · 4y space sector |

**Sezione — Advisors** (disporli liberamente; foto in `06-Advisors/`)
- **Chiara Sansovini** — Anesthetist · Co-author of Stargate  *(⚠ foto mancante → usare il PLACEHOLDER fornito: `06-Advisors/out_Chiara_Sansovini_PLACEHOLDER.png`, da sostituire quando arriva la foto reale)*
- **Prof. Giacomo Bellani** — Anesthetist · Professor of anesthesia and ICU chief
- **Marco Garroni** — Anesthetist · Difficult airways instructor
- **Roberto Righetti** — Anesthetist · Difficult airways instructor
- **Stefano Bonvini** — Vascular Surgeon · Chief of vascular surgery, Trento (Italy)
- **Martin Gossling** — Product designer · Head of commercial innovation, UHS Southampton
- **Andrew Markle** — Anesthetist · Quality management specialist, Saint Mary hospital

**Sezione — Resources** (file in `03-Deck/`)
- **Short deck** → `03-Deck/Short_Deck.pdf`
- **Detailed deck** → `03-Deck/Detailed_Deck.pdf`

**Sezione — Contacts**
- Info@fraido.it

## 4. Linee guida visive
- **Sfondo brand:** navy scuro `#0c283b`.
- **Testo/logo su navy:** bianco.
- **Accento:** azzurro/blu (il payoff nella hero — campionare la tonalità esatta dal deck).
- **Font:** il logo e il deck usano **Montserrat** (bold). Usarlo come font principale se possibile.
- **Tono:** pulito, medicale, essenziale. Molto spazio bianco/negativo, niente fronzoli.

## 5. Mappa della cartella
```
00-Per_Claude_Design/
├── BRIEF.md                     ← questo file
├── 01-Testo_Requisiti/          testo originale del cliente (.docx)
├── 02-Logo/                     logo Fraido (pptx sorgente + PNG estratti, navy/bianco, con versioni trasparenti)
├── 03-Deck/                     Short_Deck.pdf + Detailed_Deck.pdf
├── 04-Gif/                      GIF del dispositivo (sezione Our Idea)
├── 05-Team/                     foto team
├── 06-Advisors/                 foto advisor + placeholder Chiara Sansovini
└── 07-Hero/                     render della prima slide del deck (riferimento stile hero)
```
