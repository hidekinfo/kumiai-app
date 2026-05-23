const listElement = document.querySelector("#link-list");

function createLinkButton(link) {
  const anchor = document.createElement("a");
  anchor.className = "link-button";
  anchor.href = link.url;
  anchor.textContent = link.label;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  return anchor;
}

async function loadLinks() {
  try {
    const response = await fetch("links.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("links.jsonを読み込めませんでした。");
    }

    const links = await response.json();

    if (!Array.isArray(links) || links.length === 0) {
      throw new Error("links.jsonにリンクが登録されていません。");
    }

    listElement.replaceChildren(...links.map(createLinkButton));
  } catch (error) {
    listElement.innerHTML = "";
    const message = document.createElement("p");
    message.className = "error";
    message.textContent = "リンク一覧を表示できませんでした。管理者にお問い合わせください。";
    listElement.append(message);
    console.error(error);
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}

loadLinks();
