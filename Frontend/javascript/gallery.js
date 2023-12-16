const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");
const modalDate = document.getElementById("modal-date");
const close = document.querySelector(".close");

function closeModal() {
  imageModal.style.display = "none";
}

async function populateGallery() {
  try {
    const response = await fetch("https://garb-prawn.cyclic.app/api/post/all");
    const products = await response.json();
    const imageGallery = document.getElementById("imageGallery");

    // Sort products by createDateTime in descending order
    products.sort(
      (a, b) => new Date(b.createDateTime) - new Date(a.createDateTime)
    );

    products.forEach((product, index) => {
      const imgItem = document.createElement("div");
      imgItem.classList.add(
        "img_item",
        `row-${(index % 2) + 1}`,
        `col-${(index % 2) + 1}`
      );

      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.caption;

      imgItem.appendChild(img);
      const postDate = new Date(product.createDateTime).toDateString();
      // Add an event listener to each image item
      imgItem.addEventListener("click", () => {
        modalImage.src = img.src;
        modalCaption.textContent = product.caption;
        modalDate.textContent = postDate;
        imageModal.style.display = "block";
      });

      imageGallery.appendChild(imgItem);
    });
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
}

// Call the function to populate the gallery
populateGallery();

close.addEventListener("click", () => {
  closeModal();
});

window.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeModal();
  }
});
