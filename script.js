let images = [];
let loaded = [];
let currentIndex = -1;
let startX = 0;

function openProduct(productId) {
    const modal = document.getElementById("productModal");
    const wrapper = document.getElementById("swiperWrapper");

    // HARD RESET (prevents jumps)
    wrapper.innerHTML = "";
    wrapper.style.touchAction = "none";
    wrapper.style.overflow = "hidden";

    images = [];
    loaded = [];
    currentIndex = -1;

    const MAX_TRY = 10; // safe upper bound

    for (let i = 0; i < MAX_TRY; i++) {
        const img = document.createElement("img");

        img.src = `projectimg/${productId}/${i + 1}.jpg`;
        img.className = "slide";
        img.style.display = "none";

        // 🔒 ABSOLUTE STABILITY FIXES
        img.draggable = false;
        img.style.transform = "none";
        img.style.transition = "none";

        loaded[i] = false;

        img.onload = () => {
            loaded[i] = true;

            // show FIRST loaded image only
            if (currentIndex === -1) {
                currentIndex = i;
                img.style.display = "block";
            }
        };

        img.onerror = () => {
            // ignore missing images silently
        };

        images.push(img);
        wrapper.appendChild(img);
    }

    // description
    const desc = document.getElementById(`desc-${productId}`);
    document.getElementById("descriptionText").innerHTML =
        desc ? desc.innerHTML : "";

    enableSwipe(wrapper);
    modal.classList.remove("hidden");
}

/* ===== IMAGE SWITCH (LOOPING, SAFE) ===== */

function showImage(nextIndex) {
    if (nextIndex === currentIndex) return;
    if (!images[nextIndex] || !loaded[nextIndex]) return;

    images[currentIndex].style.display = "none";
    images[nextIndex].style.display = "block";
    currentIndex = nextIndex;
}

function getLoopedIndex(step) {
    let idx = currentIndex;

    // find next loaded image only
    for (let i = 0; i < images.length; i++) {
        idx += step;

        if (idx >= images.length) idx = 0;
        if (idx < 0) idx = images.length - 1;

        if (loaded[idx]) return idx;
    }

    return currentIndex;
}

function nextSlide() {
    showImage(getLoopedIndex(1));
}

function prevSlide() {
    showImage(getLoopedIndex(-1));
}

/* ===== PURE SWIPE (NO BROWSER INTERFERENCE) ===== */

function enableSwipe(el) {
    el.onmousedown = e => {
        startX = e.clientX;
        e.preventDefault();
    };

    el.onmouseup = e => {
        handleSwipe(e.clientX);
        e.preventDefault();
    };

    el.ontouchstart = e => {
        startX = e.touches[0].clientX;
        e.preventDefault();
    };

    el.ontouchend = e => {
        handleSwipe(e.changedTouches[0].clientX);
        e.preventDefault();
    };
}

function handleSwipe(endX) {
    const diff = startX - endX;

    if (Math.abs(diff) < 40) return;

    if (diff > 0) nextSlide();
    else prevSlide();
}

/* ===== CLOSE ===== */

function closeProduct() {
    document.getElementById("productModal").classList.add("hidden");
}
