let images = [];
let loaded = [];
let currentIndex = 0;
let startX = 0;

function openProduct(productId) {
    const modal = document.getElementById("productModal");
    const wrapper = document.getElementById("swiperWrapper");

    wrapper.innerHTML = "";
    images = [];
    loaded = [];
    currentIndex = 0;

    const MAX_TRY = 10;

    for (let i = 1; i <= MAX_TRY; i++) {
        const img = document.createElement("img");
        img.src = `projectimg/${productId}/${i}.jpg`;
        img.className = "slide";
        img.style.display = "none";
        img.draggable = false;

        loaded[i] = false;

        img.onload = () => {
            loaded[i] = true;

            // show first image immediately
            if (images.length === 0) {
                img.style.display = "block";
                currentIndex = i;
            }
        };

        img.onerror = () => {};

        wrapper.appendChild(img);
        images[i] = img;
    }

    const desc = document.getElementById(`desc-${productId}`);
    document.getElementById("descriptionText").innerHTML =
        desc ? desc.innerHTML : "";

    enableSwipe(wrapper);
    modal.classList.remove("hidden");
}

function showImage(nextIndex) {
    if (!loaded[nextIndex]) return;

    images[currentIndex].style.display = "none";
    images[nextIndex].style.display = "block";
    currentIndex = nextIndex;
}

function nextSlide() {
    showImage(currentIndex + 1);
}

function prevSlide() {
    showImage(currentIndex - 1);
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

    if (diff > 0) nextSlide();
    else prevSlide();
}

function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}
