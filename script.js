let currentIndex = 0;
let currentImages = [];
let startX = 0;
let endX = 0;

// OPEN PRODUCT
function openProduct(productId) {
    const swiperWrapper = document.getElementById("swiperWrapper");
    swiperWrapper.innerHTML = "";
    currentImages = [];
    currentIndex = 0;

    const TOTAL_IMAGES = 5; // change if needed

    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        const img = document.createElement("img");
        img.src = `projectimg/${productId}/${i}.jpg`;
        img.className = "slide";
        img.draggable = false; // IMPORTANT
        swiperWrapper.appendChild(img);
        currentImages.push(img);
    }

    showSlide(0);

    // description
    const desc = document.getElementById(`desc-${productId}`);
    document.getElementById("descriptionText").innerHTML =
        desc ? desc.innerHTML : "";

    addSwipe(swiperWrapper);

    document.getElementById("productModal").classList.remove("hidden");
}

// SHOW IMAGE (NO BLANK)
function showSlide(index) {
    currentImages.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
    });
}

// NEXT / PREV
function nextSlide() {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        showSlide(currentIndex);
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
    }
}

// PURE SWIPE LOGIC
function addSwipe(element) {
    element.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    element.addEventListener("touchend", e => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    // mouse swipe (desktop)
    element.addEventListener("mousedown", e => {
        startX = e.clientX;
    });

    element.addEventListener("mouseup", e => {
        endX = e.clientX;
        handleSwipe();
    });
}

function handleSwipe() {
    const diff = startX - endX;

    if (Math.abs(diff) < 40) return; // prevents accidental swipe

    if (diff > 0) {
        nextSlide(); // swipe left
    } else {
        prevSlide(); // swipe right

