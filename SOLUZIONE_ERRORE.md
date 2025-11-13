# ⚠️ ERRORE: "Errore nel caricamento delle domande"

## 🔴 Problema
Quando apri `index.html` con doppio click, vedi l'errore:
> "Errore nel caricamento delle domande. Torna alla home."

## ❓ Perché Succede?
I browser moderni bloccano il caricamento di file JSON locali per motivi di sicurezza (CORS policy).

## ✅ SOLUZIONE RAPIDA

### **Usa un Server Locale**

Apri il **Terminale** (o Prompt dei Comandi) nella cartella `quiztrainer` e digita UNO di questi comandi:

#### Opzione 1: Python 3 (la più comune)
```bash
python -m http.server 8000
```

#### Opzione 2: Python 2
```bash
python -m SimpleHTTPServer 8000
```

#### Opzione 3: Node.js
```bash
npx http-server -p 8000
```

### Poi:
1. Apri il browser
2. Vai su: **http://localhost:8000**
3. Tutto funzionerà! ✅

---

## 🚀 SOLUZIONE PERMANENTE: GitHub Pages

Pubblica il progetto su GitHub Pages per averlo sempre online!

Segui le istruzioni in `ISTRUZIONI_GITHUB.md`

Link finale: `https://tuousername.github.io/quiztrainer`

---

## 💡 Alternative Rapide

### VS Code
1. Installa l'estensione "Live Server"
2. Right-click su `index.html`
3. "Open with Live Server"

### Mac/Linux
```bash
cd quiztrainer
python3 -m http.server 8000
```

### Windows (PowerShell)
```powershell
cd quiztrainer
python -m http.server 8000
```

---

## ✅ Come Verificare che Funziona

Vedrai nel terminale:
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

Vai su `http://localhost:8000` e tutto funzionerà! 🎉

---

## 🆘 Ancora Problemi?

1. Verifica che Python sia installato: `python --version`
2. Prova con la porta 3000 invece di 8000: `python -m http.server 3000`
3. Controlla che il file `data/chimica.json` esista
4. Apri la Console del browser (F12) per vedere errori dettagliati

---

**TL;DR**: Non aprire `index.html` direttamente, usa `python -m http.server 8000` e vai su `http://localhost:8000` 🚀
