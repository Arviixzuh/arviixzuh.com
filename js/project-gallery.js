class ProjectGallery extends HTMLElement {
  connectedCallback() {
    const folder = this.dataset.folder;
    const title = this.dataset.title;
    const count = Number(this.dataset.count);

    if (!folder || !title || !Number.isInteger(count) || count < 1) {
      throw new Error("Invalid project-gallery configuration.");
    }

    const grid = document.createElement("div");
    grid.className = "grid grid-cols-2 sm:grid-cols-3 gap-2";

    for (let index = 1; index <= count; index += 1) {
      const wrapper = document.createElement("div");
      const image = document.createElement("img");
      image.src = `../assets/img/gallery/${encodeURIComponent(folder)}/${encodeURIComponent(folder)}_${index}.png`;
      image.alt = `${title} ${index}`;
      image.loading = "lazy";
      image.className =
        "w-full aspect-video object-cover border border-line hover:border-reiPupil cursor-pointer transition-all";
      image.addEventListener("error", () => wrapper.remove(), { once: true });
      image.addEventListener("click", () => openLightbox(image.src));
      wrapper.append(image);
      grid.append(wrapper);
    }

    this.replaceChildren(grid);
  }
}

function openLightbox(src) {
  let lightbox = document.getElementById("project-lightbox");

  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "project-lightbox";
    lightbox.className =
      "fixed inset-0 z-[100] bg-black/90 items-center justify-center p-4 cursor-pointer";
    lightbox.style.display = "none";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image preview");

    const image = document.createElement("img");
    image.id = "project-lightbox-image";
    image.className = "max-w-full max-h-full rounded-md";
    image.alt = "";
    lightbox.append(image);
    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
    document.body.append(lightbox);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") lightbox.style.display = "none";
    });
  }

  document.getElementById("project-lightbox-image").src = src;
  lightbox.style.display = "flex";
}

customElements.define("project-gallery", ProjectGallery);
