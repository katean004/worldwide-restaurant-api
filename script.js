// Html variables
var resultContainer = $(".resultContainer");
var cityName = $(".cityName");
var randomBtn = $(".randomizeBtn");
var name = $(".restaurantName");
var description = $(".description");
var cuisine = $(".cuisine");
var price = $(".price");
var address = $(".address");
var callBtn = $(".callBtn");
var webBtn = $(".webBtn");

// Api variables
var apikey = "d0db9928cbmshf912bd146991184p1e2686jsn614886281a85";
var locationId = 0;

// Random variables
var i = 0;

$(document).ready(function(){
    //Hide result container
    resultContainer.hide();

    randomBtn.click(function(){
        //Save user input city name
        var city = cityName.val();


        //Settings for restaurant ajax call #1: location id
        var settings1 = {
            "async": true,
            "crossDomain": true,
            "url": "https://worldwide-restaurants.p.rapidapi.com/typeahead",
            "method": "POST",
            "headers": {
                "x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
                "x-rapidapi-key": apikey,
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "language": "en_US",
                "q": city
            }
        }

        //Run first api ajax call for location id
        $.ajax(settings1).done(function (response1) {
            locationId = response1.results.data[0].result_object.location_id;

        }).then(function(){
        //Settings for restaurant ajax call #2: restaurant results
        var settings2 = {
            "async": true,
            "crossDomain": true,
            "url": "https://worldwide-restaurants.p.rapidapi.com/search",
            "method": "POST",
            "headers": {
                "x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com",
                "x-rapidapi-key": apikey,
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "limit": "10",
                "language": "en_US",
                "location_id": locationId,
                "currency": "USD"
            }
        }

        // Run second ajax call for restaurant results
        $.ajax(settings2, locationId).done(function (response2) {
            const res = response2.results.data.length;

            // Randomization
            i = Math.floor(Math.random() * res);

            var resName = response2.results.data[i].name;
            var resCuisine = response2.results.data[i].cuisine[i];
            var resPrice = response2.results.data[i].price;
            var resAddress = response2.results.data[i].address;
            var resImg = response2.results.data[i].photo.images.medium.url;
            var resDes = response2.results.data[i].photo.caption;
            var resPhone = response2.results.data[i].phone;
            var resWeb = response2.results.data[i].website;

            // Restaurant Name: response2.results.data[i].name
            // Restaurant Cuisine: response2.results.data[i].cuisine[i]
            // Restaurant Price: response2.results.data[i].price
            // Restaurant Address: response2.results.data[i].address
            // Restaurant Img: response2.results.data[i].photo.images.medium.url
            // Restaurant Description: response2.results.data[i].photo.caption
            // Restaurant Phone: response2.results.data[i].phone
            // Restaurant Website: response2.results.data[i].website
            

            // Console logging all restaurant info
            console.log(resName);
            console.log(resCuisine);
            console.log(resPrice);
            console.log(resAddress);
            console.log(resImg);
            console.log(resPhone);
            console.log(resWeb);


            // Append restaurant info onto html
            // name.text("Restaurant Name: " + resName);
            cuisine.text("Cuisine: " + resCuisine);
            price.text("Price: " + resPrice);
            address.text("Adress: " + resAddress);
            callBtn.text(resPhone);
            webBtn.text(resWeb);


            // Show results for restaurant info after its been generated
            resultContainer.show();
            
        });
        });
    });








});


