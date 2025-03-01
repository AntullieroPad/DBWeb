// Add this to your script.js or at the bottom of your syllabus.html page

document.addEventListener("DOMContentLoaded", function() {
    // Collection of quotes organized by category
    const quotesByCategory = {
        "curatedCategory1": [ // Pre-1898 Puerto Rican History
            "The revolution is not an apple that falls when it is ripe. You have to make it fall. – Ramón Emeterio Betances",
            "The liberty of a people is not the gift of those who govern, but the right of those who deserve it. – Eugenio María de Hostos",
            "Cuba and Puerto Rico are two wings of the same bird. – Lola Rodríguez de Tió",
            "The chains of slavery are as much on the mind as they are on the body. – Segundo Ruiz Belvis"
        ],
        "curatedCategory2": [ // Enslavement & Resistance
            "El que no conoce su historia, está condenado a repetirla. – José Martí",
            "The abolition of slavery is the revolution. – Ramón Emeterio Betances",
            "To enslave a man is to kill him slowly. – José Julián Acosta",
            "A nation cannot call itself civilized while maintaining the institution of slavery. – Alejandro Tapia y Rivera"
],
    "curatedCategory3": [ // American Occupation
        "We do not want to change masters; we want to be masters of ourselves. – Luis Muñoz Rivera",
        "The eagle should not replace the lion; neither should rule over us. – José de Diego",
        "We traded the Spanish cape for the American coat, but underneath we remain Puerto Rican. – Rosendo Matienzo Cintrón",
        "According to the Yankees, owning one person makes you a scoundrel, but owning a nation makes you a colonial benefactor. – Nelson A. Denis"
],
    "curatedCategory4": [ // Educational Colonialism
        "Education is the foundation of happiness and freedom. To educate is to liberate. – Eugenio María de Hostos",
        "Our language is the manifestation of our collective spirit. To defend it is to defend our existence. – Nilita Vientós Gastón",
        "Our tragedy lies in that we are neither one thing nor the other, we are in a painful state of transition. – Antonio S. Pedreira"
    ],
        "curatedCategory5": [ // Puertorriquenidad
        "We are neither Spanish nor English, we are the antillean synthesis of blood and culture. – Luis Palés Matos",
        "We must find ourselves before we can present ourselves to the world. – Antonio S. Pedreira",
        "The Puerto Rican is a docile character. But beneath that docility lies a volcano of resistance. – René Marqués",
        "Y sería borincano aunque naciera en la luna. (I would be Boricua even if I were born on the moon.) – Juan Antonio Corretjer"
    ],
        "curatedCategory6": [ // New York
        "Puerto Ricans came to New York looking for their dreams, only to find they had to postpone them indefinitely. – Pedro Pietri",
        "We did not leave our country—our country left us, forcing us to search for bread elsewhere. – Jesús Colón",
        "They call us foreigners in our own land and strangers in the land we are forced to adopt. – Bernardo Vega",
        "nuyorican is a new language, spanglish is its soul... – Tato Laviera"
],
    "curatedCategory7": [ // Alternative Diaspora
        "Even when we are far from our land, our land is not far from us. – Juan Antonio Corretjer",
        "I am life, strength, woman, Puerto Rico, homeland... when Puerto Ricans everywhere join their voices. – Julia de Burgos",
        "I wanted to be like men wanted me to be: an attempt at life; a game of hide and seek with my being. But I was made of nows. – Julia de Burgos"
],
    "curatedCategory8": [ // Ongoing Struggles
        "The homeland is valor and sacrifice. – Pedro Albizu Campos",
        "Colonialism is not just a political condition, it is also a state of mind. – Rubén Berríos Martínez",
        "The status of Puerto Rico is not as important as the status of Puerto Ricans. – Luis Muñoz Marín",
        "The Latina in me is an ember that blazes forever. – Sonia Sotomayor",
        "No sueltes la bandera ni olvides el lelolai, que no quiero que hagan contigo lo que le pasó a Hawái. (Don't let go of the flag nor forget the lelolai, I don't want them to do to you what they did to Hawaii.) – Bad Bunny"
    ]
};

    // Function to select a random quote from an array
    function getRandomQuote(quotes) {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    // Apply random quotes to each summary element based on its data-key
    document.querySelectorAll("summary[data-key]").forEach(summary => {
        const categoryKey = summary.getAttribute("data-key");
        if (quotesByCategory[categoryKey]) {
            const randomQuote = getRandomQuote(quotesByCategory[categoryKey]);
            summary.setAttribute("data-quote", randomQuote);

            // Check if tooltip already exists, if not create it
            if (!summary.querySelector(".summary-tooltip")) {
                const tooltip = document.createElement("div");
                tooltip.classList.add("summary-tooltip");
                tooltip.textContent = randomQuote;
                summary.appendChild(tooltip);
            }
        }
    });
});