// script.js

document.querySelector(".js-go").addEventListener('click', function() {
    var input = document.querySelector("input").value;
    fetchGifs(input); 
});

document.querySelector(".js-userinput").addEventListener('keyup', function(e) {
    var input = document.querySelector("input").value;

    if (e.which === 13) {
        fetchGifs(input); 
    }
});

function fetchGifs(searchTerm) {
    var url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${GIPHY_API_KEY}&limit=5`;

    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET', url);
    GiphyAJAXCall.send();

    GiphyAJAXCall.addEventListener('load', function(e) {
        var data = e.target.response;
        pushToDOM(data); 
    });
}

function pushToDOM(input) {
    var response = JSON.parse(input);
    var imageUrls = response.data;

    var container = document.querySelector(".js-container");
    container.innerHTML = ""; 

    var currentIndex = 0;

    function showGif() {
        if (currentIndex < imageUrls.length) {
            var src = imageUrls[currentIndex].images.fixed_height.url;

            var imgElement = document.createElement("img");
            imgElement.src = src;
            imgElement.classList.add("container-image");

            container.appendChild(imgElement);

            currentIndex++;
            setTimeout(showGif, 1000); 
        }
    }

    showGif(); 
}
