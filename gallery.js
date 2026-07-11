const galleryContentElement = document.querySelector("#galleryContent");

const galleryImages = [
    {
        src: "Images/Nature.jpg",
        alt: "Nature",
        caption: "Nature"
    },
    {
        src: "Images/Bloody_Stream.jpg",
        alt: "Bloody Stream",
        caption: "Bloody Stream"
    },
    {
        src: "Images/Hungarian_Dance.jpg",
        alt: "Hungarian Dance",
        caption: "Hungarian Dance"
    },
    {
        src: "Images/Canzoni_Preferite.jpg",
        alt: "Canzoni Preferite",
        caption: "Canzoni Preferite"
    },
    {
        src: "Images/CharlieCatMeowPFPSquare.png",
        alt: "CharlieCatMeow",
        caption: "CharlieCatMeow"
    }
];

function loadGalleryContent() {
    if (!galleryContentElement) return;

    galleryContentElement.innerHTML = "";

    galleryImages.forEach((image) => {
        const item = document.createElement("div");
        item.classList.add("gallery_image_container");

        const img = document.createElement("img");
        img.classList.add("gallery_image");
        img.src = image.src;
        img.alt = image.alt;

        galleryContentElement.appendChild(item);
        item.appendChild(img);
    });
}

loadGalleryContent();