// FIX per QuizTrainer - Aggiunge la gestione del contatore domande
(function() {
    console.log('🔧 QuizTrainer Fix: Inizializzazione contatore domande...');
    
    let database = null;
    
    // Funzione per aggiornare il contatore
    function aggiornaContatoreDomande() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let totaleDomande = 0;
        
        if (database && database.argomenti) {
            checkboxes.forEach(cb => {
                const nomeArgomento = cb.parentElement.textContent.trim();
                const argomento = database.argomenti.find(arg => 
                    nomeArgomento.includes(arg.nome)
                );
                
                if (argomento && argomento.domande) {
                    totaleDomande += argomento.domande.length;
                }
            });
        }
        
        // Aggiorna il display
        const elementi = document.querySelectorAll('*');
        elementi.forEach(el => {
            if (el.textContent.includes('DOMANDE DISPONIBILI:') && !el.querySelector('*')) {
                el.textContent = el.textContent.replace(/\d+/, totaleDomande);
                console.log(`✅ Contatore aggiornato: ${totaleDomande} domande`);
            }
        });
        
        // Metodo alternativo
        document.querySelectorAll('span, div').forEach(el => {
            if (el.textContent.trim().match(/^\d+$/) && 
                el.parentElement.textContent.includes('DISPONIBILI')) {
                el.textContent = totaleDomande;
            }
        });
    }
    
    // Carica il database
    async function caricaDatabase() {
        try {
            const response = await fetch('data/chimica.json');
            database = await response.json();
            console.log(`✅ Database caricato: ${database.argomenti.length} argomenti`);
            
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.removeEventListener('change', aggiornaContatoreDomande);
                cb.addEventListener('change', aggiornaContatoreDomande);
            });
            
            console.log(`✅ Listener aggiunti a ${checkboxes.length} checkbox`);
            aggiornaContatoreDomande();
            
        } catch (error) {
            console.error('❌ Errore caricamento database:', error);
        }
    }
    
    // Aspetta che il DOM sia pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', caricaDatabase);
    } else {
        setTimeout(caricaDatabase, 100);
    }
    
    window.quizFixDebug = {
        database: () => database,
        aggiorna: aggiornaContatoreDomande
    };
})();
