let currentSlide = 0;
let currentImages = [];

function openProduct(id) {
    document.getElementById("productModal").classList.remove("hidden");

    // Load images
    const wrapper = document.getElementById("swiperWrapper");
    wrapper.innerHTML = "";
    currentImages = [];

    let i = 1;
    while (true) {
        const imgPath = `products/${id}/${i}.jpg`;
        const img = new Image();
        img.src = imgPath;

        img.onerror = () => {};
        img.onload = () => {
            img.className = "slide";
            wrapper.appendChild(img);
            currentImages.push(img);
            updateSlide();
        };

        if (i > 10) break; // safety limit
        i++;
    }

    // Load manual description
    const desc = document.getElementById("desc-" + id);
    document.getElementById("descriptionText").innerHTML =
        desc ? desc.innerHTML : "No description added.";

    currentSlide = 0;
}

function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}

function updateSlide() {
    currentImages.forEach((img, index) => {
        img.style.display = index === currentSlide ? "block" : "none";
    });
}

function nextSlide() {
    if (currentImages.length === 0) return;
    currentSlide = (currentSlide + 1) % currentImages.length;
    updateSlide();
}

function prevSlide() {
    if (currentImages.length === 0) return;
    currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length;
    updateSlide();
}
