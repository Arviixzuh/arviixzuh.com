class ProjectAside extends HTMLElement {
  connectedCallback() {
    let links;
    let technologies;

    try {
      links = JSON.parse(this.dataset.links ?? "[]");
      technologies = JSON.parse(this.dataset.technologies ?? "[]");
    } catch (error) {
      throw new Error("Invalid project-aside JSON configuration.", { cause: error });
    }

    if (!Array.isArray(links) || !Array.isArray(technologies)) {
      throw new Error("Invalid project-aside configuration.");
    }

    const aside = document.createElement("aside");
    aside.className = "lg:col-span-3 space-y-4";
    aside.append(this.createLinksCard(links, this.dataset.note));
    aside.append(this.createTechnologiesCard(technologies));
    this.replaceWith(aside);
  }

  createLinksCard(links, note) {
    const card = document.createElement("div");
    card.className = "web-box";
    card.innerHTML =
      '<div class="web-box-header"><span>~ LINKS ~</span></div><div class="p-3 bg-panel text-sm font-mono"><div class="space-y-2"></div></div>';

    const content = card.querySelector(".space-y-2");
    if (note) {
      const description = document.createElement("div");
      description.className = "text-dim text-[13px]";
      description.textContent = note;
      content.append(description);
    }

    for (const item of links) {
      if (!item || typeof item.href !== "string" || typeof item.label !== "string") {
        throw new Error("Invalid project link in project-aside configuration.");
      }

      const url = new URL(item.href, window.location.href);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error(`Unsupported project link protocol: ${url.protocol}`);
      }

      const anchor = document.createElement("a");
      anchor.href = url.href;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.className =
        "flex items-center justify-between p-1.5 bg-card border border-reiHair hover:bg-reiHair hover:text-black transition-all";

      const label = document.createElement("span");
      const icon = document.createElement("i");
      icon.className = item.icon;
      label.append(icon, document.createTextNode(` ${item.label}`));

      const externalIcon = document.createElement("i");
      externalIcon.className = "fa-solid fa-arrow-up-right-from-square text-[13px]";
      anchor.append(label, externalIcon);
      content.append(anchor);
    }

    return card;
  }

  createTechnologiesCard(technologies) {
    const card = document.createElement("div");
    card.className = "web-box";
    card.innerHTML =
      '<div class="web-box-header"><span>~ TECHNOLOGIES ~</span></div><div class="p-3 bg-panel text-sm font-mono"><div class="flex flex-wrap gap-1"></div></div>';

    const badges = card.querySelector(".flex.flex-wrap");
    for (const technology of technologies) {
      if (typeof technology !== "string" || technology.length === 0) {
        throw new Error("Invalid technology in project-aside configuration.");
      }

      const badge = document.createElement("span");
      badge.className = "bg-chip text-reiLight px-2 py-0.5 border border-line text-[13px]";
      badge.textContent = technology;
      badges.append(badge);
    }

    return card;
  }
}

customElements.define("project-aside", ProjectAside);
