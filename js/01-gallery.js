import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
let instance;

function createGalleryItem(item) {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery__item");

  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.href = item.original;

  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery__image");
  galleryImage.src = item.preview;
  galleryImage.alt = item.description;
  galleryImage.setAttribute("data-source", item.original);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
}

function openModal(src, alt) {
  const instance = basicLightbox.create(`
    <img src="${src}" alt="${alt}" width="800" height="600">
`);

  instance.show();

  window.addEventListener("keydown", (event) =>
    closeModalOnEscape(event, instance)
  );
}

function closeModalOnEscape(event, instance) {
  if (event.key === "Escape" && instance) {
    instance.close();
    window.removeEventListener("keydown", closeModalOnEscape);
  }
}

galleryItems.forEach((item) => {
  const galleryItem = createGalleryItem(item);
  galleryList.appendChild(galleryItem);

  galleryItem.addEventListener("click", (e) => {
    e.preventDefault();
    const source = e.target.getAttribute("data-source");
    const alt = e.target.alt;
    openModal(source, alt);
  });
});

console.log(galleryItems);
