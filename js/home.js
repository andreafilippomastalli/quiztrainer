// Home page - Subject selection
document.addEventListener('DOMContentLoaded', () => {
    const subjectCards = document.querySelectorAll('.subject-card:not(.coming-soon)');
    
    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.dataset.subject;
            // Salva la materia selezionata e vai alla pagina quiz
            sessionStorage.setItem('selectedSubject', subject);
            window.location.href = 'quiz.html';
        });
    });
});
