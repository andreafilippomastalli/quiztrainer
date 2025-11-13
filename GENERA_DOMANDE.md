# 🤖 Come Generare Domande con Claude

Puoi usare Claude per generare velocemente domande in formato JSON!

## 📝 Prompt di Esempio

### Per una Nuova Materia Completa:

```
Crea 20 domande per QuizTrainer sulla materia [FISICA - Meccanica].

Struttura richiesta:
- 4 argomenti diversi (es. Cinematica, Dinamica, Lavoro ed Energia, Quantità di moto)
- 5 domande per argomento
- Ogni argomento deve avere domande di tutti i livelli:
  * 2 domande livello "base"
  * 1 domanda livello "intermedio"
  * 1 domanda livello "avanzato"
  * 1 domanda livello "bastardo"

Ogni domanda deve avere:
- Testo chiaro
- 4 o 5 risposte (1 corretta, le altre plausibili ma sbagliate)
- Livello appropriato

Formatta in JSON seguendo questo schema:
{
  "materia": "Fisica - Meccanica",
  "versione": "1.0",
  "argomenti": [...]
}

Fai domande di qualità universitaria!
```

---

### Per Aggiungere Domande a un Argomento Esistente:

```
Aggiungi 10 domande sull'argomento "Termodinamica" per QuizTrainer.

Livelli:
- 3 base (leggi dei gas, temperatura, calore)
- 3 intermedio (trasformazioni, cicli termodinamici)
- 2 avanzato (entropia, macchine termiche)
- 2 bastardo (paradossi, casi limite)

Ogni domanda: 4-5 risposte, solo 1 corretta.
Formato JSON pronto da copiare nel file fisica.json
```

---

### Per Domande su Argomento Specifico:

```
Genera 5 domande livello "bastardo" sulla teoria della relatività ristretta.

Caratteristiche domande "bastarde":
- Trabocchetti concettuali
- Casi limite
- Paradossi apparenti
- Dettagli che spesso sfuggono

5 risposte per domanda, tutte molto plausibili.
Formato JSON.
```

---

## 🎯 Linee Guida per Livelli

### Base 🟢
- Definizioni e concetti fondamentali
- Domande dirette e senza ambiguità
- Es: "Cos'è la forza?", "Qual è l'unità di misura della velocità?"

### Intermedio 🟡
- Applicazioni pratiche
- Confronti tra concetti
- Calcoli semplici
- Es: "Quale legge descrive il moto uniformemente accelerato?", "Quale grandezza si conserva in un urto elastico?"

### Avanzato 🟠
- Ragionamenti complessi
- Casi d'uso specifici
- Combinazioni di concetti
- Es: "In un sistema isolato con attrito, quale principio è violato?", "Come varia l'energia in una trasformazione adiabatica?"

### Bastardo 🔴
- Trabocchetti sofisticati
- Paradossi apparenti
- Dettagli tecnici oscuri
- Casi limite
- Es: "Nel paradosso dei gemelli, quale effetto relativistico spiega l'asimmetria?", "Perché il secondo principio della termodinamica non viola la reversibilità microscopica?"

---

## 🔄 Workflow Consigliato

1. **Pianifica gli argomenti**
   ```
   Fammi una lista di 6 argomenti principali per [MATERIA]
   con breve descrizione di cosa coprire
   ```

2. **Genera domande in batch**
   ```
   Genera 5 domande per l'argomento [ARGOMENTO]:
   - 2 base
   - 1 intermedio
   - 1 avanzato
   - 1 bastardo
   ```

3. **Rivedi e aggiusta**
   - Verifica che le risposte sbagliate siano plausibili
   - Controlla che non ci siano errori tecnici
   - Assicurati che il livello sia appropriato

4. **Copia nel file JSON**
   - Apri `data/[materia].json`
   - Copia il JSON generato
   - Salva

5. **Testa**
   - Apri QuizTrainer
   - Prova le nuove domande
   - Aggiusta se necessario

---

## ✅ Checklist Qualità Domande

- [ ] Testo chiaro e privo di ambiguità
- [ ] Tutte le risposte grammaticalmente corrette
- [ ] Risposte sbagliate plausibili (no ovvietà)
- [ ] Una sola risposta corretta
- [ ] Livello appropriato
- [ ] No errori tecnici o concettuali
- [ ] Lunghezza risposte simile (evita che quella corretta sia sempre la più lunga)

---

## 🎨 Esempi di Domande per Livello

### Chimica - Base
```json
{
  "testo": "Qual è il simbolo chimico dell'ossigeno?",
  "livello": "base",
  "risposte": [
    {"testo": "O", "corretta": true},
    {"testo": "Ox", "corretta": false},
    {"testo": "Os", "corretta": false},
    {"testo": "Og", "corretta": false}
  ]
}
```

### Matematica - Intermedio
```json
{
  "testo": "Qual è la derivata di x²?",
  "livello": "intermedio",
  "risposte": [
    {"testo": "2x", "corretta": true},
    {"testo": "x²", "corretta": false},
    {"testo": "2x²", "corretta": false},
    {"testo": "x", "corretta": false}
  ]
}
```

### Fisica - Avanzato
```json
{
  "testo": "In un moto armonico semplice, quando l'energia potenziale è massima?",
  "livello": "avanzato",
  "risposte": [
    {"testo": "Agli estremi dell'oscillazione, quando la velocità è zero", "corretta": true},
    {"testo": "Al centro dell'oscillazione, quando la velocità è massima", "corretta": false},
    {"testo": "L'energia potenziale rimane costante", "corretta": false},
    {"testo": "Quando l'accelerazione è massima", "corretta": false}
  ]
}
```

### Chimica - Bastardo
```json
{
  "testo": "Perché l'acqua a 4°C ha densità massima, violando apparentemente il comportamento normale dei liquidi che si espandono raffreddandosi?",
  "livello": "bastardo",
  "risposte": [
    {"testo": "I legami a idrogeno formano una struttura ordinata che occupa più volume sotto i 4°C", "corretta": true},
    {"testo": "È un'anomalia senza spiegazione termodinamica", "corretta": false},
    {"testo": "La pressione atmosferica influenza il punto di massima densità", "corretta": false},
    {"testo": "Le molecole d'acqua cambiano configurazione elettronica a quella temperatura", "corretta": false},
    {"testo": "È un effetto quantistico legato allo spin nucleare dell'idrogeno", "corretta": false}
  ]
}
```

---

## 🚀 Pronti a Creare!

Usa questi prompt con Claude per generare rapidamente domande di alta qualità.
Ricorda: **qualità > quantità**!

Meglio 20 domande eccellenti che 100 domande mediocri. 🎯
