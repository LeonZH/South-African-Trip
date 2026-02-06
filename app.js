const STORAGE_KEYS = {
  flight: "sa_trip_doc_flight",
  hertz: "sa_trip_doc_hertz",
  hotel: "sa_trip_doc_hotel",
  remarks: "sa_trip_event_remarks",
};

const DATE_START = "2026-02-12";
const DATE_END = "2026-02-22";
const DEFAULT_DATE = "2026-02-13";
const SOUTH_AFRICA_CENTER = "-30.5595,22.9375";
const WEEKDAY_CN = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const importedDocs = {
  flight: null,
  hertz: null,
  hotel: null,
};

const remarksByDate = {};

const PLAN_BY_DATE = {
  "2026-02-13": {
    title: "伊丽莎白港 -> Addo 半日自驾",
    subtitle: "到达、取车、补给、入园、半天巡游，一屏掌握",
    mapEmbed: "https://www.google.com/maps?q=-33.9849,25.6173&z=9&output=embed",
    routeActions: [
      {
        label: "一键打开全天路线",
        href: "https://www.google.com/maps/dir/?api=1&origin=-33.9849,25.6173&destination=-33.4830,25.7499&travelmode=driving&waypoints=-33.9836,25.6659",
      },
      {
        label: "查看营地开闭园时间",
        href: "https://www.google.com/maps/search/?api=1&query=Addo+Main+Camp+Gate+Hours",
      },
    ],
    warnings: [
      "入园后先看 Main Camp 当日公告板：封路、施工、动物活动区会实时调整。",
      "避免进入任何 4x4-only / No Entry 标识道路；普通轿车只走官方开放主路。",
      "雨后不要走低洼积水路段；若遇临时封闭，立即原路返回并改走主环线。",
      "严格遵守园区限速与关门时间，天黑前回到营地。",
    ],
    itinerary: [
      {
        id: 1,
        time: "11:00",
        title: "抵达伊丽莎白港（Gqeberha）机场",
        place: "Chief Dawid Stuurman International Airport",
        coords: "-33.9849,25.6173",
        note: "下机后优先取行李，确认手机网络与离线地图。",
        docKey: "flight",
        docLabel: "机票资料（本地）",
        subItems: [],
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
        subItems: [],
      },
      {
        id: 3,
        time: "12:15",
        title: "前往 Walmer Park Shopping Centre（采购 + 午餐）",
        place: "Walmer Park Shopping Centre",
        coords: "-33.9876,25.5564",
        note: "地址：Main Rd, Walmer, Gqeberha, 6070, South Africa",
        subItems: [
          {
            name: "TODO：Woolworths Food 采购",
            detail: "先补给饮用水、零食、车上应急用品。",
          },
          {
            name: "午餐餐厅：John Dory's Walmer Park",
            detail: "强烈推荐：家庭氛围 & 多样化。",
          },
          {
            name: "午餐餐厅：Mugg & Bean Walmer Park",
            detail: "最稳妥的选择：西式简餐 & 咖啡。",
          },
          {
            name: "午餐餐厅：Panarottis Walmer Park",
            detail: "意式风味：披萨 & 意面。",
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
        subItems: [
          {
            name: "路线与到达提醒",
            detail:
              "官方提醒：别走 R335（Motherwell），走 N2 经 Colchester。\n在 16:00 之前赶到营地。",
          },
        ],
      },
      {
        id: 5,
        time: "15:30-18:00",
        title: "园内半天游览线路（自驾）",
        place: "Main Camp -> Hapoor Loop -> Domkrag Dam -> Main Camp",
        coords: "-33.4830,25.7499",
        note: "傍晚是动物活动高峰，控制车速，预留返营地时间。",
        subItems: [
          {
            name: "16:00-16:30｜办理入住 + 迅速补给",
            detail:
              "直接去营地 Reception：办入住、拿地图/当天 sightings board（有时会写近期动物热点）。\n顺手把晚上要用的东西（外套/头灯/驱蚊/零食水）拿出来，避免天黑后翻行李像考古。\n和 Reception 预定第二天早上日出和傍晚日落的巡游。",
          },
          {
            name: "16:30-18:20｜傍晚自驾：围绕水源点慢慢蹲守式观赏",
            detail:
              "玩法：不追车、不追热点，就围着几个离主营地不远、视野开阔的水坑/坝区慢慢绕。\n逻辑：傍晚温度下去后，动物更愿意出来喝水/活动；第一天刚到，体力也更友好。",
          },
          {
            name: "18:20-19:00｜回营地吃晚饭/休整",
            detail:
              "主营地大门 19:00 关（官方营地页写明 Main gate 07:00-19:00，SANParks）。\n若有卡点进门风险：有住宿预订的住客，关门后到 22:00 前仍可在告知 Reception 后进出（SANParks），但不要当日常操作。",
          },
          {
            name: "19:30-21:00｜夜间营地内观兽：看灯光水坑 + 早睡",
            detail:
              "Addo 主营地里就能看动物（很多人会在观景区等它们来喝水）。\n第一晚建议早点睡：第二天想看得多，早起比晚熬更划算。",
          },
        ],
      },
    ],
  },
};

function parseDateParts(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return { year, month, day };
}

function formatDateString(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildDateRange(start, end) {
  const startParts = parseDateParts(start);
  const endParts = parseDateParts(end);
  const cursor = new Date(startParts.year, startParts.month - 1, startParts.day);
  const endDate = new Date(endParts.year, endParts.month - 1, endParts.day);

  const dates = [];
  while (cursor <= endDate) {
    dates.push(formatDateString(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

const DATE_OPTIONS = buildDateRange(DATE_START, DATE_END);

function formatDateLabel(dateStr) {
  const { year, month, day } = parseDateParts(dateStr);
  const dateObj = new Date(year, month - 1, day);
  return `${dateStr}（${WEEKDAY_CN[dateObj.getDay()]}）`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function mapsSearchUrl(coords, label) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${coords} (${label})`)}`;
}

function createPlaceholderPlan() {
  return {
    title: "南非行程（待补充）",
    subtitle: "这一天行程暂未填写，后续慢慢补充。",
    mapEmbed: `https://www.google.com/maps?q=${SOUTH_AFRICA_CENTER}&z=5&output=embed`,
    routeActions: [],
    warnings: [],
    itinerary: Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      time: "--:--",
      title: `待补充行程 ${index + 1}`,
      place: "待补充地点",
      coords: SOUTH_AFRICA_CENTER,
      note: "留空（待后续补充）",
      subItems: [],
    })),
  };
}

function getPlanForDate(dateStr) {
  if (PLAN_BY_DATE[dateStr]) return PLAN_BY_DATE[dateStr];
  return createPlaceholderPlan();
}

let activeDate = DATE_OPTIONS.includes(DEFAULT_DATE) ? DEFAULT_DATE : DATE_OPTIONS[0];

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

function ensureDateRemarks(dateStr) {
  if (!remarksByDate[dateStr] || typeof remarksByDate[dateStr] !== "object" || Array.isArray(remarksByDate[dateStr])) {
    remarksByDate[dateStr] = {};
  }
  return remarksByDate[dateStr];
}

function ensureRemarkText(dateStr, eventId) {
  const bucket = ensureDateRemarks(dateStr);
  const key = String(eventId);
  if (typeof bucket[key] !== "string") {
    bucket[key] = "";
  }
  return bucket[key];
}

function normalizeLegacyRemarkValue(value) {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";

  return value
    .filter((row) => row && typeof row.text === "string")
    .map((row) => row.text.trim())
    .filter(Boolean)
    .join("\n");
}

function loadRemarks() {
  const raw = localStorage.getItem(STORAGE_KEYS.remarks);
  if (!raw) {
    DATE_OPTIONS.forEach((dateStr) => {
      remarksByDate[dateStr] = {};
    });
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    let source = {};

    if (parsed && typeof parsed === "object" && parsed.byDate && typeof parsed.byDate === "object") {
      source = parsed.byDate;
    } else if (parsed && typeof parsed === "object") {
      const keys = Object.keys(parsed);
      const hasDateKey = keys.some((key) => /^\d{4}-\d{2}-\d{2}$/.test(key));

      if (hasDateKey) {
        source = parsed;
      } else {
        // Migration from old structure: { eventId: "remark" }
        source = { "2026-02-13": {} };
        keys.forEach((eventId) => {
          const value = normalizeLegacyRemarkValue(parsed[eventId]);
          if (value) source["2026-02-13"][eventId] = value;
        });
      }
    }

    DATE_OPTIONS.forEach((dateStr) => {
      const incoming = source[dateStr];
      if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) {
        remarksByDate[dateStr] = {};
        return;
      }

      remarksByDate[dateStr] = {};
      Object.entries(incoming).forEach(([eventId, value]) => {
        const text = normalizeLegacyRemarkValue(value);
        if (typeof text === "string") {
          remarksByDate[dateStr][String(eventId)] = text;
        }
      });
    });
  } catch {
    DATE_OPTIONS.forEach((dateStr) => {
      remarksByDate[dateStr] = {};
    });
  }
}

function saveRemarks() {
  localStorage.setItem(STORAGE_KEYS.remarks, JSON.stringify({ byDate: remarksByDate }));
}

function buildLocalDocAction(docType, label) {
  const doc = importedDocs[docType];
  if (!doc) {
    return `<button class="btn" disabled>${label}（未导入）</button>`;
  }
  return `<button class="btn local-doc-btn" data-doc-type="${docType}">${label}</button>`;
}

function buildSubItems(subItems) {
  if (!subItems || subItems.length === 0) {
    return '<p class="mini-empty">留空（待后续补充）</p>';
  }

  return subItems
    .map((item) => {
      const openBtn = item.url
        ? `<a class="btn" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">打开地图</a>`
        : "";

      const detail = item.detail ? `<p class="mini-detail">${escapeHtml(item.detail)}</p>` : "";

      return `
        <div class="mini-card">
          <div class="mini-title">${escapeHtml(item.name)}</div>
          ${detail}
          ${openBtn}
        </div>
      `;
    })
    .join("");
}

function buildRemarks(dateStr, eventId) {
  const text = ensureRemarkText(dateStr, eventId);

  return `
    <div class="remarks-head">
      <span class="remarks-title">备注</span>
    </div>
    <div class="remark-editor" contenteditable="true" role="textbox" aria-multiline="true" data-date="${dateStr}" data-event-id="${eventId}" data-placeholder="点击这里输入备注">${escapeHtml(text)}</div>
    <div class="remark-hint">
      点击备注区域即可编辑，输入会自动保存在本地。
    </div>
  `;
}

function renderHeader(dateStr, plan) {
  document.getElementById("currentDateLabel").textContent = formatDateLabel(dateStr);
  document.getElementById("currentTitle").textContent = plan.title;
  document.getElementById("currentSubtitle").textContent = plan.subtitle;
  document.title = `南非旅行助手 · ${dateStr}`;
}

function renderRouteActions(plan) {
  const routeEl = document.getElementById("routeActions");
  if (!plan.routeActions || plan.routeActions.length === 0) {
    routeEl.innerHTML = '<button class="btn" disabled>留空（待后续补充）</button>';
    return;
  }

  routeEl.innerHTML = plan.routeActions
    .map(
      (action) =>
        `<a class="btn" href="${action.href}" target="_blank" rel="noopener">${escapeHtml(action.label)}</a>`
    )
    .join("");
}

function renderMap(plan) {
  const frame = document.getElementById("mapFrame");
  frame.src = plan.mapEmbed;
  renderRouteActions(plan);
}

function renderTimeline(dateStr, plan) {
  const timelineEl = document.getElementById("timeline");
  timelineEl.innerHTML = "";

  plan.itinerary.forEach((item) => {
    const localDocAction = item.docKey ? buildLocalDocAction(item.docKey, item.docLabel) : "";

    const mapButtons = item.coords
      ? `
        <a class="btn" href="${mapsSearchUrl(item.coords, item.place)}" target="_blank" rel="noopener">地图定位</a>
        <a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.coords)}" target="_blank" rel="noopener">导航到这里</a>
      `
      : '<button class="btn" disabled>地图定位</button><button class="btn" disabled>导航到这里</button>';

    const li = document.createElement("li");
    li.className = "event-card";
    li.innerHTML = `
      <div class="event-head">
        <span class="event-index">${item.id}.</span>
        <span class="time">${escapeHtml(item.time)}</span>
        <span class="place">${escapeHtml(item.place)}</span>
      </div>
      <div class="event-title">${escapeHtml(item.title)}</div>
      <p class="note">${escapeHtml(item.note)}</p>
      <div class="item-actions">
        ${mapButtons}
        ${localDocAction}
      </div>
      <div class="subitems-wrap">
        ${buildSubItems(item.subItems)}
      </div>
      <div class="remarks-wrap">
        ${buildRemarks(dateStr, item.id)}
      </div>
    `;
    timelineEl.appendChild(li);
  });
}

function renderWarnings(plan) {
  const warningEl = document.getElementById("warnings");
  warningEl.innerHTML = "";

  if (!plan.warnings || plan.warnings.length === 0) {
    const li = document.createElement("li");
    li.className = "warning-empty";
    li.textContent = "留空（待后续补充）";
    warningEl.appendChild(li);
    return;
  }

  plan.warnings.forEach((text) => {
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

function renderDateOptions() {
  const dateSelect = document.getElementById("dateSelect");
  dateSelect.innerHTML = DATE_OPTIONS.map(
    (dateStr) => `<option value="${dateStr}">${formatDateLabel(dateStr)}</option>`
  ).join("");
}

function updateDateSwitcherState() {
  const dateSelect = document.getElementById("dateSelect");
  const prevBtn = document.getElementById("prevDateBtn");
  const nextBtn = document.getElementById("nextDateBtn");

  const index = DATE_OPTIONS.indexOf(activeDate);
  dateSelect.value = activeDate;
  prevBtn.disabled = index <= 0;
  nextBtn.disabled = index >= DATE_OPTIONS.length - 1;
}

function renderActiveDate() {
  const plan = getPlanForDate(activeDate);
  renderHeader(activeDate, plan);
  renderMap(plan);
  renderTimeline(activeDate, plan);
  renderWarnings(plan);
  updateDateSwitcherState();
}

function setActiveDate(dateStr, syncHash = true) {
  if (!DATE_OPTIONS.includes(dateStr)) return;
  if (activeDate !== dateStr) {
    activeDate = dateStr;
  }

  renderActiveDate();

  if (syncHash && window.location.hash !== `#${dateStr}`) {
    window.location.hash = dateStr;
  }
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

function bindDateSwitcher() {
  document.getElementById("dateSelect").addEventListener("change", (event) => {
    setActiveDate(event.target.value);
  });

  document.getElementById("prevDateBtn").addEventListener("click", () => {
    const index = DATE_OPTIONS.indexOf(activeDate);
    if (index <= 0) return;
    setActiveDate(DATE_OPTIONS[index - 1]);
  });

  document.getElementById("nextDateBtn").addEventListener("click", () => {
    const index = DATE_OPTIONS.indexOf(activeDate);
    if (index >= DATE_OPTIONS.length - 1) return;
    setActiveDate(DATE_OPTIONS[index + 1]);
  });

  window.addEventListener("hashchange", () => {
    const hashDate = window.location.hash.replace("#", "");
    if (!DATE_OPTIONS.includes(hashDate)) return;
    if (hashDate === activeDate) return;
    setActiveDate(hashDate, false);
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
    }
  });
}

function bindRemarkEditing() {
  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("remark-editor")) return;

    const dateStr = target.dataset.date;
    const eventId = target.dataset.eventId;
    if (!dateStr || !eventId) return;

    ensureDateRemarks(dateStr)[eventId] = target.innerText.replace(/\r\n?/g, "\n");
    saveRemarks();
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
loadRemarks();
bindInputs();
bindDateSwitcher();
bindActionClicks();
bindRemarkEditing();
renderDateOptions();
renderDocs();

const initialHashDate = window.location.hash.replace("#", "");
if (DATE_OPTIONS.includes(initialHashDate)) {
  activeDate = initialHashDate;
}

setActiveDate(activeDate);
