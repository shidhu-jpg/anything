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
        const img = new Image();
        img.src = `projectimg/${productId}/${i}.jpg`;
        img.className = "slide";
        img.style.display = "none";
        img.draggable = false;

        loaded[i - 1] = false;

        img.onload = () => {
            loaded[i - 1] = true;
            images[i - 1] = img;
            wrapper.appendChild(img);

            // show first loaded image only once
            if (currentIndex === 0 && loaded[0]) {
                img.style.display = "block";
            }
        };

        img.onerror = () => {
            loaded[i - 1] = false;
        };
    }

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

    let nextIndex = currentIndex;

    if (diff > 0) nextIndex++;
    else nextIndex--;

    // bounds check
    if (nextIndex < 0 || nextIndex >= images.length) return;

    // 🔒 CRITICAL FIX: only switch if next image is loaded
    if (!loaded[nextIndex]) return;

    images[currentIndex].style.display = "none";
    currentIndex = nextIndex;
    images[currentIndex].style.display = "block";
}

// buttons
function nextSlide() {
    const next = currentIndex + 1;
    if (loaded[next]) {
        images[currentIndex].style.display = "none";
        currentIndex = next;
        images[currentIndex].style.display = "block";
    }
}

function prevSlide() {
    const prev = currentIndex - 1;
    if (loaded[prev]) {
        images[currentIndex].style.display = "none";
        currentIndex = prev;
        images[currentIndex].style.display = "block";
    }
}

function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}
