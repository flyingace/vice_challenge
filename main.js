/* JS goes here */

//load json
//load images
    //perhaps load current image and displayed thumbnails first?

//store json in variable

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