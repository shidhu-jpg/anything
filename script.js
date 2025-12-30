let currentIndex = 0;
let currentImages = [];

// OPEN PRODUCT
function openProduct(productId) {
    const swiperWrapper = document.getElementById("swiperWrapper");
    swiperWrapper.innerHTML = "";
    currentImages = [];
    currentIndex = 0;

    // CHANGE THIS IF IMAGE COUNT IS DIFFERENT
    const TOTAL_IMAGES = 5;

    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        const img = document.createElement("img");
        img.src = `projectimg/${productId}/${i}.jpg`;
        img.className = "slide";
        swiperWrapper.appendChild(img);
        currentImages.push(img);
    }

    showSlide(0);

    // Description
    const desc = document.getElementById(`desc-${productId}`);
    document.getElementById("descriptionText").innerHTML =
        desc ? desc.innerHTML : "No description";

    document.getElementById("productModal").classList.remove("hidden");
}

// SHOW SLIDE
function showSlide(index) {
    currentImages.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
    });
}

// NEXT
function nextSlide() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showSlide(currentIndex);
}

// PREVIOUS
function prevSlide() {
    currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
    showSlide(currentIndex);
}

// CLOSE
function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}

