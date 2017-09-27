//load json
//load images
//perhaps load current image and displayed thumbnails first?

//fetch the data
//when it loads load it into a variable

//store json in variable
const showsRequest = './shows.json';
let showsData;

const mainImageContainer = document.querySelector('.main-image');
const episodeCount = document.querySelector('.episode-count');

fetch(showsRequest)
    .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
    })
    .then((json) => { handleJSONResponse(json) })
    .catch((error) => { console.log(error) });

function handleJSONResponse(json) {
    showsData = json;
    loadShows(json);
    loadThumbnails(json);
    addEventListeners();
    updateUI();
}

function loadShows(showData) {
    let allShowsHTML = '';
    const allShowsContainer = document.querySelector('.all-shows-container');

    showData.forEach(function(show) {
        allShowsHTML +=
            `<div class="show-container" id="showId${show.id}">
                <img src=".${show.product_image_url}" class="main-image">
                <p class="episode-count">${show.episodes} Episodes</p>
                <p class="show-title">${show.title}</p>
            </div>`
    });

    allShowsContainer.innerHTML = allShowsHTML;
}

//TODO: Could be broken down into separate functions
function loadThumbnails(showData) {
    let thumbsHTML = '';
    const thumbsContainer = document.querySelector('.thumbs');

    thumbsContainer.addEventListener('click', function(evt) {
        onThumbClick(evt);
    });

    showData.forEach(function(show) {
        thumbsHTML += `<img src=".${show.product_image_url}" class="show-thumb" id="thumbId${show.id}">`
    });

    thumbsContainer.innerHTML = thumbsHTML;
}

function addEventListeners() {
    window.addEventListener('popstate', function(e) {
        const idNum = extractIdFromParams(e.target.location.search);
        updateUI(idNum);
    });
}

function extractIdFromParams(searchParams) {
    const params = new URLSearchParams(searchParams);

    return params.get('id');
}

function deselectAllShows() {
    const allShows = document.querySelectorAll('.show-container');
    allShows.forEach(function(show) {
        show.classList.remove('current');
    })
}

function displaySelectedShow(idNum) {
    const selectedShow = document.querySelector(`#showId${idNum}`);
    selectedShow.classList.add('current');
}

function fadeAllThumbs() {

}

function highlightSelectedThumb(idNum) {

}


function onThumbClick(evt) {
    const idNum = evt.target.id.replace('thumbId', '');
    const idParam = `?id=${idNum}`;
    updateHistory(idParam);
    updateUI(idNum);
}

function updateHistory(idParam) {
    history.pushState('index.html','',idParam);
}

function updateUI(idNum) {
    const id = (idNum) ? idNum : 1;
    deselectAllShows();
    displaySelectedShow(id);
    fadeAllThumbs();
    highlightSelectedThumb(id);
}

/** Setup **/
//load current main image first
//then thumbs
//then remaining images

//write main image into fields with relevant data

//write each thumbnail into place with listeners

//on thumbnail click the window.history is updated with pushState();

//add listener for change in URL & params
//handler loads corresponding data

//same function will have to be called onload to check for params


//when a thumbnail is clicked
//if it is not the currently selected thumbnail
//the window history is altered with pushState
//the thumbnail's appearance changes

//when the URL params change
//the id in the URL is noted
//the corresponding main image and data is loaded into the page
//all thumbs are returned to unselected state
//the corresponding thumb is highlighted
//if the corresponding thumb is not visible it is made visible and put in the 2nd place in the screen
//if it is one of the last three thumbs then the last four thumbs are visible and it is selected whereever it falls
