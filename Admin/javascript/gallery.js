const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
let modalCaption = document.getElementById("modal-caption");
let modalDate = document.getElementById("modal-date");
const close = document.querySelector(".close");

function closeModal() {
  imageModal.style.display = "none";
}

async function deletePost(id) {
  const token = localStorage.getItem("token");

  if (!token) {
    alertify.set("notifier", "position", "top-right");
    alertify.error("Please log in to create a course.");
    return;
  }

  const idString = String(id);
  const imgItemToRemove = document.querySelector(
    `.img_item[data-id="${idString}"]`
  );

  try {
    alertify.confirm(
      "Confirmation",
      "Are you sure you want to delete this post?",
      async () => {
        const response = await fetch(
          `https://garb-prawn.cyclic.app/api/post/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.ok) {
          console.log(`Post with ID ${id} deleted successfully.`);

          if (imgItemToRemove) {
            imgItemToRemove.remove();
          } else {
            console.error(
              `Corresponding imgItem not found for post with ID ${id}.`
            );
          }
        } else {
          console.error(`Failed to delete post with ID ${id}.`);
        }
      },
      () => {}
    );
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

async function populateGallery() {
  try {
    const response = await fetch("https://garb-prawn.cyclic.app/api/post/all");
    const products = await response.json();
    const imageGallery = document.getElementById("imageGallery");

    if (!imageGallery) {
      console.error("Image gallery not found");
      return;
    }

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
      imgItem.setAttribute("data-id", String(product._id));

      const img = document.createElement("img");
      img.src = product.imageUrl || "";
      img.alt = product.caption;

      const deleteIcon = document.createElement("span");
      deleteIcon.classList.add("delete-icon");
      deleteIcon.innerHTML = "&#x2716;";

      imgItem.appendChild(img);
      imgItem.appendChild(deleteIcon);

      const postDate = new Date(product.createDateTime).toDateString();

      imgItem.addEventListener("click", () => {
        modalImage.src = img.src;
        modalCaption.textContent = product.caption;
        modalDate.textContent = postDate;
        imageModal.style.display = "block";
      });

      deleteIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = product._id;
        if (id) {
          deletePost(id);
        } else {
          console.error("Undefined ID when trying to delete post.");
        }
      });

      imageGallery.appendChild(imgItem);
    });
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
}

populateGallery();

close.addEventListener("click", () => {
  closeModal();
});

window.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeModal();
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(
      "https://garb-prawn.cyclic.app/api/notification/all"
    );
    const notifications = await response.json();

    const newsContainer = document.getElementById("newsContainer");
    const marqueeElement = newsContainer.querySelector("marquee");
    const uls = document.createElement("ul");

    notifications.forEach((notification) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      const datenews = document.createElement("div");
      datenews.setAttribute("class", datenews);

      anchor.href = notification.newsUrl;
      anchor.textContent = notification.news;
      datenews.className = "datenews";
      anchor.appendChild(datenews);
      listItem.appendChild(anchor);
      uls.appendChild(listItem);
      marqueeElement.appendChild(uls);
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
});
