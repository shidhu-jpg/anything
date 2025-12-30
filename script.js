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
    currentIndex = -1;

    const MAX_TRY = 10; // max images to try per product

    for (let i = 0; i < MAX_TRY; i++) {
        const img = document.createElement("img");
        img.src = `projectimg/${productId}/${i + 1}.jpg`;
        img.className = "slide";
        img.style.display = "none";
        img.draggable = false;

        loaded[i] = false;

        img.onload = () => {
            loaded[i] = true;

            // show first loaded image instantly
            if (currentIndex === -1) {
                currentIndex = i;
                img.style.display = "block";
            }
        };

        img.onerror = () => {
            // ignore missing images
        };

        images.push(img);
        wrapper.appendChild(img);
    }

    const desc = document.getElementById(`desc-${productId}`);
    document.getElementById("descriptionText").innerHTML =
        desc ? desc.innerHTML : "";

    enableSwipe(wrapper);
    modal.classList.remove("hidden");
}

// ===== SLIDE CONTROL (LOOPING) =====

function nextSlide() {
    showImage(getLoopedIndex(1));
}

function prevSlide() {
    showImage(getLoopedIndex(-1));
}

function getLoopedIndex(step) {
    let idx = currentIndex;

    for (let i = 0; i < images.length; i++) {
        idx = idx + step;

        if (idx >= images.length) idx = 0;
        if (idx < 0) idx = images.length - 1;

        if (loaded[idx]) return idx;
    }

    return currentIndex; // fallback (should not happen)
}

function showImage(nextIndex) {
    if (nextIndex === currentIndex) return;

    images[currentIndex].style.display = "none";
    images[nextIndex].style.display = "block";
    currentIndex = nextIndex;
}

// ===== SWIPE =====

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

// ===== CLOSE =====

function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}

