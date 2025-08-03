let playing = false;
let score;
let timeremaining;
let action;
let correctanswer;

// Start or reset the game
document.getElementById("startreset").onclick = function () {
    if (playing) {
        location.reload(); // Reload page if already playing
    } else {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        show("timeremaining");
        timeremaining = 60;
        document.getElementById("trvalue").innerHTML = timeremaining;

        hide("gameover");
        document.getElementById("startreset").innerHTML = "Reset Game";

        startCountdown();
        generateQA();
    }
};

// Show an element
function show(id) {
    document.getElementById(id).style.display = "block";
}

// Hide an element
function hide(id) {
    document.getElementById(id).style.display = "none";
}

// Start countdown
function startCountdown() {
    action = setInterval(function () {
        timeremaining--;
        document.getElementById("trvalue").innerHTML = timeremaining;
        if (timeremaining === 0) {
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML =
                "<p>Game Over!</p><p>Your Score is " + score + "</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

// Stop countdown
function stopCountdown() {
    clearInterval(action);
}

// Generate question and answers
function generateQA() {
    let x = 1 + Math.floor(9 * Math.random());
    let y = 1 + Math.floor(9 * Math.random());
    correctanswer = x * y;
    document.getElementById("question").innerHTML = x + " x " + y;

    let correctPosition = 1 + Math.floor(4 * Math.random());

    document.getElementById("box" + correctPosition).innerHTML = correctanswer;

    let answers = [correctanswer];

    for (let i = 1; i <= 4; i++) {
        if (i !== correctPosition) {
            let wronganswer;
            do {
                wronganswer = (1 + Math.floor(9 * Math.random())) * (1 + Math.floor(9 * Math.random()));
            } while (answers.includes(wronganswer));
            answers.push(wronganswer);
            document.getElementById("box" + i).innerHTML = wronganswer;
        }
    }
}

// Add click listeners to answer boxes
for (let i = 1; i <= 4; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing) {
            if (parseInt(this.innerHTML) === correctanswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                show("correct");
                hide("wrong");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    };
}
