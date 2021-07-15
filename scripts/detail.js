let urlParams = new URLSearchParams(window.location.search);

const PRICE_PER_ROOM = 1000;
let updatePrice = () => {
    let adultElement = document.getElementById("adult");
    let totalPriceElement = document.getElementById("price");
    let toDateElement = document.getElementById("toDate");
    let fromDateElement = document.getElementById("fromDate");

    let toDateValue = new Date(toDateElement.value);
    let fromDateValue = new Date(fromDateElement.value);

    toDateElement.min = fromDateElement.value;

    let days = (toDateValue - fromDateValue)/(24*60*60*1000);
    
    if(adultElement.value && toDateElement.value && fromDateElement.value)
        totalPriceElement.value = "Rs. " + parseInt(adultElement.value)*PRICE_PER_ROOM*days;
    else
        totalPriceElement.value = "Rs.0";   

}

let fetchHotelDetailAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            
            let result = JSON.parse(this.responseText).data[0];
            
            document.getElementById("hotel-name").innerText = result.name;
            
            let amenities = result.amenities;
            let i=0;
            for(;i < Math.min(amenities.length, 10);i++) {
                let liElement = document.createElement("li"); 
                liElement.innerText = amenities[i].name;
                document.getElementById("amenities").appendChild(liElement);
            }
           
            let descriptionPara = document.createElement("h6"); 
            descriptionPara.innerHTML = result.description;
            document.getElementById("description").appendChild(descriptionPara);
            
            let rating = parseInt(result.rating);
            for(i=1;i <= rating;i++) {
                document.getElementById(i).classList.add("checked");
            }
        }
    });

    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/get-details?lang=en_US&location_id=" + urlParams.get('id'));
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "408890b1c8msh24fd9180ca7c48ep196973jsn2ac1198577b1");

    xhr.send();
}


let fetchHotelPhotosAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let carouselParentElement = document.getElementById("carousel-parent");
            let result = JSON.parse(this.responseText).data;
            let size = Math.min(result.length, 5);
            let i=0;
            for(;i < size;i++) {
                let div = document.createElement("div");
                div.classList.add("carousel-item");
                if(i == 0)
                    div.classList.add("active");
                let image = document.createElement("img");
                image.setAttribute("class", "carousel-image");
                image.classList.add("d-block");
                image.classList.add("w-100");
                image.src = result[i].images.large.url;
                div.appendChild(image);
                carouselParentElement.appendChild(div);
            }  
            disableLoader();    
        }
    });
    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/photos/list?lang=en_US&location_id=" + urlParams.get('id'));
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "c559045339msh90cdc384a1a25bep163b62jsn9d0a28b96dc7");

    xhr.send();
}

let idElement = document.getElementById("id");
idElement.value = urlParams.get('id');

fetchHotelDetailAPI();
fetchHotelPhotosAPI();