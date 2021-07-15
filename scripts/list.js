let urlParams = new URLSearchParams(window.location.search);

let initMap = locations => {
    let center = {lat: parseFloat(locations[0][1]), lng: parseFloat(locations[0][2])};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center
    });
    let infoWindow =  new google.maps.InfoWindow({});
    let marker, count;
    for (count = 0; count < locations.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
            map: map,
            title: locations[count][0]
        });
        google.maps.event.addListener(marker, 'click', ((marker, count) => {
            return function() {
                infoWindow.setContent(locations[count][0]);
                infoWindow.open(map, marker);
            }
        })(marker, count));
    }
}

let initList = hotelList => {
    let hotelListElement = document.getElementById('hotel-list');
    hotelList.forEach(hotel => {
        let hotelLinkElement = document.createElement("a");
        hotelLinkElement.setAttribute("href", `detail.html?id=` + hotel.result_object.location_id);
        hotelListElement.appendChild(hotelLinkElement);
        let hotelContainer = document.createElement("div");
        hotelContainer.setAttribute("class", "hotel");
        hotelLinkElement.appendChild(hotelContainer);
        let hotelImage = "<img src=" + hotel.result_object.photo.images.medium.url + " alt='" + hotel.result_object.name + "' class='hotel-image-small'/>";
        hotelContainer.innerHTML = hotelImage;
        let hotelDetailsContainer = document.createElement("div");
        hotelDetailsContainer.setAttribute("class", "hotel-name-rating");
        hotelContainer.appendChild(hotelDetailsContainer);
        let hotelName = hotel.result_object.name;
        if(hotelName.split(' ').length > 3)
        {
            hotelDetailsContainer.innerHTML = "<h4>"+ hotel.result_object.name +"</h4>";
            hotelDetailsContainer.innerHTML += "<div id='rating'>"+ hotel.result_object.rating +" <span class='fa fa-star checked'></span></div>";
            hotelDetailsContainer.innerHTML += "<p style='font-size: small'>"+ hotel.result_object.address +"</p>";
        }
        else {
            hotelDetailsContainer.innerHTML = "<h3>"+ hotel.result_object.name +"</h3>";
            hotelDetailsContainer.innerHTML += "<div id='rating'>"+ hotel.result_object.rating +" <span class='fa fa-star checked'></span></div>";
            hotelDetailsContainer.innerHTML += "<p>"+ hotel.result_object.address +"</p>";
        } 
    });
}

let fetchHotelListAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let result = JSON.parse(this.responseText).data;
            let locations = [];
            hotelList = result.filter(item => item.result_type == "lodging");
            hotelList.forEach(item => {
                locations.push([item.result_object.name + "<br><a href=\"detail.html?id=" + item.result_object.location_id + "\">Book Hotel</a>", item.result_object.latitude, item.result_object.longitude]);
            });
            initList(hotelList);
            initMap(locations);
            disableLoader();
        }
    });

    xhr.open("GET","https://travel-advisor.p.rapidapi.com/locations/search?lang=en_US&limit=100&query=" + urlParams.get('city'));
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "c559045339msh90cdc384a1a25bep163b62jsn9d0a28b96dc7");

    xhr.send();
}

fetchHotelListAPI();