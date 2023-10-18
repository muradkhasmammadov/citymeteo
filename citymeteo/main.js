$(document).ready(function(){
    $('.login').click(function(){
        $('.hover-login-part').toggle();
        $('.hover-login-part').css('transition','1s');
    })
    $('.fa-bars').click(function(){
        $('.toggle-button').slideToggle();
    })
    // JavaScript in a separate file (e.g., weather.js)

    const apiKey = '162c10a10b5042000e1401bc70cab5ed';
    const cities = ['Baku', 'Paris', 'Tallinn', 'Berlin', 'Riga', 'Helsinki', 'Milan', 'Madrid'];
 

    function fetchWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                document.getElementById(`${city}-temperature`).textContent = `${temperature}°C`;
                document.getElementById(city).textContent = city;
                document.getElementById(`carousel-${city}`).textContent = `${city} ${Math.round(temperature)}°`;
            })
            .catch(error => {
                console.error(`Error fetching weather data for ${city}:`, error);
            });
    }

    cities.forEach(city => {
        fetchWeatherData(city);

        // Fetch images from the JSON file and update the corresponding HTML elements
        $.getJSON("cityimgs.json", function (data) {
            const imagesArray = data.images;
            const cityData = imagesArray.find(cityData => cityData.cityId === city);
            if (cityData) {
                const imageContainer = document.getElementById(`${city}-img`);
                const img = document.createElement("img");
                img.src = cityData.imgSrc;
                img.alt = cityData.altText;
                imageContainer.appendChild(img);
            }
        });
    });
});