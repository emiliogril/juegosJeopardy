document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('game-board');
    const modalOverlay = document.getElementById('modal-overlay');
    const questionText = document.getElementById('question-text');
    const answerText = document.getElementById('answer-text');
    const modalCategory = document.getElementById('modal-category');
    const modalValue = document.getElementById('modal-value');
    const timerDisplay = document.getElementById('timer');
    const timerFill = document.getElementById('timer-fill');
    const answerSection = document.getElementById('answer-section');
    const revealAnswerBtn = document.getElementById('reveal-answer');
    const closeModalBtn = document.getElementById('close-modal');
    const settingsPanel = document.getElementById('settings-panel');

    // Datos del juego con más categorías y preguntas
    let questions = [
        { category: 'Historia', questions: [
            { question: '¿Quién fue el primer presidente de Estados Unidos?', answer: 'George Washington', value: 100, answered: false },
            { question: '¿En qué año comenzó la Segunda Guerra Mundial?', answer: '1939', value: 200, answered: false },
            { question: '¿Quién descubrió América?', answer: 'Cristóbal Colón', value: 300, answered: false },
            { question: '¿En qué año cayó el Muro de Berlín?', answer: '1989', value: 400, answered: false },
            { question: '¿Quién fue el último emperador de Roma?', answer: 'Rómulo Augusto', value: 500, answered: false }
        ]},
        { category: 'Ciencia', questions: [
            { question: '¿Cuál es el elemento más abundante en la atmósfera?', answer: 'Nitrógeno', value: 100, answered: false },
            { question: '¿Qué planeta es conocido como el planeta rojo?', answer: 'Marte', value: 200, answered: false },
            { question: '¿Cuál es la fórmula química del agua?', answer: 'H2O', value: 300, answered: false },
            { question: '¿Cuántos huesos tiene el cuerpo humano adulto?', answer: '206', value: 400, answered: false },
            { question: '¿Qué científico propuso la teoría de la relatividad?', answer: 'Albert Einstein', value: 500, answered: false }
        ]},
        { category: 'Deportes', questions: [
            { question: '¿Cada cuántos años se celebran los Juegos Olímpicos?', answer: '4 años', value: 100, answered: false },
            { question: '¿En qué deporte se usa un puck?', answer: 'Hockey sobre hielo', value: 200, answered: false },
            { question: '¿Cuál es el único deporte que se ha jugado en la Luna?', answer: 'Golf', value: 300, answered: false },
            { question: '¿Qué país ganó la primera Copa Mundial de Fútbol?', answer: 'Uruguay', value: 400, answered: false },
            { question: '¿Cuántos jugadores hay en un equipo de baloncesto en cancha?', answer: '5', value: 500, answered: false }
        ]},
        { category: 'Entretenimiento', questions: [
            { question: '¿Quién dirigió la película "Titanic"?', answer: 'James Cameron', value: 100, answered: false },
            { question: '¿Cuál es la película más taquillera de todos los tiempos?', answer: 'Avatar', value: 200, answered: false },
            { question: '¿Qué banda británica lanzó el álbum "Abbey Road"?', answer: 'The Beatles', value: 300, answered: false },
            { question: '¿Cuál es el nombre real de Superman?', answer: 'Clark Kent / Kal-El', value: 400, answered: false },
            { question: '¿Qué actor interpretó a Jack Sparrow?', answer: 'Johnny Depp', value: 500, answered: false }
        ]},
        { category: 'Geografía', questions: [
            { question: '¿Cuál es la capital de Australia?', answer: 'Canberra', value: 100, answered: false },
            { question: '¿Cuál es el río más largo del mundo?', answer: 'Río Nilo', value: 200, answered: false },
            { question: '¿En qué continente está ubicado Egipto?', answer: 'África', value: 300, answered: false },
            { question: '¿Cuál es la montaña más alta del mundo?', answer: 'Monte Everest', value: 400, answered: false },
            { question: '¿Qué país tiene más husos horarios?', answer: 'Francia', value: 500, answered: false }
        ]},
        { category: 'Tecnología', questions: [
            { question: '¿Quién fundó Microsoft?', answer: 'Bill Gates y Paul Allen', value: 100, answered: false },
            { question: '¿Qué significa "www"?', answer: 'World Wide Web', value: 200, answered: false },
            { question: '¿En qué año se lanzó el primer iPhone?', answer: '2007', value: 300, answered: false },
            { question: '¿Qué empresa desarrolló el lenguaje de programación Java?', answer: 'Sun Microsystems', value: 400, answered: false },
            { question: '¿Cuál es el nombre del algoritmo de búsqueda de Google?', answer: 'PageRank', value: 500, answered: false }
        ]}
    ];

    let timerInterval;
    let currentQuestion;
    let questionTime = 30; // tiempo por defecto
    let currentPlayer = 1;
    let soundEnabled = true;
    let answeredQuestions = new Set();

    // Audio context para sonidos (simulados)
    function playSound(type) {
        if (!soundEnabled) return;
        
        // Simular sonidos con console.log y efectos visuales
        switch(type) {
            case 'click':
                console.log('🔊 Sonido: Click!');
                break;
            case 'correct':
                console.log('🔊 Sonido: ¡Correcto!');
                break;
            case 'incorrect':
                console.log('🔊 Sonido: Incorrecto');
                break;
            case 'timeup':
                console.log('🔊 Sonido: ¡Se acabó el tiempo!');
                break;
            case 'reveal':
                console.log('🔊 Sonido: Revelando respuesta...');
                break;
        }
    }

    function buildBoard() {
        gameBoard.innerHTML = '';
        let questionIndex = 0;
        
        for (const category of questions) {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerText = category.category;
            gameBoard.appendChild(categoryHeader);
            
            for (const question of category.questions) {
                const questionCell = document.createElement('div');
                questionCell.className = question.answered ? 'question-cell answered' : 'question-cell';
                questionCell.innerText = question.answered ? '✓' : `$${question.value}`;
                questionCell.dataset.questionId = questionIndex;
                
                if (!question.answered) {
                    questionCell.onclick = () => {
                        playSound('click');
                        openQuestionModal(category, question, questionIndex);
                    };
                }
                
                gameBoard.appendChild(questionCell);
                questionIndex++;
            }
        }
    }

    function openQuestionModal(category, question, questionIndex) {
        // Marcar pregunta como respondida
        let totalIndex = questionIndex;
        let catIndex = 0;
        let qIndex = 0;
        for (let i = 0; i < questions.length; i++) {
            if (totalIndex < questions[i].questions.length) {
                catIndex = i;
                qIndex = totalIndex;
                break;
            }
            totalIndex -= questions[i].questions.length;
        }
        questions[catIndex].questions[qIndex].answered = true;
        currentQuestion = question;
        modalCategory.innerText = category.category;
        modalValue.innerText = `$${question.value}`;
        questionText.innerText = question.question;
        answerText.innerText = question.answer;
        modalOverlay.classList.add('active');
        answerSection.style.display = 'none';
        startTimer();
    }

    function startTimer() {
        let timeRemaining = questionTime;
        timerDisplay.innerText = timeRemaining;
        timerFill.style.width = '100%';
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeRemaining--;
            timerDisplay.innerText = timeRemaining;
            timerFill.style.width = `${(timeRemaining/questionTime)*100}%`;
            if (timeRemaining <= 5) {
                timerDisplay.classList.add('warning');
            } else {
                timerDisplay.classList.remove('warning');
            }
            if (timeRemaining === 0) {
                stopTimer();
                revealAnswer();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerDisplay.classList.remove('warning');
    }

    function revealAnswer() {
        stopTimer();
        answerSection.style.display = 'block';
    }

    function scoreAnswer(correct) {
        const playerScoreElement = document.getElementById(`player${document.getElementById('current-player').value}-score`);
        const currentScore = parseInt(playerScoreElement.innerText.replace('$', ''));
        const updatedScore = correct ? currentScore + currentQuestion.value : currentScore - currentQuestion.value;
        playerScoreElement.innerText = `$${updatedScore}`;
        closeModal();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    revealAnswerBtn.addEventListener('click', revealAnswer);
    closeModalBtn.addEventListener('click', closeModal);

    document.getElementById('timer-setting').addEventListener('input', (event) => {
        questionTime = parseInt(event.target.value);
    });

    document.getElementById('sound-setting').addEventListener('change', (event) => {
        // Simulación de activar o desactivar sonido
        console.log(`Sonido: ${event.target.checked ? 'Activado' : 'Desactivado'}`);
    });

    // Funciones globales (necesarias para ser llamadas desde HTML)
    window.resetGame = function() {
        // Reiniciar todas las preguntas
        questions.forEach(category => {
            category.questions.forEach(question => {
                question.answered = false;
            });
        });
        
        // Reiniciar puntajes
        document.getElementById('player1-score').innerText = '$0';
        document.getElementById('player2-score').innerText = '$0';
        document.getElementById('player3-score').innerText = '$0';
        
        // Reconstruir tablero
        buildBoard();
        
        // Cerrar modal si está abierto
        closeModal();
        
        console.log('🎮 Juego reiniciado');
    };
    
    window.toggleSettings = function() {
        const panel = document.getElementById('settings-panel');
        if (panel.style.display === 'none' || panel.style.display === '') {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    };
    
    window.scoreAnswer = function(correct) {
        playSound(correct ? 'correct' : 'incorrect');
        
        const currentPlayerNum = document.getElementById('current-player').value;
        const playerScoreElement = document.getElementById(`player${currentPlayerNum}-score`);
        const currentScore = parseInt(playerScoreElement.innerText.replace('$', ''));
        const updatedScore = correct ? currentScore + currentQuestion.value : currentScore - currentQuestion.value;
        playerScoreElement.innerText = `$${updatedScore}`;
        
        // Actualizar tablero
        buildBoard();
        
        // Cerrar modal
        closeModal();
    };
    
    // Event listeners adicionales
    document.getElementById('timer-setting').addEventListener('input', (event) => {
        questionTime = parseInt(event.target.value);
    });
    
    document.getElementById('sound-setting').addEventListener('change', (event) => {
        soundEnabled = event.target.checked;
        console.log(`Sonido: ${soundEnabled ? 'Activado' : 'Desactivado'}`);
    });
    
    // Cerrar modal al hacer clic fuera de él
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Cerrar configuración al hacer clic fuera
    document.addEventListener('click', (event) => {
        const panel = document.getElementById('settings-panel');
        const settingsBtn = event.target.closest('.btn-settings');
        if (!panel.contains(event.target) && !settingsBtn && panel.style.display === 'block') {
            panel.style.display = 'none';
        }
    });

    buildBoard();
});
