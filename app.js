const STORAGE_KEYS = {
  flight: "sa_trip_doc_flight",
  hertz: "sa_trip_doc_hertz",
  hotel: "sa_trip_doc_hotel",
  itineraryDocs: "sa_trip_itinerary_docs_by_date",
  remarks: "sa_trip_event_remarks",
};

const DATE_START = "2026-02-12";
const DATE_END = "2026-02-22";
const DEFAULT_DATE = "2026-02-12";
const SOUTH_AFRICA_CENTER = "-30.5595,22.9375";
const WEEKDAY_CN = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const importedDocs = {
  flight: null,
  hertz: null,
  hotel: null,
};
const MULTI_DOC_IMPORT_DATES = new Set(["2026-02-12", "2026-02-14"]);

const remarksByDate = {};
const itineraryDocsByDate = {};

const PLAN_BY_DATE = {
  "2026-02-12": {
    title: "约翰内斯堡抵达日（轻量、安全优先）",
    subtitle: "落地缓冲 + 酒店接送半日团，减少变量，稳定开局",
    extraRouteActions: [
      {
        label: "Premier Hotel O.R. Tambo",
        href: "https://www.google.com/maps/search/?api=1&query=Premier+Hotel+O.R.+Tambo",
      },
      {
        label: "Kubatana 餐厅（酒店内）",
        href: "https://www.premierhotels.co.za/or-tambo-airport/restaurant",
      },
      {
        label: "Emperors Palace（备选晚餐）",
        href: "https://www.google.com/maps/search/?api=1&query=Emperors+Palace+Johannesburg",
      },
    ],
    warnings: [
      "硬约束：06:10 抵达 JNB；酒店 14:00 后入住；半日团 13:00 开始（酒店接送）。",
      "机场到酒店可用免费 Shuttle：约每 30 分钟一班，运行时段约 05:00-23:45（以酒店当日安排为准）。",
      "接送车可能 12:00-12:30 到；建议 12:00 前就在酒店大堂等候，午餐不要排太远。",
      "首日策略：白天、跟团、封闭空间活动优先；避免夜间外出闲逛和高暴露步行。",
      "贵重物品尽量留酒店，仅随身携带证件复印件、少量现金/卡、手机与防晒补水。",
    ],
    itinerary: [
      {
        id: 1,
        time: "06:10-08:00",
        title: "抵达 JNB + 出关 + 机场内早餐",
        place: "O.R. Tambo International Airport (JNB)",
        coords: "-26.1367,28.2410",
        note: "先完成过关、取行李；随后按酒店指引步行到 Shuttle 乘车点，再前往酒店。",
        subItems: [
          {
            name: "酒店 Shuttle 班次与识别",
            detail:
              "酒店免费接驳车约每 30 分钟一班，常见运行时段 05:00-23:45；车辆有 “Premier Hotel OR Tambo” 标识。",
          },
          {
            name: "国际到达后步行指引",
            detail:
              "出到达口后按 “Public Transport” 方向，过最近人行横道到 Car Hire Foyer，穿过后到 Shuttle pick-up point。",
          },
          {
            name: "Shuttle Terminal 位置",
            detail: "位于 Intercontinental Hotel 后方区域，现场可向酒店人员确认。",
          },
        ],
      },
      {
        id: 2,
        time: "08:00-09:00",
        title: "乘酒店 Shuttle 到店 + 寄存行李 + 确认接送细节",
        place: "Premier Hotel O.R. Tambo",
        coords: "-26.1398,28.2269",
        note: "出关后通过酒店 Shuttle 到店；先寄存行李并询问能否提前入住，确认中午团接送集合点。",
        subItems: [
          {
            name: "酒店定位",
            detail: "73 Gladiator St, Rhodesfield, Kempton Park",
            url: "https://www.google.com/maps/search/?api=1&query=73+Gladiator+St+Rhodesfield+Kempton+Park",
          },
          {
            name: "International Arrivals 到上车点路线（1-3）",
            detail:
              "1) 出关/取行李后走出到达大厅。2) 出门左转。3) 走到最近 pedestrian crossing（人行横道）。",
          },
          {
            name: "International Arrivals 到上车点路线（4-7）",
            detail:
              "4) 按 “Public Transport” 指示。5) 穿过人行横道进入 Car Hire Foyer。6) 沿 Car Hire Foyer 穿过到室外 Shuttle pick-up point。7) 找有 “Premier Hotel O R Tambo” Logo 的车辆。",
          },
          {
            name: "Terminal 方位补充",
            detail:
              "酒店说明 shuttle terminal 在 Intercontinental Hotel 后方；按 Public Transport -> Car Hire Foyer -> Shuttle pick-up point 线路走最稳。",
          },
          {
            name: "找不到时直接问",
            detail:
              "Where is the shuttle pick-up point for Premier Hotel OR Tambo?",
          },
        ],
      },
      {
        id: 3,
        time: "09:00-11:30",
        title: "低消耗休整：补觉/泳池边休息",
        place: "Premier Hotel O.R. Tambo",
        coords: "-26.1398,28.2269",
        note: "把时差和夜航疲劳先处理掉，为下午半日团留体力。",
        subItems: [],
      },
      {
        id: 4,
        time: "11:30-12:15",
        title: "午餐（优先酒店内）",
        place: "Kubatana Restaurant",
        coords: "-26.1398,28.2269",
        note: "按你的最新安排：到店后在酒店内午餐，并在 12:15 前结束，减少接送前通勤不确定性。",
        subItems: [
          {
            name: "Kubatana（推荐）",
            detail: "最省心方案：就在酒店内，吃完直接回大堂等车。",
            url: "https://www.premierhotels.co.za/or-tambo-airport/restaurant",
          },
          {
            name: "Emperors Palace（备选）",
            detail: "封闭式综合体，餐厅多；但会增加来回时间变量。",
            url: "https://www.google.com/maps/search/?api=1&query=Emperors+Palace+Johannesburg",
          },
        ],
      },
      {
        id: 5,
        time: "12:00-13:00",
        title: "提前在酒店大堂等接送车",
        place: "Premier Hotel O.R. Tambo Lobby",
        coords: "-26.1398,28.2269",
        note: "预订提示会在开始前 30-60 分钟接人，建议 12:00 就位。",
        subItems: [],
      },
      {
        id: 6,
        time: "13:00-18:00",
        title: "半日团：Soweto + Apartheid Museum",
        place: "Soweto / Apartheid Museum",
        coords: "-26.2364,28.0107",
        note: "跟团出行、门票与接送已含；时间会受路况影响。",
        subItems: [
          {
            name: "索韦托区域定位",
            detail: "用于团后回顾路线，不建议首日自行深度穿行。",
            url: "https://www.google.com/maps/search/?api=1&query=Soweto+Johannesburg",
          },
          {
            name: "Apartheid Museum",
            detail: "行程核心站点之一，按导游节奏参观。",
            url: "https://www.google.com/maps/search/?api=1&query=Apartheid+Museum+Johannesburg",
          },
        ],
      },
      {
        id: 7,
        time: "18:00-20:00",
        title: "回酒店晚餐 + 早睡",
        place: "Premier Hotel O.R. Tambo",
        coords: "-26.1398,28.2269",
        note: "首日以恢复体能为主，压低夜间活动风险，为次日安排留余量。",
        subItems: [],
      },
    ],
  },
  "2026-02-13": {
    title: "伊丽莎白港 -> Addo 半日自驾",
    subtitle: "到达、取车、补给、入园、半天巡游，一屏掌握",
    extraRouteActions: [
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
            url: "https://www.google.com/maps/search/?api=1&query=Woolworths+Food+Walmer+Park+Shopping+Centre+Gqeberha",
          },
          {
            name: "午餐餐厅：John Dory's Walmer Park",
            detail: "强烈推荐：家庭氛围 & 多样化。",
            url: "https://www.google.com/maps/search/?api=1&query=John+Dory%27s+Walmer+Park+Gqeberha",
          },
          {
            name: "午餐餐厅：Mugg & Bean Walmer Park",
            detail: "最稳妥的选择：西式简餐 & 咖啡。",
            url: "https://www.google.com/maps/search/?api=1&query=Mugg+%26+Bean+Walmer+Park+Gqeberha",
          },
          {
            name: "午餐餐厅：Panarottis Walmer Park",
            detail: "意式风味：披萨 & 意面。",
            url: "https://www.google.com/maps/search/?api=1&query=Panarottis+Walmer+Park+Gqeberha",
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
  "2026-02-14": {
    title: "Addo 国家公园整日（早中晚三段）",
    subtitle: "早上找热区，中午回血并锁定活动，下午黄金 90 分钟蹲守水源点",
    extraRouteActions: [
      {
        label: "SANParks 官方地图入口",
        href: "https://www.sanparks.org/parks/addo-elephant/travel/maps",
      },
      {
        label: "Addo Visitors Map（PDF）",
        href: "https://www.sanparks.org/wp-content/uploads/2025/02/Addo-Visitors-Map.pdf",
      },
    ],
    warnings: [
      "2 月参考门时间：Game Area（Residents）05:30-18:30；Park Entrance 常见为 07:00-18:00。以当天 gate 公告为准。",
      "园内限速 40km/h，严禁下车/探身；仅在指定 Lookout 可下车且风险自负。",
      "只走游客道路，NO ENTRY 不进；严禁喂食、无人机、摩托车与噪音扰动。",
      "当天中午就把 Sundowner / Night Drive 订掉，别等傍晚碰运气。",
    ],
    itinerary: [
      {
        id: 1,
        time: "05:30-08:30",
        title: "日出前后黄金段：官方 Sunrise Drive / 或第一波自驾",
        place: "Addo Main Camp Gate",
        coords: "-33.4830,25.7499",
        note: "把“05:30 自驾”改为门时间自适应：按当天 Gate Times 执行，不和门岗硬碰硬。",
        subItems: [
          {
            name: "Gate Times 先确认",
            detail: "先看当天公告板与 gate 规则，决定 Sunrise Drive 还是第一波自驾。",
            url: "https://www.sanparks.org/wp-content/uploads/2025/02/Addo-Visitors-Map.pdf",
          },
          {
            name: "Sunrise Drive 咨询/预订",
            detail: "若名额允许，优先官方日出 drive；否则直接第一波入主游览区。",
            url: "https://www.google.com/maps/search/?api=1&query=Addo+Main+Camp+Reception",
          },
        ],
      },
      {
        id: 2,
        time: "08:30-12:00",
        title: "上午主线：环线扫面 -> 水源点蹲守 -> 小范围复绕",
        place: "Hapoor / Domkrag / Gwarrie 一带",
        coords: "-33.4349,25.7429",
        note: "先跑环线建立热区地图，再锁定 1-2 个水源点每点停 15-30 分钟。",
        subItems: [
          {
            name: "环线扫面（低车流期）",
            detail: "先 Loop 再回主路，快速判断当日热点在哪片区域。",
            url: "https://www.google.com/maps/search/?api=1&query=Addo+Elephant+National+Park+Loop+Road",
          },
          {
            name: "Hapoor Dam 蹲守",
            detail: "常被提到的象群高概率点，别频繁挪车。",
            url: "https://www.google.com/maps/search/?api=1&query=Hapoor+Dam+Addo+Elephant+National+Park",
          },
          {
            name: "Domkrag Dam / Gwarrie Pan 复绕",
            detail: "靠近主营地区域，适合短线反复刷。",
            url: "https://www.google.com/maps/search/?api=1&query=Domkrag+Dam+Addo+Elephant+National+Park",
          },
        ],
      },
      {
        id: 3,
        time: "12:00-15:00",
        title: "中午回营地：午休 + 补给 + 锁定晚间活动",
        place: "Addo Main Camp",
        coords: "-33.4830,25.7499",
        note: "中午不是空档，是“把下午和夜间成功率拉满”的操作窗口。",
        subItems: [
          {
            name: "Reception 立即订活动",
            detail: "把 Sundowner / Night Drive 直接订掉，避免临时无位。",
            url: "https://www.google.com/maps/search/?api=1&query=Addo+Main+Camp+Reception",
          },
          {
            name: "营地补给与体力管理",
            detail: "午餐、补水、充电、整理夜间衣物，避免傍晚手忙脚乱。",
            url: "https://www.google.com/maps/search/?api=1&query=Addo+Main+Camp+Shop",
          },
        ],
      },
      {
        id: 4,
        time: "15:00-19:00",
        title: "下午黄金档：先找热点，再把最后 90 分钟留给水源点",
        place: "Domkrag / Zuurkop / Algoa Bay 方向",
        coords: "-33.4308,25.7517",
        note: "真正“出片”的往往是日落前 90 分钟蹲守，而不是一直移动。",
        subItems: [
          {
            name: "Lookout 观察点（指定可下车）",
            detail: "Domkrag、Zuurkop、Kadouw、Spekboom、Algoa Bay（按规则短停）。",
            url: "https://www.google.com/maps/search/?api=1&query=Zuurkop+Lookout+Addo+Elephant+National+Park",
          },
          {
            name: "最后 90 分钟蹲守策略",
            detail: "锁 1-2 个水源点，不追热点，熄火静等动物来水边。",
            url: "https://www.google.com/maps/search/?api=1&query=Gwarrie+Pan+Addo+Elephant+National+Park",
          },
          {
            name: "19:00 前回营地",
            detail: "按 gate 实时规则回撤，避免卡点和夜间压力。",
            url: "https://www.google.com/maps/search/?api=1&query=Addo+Main+Camp+Gate",
          },
        ],
      },
      {
        id: 5,
        time: "全天规则与资料",
        title: "驾驶规则 + 地图资料（当天随时可点开）",
        place: "Addo 官方信息",
        coords: "-33.4830,25.7499",
        note: "把“规则正确”放在“看得多”之前：合规才有持续体验。",
        subItems: [
          {
            name: "Visitors Map（含 Gate Times）",
            detail: "当天优先看这份，门时间和规则按园区最新公告执行。",
            url: "https://www.sanparks.org/wp-content/uploads/2025/02/Addo-Visitors-Map.pdf",
          },
          {
            name: "SANParks Maps 总入口",
            detail: "Main Map、Recommended Routes、各营地平面图集中入口。",
            url: "https://www.sanparks.org/parks/addo-elephant/travel/maps",
          },
          {
            name: "Main Camp 地图检索",
            detail: "快速定位 reception、shop、餐厅、加油与 drive 集合点。",
            url: "https://www.google.com/maps/search/?api=1&query=Addo+Main+Camp+Map",
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

function isValidCoordPair(coords) {
  if (typeof coords !== "string") return false;
  const cleaned = coords.trim();
  if (!cleaned) return false;

  const parts = cleaned.split(",");
  if (parts.length !== 2) return false;

  const lat = Number(parts[0]);
  const lng = Number(parts[1]);
  return Number.isFinite(lat) && Number.isFinite(lng);
}

function extractRouteCoords(plan) {
  const coords = [];
  const seen = new Set();

  plan.itinerary.forEach((item) => {
    if (!isValidCoordPair(item.coords)) return;
    const value = item.coords.trim();
    if (seen.has(value)) return;
    seen.add(value);
    coords.push(value);
  });

  return coords;
}

function buildAutoMapData(plan) {
  const coords = extractRouteCoords(plan);

  if (coords.length === 0) {
    return {
      embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(SOUTH_AFRICA_CENTER)}&z=5&output=embed`,
      action: null,
    };
  }

  if (coords.length === 1) {
    const only = coords[0];
    return {
      embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(only)}&z=12&output=embed`,
      action: {
        label: "打开当天地图",
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(only)}`,
      },
    };
  }

  const origin = coords[0];
  const destination = coords[coords.length - 1];
  const waypoints = coords.slice(1, -1).join("|");
  const base = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  const href = waypoints ? `${base}&waypoints=${encodeURIComponent(waypoints)}` : base;

  return {
    embedSrc: `${href}&output=embed`,
    action: {
      label: "一键打开当天路线",
      href,
    },
  };
}

function createPlaceholderPlan() {
  return {
    title: "南非行程（待补充）",
    subtitle: "这一天行程暂未填写，后续慢慢补充。",
    extraRouteActions: [],
    warnings: [],
    itinerary: Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      time: "--:--",
      title: `待补充行程 ${index + 1}`,
      place: "待补充地点",
      coords: "",
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

function openDataUrlDoc(dataUrl) {
  if (!dataUrl) return;
  try {
    const blob = dataUrlToBlob(dataUrl);
    const blobUrl = URL.createObjectURL(blob);

    if (isIosStandalone()) {
      window.location.href = blobUrl;
    } else {
      window.open(blobUrl, "_blank", "noopener");
    }

    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  } catch (error) {
    console.error(error);
    alert("打开资料失败，请重新导入该文件。");
  }
}

function ensureItineraryDocs(dateStr) {
  if (!Array.isArray(itineraryDocsByDate[dateStr])) {
    itineraryDocsByDate[dateStr] = [];
  }
  return itineraryDocsByDate[dateStr];
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
  document.getElementById("currentTitle").textContent = plan.title;
  document.getElementById("currentSubtitle").textContent = plan.subtitle;
  document.title = `南非旅行助手 · ${dateStr}`;
}

function renderRouteActions(plan, autoAction) {
  const routeEl = document.getElementById("routeActions");
  const actions = [];
  if (autoAction) actions.push(autoAction);
  if (Array.isArray(plan.extraRouteActions)) actions.push(...plan.extraRouteActions);

  if (actions.length === 0) {
    routeEl.innerHTML = '<button class="btn" disabled>留空（待后续补充）</button>';
    return;
  }

  routeEl.innerHTML = actions
    .map(
      (action) =>
        `<a class="btn" href="${action.href}" target="_blank" rel="noopener">${escapeHtml(action.label)}</a>`
    )
    .join("");
}

function renderMap(plan) {
  const frame = document.getElementById("mapFrame");
  const autoMap = buildAutoMapData(plan);
  frame.src = autoMap.embedSrc;
  renderRouteActions(plan, autoMap.action);
}

function renderTimeline(dateStr, plan) {
  const timelineEl = document.getElementById("timeline");
  timelineEl.innerHTML = "";

  plan.itinerary.forEach((item) => {
    const localDocAction = item.docKey ? buildLocalDocAction(item.docKey, item.docLabel) : "";

    const mapButtons = isValidCoordPair(item.coords)
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

function renderImportPanel(dateStr) {
  const titleEl = document.getElementById("importTitle");
  const hintEl = document.getElementById("importHint");
  const panelEl = document.getElementById("importsPanel");

  if (MULTI_DOC_IMPORT_DATES.has(dateStr)) {
    titleEl.textContent = "行程资料导入（隐私）";
    hintEl.textContent = "可上传当天其他资料（PDF/图片等），仅保存在本机浏览器。";
    panelEl.innerHTML = `
      <label>${dateStr} 行程资料（可多选）
        <input type="file" id="itineraryDocsInput" multiple />
      </label>
    `;
    return;
  }

  titleEl.textContent = "本地导入附件（隐私）";
  hintEl.textContent = "附件仅保存到当前手机浏览器本地，不上传到服务器。";
  panelEl.innerHTML = `
    <label>机票 PDF <input type="file" id="flightInput" accept="application/pdf" /></label>
    <label>租车 PDF <input type="file" id="hertzInput" accept="application/pdf" /></label>
    <label>酒店 PDF <input type="file" id="hotelInput" accept="application/pdf" /></label>
  `;
}

function renderDocs(dateStr) {
  const docsEl = document.getElementById("docs");
  docsEl.innerHTML = "";

  if (MULTI_DOC_IMPORT_DATES.has(dateStr)) {
    const rows = ensureItineraryDocs(dateStr);
    if (rows.length === 0) {
      const li = document.createElement("li");
      li.textContent = `${dateStr} 行程资料：未导入`;
      docsEl.appendChild(li);
      return;
    }

    rows.forEach((row) => {
      const li = document.createElement("li");
      li.innerHTML = `<button class="btn itinerary-doc-btn" data-doc-date="${dateStr}" data-doc-id="${row.id}">${escapeHtml(row.name)}</button>`;
      docsEl.appendChild(li);
    });
    return;
  }

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
  renderImportPanel(activeDate);
  bindInputs();
  renderDocs(activeDate);
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
  renderDocs(activeDate);
}

async function onItineraryDocsImport(dateStr, files) {
  if (!files || files.length === 0) return;

  const bucket = ensureItineraryDocs(dateStr);
  for (const file of Array.from(files)) {
    const dataUrl = await readAsDataUrl(file);
    bucket.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      name: file.name,
      type: file.type || "",
      dataUrl,
    });
  }

  saveItineraryDocs();
  renderDocs(dateStr);
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

function saveItineraryDocs() {
  localStorage.setItem(STORAGE_KEYS.itineraryDocs, JSON.stringify(itineraryDocsByDate));
}

function loadItineraryDocs() {
  const raw = localStorage.getItem(STORAGE_KEYS.itineraryDocs);
  if (!raw) {
    DATE_OPTIONS.forEach((dateStr) => {
      itineraryDocsByDate[dateStr] = [];
    });
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    DATE_OPTIONS.forEach((dateStr) => {
      const incoming = parsed?.[dateStr];
      if (!Array.isArray(incoming)) {
        itineraryDocsByDate[dateStr] = [];
        return;
      }
      itineraryDocsByDate[dateStr] = incoming
        .filter((row) => row && typeof row.id === "string" && typeof row.name === "string" && typeof row.dataUrl === "string")
        .map((row) => ({
          id: row.id,
          name: row.name,
          type: typeof row.type === "string" ? row.type : "",
          dataUrl: row.dataUrl,
        }));
    });
  } catch {
    DATE_OPTIONS.forEach((dateStr) => {
      itineraryDocsByDate[dateStr] = [];
    });
  }
}

function bindInputs() {
  const flightInput = document.getElementById("flightInput");
  const hertzInput = document.getElementById("hertzInput");
  const hotelInput = document.getElementById("hotelInput");
  const itineraryDocsInput = document.getElementById("itineraryDocsInput");

  if (flightInput) {
    flightInput.onchange = (event) => {
      onFileImport("flight", event.target.files[0]).catch((error) => alert(error.message));
    };
  }
  if (hertzInput) {
    hertzInput.onchange = (event) => {
      onFileImport("hertz", event.target.files[0]).catch((error) => alert(error.message));
    };
  }
  if (hotelInput) {
    hotelInput.onchange = (event) => {
      onFileImport("hotel", event.target.files[0]).catch((error) => alert(error.message));
    };
  }
  if (itineraryDocsInput) {
    itineraryDocsInput.onchange = (event) => {
      onItineraryDocsImport(activeDate, event.target.files).catch((error) => alert(error.message));
      event.target.value = "";
    };
  }
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
      return;
    }

    if (target.classList.contains("itinerary-doc-btn")) {
      const dateStr = target.dataset.docDate;
      const docId = target.dataset.docId;
      if (!dateStr || !docId) return;

      const row = ensureItineraryDocs(dateStr).find((item) => item.id === docId);
      if (!row) return;
      openDataUrlDoc(row.dataUrl);
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

function bindIosNoZoom() {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (!isIOS) return;

  // Block pinch-zoom gestures inside iOS Safari/PWA.
  document.addEventListener(
    "gesturestart",
    (event) => {
      event.preventDefault();
    },
    { passive: false }
  );

  // Block double-tap zoom.
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );
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
loadItineraryDocs();
loadRemarks();
bindDateSwitcher();
bindActionClicks();
bindRemarkEditing();
bindIosNoZoom();
renderDateOptions();

const initialHashDate = window.location.hash.replace("#", "");
if (DATE_OPTIONS.includes(initialHashDate)) {
  activeDate = initialHashDate;
}

setActiveDate(activeDate);
