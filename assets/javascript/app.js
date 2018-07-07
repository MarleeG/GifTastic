// function addingTopics() {
    var topics = ["Beyonce", "Sza", "Rihanna", "Jhene Aiko"];
    

// }

$(document).ready(function(){
    for (var j = 0; j < topics.length; j++) {
        $(".giph__buttons").append(addingButtons(topics[j]));
    }
});


// Creating Buttons
function addingButtons(text) {
    var button = $("<button>");
    button.html(text);
    return button;
};

// Creating images, DOM manipulation
function createImage(url, still, animated) {

    // var data = response.data;
    var image = $("<img>");

    image.attr({
        src: url,
        "data-animated": animated,
        "data-still": still,
        "data-state": "still"
    });
    return image;
};


// Displaying Giphs on the screen
function displayGiph(response) {

    $(".giph__images").empty();
    var data = response.data;

    for (var i = 0; i < 11; i++) {
        var animated = data[i].images.fixed_height.url;
        var still = data[i].images.fixed_height_still.url;
        var url = still;

        var para = $("<p>");
        var rating = para.text("Rating: " + data[i].rating);
        $(".giph__images").prepend(rating);
        $(".giph__images").prepend(createImage(url, still, animated));

    }


};


// Getting Giphy from API 
function getGiphy(val) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=0GwHAufCFymt3sl1Gj0usKecCI8vRZfW&q=" + val,
        method: "GET"
    })
        .done(function (data) {
            console.log("Data: ", data);
            displayGiph(data);
        })
};


// Search for Giphs, and clear search bar
function searchForGiphs(event) {
    event.preventDefault();
    var value = $("#search-bar").val();
    $(".giph__buttons").append(addingButtons(value));
    getGiphy(value);
    $("#search-bar").val("");
};

$("#giph__button").on("click", searchForGiphs);

// Value of search input
function searchButtonValue() {
    var name = $(this).html();
    getGiphy(name);
    console.log("Name: ", name);
};

// listen to entire website since you can't listen to DOM events
$(document).on("click", ".giph__buttons button", searchButtonValue);

// playing stills and animated giphs 
function playGiph() {
    var still = $(this).attr("data-still");
    var animated = $(this).attr("data-animated");
    var state = $(this).attr("data-state");

    if (state === 'still') {
        $(this).attr({
            "data-state": "play",
            src: animated,
        });
    } else {
        $(this).attr({
            "data-state": "still",
            src: still
        });
    }
}

$(document).on("click", "img", playGiph);

// giphy api: 0GwHAufCFymt3sl1Gj0usKecCI8vRZfW
// Host: api.giphy.com
// Path: /v1/gifs/search
// api_key
// Host, Path, ?, api_key=, then actual api key, &
// https://api.giphy.com/v1/gifs/search?api_key=0GwHAufCFymt3sl1Gj0usKecCI8vRZfW&=animals