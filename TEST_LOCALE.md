# 🧪 Come Testare QuizTrainer in Locale

## Metodo 1: Doppio Click (il più semplice)

1. Vai nella cartella `quiztrainer`
2. **Doppio click** su `index.html`
3. Si apre nel browser predefinito
4. Seleziona "Informatica"
5. Configura il quiz come preferisci
6. Prova tutte le funzionalità!

⚠️ **Nota**: Alcuni browser potrebbero bloccare il caricamento del file JSON per motivi di sicurezza (CORS). In quel caso usa il Metodo 2.

---

## Metodo 2: Server Locale (raccomandato)

### Con Python (se ce l'hai installato):

1. Apri il terminale nella cartella `quiztrainer`
2. Esegui:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Apri il browser e vai su: `http://localhost:8000`

---

### Con Node.js (se ce l'hai installato):

1. Installa `http-server` (una volta sola):
```bash
npm install -g http-server
```

2. Nella cartella `quiztrainer`, esegui:
```bash
http-server -p 8000
```

3. Apri: `http://localhost:8000`

---

### Con l'estensione Live Server (VS Code):

1. Apri la cartella `quiztrainer` in Visual Studio Code
2. Installa l'estensione "Live Server"
3. Right-click su `index.html` → "Open with Live Server"

---

## ✅ Checklist Test

Testa tutte queste funzionalità:

### Homepage:
- [ ] Le card delle materie si vedono bene
- [ ] Click su "Informatica" porta alla pagina quiz
- [ ] Le materie "Coming soon" non sono cliccabili

### Setup Quiz:
- [ ] Tutti gli argomenti sono visibili con checkbox
- [ ] Contatore domande si aggiorna correttamente
- [ ] Tutte le opzioni di configurazione sono selezionabili
- [ ] Timer si attiva/disattiva
- [ ] Bottone "Inizia Quiz" funziona

### Durante il Quiz:
- [ ] Progress bar si aggiorna
- [ ] Domande cambiano al click sulla risposta
- [ ] Timer funziona (se attivato)
- [ ] Bottone "Non so" funziona
- [ ] Le risposte sono mescolate ad ogni domanda

### Report Finale:
- [ ] Punteggio corretto
- [ ] Tempo totale mostrato
- [ ] Breakdown per argomento corretto
- [ ] Conteggio "Non so" preciso
- [ ] Bottone "Rivedi Errori" funziona

### Revisione Errori:
- [ ] Mostra solo domande sbagliate
- [ ] Mostra la tua risposta
- [ ] Mostra risposta corretta
- [ ] Bottone "Torna al Resoconto" funziona

---

## 🐛 Test Specifici

### Test Timer:
1. Attiva timer a 30s
2. Non rispondere
3. Verifica che dopo 30s conta come "Non so"

### Test Livelli Difficoltà:
1. Prova tutti e 4 i livelli
2. Verifica che le domande cambiano
3. Controlla che il contatore domande disponibili varia

### Test Numero Risposte:
1. Seleziona 3 risposte → verifica che ne vedi 3
2. Seleziona 4 risposte → verifica che ne vedi 4
3. Seleziona 5 risposte → verifica che ne vedi 5

### Test Responsività:
1. Apri Chrome DevTools (F12)
2. Click sull'icona mobile (Ctrl+Shift+M)
3. Prova varie dimensioni schermo
4. Verifica che tutto sia leggibile

---

## 📱 Test su Mobile

1. Pubblica su GitHub Pages (vedi ISTRUZIONI_GITHUB.md)
2. Apri il link dal telefono
3. Testa tutte le funzionalità
4. Verifica che i bottoni siano facilmente cliccabili

---

## 🎨 Modifiche di Test

Prova a fare piccole modifiche per familiarizzare:

### Cambia i Colori:
File: `css/style.css`
Cerca: `#667eea` e `#764ba2`
Sostituisci con i tuoi colori preferiti!

### Aggiungi una Domanda:
File: `data/informatica.json`
Copia una domanda esistente e modificala

### Cambia il Titolo:
File: `index.html`
Cerca: `QuizTrainer`
Sostituisci con il tuo titolo!

---

## ✅ Tutto Funziona?

Se tutti i test passano, sei pronto per:
1. Pubblicare su GitHub
2. Aggiungere più domande
3. Creare altre materie (fisica, matematica, chimica)

**Buon divertimento! 🎉**
