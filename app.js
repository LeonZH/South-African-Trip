const STORAGE_KEYS = {
  flight: "sa_trip_doc_flight",
  hertz: "sa_trip_doc_hertz",
  hotel: "sa_trip_doc_hotel",
  eventSubItems: "sa_trip_event_subitems",
};

const importedDocs = {
  flight: null,
  hertz: null,
  hotel: null,
};

const eventSubItems = {};

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
    defaultSubItems: [
      {
        name: "午餐推荐区域",
        url: "https://www.google.com/maps/search/?api=1&query=restaurants+Summerstrand+Gqeberha",
      },
      {
        name: "超市推荐区域",
        url: "https://www.google.com/maps/search/?api=1&query=supermarket+Walmer+Gqeberha",
      },
    ],
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
    defaultSubItems: [
      {
        name: "半天环线导航",
        url: "https://www.google.com/maps/dir/?api=1&origin=-33.4830,25.7499&destination=-33.4830,25.7499&travelmode=driving&waypoints=-33.4349,25.7429|-33.4308,25.7517",
      },
    ],
  },
];

const warnings = [
  "入园后先看 Main Camp 当日公告板：封路、施工、动物活动区会实时调整。",
  "避免进入任何 4x4-only / No Entry 标识道路；普通轿车只走官方开放主路。",
  "雨后不要走低洼积水路段；若遇临时封闭，立即原路返回并改走主环线。",
  "严格遵守园区限速与关门时间，天黑前回到营地。",
];

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function mapsSearchUrl(coords, label) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coords + ` (${label})`)}`;
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
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

    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  } catch (error) {
    alert("打开文件失败，请重新导入该 PDF");
    console.error(error);
  }
}

function ensureSubItems(eventId) {
  if (!eventSubItems[eventId]) {
    const event = itinerary.find((item) => item.id === eventId);
    eventSubItems[eventId] = event?.defaultSubItems ? [...event.defaultSubItems] : [];
  }
  return eventSubItems[eventId];
}

function saveSubItems() {
  localStorage.setItem(STORAGE_KEYS.eventSubItems, JSON.stringify(eventSubItems));
}

function loadSubItems() {
  const raw = localStorage.getItem(STORAGE_KEYS.eventSubItems);
  if (!raw) {
    itinerary.forEach((item) => ensureSubItems(item.id));
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    itinerary.forEach((item) => {
      const incoming = parsed?.[item.id];
      if (Array.isArray(incoming)) {
        eventSubItems[item.id] = incoming
          .filter((row) => row && typeof row.name === "string" && typeof row.url === "string")
          .map((row) => ({ name: row.name, url: row.url }));
      } else {
        ensureSubItems(item.id);
      }
    });
  } catch {
    itinerary.forEach((item) => ensureSubItems(item.id));
  }
}

function addSubItem(eventId) {
  const name = prompt("请输入小卡片名称（例如：午餐推荐区域）");
  if (!name) return;

  const url = prompt("请输入 Google Maps 链接（例如：https://maps.app.goo.gl/...）");
  if (!url) return;

  if (!isValidHttpUrl(url)) {
    alert("链接格式无效，请填写 http/https 链接");
    return;
  }

  const items = ensureSubItems(eventId);
  items.push({ name: name.trim(), url: url.trim() });
  saveSubItems();
  renderTimeline();
}

function editSubItem(eventId, index) {
  const items = ensureSubItems(eventId);
  const current = items[index];
  if (!current) return;

  const nextName = prompt("修改小卡片名称", current.name);
  if (!nextName) return;

  const nextUrl = prompt("修改 Google Maps 链接", current.url);
  if (!nextUrl) return;

  if (!isValidHttpUrl(nextUrl)) {
    alert("链接格式无效，请填写 http/https 链接");
    return;
  }

  items[index] = { name: nextName.trim(), url: nextUrl.trim() };
  saveSubItems();
  renderTimeline();
}

function deleteSubItem(eventId, index) {
  const items = ensureSubItems(eventId);
  if (!items[index]) return;

  const ok = confirm("确认删除这个小卡片？");
  if (!ok) return;

  items.splice(index, 1);
  saveSubItems();
  renderTimeline();
}

function buildLocalDocAction(docType, label) {
  const doc = importedDocs[docType];
  if (!doc) {
    return `<button class="btn" disabled>${label}（未导入）</button>`;
  }
  return `<button class="btn local-doc-btn" data-doc-type="${docType}">${label}</button>`;
}

function buildSubItems(eventId) {
  const items = ensureSubItems(eventId);

  const cards = items
    .map((item, index) => {
      return `
        <div class="mini-card">
          <div class="mini-title">${escapeHtml(item.name)}</div>
          <div class="mini-actions">
            <button class="btn mini-open" data-event-id="${eventId}" data-index="${index}">打开</button>
            <button class="btn mini-edit" data-event-id="${eventId}" data-index="${index}">编辑</button>
            <button class="btn mini-delete" data-event-id="${eventId}" data-index="${index}">删除</button>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="mini-list">
      ${cards || '<p class="mini-empty">暂无小卡片，点击下方“添加小卡片”</p>'}
    </div>
    <button class="btn mini-add" data-event-id="${eventId}">+ 添加小卡片</button>
  `;
}

function renderTimeline() {
  const timelineEl = document.getElementById("timeline");
  timelineEl.innerHTML = "";

  itinerary.forEach((item) => {
    const localDocAction = item.docKey ? buildLocalDocAction(item.docKey, item.docLabel) : "";

    const li = document.createElement("li");
    li.className = "event-card";
    li.innerHTML = `
      <div class="event-head">
        <span class="event-index">${item.id}.</span>
        <span class="time">${item.time}</span>
        <span class="place">${item.place}</span>
      </div>
      <div class="event-title">${item.title}</div>
      <p class="note">${item.note}</p>
      <div class="item-actions">
        <a class="btn" href="${mapsSearchUrl(item.coords, item.place)}" target="_blank" rel="noopener">地图定位</a>
        <a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.coords)}" target="_blank" rel="noopener">导航到这里</a>
        ${localDocAction}
      </div>
      <div class="subitems-wrap">
        ${buildSubItems(item.id)}
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
      li.innerHTML = `<button class="btn local-doc-btn" data-doc-type="${docDef.key}">${docDef.title}：${escapeHtml(doc.name)}</button>`;
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
  ["flight", "hertz", "hotel"].forEach((docType) => {
    const raw = localStorage.getItem(STORAGE_KEYS[docType]);
    if (!raw) return;

    try {
      importedDocs[docType] = JSON.parse(raw);
    } catch {
      localStorage.removeItem(STORAGE_KEYS[docType]);
      importedDocs[docType] = null;
    }
  });
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

    if (target.classList.contains("mini-add")) {
      const eventId = Number(target.dataset.eventId);
      if (!eventId) return;
      addSubItem(eventId);
      return;
    }

    if (target.classList.contains("mini-open")) {
      const eventId = Number(target.dataset.eventId);
      const index = Number(target.dataset.index);
      const items = ensureSubItems(eventId);
      const item = items[index];
      if (item?.url) openExternalUrl(item.url);
      return;
    }

    if (target.classList.contains("mini-edit")) {
      const eventId = Number(target.dataset.eventId);
      const index = Number(target.dataset.index);
      if (!eventId && eventId !== 0) return;
      if (Number.isNaN(index)) return;
      editSubItem(eventId, index);
      return;
    }

    if (target.classList.contains("mini-delete")) {
      const eventId = Number(target.dataset.eventId);
      const index = Number(target.dataset.index);
      if (!eventId && eventId !== 0) return;
      if (Number.isNaN(index)) return;
      deleteSubItem(eventId, index);
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
loadSubItems();
bindInputs();
bindActionClicks();
renderTimeline();
buildWarnings();
renderDocs();
buildRouteActions();
