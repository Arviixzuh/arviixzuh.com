const includePlaceholders = [...document.querySelectorAll("[data-include]")];

await Promise.all(
  includePlaceholders.map(async (placeholder) => {
    const url = placeholder.dataset.include;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
    }

    const template = document.createElement("template");
    template.innerHTML = await response.text();

    for (const element of template.content.querySelectorAll("[data-project-title]")) {
      element.textContent = placeholder.dataset.title ?? "";
    }

    const period = template.content.querySelector("[data-project-period]");
    if (period) period.textContent = placeholder.dataset.period ?? "";

    const footerText = template.content.querySelector("[data-footer-text]");
    if (footerText) footerText.textContent = placeholder.dataset.text ?? "";

    placeholder.replaceWith(template.content);
  }),
);
