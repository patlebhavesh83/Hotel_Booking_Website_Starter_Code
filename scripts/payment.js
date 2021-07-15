let urlParams = new URLSearchParams(window.location.search);

let fetchAPI = () => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let result = JSON.parse(this.responseText).data[0];

            let toDate = new Date(urlParams.get('toDate'));
            let fromDate = new Date(urlParams.get('fromDate'));
            let days = (toDate - fromDate)/(24*60*60*1000);

            document.getElementById("hotel-image").src = result.photo.images.medium.url;
            document.getElementById("hotel-name").innerText = result.name;
            document.getElementById("ranking").innerHTML = "<b>" + result.ranking + "</b>";
            document.getElementById("address").innerText = result.address;
            document.getElementById("name").innerHTML = "<strong class='heading'>Name:</strong>&nbsp;" + urlParams.get('name');
            document.getElementById("adult").innerHTML = "<strong class='heading'>Number of Adults:</strong>&nbsp;" + urlParams.get('adult');
            document.getElementById("from-date").innerHTML = "<strong class='heading'>Check-in Date:</strong>&nbsp;" + urlParams.get('fromDate');
            document.getElementById("to-date").innerHTML =  "<strong class='heading'>Check-out Date:</strong>&nbsp;" + urlParams.get('toDate');
            document.getElementById("tariff").innerHTML = "<strong class='heading'>Tariff Breakdown:</strong>&nbsp;Rs.1000 x " + urlParams.get('adult') + " Adults x " + days + " Nights";
            document.getElementById("amount").innerHTML = "<strong class='heading'>Total Amount:</strong>&nbsp;" + urlParams.get('price');
            disableLoader();
        }
    });

    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/get-details?lang=en_US&location_id=" + urlParams.get('id'));
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "c559045339msh90cdc384a1a25bep163b62jsn9d0a28b96dc7");

    xhr.send();
}
fetchAPI();
if (!isLogin || isLogin === 'false') {
    document.getElementById('pay-now-button').disabled = true;
} else if (isLogin === 'true') {
document.getElementById('pay-now-button').disabled = false;
}

let payNow = e => {
	e.preventDefault();
	alert('Hi your booking is successfull!');
};