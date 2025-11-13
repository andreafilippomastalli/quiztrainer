// QuizTrainer - Main Engine
class QuizEngine {
    constructor() {
        this.subject = sessionStorage.getItem('selectedSubject') || 'chimica';
        this.questions = [];
        this.config = {
            selectedTopics: [],
            numQuestions: 20,
            difficulty: 'base',
            numAnswers: 4,
            timerEnabled: false,
            timerDuration: 60,
            recoveryEnabled: false
        };
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.startTime = null;
        this.questionStartTime = null;
        this.timerInterval = null;
        this.timeRemaining = 0;
        
        this.init();
    }

    async init() {
        await this.loadQuestions();
        this.setupEventListeners();
        this.renderTopics();
    }

    async loadQuestions() {
        try {
            const response = await fetch(`data/${this.subject}.json`);
            const data = await response.json();
            this.questionsData = data;
            
            // Aggiorna il nome della materia
            document.getElementById('subjectName').textContent = data.materia;
        } catch (error) {
            console.error('Errore nel caricamento delle domande:', error);
            alert(`Errore: impossibile caricare il file data/${this.subject}.json\n\nSuggerimenti:\n1. Usa un server locale (non aprire direttamente index.html)\n2. Esegui: python -m http.server 8000\n3. Vai su http://localhost:8000\n\nDettagli errore: ${error.message}`);
            // Non fare redirect, mostra l'errore
        }
    }

    renderTopics() {
        const container = document.getElementById('topicsCheckboxes');
        container.innerHTML = '';
        
        this.questionsData.argomenti.forEach((topic, index) => {
            const div = document.createElement('div');
            div.className = 'topic-checkbox checked'; // Checked di default
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `topic-${index}`;
            checkbox.value = topic.id;
            checkbox.checked = true;
            
            const label = document.createElement('label');
            label.htmlFor = `topic-${index}`;
            label.innerHTML = `${topic.nome} <span class="topic-count">(${topic.domande.length})</span>`;
            
            div.appendChild(checkbox);
            div.appendChild(label);
            container.appendChild(div);
            
            // Toggle visual state
            div.addEventListener('click', () => {
                checkbox.checked = !checkbox.checked;
                div.classList.toggle('checked', checkbox.checked);
                this.updateAvailableQuestions();
            });
            
            checkbox.addEventListener('change', () => this.updateAvailableQuestions());
        });
        
        this.updateAvailableQuestions();
    }

    updateAvailableQuestions() {
        const checkboxes = document.querySelectorAll('#topicsCheckboxes input[type="checkbox"]');
        const selectedTopics = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        let totalQuestions = 0;
        this.questionsData.argomenti.forEach(topic => {
            if (selectedTopics.includes(topic.id)) {
                // Filtra per difficoltà
                const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
                const filteredQuestions = topic.domande.filter(q => q.livello === difficulty);
                totalQuestions += filteredQuestions.length;
            }
        });
        
        document.getElementById('availableQuestionsCount').textContent = totalQuestions;
    }

    setupEventListeners() {
        // Timer toggle
        document.getElementById('enableTimer').addEventListener('change', (e) => {
            document.getElementById('timerOptions').style.display = e.target.checked ? 'block' : 'none';
        });

        // Aggiorna conteggio domande quando cambia difficoltà
        document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateAvailableQuestions());
        });

        // Start quiz
        document.getElementById('startQuizBtn').addEventListener('click', () => this.startQuiz());

        // Don't know button
        document.getElementById('dontKnowBtn').addEventListener('click', () => this.answerDontKnow());

        // Recovery button
        document.getElementById('startRecoveryBtn')?.addEventListener('click', () => this.startRecovery());

        // Review mistakes
        document.getElementById('reviewMistakesBtn')?.addEventListener('click', () => this.showReview());

        // Back to report
        document.getElementById('backToReportBtn')?.addEventListener('click', () => this.showReport());

        // New quiz
        document.getElementById('newQuizBtn')?.addEventListener('click', () => this.resetQuiz());
    }

    startQuiz() {
        // Raccoglie configurazione
        this.config.selectedTopics = Array.from(document.querySelectorAll('#topicsCheckboxes input:checked'))
            .map(cb => cb.value);
        
        if (this.config.selectedTopics.length === 0) {
            alert('Seleziona almeno un argomento!');
            return;
        }

        this.config.numQuestions = document.querySelector('input[name="numQuestions"]:checked').value;
        this.config.difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        this.config.numAnswers = parseInt(document.querySelector('input[name="numAnswers"]:checked').value);
        this.config.timerEnabled = document.getElementById('enableTimer').checked;
        this.config.timerDuration = this.config.timerEnabled ? 
            parseInt(document.querySelector('input[name="timerDuration"]:checked').value) : 0;
        this.config.recoveryEnabled = document.getElementById('enableRecovery').checked;

        // Prepara le domande
        this.prepareQuestions();
        
        // Avvia il quiz
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.startTime = Date.now();
        
        this.showScreen('quizScreen');
        this.showQuestion();
    }

    prepareQuestions() {
        // Raccoglie domande filtrate per argomento e difficoltà
        let availableQuestions = [];
        
        this.questionsData.argomenti.forEach(topic => {
            if (this.config.selectedTopics.includes(topic.id)) {
                const filtered = topic.domande.filter(q => q.livello === this.config.difficulty);
                filtered.forEach(q => {
                    availableQuestions.push({
                        ...q,
                        topicId: topic.id,
                        topicName: topic.nome
                    });
                });
            }
        });

        // Mescola le domande
        availableQuestions = this.shuffle(availableQuestions);

        // Seleziona il numero richiesto
        if (this.config.numQuestions === 'all') {
            this.questions = availableQuestions;
        } else {
            const num = parseInt(this.config.numQuestions);
            this.questions = availableQuestions.slice(0, Math.min(num, availableQuestions.length));
        }
    }

    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        // Aggiorna header
        document.getElementById('questionNumber').textContent = 
            `${this.currentQuestionIndex + 1} / ${this.questions.length}`;
        
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        // Mostra topic
        document.getElementById('questionTopic').textContent = question.topicName;

        // Mostra domanda
        document.getElementById('questionText').textContent = question.testo;

        // Prepara risposte
        let answers = [...question.risposte];
        answers = this.shuffle(answers);
        
        // Limita al numero di risposte configurato
        answers = answers.slice(0, this.config.numAnswers);

        // Renderizza risposte
        const answersGrid = document.getElementById('answersGrid');
        answersGrid.innerHTML = '';
        
        answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = answer.testo;
            btn.dataset.correct = answer.corretta;
            btn.addEventListener('click', () => this.selectAnswer(btn));
            answersGrid.appendChild(btn);
        });

        // Timer
        if (this.config.timerEnabled) {
            this.startTimer();
        } else {
            document.getElementById('timerDisplay').style.display = 'none';
        }

        this.questionStartTime = Date.now();
    }

    startTimer() {
        const timerDisplay = document.getElementById('timerDisplay');
        timerDisplay.style.display = 'block';
        this.timeRemaining = this.config.timerDuration;
        
        const updateTimer = () => {
            document.getElementById('timeRemaining').textContent = this.timeRemaining;
            
            if (this.timeRemaining <= 10) {
                timerDisplay.classList.add('warning');
            } else {
                timerDisplay.classList.remove('warning');
            }
            
            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.answerDontKnow(); // Timer scaduto = "Non so"
            }
            
            this.timeRemaining--;
        };
        
        updateTimer();
        this.timerInterval = setInterval(updateTimer, 1000);
    }

    selectAnswer(button) {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // Rimuove selezioni precedenti
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = true;
        });

        button.classList.add('selected');

        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = button.dataset.correct === 'true';
        const timeSpent = Date.now() - this.questionStartTime;

        this.answers.push({
            questionId: question.id,
            topicId: question.topicId,
            topicName: question.topicName,
            question: question.testo,
            selectedAnswer: button.textContent,
            correctAnswer: question.risposte.find(r => r.corretta).testo,
            isCorrect: isCorrect,
            isDontKnow: false,
            timeSpent: timeSpent
        });

        // Vai alla prossima domanda dopo un breve delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.showQuestion();
        }, 500);
    }

    answerDontKnow() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        const question = this.questions[this.currentQuestionIndex];
        const timeSpent = Date.now() - this.questionStartTime;

        this.answers.push({
            questionId: question.id,
            topicId: question.topicId,
            topicName: question.topicName,
            question: question.testo,
            selectedAnswer: null,
            correctAnswer: question.risposte.find(r => r.corretta).testo,
            isCorrect: false,
            isDontKnow: true,
            timeSpent: timeSpent
        });

        this.currentQuestionIndex++;
        this.showQuestion();
    }

    endQuiz() {
        this.showReport();
    }

    showReport() {
        this.showScreen('reportScreen');

        const correctAnswers = this.answers.filter(a => a.isCorrect).length;
        const dontKnowAnswers = this.answers.filter(a => a.isDontKnow).length;
        const totalQuestions = this.answers.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const totalTime = this.formatTime(Date.now() - this.startTime);

        // Score summary
        document.getElementById('finalScore').textContent = `${correctAnswers}/${totalQuestions}`;
        document.getElementById('finalPercentage').textContent = `${percentage}%`;
        document.getElementById('totalTime').textContent = totalTime;
        document.getElementById('quizDifficulty').textContent = this.config.difficulty.charAt(0).toUpperCase() + this.config.difficulty.slice(1);
        document.getElementById('dontKnowCount').textContent = dontKnowAnswers;

        // Topics breakdown
        this.renderTopicsBreakdown();

        // Recovery section
        const wrongAnswers = this.answers.filter(a => !a.isCorrect && !a.isDontKnow).length;
        if (this.config.recoveryEnabled && wrongAnswers > 0) {
            document.getElementById('recoverySection').style.display = 'block';
            document.getElementById('wrongCount').textContent = wrongAnswers;
        } else {
            document.getElementById('recoverySection').style.display = 'none';
        }
    }

    renderTopicsBreakdown() {
        const container = document.getElementById('topicsBreakdown');
        container.innerHTML = '';

        const topicsStats = {};
        
        this.answers.forEach(answer => {
            if (!topicsStats[answer.topicId]) {
                topicsStats[answer.topicId] = {
                    name: answer.topicName,
                    correct: 0,
                    total: 0
                };
            }
            topicsStats[answer.topicId].total++;
            if (answer.isCorrect) {
                topicsStats[answer.topicId].correct++;
            }
        });

        Object.values(topicsStats).forEach(stat => {
            const div = document.createElement('div');
            const percentage = Math.round((stat.correct / stat.total) * 100);
            
            let className = 'topic-result ';
            if (percentage >= 80) className += 'good';
            else if (percentage >= 60) className += 'warning';
            else className += 'bad';
            
            div.className = className;
            div.innerHTML = `
                <span class="topic-name">${stat.name}</span>
                <span class="topic-score">${stat.correct}/${stat.total} ${percentage >= 60 ? '✓' : '⚠️'}</span>
            `;
            container.appendChild(div);
        });
    }

    startRecovery() {
        // Implementazione recovery
        alert('Funzione recupero in sviluppo!');
    }

    showReview() {
        this.showScreen('reviewScreen');
        
        const container = document.getElementById('reviewPanel');
        container.innerHTML = '';

        const wrongAnswers = this.answers.filter(a => !a.isCorrect);

        wrongAnswers.forEach((answer, index) => {
            const div = document.createElement('div');
            div.className = `review-question ${answer.isDontKnow ? 'dont-know' : 'wrong'}`;
            
            div.innerHTML = `
                <h4>Domanda ${index + 1}: ${answer.question}</h4>
                ${answer.isDontKnow ? 
                    '<div class="review-answer"><strong>Non hai risposto</strong></div>' :
                    `<div class="review-answer your-answer"><strong>La tua risposta:</strong> ${answer.selectedAnswer}</div>`
                }
                <div class="review-answer correct-answer"><strong>Risposta corretta:</strong> ${answer.correctAnswer}</div>
            `;
            
            container.appendChild(div);
        });
    }

    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.showScreen('setupScreen');
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
    }
}

// Inizializza l'app
document.addEventListener('DOMContentLoaded', () => {
    new QuizEngine();
});
