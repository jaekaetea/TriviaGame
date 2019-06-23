var trivia = {
    q: [
        {
            q1: "Question1"
        }, {
            q2: "Question1"
        }, {
            q3: "Question1"
        }, {
            q4: "Question1"
        }, {
            q5: "Question1"
        }
    ],
    a: [
        {
            q: ["a1", "a2", "a3", "a4"]
        }, {
            q: ["a2", "a2", "a3", "a4"]
        }, {
            q: ["a3", "a2", "a3", "a4"]
        }, {
            q: ["a4", "a2", "a3", "a4"]
        }, {
            q: ["a5", "a2", "a3", "a4"]
        }
    ],
    answer: [
        {
            q1: "a4"
        }, {
            q2: "a4"
        }, {
            q3: "a4"
        }, {
            q4: "a4"
        }, {
            q5: "a4"
        }
    ]

};

var i = 0;

var num;
var intervalId = setInterval(count, 1000);

function count() {
    if (num === 0) {
        num = 0;
        alert("Time's Up!");
        stop();
    }
    else {
        num--;
        $("#time").html("Time Remaining: " + num + " Seconds");
    }
}

function stop() {
    clearInterval(intervalId);
    $("#time").html("Time Remaining: " + num + " Seconds");
}

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(count, 1000);
    num = 30;
}

run();

$("#question").append(Object.values(trivia.q[i]) + "<br>");

for (var x = 0; x < 4; x++) {
    var options = trivia.a[i].q[x];
    $("#answers").append($("<button class='btn btn-dark' id='"+options+"'>"+options+"</button>"+"<br>"+"<br>"));
}

//do a foreach
console.log(Object.values(trivia.answer[i]));
//$("#game").append(trivia.answer[i]);
console.log(trivia.q[i]);
console.log(trivia.a[i]);
console.log(trivia.answer[i]);

$("button").click(function() {
    stop();
    alert(this.id); // or alert($(this).attr('id'));
    var one = this.id;
    var two = Object.values(trivia.answer[i]);
    console.log(one+two);
    if (one == two) {
        alert("Correct");
    }
});


