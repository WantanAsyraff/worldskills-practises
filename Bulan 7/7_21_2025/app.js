const { createApp } = Vue;

createApp({
    data() { 
        /* data() is where Vue component keeps all reactive states
        (Things you wanna display, track and change visually in your app)*/

        return {
            /*Quiz Information*/
            mode: 'casual',
            current_question: 0,
            selected_answer: null,
            score: 0,
            time: 0,

            casual_questions: [
                {
                    text: "Lorem ipsum",
                    choices: ["A. Gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 0 // Answer from choices array
                },
                {
                    text: "Meow",
                    choices: ["A. Gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 2 
                },
                {
                    text: "Woah",
                    choices: ["A. Gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 0 
                },
                {
                    text: "Ipsum sangat",
                    choices: ["A. Gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 3
                },
                {
                    text: "Lorem ipsum nyas",
                    choices: ["A. Gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 1
                }
            ],
            
            expert_question: [
                {
                    text: "Lorem ipsum",
                    choices: ["A. Gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 0 // Answer from choices array
                },
                {
                    text: "Lorem ipsum",
                    choices: ["A. Not gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 2 // Answer from choices array
                },
                {
                    text: "Lorem ipsum",
                    choices: ["A. Possibly gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 3 // Answer from choices array
                },
                {
                    text: "Lorem ipsum",
                    choices: ["A. High key gurt", "B. Yo", "C. Sybau", "D. Meow"],
                    answer: 1 // Answer from choices array
                },
            ]
        };
    },

    computed: {
    /* TLDR; Use computed if you're doing recalculations, it caches from data(). Use
    method: if you want to take in parameters */
        
    },

    methods: {
        restart() {
            alert("restarted quiz");
            return this.score = 0, this.time = 0, this.current_question = 0;
        },

        pause() {
            alert("paused");
        },

        exit() {
            alert("exit quiz");
        },

        questionAnswered() {
            return 0;
        },
    }

}).mount('.app'); // IMPORTANT TO MOUNT AND USE .app IF USING THIS FORMAT