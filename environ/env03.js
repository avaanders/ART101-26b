let environmentTitle = "Moominvalley";

let count = 0;
let count2 = 0;
let count3 = 0;
let countB = 0;

let mainLocation = {
    name: "Moominvalley",
    type: "Grassy Hill",
    environmentElements: ["is Moominvalley", "is a lovely place to eat ice cream", "my dear friend Moomin's home", "is a great place to stay during the spring and summer"],
    isMoving: false,
};

let mainEntity = {
    name: "The Neverending Green Meadow feat. Snufkin and Moomin",
    type: "fun area",
    moods: ["relaxing with my ice cream", "eating my ice cream, yummy!", "finishing my ice cream now i'm playing my harmonica now."],
    isMoving: false,

};
let mainWeather = {
    name: "The Sky",
    type: "Ever Changing clouds",
    patterns: ["warm and sunny", "far too hot, my ice cream is melting", "partly cloudy", "going to rain."],

};

$("#question1").click(function () {

    count = count + 1;


    let arrayPosition = count % mainEntity.moods.length;

    let currentMood = mainEntity.moods[arrayPosition];

    let message = "<p>I am " + currentMood + ".</p>";

    $("#output").html(message);

    console.log(count);
    console.log(arrayPosition);
    console.log(currentMood);

});


$("#question2").click(function () {

    count2 = count2 + 1;


    let arrayPosition = count2 % mainLocation.environmentElements.length;

    let currentElement = mainLocation.environmentElements[arrayPosition];

    let message = "<p>This place " + currentElement + ".</p>";

    $("#output").html(message);

    console.log(count2);
    console.log(arrayPosition);
    console.log(currentElement);


});

$("#question3").click(function () {

    count3 = count3 + 1;

    let arrayPosition = count3 % mainWeather.patterns.length;

    let currentPattern = mainWeather.patterns[arrayPosition];

    let message = "<p> It's " + currentPattern + ".</p>";

    $("#output").html(message);

    console.log(count3);
    console.log(arrayPosition);
    console.log(currentElement);

});

function askWeather() {
    let userWeather = prompt("day, evening, or night?");

    if (!userWeather) return;

    userWeather = userWeather.trim().toLowerCase();

    const overlay = $("#overlay");

    if (userWeather == "day") {
        $("#cloudOutput").html("Sunny, as usual.");
        overlay.css({
            "background-color": "lightBlue",
            "opacity": "0.3"
        });
    }
    else if (userWeather == "evening") {
        $("#cloudOutput").html("Good evening.");
        overlay.css({
            "background-color": "orange",
            "opacity": "0.3"
        });
    }
    else if (userWeather == "night") {
        $("#cloudOutput").html("Nighttime, the perfect time for dinner... And more ice cream.");
        overlay.css({
            "background-color": "black",
            "opacity": "0.7"
        });
    }
    else {
        $("#cloudOutput").html("What time of day is that?");
        overlay.css({
            "background-color": "white",
            "opacity": "0"
        });
    }
}
$("#weatherButton").click(function () {
    askWeather();
})
let following = false; 


function isColliding($div1, $div2) {
    const d1Offset = $div1.offset();
    const d1Left = d1Offset.left;
    const d1Top = d1Offset.top;
    const d1Right = d1Left + $div1.outerWidth();
    const d1Bottom = d1Top + $div1.outerHeight();

    const d2Offset = $div2.offset();
    const d2Left = d2Offset.left;
    const d2Top = d2Offset.top;
    const d2Right = d2Left + $div2.outerWidth();
    const d2Bottom = d2Top + $div2.outerHeight();

    return !(d1Right < d2Left ||
        d1Left > d2Right ||
        d1Bottom < d2Top ||
        d1Top > d2Bottom);
}

$("#moominCreature").hover(
    function () {
        $("#thought").stop(true, true).slideDown(300);
    },
    function () {
        $("#thought").stop(true, true).slideUp(300);
    }
);
$("#snufkin").hover(
   function () {
        $("#thoughtSnufkin").stop(true, true).slideDown(300);
    },
    function () {
        $("#thoughtSnufkin").stop(true, true).slideUp(300);
    }
);

$(document).keydown(function (event) {
    if (event.key === " " || event.code === "Space") {
        event.preventDefault();

        following = !following;
        $("#moominCreature").toggleClass("following");
    }
});

$(document).mousemove(function (event) {
    if (following === true) {
        const $moominCreature = $("#moominCreature");
        const $scene = $("#scene");
        const $snufkin = $("#snufkin");

        const newLeft = event.pageX - $scene.offset().left + 30;
        const newTop = event.pageY - $scene.offset().top + 30;

        $moominCreature.css({
            left: newLeft,
            top: newTop
        });

        if (isColliding($moominCreature, $snufkin)) {
            $("#thought").text("Hi Snufkin, I brought us ice cream!").slideDown(300);
            $("#status").text("Success!! Time to eat this yummy frozen dairy treat with my friend :)");
        }else {
            $("#thought").text("Where is Snufkin?")
             $("#status").text("A little more to the left......")
        }
        
    }
});