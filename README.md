# 🎯 QuizTrainer

Sistema di quiz personalizzabili per l'apprendimento efficace.

## 📚 Materie Disponibili

- ✅ **Informatica** - Patente ECDL (pronto)
- 🔜 **Fisica** (in arrivo)
- 🔜 **Matematica** (in arrivo)
- 🔜 **Chimica** (in arrivo)

## ✨ Funzionalità

### Setup Quiz Personalizzabile

- **Selezione Argomenti**: Scegli su quali topic concentrarti
- **Numero Domande**: Da 10 a 50, o tutte quelle disponibili
- **Livello Difficoltà**:
  - 🟢 Base - Domande dirette
  - 🟡 Intermedio - Mix bilanciato
  - 🟠 Avanzato - Domande complesse
  - 🔴 Bastardo - Trabocchetti e casini 😈
- **Numero Risposte**: 3, 4 o 5 opzioni per domanda
- **Timer Opzionale**: 30s, 60s, 90s o 120s per domanda
  - Timer scaduto = "Non so" (non conta come errore)
- **Modalità Recupero**: Domande extra sugli argomenti dove hai sbagliato

### Durante il Quiz

- Progress bar visuale
- Contatore domande (es. 17/30)
- Timer con countdown (se attivo)
- Bottone "Non so" (diverso da sbagliato)
- Nessun feedback immediato (scopri i risultati alla fine)

### Report Finale

- **Punteggio totale** con percentuale
- **Tempo impiegato**
- **Breakdown per argomento** con indicatori visivi
- **Conteggio "Non so"** separato dagli errori
- **Modalità recupero** (se attivata): nuove domande sugli argomenti difficili
- **Revisione errori**: vedi domande sbagliate + risposte corrette

## 🗂️ Struttura Progetto

```
quiztrainer/
├── index.html              # Homepage - selezione materia
├── quiz.html               # Pagina principale del quiz
├── css/
│   └── style.css          # Stili dell'applicazione
├── js/
│   ├── home.js            # Logica homepage
│   └── quiz-engine.js     # Motore principale del quiz
└── data/
    ├── informatica.json   # Domande informatica
    ├── fisica.json        # (futuro)
    ├── matematica.json    # (futuro)
    └── chimica.json       # (futuro)
```

## 📝 Formato Domande (JSON)

```json
{
  "materia": "Nome Materia",
  "versione": "1.0",
  "argomenti": [
    {
      "id": "topic-id",
      "nome": "Nome Argomento",
      "domande": [
        {
          "id": 1,
          "testo": "Testo della domanda?",
          "livello": "base|intermedio|avanzato|bastardo",
          "risposte": [
            {
              "testo": "Risposta 1",
              "corretta": true
            },
            {
              "testo": "Risposta 2",
              "corretta": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Linee Guida per Creare Domande

1. **Livelli di difficoltà**:
   - **Base**: Concetti fondamentali, definizioni dirette
   - **Intermedio**: Applicazioni pratiche, confronti
   - **Avanzato**: Ragionamenti complessi, casi d'uso specifici
   - **Bastardo**: Trabocchetti, dettagli tecnici oscuri, casi limite

2. **Risposte**:
   - Minimo 3, massimo 5 risposte per domanda
   - Tutte le risposte false devono essere plausibili
   - Una sola risposta corretta per domanda

3. **Organizzazione**:
   - Raggruppa domande per argomento
   - Ogni argomento dovrebbe avere domande di tutti i livelli
   - Mantieni coerenza nella formulazione

## 🚀 Come Usare

1. **Locale**: 
   - Apri `index.html` nel browser
   - Funziona completamente offline

2. **Online** (GitHub Pages):
   - Vai su `https://andreatoshi.github.io/quiztrainer`
   - Accessibile da qualsiasi dispositivo

## 🛠️ Come Aggiungere Nuove Materie

1. Crea un file JSON in `data/` seguendo il formato esistente
2. Aggiungi la card nella homepage (`index.html`):
   ```html
   <div class="subject-card" data-subject="tua-materia">
       <div class="subject-icon">🎨</div>
       <h3>Tua Materia</h3>
       <p>Descrizione</p>
       <span class="status ready">Pronto</span>
   </div>
   ```
3. Rimuovi la classe `coming-soon` quando pronto

## 📊 Statistiche Salvate

Il quiz utilizza `sessionStorage` per mantenere:
- Configurazione del quiz
- Risposte date
- Tempi di risposta
- Report finale

I dati vengono cancellati chiudendo il browser (privacy-first).

## 🎨 Personalizzazione

### Cambiare Colori

Modifica le variabili nel file `css/style.css`:
```css
/* Gradient principale */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modificare Tempistiche Timer

Nel file `quiz.html`, cambia i valori:
```html
<label><input type="radio" name="timerDuration" value="30"> 30 secondi</label>
```

## 🐛 Debug

Apri la Console del Browser (F12) per vedere:
- Caricamento domande
- Configurazione quiz
- Risposte registrate

## 📜 Licenza

Progetto educativo open source. Usa e modifica liberamente! 🎓

---

**Creato con ❤️ per imparare meglio**
