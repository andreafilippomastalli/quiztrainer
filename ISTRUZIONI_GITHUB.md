# 🚀 Come Pubblicare QuizTrainer su GitHub

## Opzione 1: Tramite GitHub Desktop (PIÙ SEMPLICE)

1. Scarica e installa **GitHub Desktop**: https://desktop.github.com/
2. Fai login con il tuo account GitHub
3. Click su "File" → "Add Local Repository"
4. Seleziona la cartella `quiztrainer`
5. Click su "Publish repository"
6. Dai un nome: `quiztrainer`
7. Togli la spunta da "Keep this code private" (se vuoi che sia pubblico)
8. Click "Publish repository"

✅ **Fatto!** Il repository è online su: `https://github.com/andreatoshi/quiztrainer`

---

## Opzione 2: Da Terminale (Per esperti)

### Passo 1: Crea il repository su GitHub

1. Vai su https://github.com
2. Click sul "+" in alto a destra → "New repository"
3. Nome: `quiztrainer`
4. Lascia tutto il resto vuoto (NO README, NO .gitignore)
5. Click "Create repository"

### Passo 2: Collega il repository locale

Apri il terminale nella cartella `quiztrainer` e esegui:

```bash
git remote add origin https://github.com/andreatoshi/quiztrainer.git
git branch -M main
git push -u origin main
```

Se ti chiede username/password:
- Username: `andreatoshi`
- Password: usa un **Personal Access Token** (non la password normale)

Per creare un token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Seleziona "repo" → Generate
3. Copia il token e usalo come password

---

## 🌐 Attivare GitHub Pages (Per avere il sito online)

### Da GitHub.com:

1. Vai sul repository: `https://github.com/andreatoshi/quiztrainer`
2. Click su "Settings" (in alto)
3. Nella barra laterale, click su "Pages"
4. Sotto "Source", seleziona:
   - Branch: `main` (o `master`)
   - Folder: `/ (root)`
5. Click "Save"

⏳ Aspetta 1-2 minuti...

✅ Il sito sarà disponibile su: `https://andreatoshi.github.io/quiztrainer`

---

## 📝 Aggiornare il Repository in Futuro

Quando modifichi i file:

### Con GitHub Desktop:
1. Apri GitHub Desktop
2. Vedrai i file modificati nella lista
3. Scrivi un messaggio di commit (es. "Aggiunte domande di fisica")
4. Click "Commit to main"
5. Click "Push origin" (pulsante in alto)

### Da Terminale:
```bash
git add .
git commit -m "Descrizione delle modifiche"
git push
```

---

## 🎯 Struttura URL

Una volta online:
- **Homepage**: https://andreatoshi.github.io/quiztrainer
- **Quiz Informatica**: https://andreatoshi.github.io/quiztrainer/quiz.html

---

## ✅ Checklist Pubblicazione

- [ ] Repository creato su GitHub
- [ ] Codice pushato
- [ ] GitHub Pages attivato
- [ ] Sito funzionante online
- [ ] Link testato su mobile

---

## 🆘 Problemi Comuni

### "Permission denied" quando fai push
→ Usa un Personal Access Token invece della password

### Il sito non si carica
→ Aspetta 2-3 minuti dopo aver attivato Pages
→ Controlla che il branch sia corretto nelle impostazioni

### Le immagini/file non si caricano
→ Verifica che i percorsi siano relativi (es. `css/style.css` non `/css/style.css`)

---

**Fatto! 🎉 Il tuo QuizTrainer è online!**
