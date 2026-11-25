
/* =====================================
   1. MENÚ DE NAVEGACIÓN
===================================== */

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');

    const abierto = nav.classList.contains('open');

    menuToggle.textContent = abierto ? '✕' : '☰';
    menuToggle.setAttribute('aria-expanded', abierto);
});

// Cerrar el menú al seleccionar una sección
const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});


/* =====================================
   2. PROCESO DE PASTEURIZACIÓN
===================================== */

// Información de cada paso
const steps = [
    {
        title: 'Preparación de la leche',
        description: 'Primero se filtra la leche cruda para retirar posibles impurezas. Después se coloca en una olla metálica limpia.',
        icon: '🥛',
        tip: 'La limpieza de los materiales ayuda a evitar contaminaciones.'
    },
    {
        title: 'Calentamiento',
        description: 'La leche se calienta poco a poco mientras se revisa la temperatura con un termómetro en grados Celsius.',
        icon: '🔥',
        tip: 'Es importante vigilar la temperatura durante todo el calentamiento.'
    },
    {
        title: 'Control de temperatura',
        description: 'Se debe alcanzar una temperatura de 63 °C, característica del método de pasteurización lenta o VAT.',
        icon: '🌡️',
        tip: 'El termómetro permite comprobar que se alcanzó la temperatura indicada.'
    },
    {
        title: 'Mantenimiento del calor',
        description: 'Una vez alcanzados los 63 °C, la leche se mantiene a esa temperatura durante 30 minutos.',
        icon: '⏱️',
        tip: 'El tiempo comienza a contarse cuando se alcanza la temperatura establecida.'
    },
    {
        title: 'Enfriamiento',
        description: 'Después del calentamiento, la leche se enfría rápidamente hasta llegar aproximadamente a 4 °C.',
        icon: '❄️',
        tip: 'El frío ayuda a disminuir la velocidad de crecimiento de los microorganismos.'
    },
    {
        title: 'Almacenamiento',
        description: 'Finalmente, la leche se coloca en un recipiente de vidrio limpio y se guarda en refrigeración.',
        icon: '🫙',
        tip: 'Debe mantenerse refrigerada y manipularse con utensilios limpios.'
    }
];

// Elementos del DOM
const stepButtons = document.querySelectorAll('.step-button');
const stepTitle = document.querySelector('.step-content h3');
const stepDescription = document.querySelector('.step-content p');
const stepIcon = document.querySelector('.step-visual span');
const stepTip = document.querySelector('.step-tip');

// Función para mostrar un paso
function showStep(index) {

    const step = steps[index];

    stepTitle.textContent = step.title;
    stepDescription.textContent = step.description;
    stepIcon.textContent = step.icon;
    stepTip.textContent = 'Consejo: ' + step.tip;

    // Actualizar el botón activo
    stepButtons.forEach((button, i) => {
        button.classList.toggle('active', i === index);
        button.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
}

// Evento de clic en cada paso
stepButtons.forEach((button, index) => {

    button.addEventListener('click', () => {
        showStep(index);
    });

});

// Mostrar el primer paso al iniciar
showStep(0);


/* =====================================
   3. CUESTIONARIO INTERACTIVO
===================================== */

const questions = [
    {
        question: '¿Cuál es el objetivo principal de la pasteurización?',
        answers: [
            'Cambiar el color de la leche',
            'Reducir microorganismos que pueden causar enfermedades o deterioro',
            'Congelar completamente la leche',
            'Eliminar todos los nutrientes'
        ],
        correct: 1,
        explanation: '¡Correcto! La pasteurización utiliza calor para reducir microorganismos perjudiciales.'
    },

    {
        question: '¿Qué temperatura y tiempo se utilizaron en nuestro experimento?',
        answers: [
            '72 °C durante 15 segundos',
            '100 °C durante 10 minutos',
            '63 °C durante 30 minutos',
            '40 °C durante 5 minutos'
        ],
        correct: 2,
        explanation: '¡Muy bien! Se utilizaron 63 °C durante 30 minutos, siguiendo el método VAT.'
    },

    {
        question: '¿Por qué se enfría la leche después de calentarla?',
        answers: [
            'Para acelerar el crecimiento de microorganismos',
            'Para cambiarla de color',
            'Para aumentar su temperatura',
            'Para disminuir la velocidad de crecimiento de microorganismos'
        ],
        correct: 3,
        explanation: '¡Exacto! La refrigeración ayuda a retrasar el crecimiento de microorganismos que pueden permanecer.'
    },

    {
        question: '¿Qué ocurrió con la leche después del proceso?',
        answers: [
            'Se observó una capa superficial o nata',
            'Se convirtió en agua',
            'Perdió completamente su color',
            'Se congeló durante el calentamiento'
        ],
        correct: 0,
        explanation: '¡Correcto! Se observó una capa superficial de color beige o amarillento, conocida como nata.'
    }
];

// Variables del cuestionario
let currentQuestion = 0;
let score = 0;
let answered = false;

// Elementos HTML
const questionTitle = document.querySelector('.quiz-card h3');
const answerList = document.querySelector('.answer-list');
const feedback = document.querySelector('.feedback');
const progressBar = document.querySelector('.quiz-progress i');
const questionCounter = document.querySelector('.quiz-progress span');
const nextButton = document.querySelector('.quiz-controls .button');
const quizCard = document.querySelector('.quiz-card');

// Función para crear una pregunta
function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    // Actualizar pregunta
    questionTitle.textContent = question.question;

    // Limpiar respuestas anteriores
    answerList.innerHTML = '';

    feedback.textContent = '';

    // Actualizar contador
    questionCounter.textContent =
        `PREGUNTA ${currentQuestion + 1} DE ${questions.length}`;

    // Actualizar barra de progreso
    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    // Crear botones de respuesta con DOM API
    question.answers.forEach((answer, index) => {

        const button = document.createElement('button');

        button.classList.add('answer-option');

        button.textContent = answer;

        button.type = 'button';

        // Evento para seleccionar respuesta
        button.addEventListener('click', () => {

            checkAnswer(index, button);

        });

        answerList.appendChild(button);

    });

    // Preparar botón siguiente
    nextButton.disabled = true;
    nextButton.textContent = 'Siguiente →';
}


// Función para comprobar respuestas
function checkAnswer(selectedIndex, selectedButton) {

    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];

    const buttons = answerList.querySelectorAll('.answer-option');

    // Comprobar si la respuesta es correcta
    if (selectedIndex === question.correct) {

        score++;

        selectedButton.classList.add('correct');

        feedback.textContent = '✓ ' + question.explanation;

    } else {

        selectedButton.classList.add('incorrect');

        feedback.textContent =
            '✗ Incorrecto. ' + question.explanation;

    }

    // Mostrar la respuesta correcta
    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === question.correct) {
            button.classList.add('correct');
        }

    });

    // Activar botón siguiente
    nextButton.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = 'Ver resultado →';
    }

}


// Evento para avanzar entre preguntas
nextButton.addEventListener('click', () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// Mostrar resultado final
function showResult() {

    questionCounter.textContent = 'RESULTADO FINAL';

    progressBar.style.width = '100%';

    questionTitle.textContent = '¡Has terminado el cuestionario!';

    answerList.innerHTML = '';

    feedback.textContent =
        `Obtuviste ${score} de ${questions.length} respuestas correctas.`;

    // Crear mensaje según puntuación
    const resultMessage = document.createElement('p');

    resultMessage.classList.add('result-message');

    if (score === questions.length) {

        resultMessage.textContent =
            '¡Excelente! Dominas muy bien el tema de la pasteurización.';

    } else if (score >= 2) {

        resultMessage.textContent =
            '¡Buen trabajo! Has comprendido varios conceptos importantes.';

    } else {

        resultMessage.textContent =
            '¡Sigue aprendiendo! Puedes revisar nuevamente la información.';

    }

    quizCard.appendChild(resultMessage);

    // Cambiar botón para reiniciar
    nextButton.textContent = 'Volver a intentar ↻';

    nextButton.disabled = false;

    // Cambiar evento del botón
    nextButton.onclick = restartQuiz;

}


// Reiniciar cuestionario
function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    // Eliminar mensaje de resultado
    const resultMessage =
        quizCard.querySelector('.result-message');

    if (resultMessage) {
        resultMessage.remove();
    }

    nextButton.onclick = null;

    showQuestion();

}


// Iniciar cuestionario
showQuestion();


/* =====================================
   4. AÑO AUTOMÁTICO EN EL FOOTER
===================================== */

const footer = document.querySelector('footer');

if (footer) {

    const year = document.createElement('span');

    year.textContent = `© ${new Date().getFullYear()} | Proyecto de pasteurización`;

    footer.appendChild(year);

}