// La Brega Quiz Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get quiz link and container
    const bregaLink = document.getElementById('brega-link');
    const quizContainer = document.getElementById('quiz-container');

    // Quiz questions
    const questions = [
        {
            question: "What do you do if there's no water?",
            options: [
                "Call AAA",
                "Fill buckets from the neighbor's hose",
                "Use the emergency cistern"
            ],
            points: [0, 3, 5]
        },
        {
            question: "How do you get power after a hurricane?",
            options: [
                "Wait for LUMA",
                "Buy a generator",
                "Connect extension cords to a nearby building with power"
            ],
            points: [0, 4, 5]
        },
        {
            question: "Your flight to NYC was just canceled. What now?",
            options: [
                "Book an expensive hotel and wait",
                "Call a family member in Bayamón for a ride",
                "Sleep in the airport and make friends with other stranded travelers"
            ],
            points: [0, 3, 5]
        },
        {
            question: "The line at the supermarket is two hours long. You:",
            options: [
                "Leave and come back another day",
                "Ask someone to hold your spot while you shop",
                "Make friends with the security guard who lets you cut the line"
            ],
            points: [0, 3, 5]
        },
        {
            question: "You need to get government paperwork processed quickly. Your strategy?",
            options: [
                "Follow normal procedures and wait your turn",
                "Go very early in the morning to be first in line",
                "Find a friend who has a friend who works there"
            ],
            points: [0, 3, 5]
        }
    ];

    let currentQuestion = 0;
    let answers = [];
    let quizActive = false;

    // Handle the quiz link click
    if (bregaLink) {
        bregaLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            if (!quizActive) {
                startQuiz();
            }
        });
    }

    // Function to start the quiz
    function startQuiz() {
        quizActive = true;
        answers = [];
        currentQuestion = 0;

        // Show the quiz container
        if (quizContainer) {
            quizContainer.style.display = 'block';
            showQuestion(currentQuestion);
        }
    }

    // Function to display current question
    function showQuestion(questionIndex) {
        if (!quizContainer) return;

        const question = questions[questionIndex];

        let questionHTML = `
            <div class="brega-quiz">
                <h3 class="question-title">La Brega Survival Quiz</h3>
                <div class="question-number">Question ${questionIndex + 1} of ${questions.length}</div>
                <div class="question-text">${question.question}</div>
                <div class="question-options">
        `;

        // Add options
        question.options.forEach((option, i) => {
            questionHTML += `
                <button class="option-button" data-points="${question.points[i]}">
                    ${option}
                </button>
            `;
        });

        questionHTML += `
                </div>
            </div>
        `;

        quizContainer.innerHTML = questionHTML;

        // Add event listeners to option buttons
        const optionButtons = quizContainer.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const points = parseInt(this.getAttribute('data-points'));
                handleAnswer(points);
            });
        });
    }

    // Function to handle answer selection
    function handleAnswer(points) {
        answers.push(points);

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    }

    // Function to display results
    function showResults() {
        if (!quizContainer) return;

        const totalPoints = answers.reduce((sum, points) => sum + points, 0);
        const maxPoints = questions.length * 5;

        let result;
        if (totalPoints <= maxPoints * 0.33) {
            result = {
                rank: "Novato en La Brega",
                description: "You're just beginning to learn the art of la brega. Keep practicing those survival skills!"
            };
        } else if (totalPoints <= maxPoints * 0.66) {
            result = {
                rank: "Sobreviviente Boricua",
                description: "You've got solid brega skills. You can navigate most of life's challenges with Puerto Rican resourcefulness."
            };
        } else {
            result = {
                rank: "Maestro de La Brega",
                description: "You're a true master of la brega! Your ingenious survival skills would make your ancestors proud."
            };
        }

        // Display result
        let resultHTML = `
            <div class="brega-results">
                <h3>Your result:</h3>
                <div class="result-rank">${result.rank}</div>
                <p>${result.description}</p>
                <button id="restart-quiz" class="restart-button">Take Again</button>
            </div>
        `;

        quizContainer.innerHTML = resultHTML;

        // Add event listener to restart button
        const restartButton = document.getElementById('restart-quiz');
        if (restartButton) {
            restartButton.addEventListener('click', function() {
                quizActive = false;
                startQuiz();
            });
        }
    }

    // Add some basic styling for the quiz
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .brega-quiz, .brega-results {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            max-width: 500px;
            margin: 0 auto;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .question-title {
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 15px;
            color: #343a40;
        }
        
        .question-number {
            font-size: 0.9rem;
            color: #6c757d;
            margin-bottom: 10px;
        }
        
        .question-text {
            font-size: 1.2rem;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        
        .question-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .option-button {
            padding: 12px 15px;
            text-align: left;
            background-color: white;
            border: 1px solid #dee2e6;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .option-button:hover {
            background-color: #e9ecef;
        }
        
        .result-rank {
            font-size: 1.5rem;
            color: #007bff;
            font-weight: bold;
            margin: 15px 0;
        }
        
        .restart-button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 15px;
            font-weight: bold;
        }
        
        .restart-button:hover {
            background-color: #0069d9;
        }
        
        /* Dark mode support */
        body.dark-mode .brega-quiz,
        body.dark-mode .brega-results {
            background-color: #343a40;
            color: #f8f9fa;
        }
        
        body.dark-mode .question-title {
            color: #f8f9fa;
        }
        
        body.dark-mode .option-button {
            background-color: #495057;
            border-color: #6c757d;
            color: #f8f9fa;
        }
        
        body.dark-mode .option-button:hover {
            background-color: #6c757d;
        }
    `;
    document.head.appendChild(styleElement);
});