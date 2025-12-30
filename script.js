let currentIndex = 0;
let images = [];
let startX = 0;

function openProduct(productId) {
    const modal = document.getElementById("productModal");
    const wrapper = document.getElementById("swiperWrapper");

    wrapper.innerHTML = "";
    images = [];
    currentIndex = 0;

    // IMPORTANT: set correct number of images
    const TOTAL_IMAGES = 5;

    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        const img = document.createElement("img");
        img.src = `projectimg/${productId}/${i}.jpg`;
        img.className = "slide";
        img.style.display = "none";
        img.draggable = false;
        wrapper.appendChild(img);
        images.push(img);
    }

    // show first image instantly
    images[0].style.display = "block";

    // description
    const desc = document.getElementById(`desc-${productId}`);
    document.getElementById("descriptionText").innerHTML =
        desc ? desc.innerHTML : "";

    enableSwipe(wrapper);

    modal.classList.remove("hidden");
}

function enableSwipe(el) {
    el.onmousedown = e => startX = e.clientX;
    el.onmouseup = e => handleSwipe(e.clientX);

    el.ontouchstart = e => startX = e.touches[0].clientX;
    el.ontouchend = e => handleSwipe(e.changedTouches[0].clientX);
}

function handleSwipe(endX) {
    const diff = startX - endX;
    if (Math.abs(diff) < 40) return;

    images[currentIndex].style.display = "none";

    if (diff > 0 && currentIndex < images.length - 1) {
        currentIndex++;
    } else if (diff < 0 && currentIndex > 0) {
        currentIndex--;
    }

    images[currentIndex].style.display = "block";
}

// buttons still work
function nextSlide() {
    if (currentIndex < images.length - 1) {
        images[currentIndex].style.display = "none";
        currentIndex++;
        images[currentIndex].style.display = "block";
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        images[currentIndex].style.display = "none";
        currentIndex--;
        images[currentIndex].style.display = "block";
    }
}

function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}
