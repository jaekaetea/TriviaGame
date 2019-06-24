var trivia = {
    q: [
        {
            q1: "What is the name of the landscape picture that is set as default wallpaper on Windows XP?"
        }, {
            q2: "The first 'rickroll' occurred on 4chan's video game board and was diguised as a trailer for. . ."
        }, {
            q3: "Google Chrome has a hidden mini-game that involves what?"
        }, {
            q4: "To fund the creation of Apple's first computer, Steve Wozniak and Steve Jobs sold their. . ."
        }, {
            q5: "How much did the first CD recorder cost?"
        }, {
            q6: "Who launched the very first website?"
        }, {
            q7: "What was the first web browser?"
        }, {
            q8: "What was the Mac's first web browser?"
        }, {
            q9: "Google's first tweet on Twitter was a message encoded in binary that read what?"
        }, {
            q10: "What was the first handheld game console to ship with a color display?"
        }, {
            q11: "What is Google's Android mascot unofficially known as?"
        }, {
            q12: "Mozilla Firefox originally launched under what name?"
        }, {
            q13: "What is the most commonly used password?"
        }, {
            q14: "Which one of these tech companies did not start in a garage?"
        }, {
            q15: "Before becoming the web's default video platform, YouTube was designed to become a. . . ?"
        }, {
            q16: "Which video game franchise has collectively sold the most copies?"
        }, {
            q17: "How do you pronounce the abbreviation of Graphics Interchange Format (.GIF)?"
        }
    ],
    a: [
        {
            q: ["Majesty", "Bliss", "Splendor", "Happiness"]
        }, {
            q: ["Mass Effect", "The Elder Scrolls: Oblivion", "Grand Theft Auto IV", "Half-Life 2"]
        }, {
            q: ["A T-rex hurdling cacti", "ASCII Tetris", "Flappy Bird with a penguin", "A typing game"]
        }, {
            q: ["Scientific calculator and Volkswagen van", "Rights to video game 'Breakout' to Atari", "Blue box devices to simulate phone operators", "Blueprints for a second generation computer"]
        }, {
            q: ["$995", "$10,000", "$20,000", "$90,000"]
        }, {
            q: ["CERN", "Stanford", "Xerox", "MIT"]
        }, {
            q: ["WorldWideWeb", "NeXT", "Mosaic", "Netscape"]
        }, {
            q: ["Samba", "Mosaic", "Cello", "ViolaWWW"]
        }, {
            q: ["Don't be evil", "I'm feeling lucky", "Do the right thing", "Is this thing on?"]
        }, {
            q: ["Neo Geo Pocket Color", "Gameboy Color", "Sega Game Gear", "Atari Lynx"]
        }, {
            q: ["Android", "Bugdroid", "AutomaTom", "Dandroid"]
        }, {
            q: ["Mozilla Phoenix", "Mozilla Firebird", "Mozilla Firefly", "Mozilla Red Panda"]
        }, {
            q: ["password", "123456", "Google", "qwerty"]
        }, {
            q: ["Amazon", "Apple", "Google", "eBay"]
        }, {
            q: ["A video dating service", "A Napster knock-off for videos", "A virtual movie theater for independent films", "An aggregator like Digg for videos"]
        }, {
            q: ["Madden NFL", "Mario", "Grand Theft Auto", "Pokémon"]
        }, {
            q: ["Jif with soft G sound (like the word gin)", "Gif with a hard G sound (like the word gift)", "First called Jif but some say Gif", "First called Gif but some say Jif"]
        }
    ],
    answer: [
        {
            q1: "Bliss",
        }, {
            q2: "Grand Theft Auto IV",
        }, {
            q3: "A T-rex hurdling cacti"
        }, {
            q4: "Scientific calculator and Volkswagen van"
        }, {
            q5: "$20,000"
        }, {
            q6: "CERN"
        }, {
            q7: "WorldWideWeb"
        }, {
            q8: "Samba"
        }, {
            q9: "I'm feeling lucky"
        }, {
            q10: "Atari Lynx"
        }, {
            q11: "Bugdroid"
        }, {
            q12: "Mozilla Phoenix"
        }, {
            q13: "123456"
        }, {
            q14: "eBay"
        }, {
            q15: "A video dating service"
        }, {
            q16: "Mario"
        }, {
            q17: "Jif with soft G sound (like the word gin)"
        }
    ]
};

var i = 0;
var one;
var two;
var three;
var num;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var intervalId = setInterval(count, 1000);
var sound = new Audio();

function play() {
    sound.currentTime = 0;  
    sound.play();
}

$(document).ready(function(){
    $("#pic").hide();	
	$("#startBtn").click(function() {
        setUp();
        update();
	});
});

$("button").click(function() {
    if (this.id == "startBtn") {
    setUp();
    update();
    }
});

function setUp() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    i = 0;
    console.log(i);
    update(); 
}

function update() {
    if (i < 17) {
        $("#pic").hide();
        pic = document.getElementById("pic");
        getPic();
        $("#pregame").html("");
        $("#time").html("Time Remaining: 30 Seconds");
        sound.src = "assets/music/jeopardy.aac";
        play();
        run();
        $("#question").html("<p>" + Object.values(trivia.q[i]) + "</p>");
        $("#answers").html("");
        for (var x = 0; x < 4; x++) {
            var options = trivia.a[i].q[x];
            $("#answers").append($("<button class='btn btn-light' id='"+options+"'>"+options+"</button>"+"<br>"));
        }   

        $("button").click(function() {
            if (this.id != "startBtn") {
                stop();
                one = this.id;
                three = Object.values(trivia.answer[i]);
                two = String(three);
                console.log(one+two);
                if (one === two) {
                    sound.src = "assets/music/winner.aac";
                    play();
                    $("#question").html("<p>" + "Correct!" + "</p>");
                    $("#answers").html("");
                    $("#pic").show();
                    correct++;
                    i++;

                    wait();
                }
                else if (one != two) {
                    sound.src = "assets/music/wrong.aac";
                    play();
                    $("#question").html("<p>" + "Nope!" + "</p>");
                    $("#answers").html("<p>" + "The Correct Answer is: " + two + "</p>");
                    $("#pic").show();
                    incorrect++;
                    i++;

                    wait();
                }
            }
        });
    } else {
        displayResults();
    }

}

function count() {
    if (num > 0) {
        num--;
        $("#time").html("Time Remaining: " + num + " Seconds");
    }
    else if (num === 0) {
        num = 0;
        stop();
        sound.src = "assets/music/timeout.aac";
        play();
        $("#question").html("<p>" + "Out of Time!" + "</p>");
        $("#answers").html("<p>" + "The Correct Answer is " + String(Object.values(trivia.answer[i])) + "</p>");
        $("#pic").show();
        unanswered++;
        i++;

        wait();
    }
}

function stop() {
    clearInterval(intervalId);
    $("#time").html("Time Remaining: " + num + " Seconds");
}

function run() {
    num = 30;
    clearInterval(intervalId);
    intervalId = setInterval(count, 1000);
}

function wait() {
    num = 3;
    clearInterval(intervalId);
    intervalId = setInterval(waiting, 1000);
}

function waiting() {
    num--;
    if (num === 0) {
        update();
    }
}

function displayResults() {
    $("#question").html("<p>" + "All done, here's how you did!" + "</p>");
    $("#answers").html("<span>" + "Correct Answers: " + correct + "</span>" + "<br>");
    $("#answers").append("<span>" + "Incorrect Answers: " + incorrect + "</span>" + "<br>");
    $("#answers").append("<span>" + "Unanswered: " + unanswered + "</span>" + "<br>");
    var prompt = "Start Over?";
    $("#answers").append($("<button class='btn btn-dark btn-lg' id='butt'>"+prompt+"</button>"+"<br>"+"<br>"));
    $("#answers").append("<br>" + "<br>" + "<br>");
    $("#answers").append("Many thanks to https://www.pixijs.com/ for the beautiful and AMAZING background!" + "<br>");
    $("#answers").append("Many thanks to https://www.techspot.com/trivia/ for the trivia questions! . . .But you're wrong about GIF!");

    $("button").click(function() {
        $("#time").html("");
        $("#question").html("");
        $("#answers").html("");
        setUp();
    });
};

function getPic() {
    if (i === 0) {
        pic.src = "assets/images/q1.jpg";
    } else if (i === 1) {
        pic.src = "https://media2.giphy.com/media/kFgzrTt798d2w/200.webp?cid=790b76115d10590f6436376d32642aa0&rid=200.webp";
    } else if (i === 2) {
        pic.src = "assets/images/q3.jpg";
    } else if (i === 3) {
        pic.src = "assets/images/q4.jpg";
    } else if (i === 4) {
        pic.src = "https://media1.giphy.com/media/l2YOoFmqbInReTKkE/200.webp?cid=790b76115d105a444b3761516b1589d9&rid=200.webp";
    } else if (i === 5) {
        pic.src = "assets/images/q6.jpg";
    } else if (i === 6) {
        pic.src = "assets/images/q7.jpg";
    } else if (i === 7) {
        pic.src = "assets/images/q8.jpg";
    } else if (i === 8) {
        pic.src = "assets/images/q9.jpg";
    } else if (i === 9) {
        pic.src = "assets/images/q10.jpg";
    } else if (i === 10) {
        pic.src = "assets/images/q11.jpg";
    } else if (i === 11) {
        pic.src = "assets/images/q12.jpg";
    } else if (i === 12) {
        pic.src = "https://media.giphy.com/media/26BROFLJSFhP0cMGk/giphy.gif";
    } else if (i === 13) {
        pic.src = "assets/images/q14.jpg";
    } else if (i === 14) {
        pic.src = "assets/images/q15.jpg";
    } else if (i === 15) {
        pic.src = "assets/images/q16.jpg";
    } else if (i === 16) {
        pic.src = "https://media0.giphy.com/media/jWdyMNSY7auVq/200w.webp?cid=790b76115d1059694653394f456285e2&rid=200w.webp";
    }
};