/**
 * Request data from a passed endpoint and handle the response
 */
function requestData(dataURL) {
    fetch(dataURL)
        .then((response) => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then((json) => {
            handleJSONResponse(json)
        })
        .catch((error) => {
            console.log(error)
        });
}

/**
 * Call several functions to initiate populating the page using the received
 * JSON response and call others to handle other background processes
 * @param json
 */
function handleJSONResponse(json) {
    loadShows(json);
    loadThumbnails(json);
    addEventListeners();
    updateUIConditionally(json.length);
}

/**
 * Parsing the showData JSON, a 'show-container' div is created for each
 * show and the corresponding data is used to construct children inside the
 * container. Then all of the show-containers are inserted into a div in the DOM
 * @param showData
 */
function loadShows(showData) {
    let allShowsHTML = '';
    const allShowsContainer = document.querySelector('.all-shows-container');

    showData.forEach(function (show) {
        allShowsHTML +=
            `<div class="show-container" id="showId${show.id}">
                <img src=".${show.product_image_url}" class="main-image">
                <p class="episode-count">${show.episodes} Episodes</p>
                <p class="show-title">${show.title}</p>
            </div>`
    });

    allShowsContainer.innerHTML = allShowsHTML;
}

/**
 * Parsing the showData JSON HTML for thumbnail images are created
 * for each show and that HTML is inserted into a div in the DOM
 * @param showData
 */
function loadThumbnails(showData) {
    let thumbsHTML = '';
    const thumbsContainer = document.querySelector('.thumbs');

    showData.forEach(function (show) {
        thumbsHTML += `<img src=".${show.product_image_url}" class="show-thumb" id="thumbId${show.id}">`
    });

    thumbsContainer.innerHTML = thumbsHTML;
}

/**
 * Add event listeners
 */
function addEventListeners() {
    window.addEventListener('popstate', function (e) {
        updateUI(extractIdFromParams());
    });

    document.querySelector('.thumbs').addEventListener('click', function (evt) {
        onThumbClick(evt);
    });
}

/**
 * Hacky stop-gap measure to insure thumbnail images are loaded before
 * scrollIntoView is called else auto-scrolling won't work on initial page load
 * @param jsonLength
 */
function updateUIConditionally(jsonLength) {
    const domCheck = setInterval(function () {
        const thumbsContainer = document.querySelectorAll('.show-thumb');
        if (thumbsContainer.length === jsonLength) {
            updateUI(extractIdFromParams());
            clearInterval(domCheck);
            console.log('butt');
        }
    }, 100);

}

/**
 * Extract the id of the show to be displayed from the URL parameters
 * @returns {V|*}
 */
function extractIdFromParams() {
    const params = new URLSearchParams(window.location.search);

    return params.get('id');
}

/**
 * Remove 'current' class from currently displayed show
 */
function deselectPreviousShow() {
    const previousShow = document.querySelector('.show-container.current');
    if (previousShow) {
        previousShow.classList.remove('current')
    }
}

/**
 * Add 'current' class to selected show
 * @param idNum
 */
function displaySelectedShow(idNum) {
    document.querySelector(`#showId${idNum}`).classList.add('current');
}

/**
 * Remove 'current' class from currently highlighted thumbnail
 */
function fadePreviousThumb() {
    const previousThumb = document.querySelector('.show-thumb.current');
    if (previousThumb) {
        previousThumb.classList.remove('current')
    }
}

/**
 * Add 'current' class to selected show's thumbnail
 * @param idNum
 */
function highlightSelectedThumb(idNum) {
    document.querySelector(`#thumbId${idNum}`).classList.add('current');

}

/**
 * Calculating actualThumbOffset here is necessary
 * because flexbox child elements seem to register
 * their offsetLeft relative to the parent flex container's
 * offsetParent and not to the parent flex container
 * @param idNum
 */
function moveSelectedThumbIntoView(idNum) {
    const selectedThumb = document.querySelector(`#thumbId${idNum}`);
    const thumbs = document.querySelector('.thumbs');
    const actualThumbOffset = selectedThumb.offsetLeft - thumbs.offsetLeft;

    if (!isThumbInView(selectedThumb, thumbs, actualThumbOffset)) {
        thumbs.scrollLeft = actualThumbOffset;
    }
}

/**
 * determine whether the thumbnail for the currently selected show
 * is already visible (this prevents the thumbnail from being shifted
 * unnecessarily by the scrollLeft calculation in moveSelectedThumbIntoView())
 * @param thumb
 * @param container
 * @param actualOffset
 * @returns {boolean}
 */
function isThumbInView(thumb, container, actualOffset) {
    return ((container.scrollLeft <= actualOffset) &&
        (actualOffset + thumb.width - container.scrollLeft <= container.offsetWidth));
}

/**
 * When a thumbnail is clicked extract the id of the show from the thumb's id,
 * and pass the id to updateHistory() and updateUI()
 * @param evt
 */
function onThumbClick(evt) {
    const idNum = evt.target.id.replace('thumbId', '');
    updateHistory(idNum);
    updateUI(idNum);
}

/**
 * Update the browser's history, adding a query parameter,
 * 'id' with a value corresponding to the show's id
 * @param idNum
 */
function updateHistory(idNum) {
    const idParam = `?id=${idNum}`;
    history.pushState('index.html', '', idParam);
}

/**
 * Update the UI following selection of a new show
 * @param idNum
 */
function updateUI(idNum) {
    const id = (idNum) ? idNum : 1;
    deselectPreviousShow();
    displaySelectedShow(id);
    fadePreviousThumb();
    highlightSelectedThumb(id);
    moveSelectedThumbIntoView(id);
}

requestData('./shows.json');