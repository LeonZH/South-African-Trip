const STORAGE_KEYS = {
  flight: "sa_trip_doc_flight",
  hertz: "sa_trip_doc_hertz",
  hotel: "sa_trip_doc_hotel",
  customMaps: "sa_trip_custom_maps",
};

const importedDocs = {
  flight: null,
  hertz: null,
  hotel: null,
};

const customMaps = {};

const itinerary = [
  {
    id: 1,
    time: "11:00",
    title: "抵达伊丽莎白港（Gqeberha）机场",
    place: "Chief Dawid Stuurman International Airport",
    coords: "-33.9849,25.6173",
    note: "下机后优先取行李，确认手机网络与离线地图。",
    docKey: "flight",
    docLabel: "机票资料（本地）",
  },
  {
    id: 2,
    time: "11:30",
    title: "Hertz 取车",
    place: "机场租车点",
    coords: "-33.9849,25.6173",
    note: "重点检查轮胎、备胎、油量、保险和紧急电话。",
    docKey: "hertz",
    docLabel: "租车资料（本地）",
  },
  {
    id: 3,
    time: "12:15",
    title: "安全区域午餐 + 超市采购",
    place: "Summerstrand / Walmer",
    coords: "-33.9836,25.6659",
    note: "建议在商圈内停留，白天行动，车内不留物品。",
  },
  {
    id: 4,
    time: "14:00",
    title: "前往 Addo Main Rest Camp",
    place: "Addo Elephant National Park Main Camp",
    coords: "-33.4830,25.7499",
    note: "车程约 1 小时 15 分；建议 15:30 前入园，避免赶关门。",
    docKey: "hotel",
    docLabel: "酒店资料（本地）",
  },
  {
    id: 5,
    time: "15:30-18:00",
    title: "园内半天游览线路（自驾）",
    place: "Main Camp -> Hapoor Loop -> Domkrag Dam -> Main Camp",
    coords: "-33.4830,25.7499",
    note: "傍晚是动物活动高峰，控制车速，预留返营地时间。",
  },
];

const warnings = [
  "入园后先看 Main Camp 当日公告板：封路、施工、动物活动区会实时调整。",
  "避免进入任何 4x4-only / No Entry 标识道路；普通轿车只走官方开放主路。",
  "雨后不要走低洼积水路段；若遇临时封闭，立即原路返回并改走主环线。",
  "严格遵守园区限速与关门时间，天黑前回到营地。",
];

function mapsSearchUrl(coords, label) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coords + ` (${label})`)}`;
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("读取文件失败"));
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl) {
  const parts = dataUrl.split(",");
  if (parts.length !== 2) throw new Error("文件数据格式错误");

  const mimeMatch = parts[0].match(/data:(.*?);base64/);
  const mime = mimeMatch ? mimeMatch[1] : "application/pdf";
  const binaryString = atob(parts[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes], { type: mime });
}

function isIosStandalone() {
  return (
    /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
    window.matchMedia("(display-mode: standalone)").matches
  );
}

function openExternalUrl(url) {
  if (isIosStandalone()) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener");
  }
}

function openLocalDoc(docType) {
  const doc = importedDocs[docType];
  if (!doc || !doc.dataUrl) {
    alert("该附件尚未导入");
    return;
  }

  try {
    const blob = dataUrlToBlob(doc.dataUrl);
    const blobUrl = URL.createObjectURL(blob);

    if (isIosStandalone()) {
      window.location.href = blobUrl;
    } else {
      window.open(blobUrl, "_blank", "noopener");
    }

    setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
  } catch (error) {
    alert("打开文件失败，请重新导入该 PDF");
    console.error(error);
  }
}

function isGoogleMapUrl(value) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return false;

    const host = url.hostname.toLowerCase();
    if (host === "maps.app.goo.gl") return true;
    if (host === "goo.gl") return true;
    if (host.endsWith("google.com") || host.endsWith("google.co.za")) return true;
    return false;
  } catch {
    return false;
  }
}

function loadCustomMaps() {
  const raw = localStorage.getItem(STORAGE_KEYS.customMaps);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      itinerary.forEach((item) => {
        const row = parsed[item.id];
        if (!row) return;
        customMaps[item.id] = {
          name: typeof row.name === "string" ? row.name : "",
          url: typeof row.url === "string" ? row.url : "",
        };
      });
    }
  } catch {
    localStorage.removeItem(STORAGE_KEYS.customMaps);
  }
}

function saveCustomMapsFromInputs() {
  const next = {};

  for (const item of itinerary) {
    const nameInput = document.getElementById(`customName-${item.id}`);
    const urlInput = document.getElementById(`customUrl-${item.id}`);

    const name = nameInput ? nameInput.value.trim() : "";
    const url = urlInput ? urlInput.value.trim() : "";

    if (url && !isGoogleMapUrl(url)) {
      alert(`第 ${item.id} 条链接格式无效，请填写 Google Maps 链接，例如 maps.app.goo.gl`);
      if (urlInput) urlInput.focus();
      return;
    }

    next[item.id] = { name, url };
  }

  localStorage.setItem(STORAGE_KEYS.customMaps, JSON.stringify(next));

  Object.keys(customMaps).forEach((key) => delete customMaps[key]);
  Object.entries(next).forEach(([id, value]) => {
    customMaps[id] = value;
  });

  renderTimeline();
  alert("已保存 1-5 目的地补充");
}

function clearCustomMaps() {
  localStorage.removeItem(STORAGE_KEYS.customMaps);
  Object.keys(customMaps).forEach((key) => delete customMaps[key]);
  renderCustomMapEditor();
  renderTimeline();
}

function renderCustomMapEditor() {
  const root = document.getElementById("customMapEditor");
  root.innerHTML = "";

  itinerary.forEach((item) => {
    const current = customMaps[item.id] || { name: "", url: "" };
    const row = document.createElement("div");
    row.className = "editor-row";

    row.innerHTML = `
      <div class="editor-index">${item.id}</div>
      <label>
        目的地名称
        <input id="customName-${item.id}" type="text" value="${current.name.replace(/"/g, "&quot;")}" placeholder="例如：午餐推荐区域" />
      </label>
      <label>
        Google Maps 链接
        <input id="customUrl-${item.id}" type="url" value="${current.url.replace(/"/g, "&quot;")}" placeholder="https://maps.app.goo.gl/..." />
      </label>
    `;

    root.appendChild(row);
  });
}

async function onFileImport(docType, file) {
  if (!file) return;
  if (file.type !== "application/pdf") {
    alert("请选择 PDF 文件");
    return;
  }

  const dataUrl = await readAsDataUrl(file);
  const payload = { name: file.name, dataUrl };

  try {
    localStorage.setItem(STORAGE_KEYS[docType], JSON.stringify(payload));
  } catch (error) {
    alert("文件过大或存储空间不足，请改用更小 PDF 或清理浏览器网站数据");
    throw error;
  }

  importedDocs[docType] = payload;
  renderDocs();
  renderTimeline();
}

function loadImportedDocs() {
  Object.entries(STORAGE_KEYS).forEach(([docType, key]) => {
    if (!["flight", "hertz", "hotel"].includes(docType)) return;
    const raw = localStorage.getItem(key);
    if (!raw) return;

    try {
      importedDocs[docType] = JSON.parse(raw);
    } catch {
      localStorage.removeItem(key);
      importedDocs[docType] = null;
    }
  });
}

function buildLocalDocAction(docType, label) {
  const doc = importedDocs[docType];
  if (!doc) {
    return `<button class="btn" disabled>${label}（未导入）</button>`;
  }
  return `<button class="btn local-doc-btn" data-doc-type="${docType}">${label}</button>`;
}

function buildCustomMapAction(itemId) {
  const row = customMaps[itemId];
  if (!row || !row.name || !row.url) {
    return `<button class="btn" disabled>自定义目的地（待填写）</button>`;
  }

  return `<button class="btn custom-map-btn" data-map-url="${row.url.replace(/"/g, "&quot;")}">${row.name}（Google Maps）</button>`;
}

function renderTimeline() {
  const timelineEl = document.getElementById("timeline");
  timelineEl.innerHTML = "";

  itinerary.forEach((item) => {
    const mapActions = `
      <a class="btn" href="${mapsSearchUrl(item.coords, item.place)}" target="_blank" rel="noopener">地图定位</a>
      <a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.coords)}" target="_blank" rel="noopener">导航到这里</a>
    `;

    const localDocAction = item.docKey ? buildLocalDocAction(item.docKey, item.docLabel) : "";
    const customMapAction = buildCustomMapAction(item.id);

    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <span class="time">${item.time}</span>
        <span class="place">${item.place}</span>
      </div>
      <div>${item.title}</div>
      <p class="note">${item.note}</p>
      <div class="item-actions">
        ${mapActions}
        ${localDocAction}
        ${customMapAction}
      </div>
    `;
    timelineEl.appendChild(li);
  });
}

function buildWarnings() {
  const warningEl = document.getElementById("warnings");
  warningEl.innerHTML = "";

  warnings.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    warningEl.appendChild(li);
  });
}

function renderDocs() {
  const docsEl = document.getElementById("docs");
  docsEl.innerHTML = "";

  const docDefs = [
    { key: "flight", title: "2/13 航班资料" },
    { key: "hertz", title: "Hertz 租车资料（2/13-2/21）" },
    { key: "hotel", title: "Addo 酒店资料（2/13-2/15）" },
  ];

  docDefs.forEach((docDef) => {
    const li = document.createElement("li");
    const doc = importedDocs[docDef.key];

    if (!doc) {
      li.textContent = `${docDef.title}：未导入`;
    } else {
      li.innerHTML = `<button class="btn local-doc-btn" data-doc-type="${docDef.key}">${docDef.title}：${doc.name}</button>`;
    }

    docsEl.appendChild(li);
  });
}

function buildRouteActions() {
  const routeEl = document.getElementById("routeActions");
  const route =
    "https://www.google.com/maps/dir/?api=1&origin=-33.9849,25.6173&destination=-33.4830,25.7499&travelmode=driving&waypoints=-33.9836,25.6659";

  routeEl.innerHTML = `
    <a class="btn" href="${route}" target="_blank" rel="noopener">一键打开全天路线</a>
    <a class="btn" href="https://www.google.com/maps/search/?api=1&query=Addo+Main+Camp+Gate+Hours" target="_blank" rel="noopener">查看营地开闭园时间</a>
  `;
}

function bindInputs() {
  document.getElementById("flightInput").addEventListener("change", (event) => {
    onFileImport("flight", event.target.files[0]).catch((error) => alert(error.message));
  });
  document.getElementById("hertzInput").addEventListener("change", (event) => {
    onFileImport("hertz", event.target.files[0]).catch((error) => alert(error.message));
  });
  document.getElementById("hotelInput").addEventListener("change", (event) => {
    onFileImport("hotel", event.target.files[0]).catch((error) => alert(error.message));
  });

  document.getElementById("saveCustomMapsBtn").addEventListener("click", saveCustomMapsFromInputs);
  document.getElementById("clearCustomMapsBtn").addEventListener("click", clearCustomMaps);
}

function bindActionClicks() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.classList.contains("local-doc-btn")) {
      const docType = target.dataset.docType;
      if (!docType) return;
      openLocalDoc(docType);
      return;
    }

    if (target.classList.contains("custom-map-btn")) {
      const url = target.dataset.mapUrl;
      if (!url) return;
      openExternalUrl(url);
    }
  });
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((err) => {
      console.error("Service worker register failed", err);
    });
  });
}

loadImportedDocs();
loadCustomMaps();
bindInputs();
bindActionClicks();
renderCustomMapEditor();
renderTimeline();
buildWarnings();
renderDocs();
buildRouteActions();
