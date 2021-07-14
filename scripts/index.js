let viewMore = () => {
    let viewMoreButtonElement = document.getElementById("view-more-button");
    if (viewMoreButtonElement.innerText == "View More") {
        document.getElementById("view-more-city-cards").style.display = "block";
        viewMoreButtonElement.innerText = "View Less";
    }
    else {
        document.getElementById("view-more-city-cards").style.display = "none";
        viewMoreButtonElement.innerText = "View More";
    }
}