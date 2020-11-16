$(".button2").click(function() {
    $(".container").show();
    $(".back-button").show();
});
$(".button2").click(function() {
    $(".card2").hide();
});
$(".back-button").click(function() {
    $(".card2").show();
    $(".back-button").hide();
});
$(".back-button").click(function() {
    $(".container").hide();
});

//Movement animation piece
const card = document.querySelector('.card');
const container = document.querySelector('.container');
const title = document.querySelector('.title');
const map = document.querySelector('.map');
const description = document.querySelector(".description");
const list = document.querySelector(".list");
const moreinfo = document.querySelector(".more-info");
const weather = document.querySelector(".weather");

//Animation event
container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerWidth / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//Animate in
container.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";
    //Pop out
    title.style.transform = "translateZ(80px)";
    map.style.transform = "translateZ(50px)";
    description.style.transform = "translateZ(50px)";
    weather.style.transform = "translateZ(60px)";
    moreinfo.style.transform = "translateZ(80px)";
});
//Animate out
container.addEventListener("mouseleave", (e) => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Pop back
    title.style.transform = "translateZ(0px)";
    map.style.transform = "translateZ(0px)";
    description.style.transform = "translateZ(0px)";
    weather.style.transform = "translateZ(0px)";
    moreinfo.style.transform = "translateZ(0px)";
});

// -----------------------------------------------------------------------------------------
var currentTime = (moment().format('MM/DD/YYYY'));
var apiKey = "78abac7397dbff0934df4ef82fc5fd58";
var query = $("#search-term");
var maps = $(".map");
var mapRef = "./assets/images/" + query + ".png";

console.log(currentTime);


$("#search-term").keypress(function(e){
    if(e.which == 13) {
        $("#button2").click();
    }
});

// UV index
function uvIndex(lng, lat) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lng}`,
        method: "GET"
    })
        .then(function (response1) {

            $(".uvIndex").html("UV Index: " + `<span class=" badge badge-danger">${(response1.value)}</span>`);
        });
}

let geocoder;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
function successFunction(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    console.log(lat, lng)

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${apiKey}`,
        method: "GET"
    })
        .then(function (response) {
            updateLocation(response);
        });
    uvIndex(lng, lat);
};
function updateLocation(response) {
    $(".city").html(`<h2>${response.name} (${currentTime}) <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png"></h2>`);
    $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
    $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
}
function errorFunction() {
    alert("Geocoder failed");
}

function citySearch() {
    $(".button2").click(function (event) {
        //this event prevents default refreshing of the page upon button click
        event.preventDefault("click")
        let city = $("#search-term").val().trim();
        if (city != '') {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`,
                method: "GET"
            }).then(function (response) {
                updateLocation(response);
                uvIndex(response.coord.lon, response.coord.lat)
                console.log(reponse);
            });
        }
    })
};
citySearch();

const cityInfo = async (city) => {

    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(queryURL);
    const result = await response.json();
    return result;

};

const buttonClick = (city) => {

    cityInfo(city).then(response => {
        updateLocation(response);
        uvIndex(response.coord.lon, response.coord.lat);
    });
};

function getMap() {
    var i = document.getElementByClassName(".map").src;
}