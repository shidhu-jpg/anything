let currentIndex = 0;
let currentImages = [];
let startX = 0;

// CLICK → OPEN FULLSCREEN
function openProduct(productId) {
    const modal = document.getElementById("productModal");
    const wrapper = document.getElementById("swiperWrapper");

    wrapper.innerHTML = "";
    currentImages = [];
    currentIndex = 0;

    const TOTAL_IMAGES = 5; // adjust if needed

    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        const img = document.createElement("img");
        img.src = `projectimg/${productId}/${i}.jpg`;
        img.className = "slide";
        img.draggable = false;
        img.style.display = "none";
        wrapper.appendChild(img);
        currentImages.push(img);
    }

    // show first image immediately
    currentImages[0].style.display = "block";

    // description
    const desc = document.getElementById(`desc-${productId}`);
    document.getElementById("descriptionText").innerHTML =
        desc ? desc.innerHTML : "";

    enableSwipe(wrapper);

    modal.classList.remove("hidden");
}

// SWIPE LOGIC
function enableSwipe(el) {
    el.ontouchstart = e => startX = e.touches[0].clientX;
    el.ontouchend = e => handleSwipe(e.changedTouches[0].clientX);

    el.onmousedown = e => startX = e.clientX;
    el.onmouseup = e => handleSwipe(e.clientX);
}

function handleSwipe(endX) {
    const diff = startX - endX;
    if (Math.abs(diff) < 40) return;

    currentImages[currentIndex].style.display = "none";

    if (diff > 0 && currentIndex < currentImages.length - 1) {
        currentIndex++;
    } else if (diff < 0 && currentIndex > 0) {
        currentIndex--;
    }

    currentImages[currentIndex].style.display = "block";
}

// CLOSE
function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}
