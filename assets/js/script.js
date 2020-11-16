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
var query = document.getElementById("search-term");
var maps = $(".map");

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
    $(".title").html(response.name);
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
                console.log(query.value);
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


var images = {
    alabama: "./assets/images/alabama.png",
    alaska: "./assets/images/alaska.png",
    arizona: "./assets/images/arizona.png",
    arkansas: "./assets/images/arkansas.png",
    california: "./assets/images/california.png",
    colorado: "./assets/images/colorado.png",
    connecticut: "./assets/images/connecticut.png",
    delaware: "./assets/images/delaware.png",
    florida: "./assets/images/florida.png",
    georgia: "./assets/images/georgia.png",
    hawaii: "./assets/images/hawaii.png",
    idaho: "./assets/images/idaho.png",
    illinois: "./assets/images/illinois.png",
    indiana: "./assets/images/indiana.png",
    iowa: "./assets/images/iowa.png",
    kansas: "./assets/images/kansas.png",
    kentucky: "./assets/images/kentucky.png",
    louisiana: "./assets/images/louisiana.png",
    maine: "./assets/images/maine.png",
    maryland: "./assets/images/maryland.png",
    massachusetts: "./assets/images/massachusetts.png",
    michigan: "./assets/images/michigan.png",
    minnesota: "./assets/images/minnesota.png",
    mississippi: "./assets/images/mississippi.png",
    missouri: "./assets/images/missouri.png",
    montana: "./assets/images/montana.png",
    nebraska: "./assets/images/nebraska.png",
    nevada: "./assets/images/nevada.png",
    newhampshire: "./assets/images/newhampshire.png",
    newjersey: "./assets/images/newjersey.png",
    newmexico: "./assets/images/newmexico.png",
    newyork: "./assets/images/newyork.png",
    northcarolina: "./assets/images/northcarolina.png",
    northdakota: "./assets/images/northdakota.png",
    ohio: "./assets/images/ohio.png",
    oklahoma: "./assets/images/oklahoma.png",
    oregon: "./assets/images/oregon.png",
    pennsylvania: "./assets/images/pennsylvania.png",
    rhodeisland: "./assets/images/rhodeisland.png",
    southcarolina: "./assets/images/southcarolina.png",
    southdakota: "./assets/images/southdakota.png",
    tennessee: "./assets/images/tennessee.png",
    texas: "./assets/images/texas.png",
    utah: "./assets/images/utah.png",
    vermont: "./assets/images/vermont.png",
    virginia: "./assets/images/virginia.png",
    washington: "./assets/images/washington.png",
    westvirginia: "./assets/images/westvirginia.png",
    wisconsin: "./assets/images/wisconsin.png",
    wyoming: "./assets/images/wyoming.png"
};


var input = document.getElementById("search-term");

if (!images[input]) {
    window.alert("Invalid input")
} else {
    query.src = images[input]
}