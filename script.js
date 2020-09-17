const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const photoCount = 30;
const apiKey = "NNMn0h365LY3PDQJDWV2Pq3IjgBOWlas3xtUTyuhsRI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}`;

//Check if all images have been loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

// Create elements for links and photos, add them to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function forEach object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        // Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener that checks when each image is finished loading
        img.addEventListener("load", imageLoaded);
        // Put <img> inside <a>, then put both into imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

//If scroll position is near the bottom of the page, then load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready) {
        ready = false;
        getPhotos();
    } else {

    }
});

//Invoke function
getPhotos();