const listElement = document.querySelector("#link-list");
const installSection = document.querySelector("#install-section");
const installButton = document.querySelector("#install-button");
const installDialog = document.querySelector("#install-dialog");
const installMessage = document.querySelector("#install-message");
const closeDialogButton = document.querySelector("#close-dialog");
let installPromptEvent = null;

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

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
}

function showInstallGuide() {
  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);

  installMessage.innerHTML = isIOS
    ? `
      <p>iPhoneでは、Safariの共有ボタンから追加します。</p>
      <ol>
        <li>画面下の共有ボタンを押します。</li>
        <li>「ホーム画面に追加」を押します。</li>
        <li>右上の「追加」を押します。</li>
      </ol>
    `
    : `
      <p>Chromeのメニューから追加できます。</p>
      <ol>
        <li>右上のメニューを押します。</li>
        <li>「ホーム画面に追加」または「アプリをインストール」を押します。</li>
        <li>確認画面で「追加」を押します。</li>
      </ol>
    `;

  if (typeof installDialog.showModal === "function") {
    installDialog.showModal();
  }
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPromptEvent = event;
});

installButton.addEventListener("click", async () => {
  if (installPromptEvent) {
    installPromptEvent.prompt();
    await installPromptEvent.userChoice;
    installPromptEvent = null;
    return;
  }

  showInstallGuide();
});

closeDialogButton.addEventListener("click", () => {
  installDialog.close();
});

if (isStandaloneMode()) {
  installSection.hidden = true;
}

loadLinks();
