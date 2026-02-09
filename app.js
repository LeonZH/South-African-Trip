const STORAGE_KEYS = {
  flight: "sa_trip_doc_flight",
  hertz: "sa_trip_doc_hertz",
  hotel: "sa_trip_doc_hotel",
  itineraryDocs: "sa_trip_itinerary_docs_by_date",
  remarks: "sa_trip_event_remarks",
  mapPlacesSouthAfrica: "sa_trip_map_places_south_africa",
};

const DATE_START = "2026-02-12";
const DATE_END = "2026-02-22";
const DEFAULT_DATE = "2026-02-12";
const SOUTH_AFRICA_CENTER = "-30.5595,22.9375";
const WEEKDAY_CN = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const SUMMARY_VIEW_KEY = "__summary__";
const SUMMARY_HASH = "summary";
const SOUTH_AFRICA_BOUNDS = {
  latMin: -35.2,
  latMax: -21.5,
  lngMin: 16.0,
  lngMax: 33.2,
};
const SOUTH_AFRICA_TEXT_HINTS = [
  "south africa",
  "南非",
  "johannesburg",
  "pretoria",
  "cape town",
  "durban",
  "gqeberha",
  "port elizabeth",
  "plettenberg",
  "knysna",
  "stellenbosch",
];
const EMBASSY_CONTACTS = [
  {
    name: "中国驻南非大使馆（比勒陀利亚）",
    address: "225 ATHLONE STREET, ARCADIA 0083, PRETORIA",
    servicePhone: "+27-12-4316537",
    emergencyPhone: "+27-10-4925583",
    website: "http://za.china-embassy.gov.cn",
  },
  {
    name: "中国驻约翰内斯堡总领馆",
    servicePhone: "+27-76-1961019",
    emergencyPhone: "+27-10-4986234",
    website: "http://johannesburg.china-consulate.gov.cn",
  },
  {
    name: "中国驻开普敦总领馆",
    emergencyPhone: "+27-21-6747668",
    website: "http://capetown.china-consulate.gov.cn",
  },
  {
    name: "中国驻德班总领馆",
    emergencyPhone: "+27-76-1742938",
    website: "http://durban.china-consulate.gov.cn",
  },
];
const FUEL_GUIDE_STEPS = [
  {
    title: "1) 停车并熄火",
    detail: "南非大多数加油站由工作人员加油，通常不需要自己下枪操作。",
  },
  {
    title: "2) 告知油号和金额",
    detail: "直接说 Petrol 95/93 或 Diesel，并说明“加满”或指定金额。",
  },
  {
    title: "3) 可请工作人员做基础服务",
    detail: "常见会帮你擦前挡风玻璃、看胎压，属于常见服务流程。",
  },
  {
    title: "4) 付款",
    detail: "可现金或刷卡。刷卡前确认金额，留意是否有额外项目。",
  },
  {
    title: "5) 是否要给小费",
    detail: "有给小费文化。常见给法：约 R5-R20（按服务质量和现金情况调整）。不是法律强制，但很普遍。",
  },
];
const TIP_CULTURE_ITEMS = [
  {
    title: "餐厅",
    detail: "普遍给小费，常见区间约账单 10%-15%。",
  },
  {
    title: "加油站工作人员",
    detail: "通常会给小费，常见约 R5-R20。",
  },
  {
    title: "酒店行李员/客房服务",
    detail: "可按次给小费，常见约 R10-R30/次。",
  },
  {
    title: "停车场看车员（Car Guard）",
    detail: "很多地方常见，离开时可给少量小费，常见约 R5-R20。",
  },
  {
    title: "是否强制",
    detail: "大多属于社会习惯而非法律强制。按服务质量决定即可。",
  },
];

const importedDocs = {
  flight: null,
  hertz: null,
  hotel: null,
};

const remarksByDate = {};
const itineraryDocsByDate = {};
let mapPlacesSouthAfrica = [];
let latestRemarksSummaryText = "";

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
        time: "08:00-09:45",
        title: "乘机：JNB -> PLZ（FA632，Economy）",
        place: "O.R. Tambo (JNB) -> Port Elizabeth (PLZ)",
        coords: "",
        note: "航班：FA632；起飞 08:00，预计到达 09:45。",
        docKey: "flight",
        docLabel: "机票资料（本地）",
        subItems: [],
      },
      {
        id: 2,
        time: "09:45-11:00",
        title: "抵达伊丽莎白港（Gqeberha）机场",
        place: "Chief Dawid Stuurman International Airport",
        coords: "-33.9849,25.6173",
        note: "下机后优先取行李，确认手机网络与离线地图。",
        subItems: [],
      },
      {
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
  "2026-02-15": {
    title: "Addo -> Tsitsikamma Storms River Mouth（海岸线王牌日）",
    subtitle: "早上轻松收尾，中午上路，下午集中打卡吊桥/峡谷/海边步道/潮池",
    extraRouteActions: [
      {
        label: "Garden Route / Tsitsikamma 地图入口",
        href: "https://www.sanparks.org/parks/garden-route/travel/maps",
      },
      {
        label: "Storms River Mouth Rest Camp 官方页",
        href: "https://www.sanparks.org/parks/garden-route/camps/storms-river-mouth",
      },
    ],
    warnings: [
      "18 岁以上住客入园/出园需携带有效证件（护照/ID/驾照卡等）并可能被扫描。",
      "如当天未到，预订通常只保留到次日 09:00；超时可能触发取消与费用规则。",
      "Storms River Mouth 营地无 ATM，且加油点不在营地内；现金非必须，但银行卡务必随身。",
      "当月 gate time 可能变动，下午尽量不要压线入园；取消/改期临近日期费用更高。",
      "海边岩石湿滑且浪况变化快，只在允许区域活动，带娃优先保守路线。",
    ],
    itinerary: [
      {
        id: 1,
        time: "07:00-08:30",
        title: "早餐 + 出发前准备（轻松收尾）",
        place: "Addo Main Camp",
        coords: "-33.4830,25.7499",
        note: "早餐直接在营地内解决，顺手补给饮水和零食，把车内收纳与证件检查一次完成。",
        subItems: [
          {
            name: "1 分钟 checklist",
            detail: "水、简单零食、垃圾袋、证件、银行卡、手机充电线全部就位。",
          },
          {
            name: "营地内补给",
            detail: "小店可补基础物资，离开前把白天路上要用的东西直接放驾驶位附近。",
            url: "https://www.google.com/maps/search/?api=1&query=Addo+Main+Camp+Shop",
          },
        ],
      },
      {
        id: 2,
        time: "08:30-12:00",
        title: "离开 Addo -> N2 前往 Storms River",
        place: "Addo -> Paterson -> N2 -> Jeffreys Bay / Humansdorp -> Storms River",
        coords: "-34.0506,24.9306",
        note: "全程约 200+ 公里，通常 3-4 小时；按你从 Addo 出园门与当时路况会有浮动。",
        subItems: [
          {
            name: "推荐主路线",
            detail: "出园后接 R335 / R342（按出园门）到 Paterson，上 N2 后一路向西到 Storms River。",
          },
          {
            name: "中途休息点（家庭友好）",
            detail: "Jeffreys Bay 适合咖啡和洗手间；Storms River Village 可做入园前最后补给。",
            url: "https://www.google.com/maps/search/?api=1&query=Jeffreys+Bay",
          },
        ],
      },
      {
        id: 3,
        time: "12:00-13:30",
        title: "午餐（路上吃优先，抵达后可直接开玩）",
        place: "Jeffreys Bay / Humansdorp（或营地 Cattle Baron）",
        coords: "-34.0292,24.7691",
        note: "策略二选一：路上简餐最省下午时间；若想看海景，可到营地后吃 Cattle Baron。",
        subItems: [
          {
            name: "方案 A（推荐）",
            detail: "在 Jeffreys Bay 或 Humansdorp 快速吃完，减少到营地后的切换成本。",
          },
          {
            name: "方案 B（景观餐）",
            detail: "抵达营地后直接去 Cattle Baron，海边位置好，餐后无缝衔接步道。",
            url: "https://www.google.com/maps/search/?api=1&query=Cattle+Baron+Storms+River+Mouth",
          },
        ],
      },
      {
        id: 4,
        time: "13:30-14:30",
        title: "入园 + 办理入住（Storms River Mouth Rest Camp）",
        place: "Storms River Mouth Rest Camp Reception",
        coords: "-34.0232,23.8858",
        note: "你已预订，先完成入住与证件核验，再确认当天 gate time 与海况提示。",
        subItems: [
          {
            name: "入住关键提醒",
            detail: "18+ 住客证件需可出示；如到店过晚要尽早联系营地，避免被视为 no-show。",
          },
          {
            name: "官方营地信息",
            detail: "设施、餐饮、商店与安全提示以官方页为准。",
            url: "https://www.sanparks.org/parks/garden-route/camps/storms-river-mouth",
          },
        ],
      },
      {
        id: 5,
        time: "14:30-18:30",
        title: "海岸线王牌组合：吊桥 -> 峡谷 -> 海边步道 -> 潮池",
        place: "Tsitsikamma Storms River Mouth Coastal Area",
        coords: "-34.0227,23.9021",
        note: "长途驾驶后不拼强度，按海况和体力动态调整，优先把经典点位稳稳拿下。",
        subItems: [
          {
            name: "Suspension Bridge",
            detail: "先冲吊桥，下午光线通常更好，拍照与观景都稳定。",
            url: "https://www.google.com/maps/search/?api=1&query=Storms+River+Suspension+Bridge",
          },
          {
            name: "Gorge View + Coast Walk",
            detail: "沿主步道看河口峡谷与海岸线，湿滑路段慢行，不在非开放区域攀爬。",
            url: "https://www.google.com/maps/search/?api=1&query=Storms+River+Mouth+Trail",
          },
          {
            name: "Tidal Pool（视天气和海况）",
            detail: "只在安全时段与允许区域停留，注意涨落潮与突发浪。",
            url: "https://www.google.com/maps/search/?api=1&query=Storms+River+Mouth+Tidal+Pool",
          },
        ],
      },
      {
        id: 6,
        time: "18:30-20:30",
        title: "晚餐 + 收尾（为次日留体力）",
        place: "Storms River Mouth Rest Camp",
        coords: "-34.0232,23.8858",
        note: "优先就地吃晚餐并早休息，明早再安排更长线路；今天目标是高质量收官而非拼步数。",
        subItems: [
          {
            name: "晚餐建议",
            detail: "首选 Cattle Baron；若想更快回房休息，可用营地小店简餐方案。",
          },
          {
            name: "夜间准备",
            detail: "把次日用水、零食、防晒、轻外套和证件提前打包，早上能无脑出发。",
          },
        ],
      },
    ],
  },
  "2026-02-16": {
    title: "Plettenberg Bay 抵达日 + 除夕（海景晚餐）",
    subtitle: "Storms River -> Plett 约 65km / 50 分钟；海边放电 + 轻徒步 + 家庭庆祝晚宴",
    extraRouteActions: [
      {
        label: "Airbnb 行程单入口",
        href: "https://www.airbnb.com/trips",
      },
      {
        label: "The Lookout Deck（官网）",
        href: "https://lookout.co.za/",
      },
      {
        label: "Robberg Nature Reserve（官网）",
        href: "https://www.capenature.co.za/reserves/robberg-nature-reserve",
      },
      {
        label: "Emily Moon（Google Maps）",
        href: "https://www.google.com/maps/search/?api=1&query=Emily+Moon+Restaurant+Plettenberg+Bay",
      },
      {
        label: "The Lookout Deck（Google Maps）",
        href: "https://www.google.com/maps/search/?api=1&query=The+Lookout+Deck+Plettenberg+Bay",
      },
      {
        label: "The Lookout Deck（Dineplan）",
        href: "https://www.dineplan.com/restaurants/the-lookout-deck",
      },
      {
        label: "Emily Moon（Tripadvisor）",
        href: "https://www.tripadvisor.com/Restaurant_Review-g312558-d3491929-Reviews-The_Fat_Fish-Plettenberg_Bay_Western_Cape.html",
      },
    ],
    warnings: [
      "Airbnb：Plettenberg Bay 连住 2 晚（2/16-2/18），4 beds / 3 guests，房东 Louis Jones，确认码 HMRQHRT9EM。",
      "收据未包含门锁与停车细节；到达前请在 Airbnb 行程单核对入住时间、钥匙/密码、停车说明。",
      "2/16 是除夕，晚餐建议提前订位（Emily Moon / The Lookout Deck 旺季经常满位）。",
      "Robberg Nature Reserve 有明确入园与关门时间限制；若到晚，改海滩日落方案更稳。",
      "下午以轻强度活动为主，不把体力榨干，给晚间庆祝和次日行程留余量。",
    ],
    itinerary: [
      {
        id: 1,
        time: "08:00-09:00",
        title: "早餐 + 退房准备",
        place: "Tsitsikamma / Storms River 一带",
        coords: "-34.0232,23.8858",
        note: "早餐走轻量：酸奶 + 水果 + 咖啡，把“正餐额度”留给中午和除夕晚餐。",
        subItems: [
          {
            name: "打包顺序",
            detail: "先收证件和电子设备，再收孩子常用物品，最后统一检查车钥匙与门锁。",
          },
          {
            name: "车上即用包",
            detail: "水、防晒、纸巾、薄外套放前排可拿到的位置，减少中途翻找。",
          },
        ],
      },
      {
        id: 2,
        time: "09:00-10:15",
        title: "自驾前往 Plettenberg Bay（N2）",
        place: "Storms River -> Plettenberg Bay",
        coords: "-34.0527,23.3716",
        note: "全程约 65km，通常 50 分钟上下；不赶路，看到合适风景点可短停 5-10 分钟拉伸。",
        subItems: [
          {
            name: "路线建议",
            detail: "N2 主线直达即可，保持中速巡航，避免为了抢时间压车。",
          },
          {
            name: "导航入口",
            detail: "直接导航到 Central Beach 作为进城第一站最顺手。",
            url: "https://www.google.com/maps/search/?api=1&query=Central+Beach+Plettenberg+Bay",
          },
        ],
      },
      {
        id: 3,
        time: "10:30-11:30",
        title: "到 Plett 后先找回城市手感",
        place: "Central Beach / Lookout Beach",
        coords: "-34.0578,23.3717",
        note: "先到海边走走让孩子放电；顺手补水、防晒，再买除夕仪式感补给（饮料/零食/水果/小蛋糕）。",
        subItems: [
          {
            name: "Central Beach",
            detail: "动线短、停车和活动都方便，适合抵达日快速切换节奏。",
            url: "https://www.google.com/maps/search/?api=1&query=Central+Beach+Plettenberg+Bay",
          },
          {
            name: "Lookout Beach",
            detail: "海景和沙滩体验都在线，可按体力在两处之间灵活切换。",
            url: "https://www.google.com/maps/search/?api=1&query=Lookout+Beach+Plettenberg+Bay",
          },
          {
            name: "补给点（示例）",
            detail: "按顺路原则进超市采购，不为品牌绕路。",
            url: "https://www.google.com/maps/search/?api=1&query=supermarket+Plettenberg+Bay",
          },
        ],
      },
      {
        id: 4,
        time: "12:00-13:15",
        title: "午餐：The Lookout Deck（轻松海边款）",
        place: "The Lookout Deck",
        coords: "-34.0591,23.3734",
        note: "海边就餐、换场成本低，适合家庭抵达日的一顿“无脑稳妥午餐”。",
        subItems: [
          {
            name: "Google Maps",
            detail: "建议出发前先看当日营业时间和实时拥挤度。",
            url: "https://www.google.com/maps/search/?api=1&query=The+Lookout+Deck+Plettenberg+Bay",
          },
          {
            name: "The Lookout Deck 官网",
            detail: "查看菜单、营业信息和联系方式。",
            url: "https://lookout.co.za/",
          },
        ],
      },
      {
        id: 5,
        time: "13:30-15:00",
        title: "办理入住 / 安顿 / 休息",
        place: "Airbnb（Plettenberg Bay）",
        coords: "-34.0527,23.3716",
        note: "用确认码 HMRQHRT9EM 打开 Airbnb 行程单，快速确认入住时间、门锁方式和停车规则。",
        subItems: [
          {
            name: "关键核对项",
            detail: "check-in 时间、门锁/钥匙、停车位置、Wi-Fi、房东联络方式。",
          },
          {
            name: "房源信息速记",
            detail: "2/16-2/18 连住 2 晚，4 beds，3 guests，房东 Louis Jones。",
          },
        ],
      },
      {
        id: 6,
        time: "15:30-18:00",
        title: "下午档：轻徒步 + 海景日落（两套方案）",
        place: "Robberg Nature Reserve / Plett 海滩",
        coords: "-34.1039,23.3723",
        note: "原则是不透支体力。A 方案经典景观更强；B 方案更轻松，带娃容错更高。",
        subItems: [
          {
            name: "方案 A：Robberg Nature Reserve（短线）",
            detail: "只走到观景点即回撤，避免在除夕晚餐前过度消耗。",
            url: "https://www.google.com/maps/search/?api=1&query=Robberg+Nature+Reserve",
          },
          {
            name: "Robberg Nature Reserve 官网",
            detail: "查看保护区开放信息与入园说明。",
            url: "https://www.capenature.co.za/reserves/robberg-nature-reserve",
          },
          {
            name: "方案 B：海滩玩沙 + 日落",
            detail: "直接在 Central / Lookout Beach 放松，体验更轻松。",
            url: "https://www.google.com/maps/search/?api=1&query=Lookout+Beach+Plettenberg+Bay",
          },
        ],
      },
      {
        id: 7,
        time: "18:30-21:00",
        title: "除夕晚餐（环境优先，提前订位）",
        place: "Emily Moon / The Lookout Deck",
        coords: "-34.0258,23.3746",
        note: "今晚目标是“轻松过年 + 家庭仪式感”。用餐后不再加高强度活动，平稳收尾。",
        subItems: [
          {
            name: "Emily Moon（仪式感/景观强）",
            detail: "适合把除夕吃成正式家庭晚宴；包含你提供的 Tripadvisor 链接。",
            url: "https://www.tripadvisor.com/Restaurant_Review-g312558-d3491929-Reviews-The_Fat_Fish-Plettenberg_Bay_Western_Cape.html",
          },
          {
            name: "The Lookout Deck（海边放松款）",
            detail: "更随意轻松；包含你提供的 Dineplan 订位链接。",
            url: "https://www.dineplan.com/restaurants/the-lookout-deck",
          },
          {
            name: "Emily Moon（Google Maps）",
            detail: "晚餐前用于导航定位。",
            url: "https://www.google.com/maps/search/?api=1&query=Emily+Moon+Restaurant+Plettenberg+Bay",
          },
          {
            name: "The Lookout Deck（Google Maps）",
            detail: "晚餐前用于导航定位。",
            url: "https://www.google.com/maps/search/?api=1&query=The+Lookout+Deck+Plettenberg+Bay",
          },
        ],
      },
    ],
  },
  "2026-02-17": {
    title: "初一：Plett 轻松上午 + Knysna 观景日落往返",
    subtitle: "不重复 2/16 的 Robberg / Lookout Deck；下午双观景后在 Knysna 早晚餐，天黑前回 Plett",
    extraRouteActions: [
      {
        label: "Keurbooms River / Lagoon（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Keurbooms+River+Nature+Reserve",
      },
      {
        label: "Knysna Heads（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Knysna+Heads+Viewpoint",
      },
      {
        label: "Brenton-on-Sea（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Brenton-on-Sea+Beach",
      },
      {
        label: "Drydock Food Co（官网）",
        href: "https://www.drydock.co.za/?utm_source=chatgpt.com",
      },
      {
        label: "34 South（官网）",
        href: "https://www.34south.biz/?utm_source=chatgpt.com",
      },
      {
        label: "Tapas & Oysters（官网）",
        href: "https://tapasknysna.co.za/?utm_source=chatgpt.com",
      },
      {
        label: "Tapas & Oysters（Tripadvisor）",
        href: "https://www.tripadvisor.com/Restaurant_Review-g312664-d2703044-Reviews-Tapas_and_Oysters-Knysna_Western_Cape.html?utm_source=chatgpt.com",
      },
    ],
    warnings: [
      "2/17（周二，初一）主线：上午在 Plett 附近走轻松自然点，不重复 2/16 的 Robberg / Lookout Deck。",
      "如果 2/16 因天气或到晚没去成 Robberg，可把上午主点替换为 Robberg 中短线（到观景点即回）。",
      "Plett -> Knysna 单程约 30-40 分钟，建议 18:30 前从晚餐点离开，尽量在天黑前回到 Plett。",
      "午餐与晚餐都优先“停车方便 + 上菜稳定 + 孩子友好”，不追网红排队。",
      "车内固定准备：饮用水、湿巾、简餐零食、薄外套；海边风起时体感温度下降明显。",
    ],
    itinerary: [
      {
        id: 1,
        time: "08:00-09:00",
        title: "早餐（住处）",
        place: "Plettenberg Bay 住处",
        coords: "-34.0527,23.3716",
        note: "吃扎实：蛋白质 + 水果 + 咖啡/茶。下午有往返车程，早餐不要过轻。",
        subItems: [
          {
            name: "早餐结构",
            detail: "蛋白质优先（蛋/酸奶/肉类）+ 水果 + 热饮，维持下午驾驶精力。",
          },
        ],
      },
      {
        id: 2,
        time: "09:15-11:30",
        title: "上午轻松自然点：主点 1 个 + 短点 1 个",
        place: "Keurbooms River / Lagoon 一带",
        coords: "-34.0035,23.4454",
        note: "默认不去 Robberg/Lookout Deck。主点推荐 Keurbooms 河口与泻湖散步，短点按停车便利现场选。",
        subItems: [
          {
            name: "主点（推荐）：Keurbooms River / Lagoon",
            detail: "轻松散步、看水鸟、吹风，亲子友好且不受严格入园时段约束。",
            url: "https://www.google.com/maps/search/?api=1&query=Keurbooms+River+Nature+Reserve",
          },
          {
            name: "短点：海滩/观景短走",
            detail: "目标是拍“初一第一张家庭合照”，拍完就收，不恋战。",
            url: "https://www.google.com/maps/search/?api=1&query=Keurbooms+Beach+Plettenberg+Bay",
          },
          {
            name: "备选替换：Robberg 中短线",
            detail: "仅当 2/16 因天气或时间未完成 Robberg 时启用，走到观景点即回。",
            url: "https://www.capenature.co.za/reserves/robberg-nature-reserve",
          },
        ],
      },
      {
        id: 3,
        time: "11:45-13:00",
        title: "午餐（不去 The Lookout Deck）",
        place: "Plettenberg Bay 镇区",
        coords: "-34.0515,23.3723",
        note: "午餐以“停车方便 + 上菜快 + 孩子友好”为优先，保证下午出发丝滑。",
        subItems: [
          {
            name: "选店原则",
            detail: "不追网红，优先评价稳定的家庭餐或海鲜简餐。",
          },
          {
            name: "镇区餐厅检索",
            detail: "现场按停车情况快速决策，减少步行切换成本。",
            url: "https://www.google.com/maps/search/?api=1&query=family+restaurant+Plettenberg+Bay",
          },
        ],
      },
      {
        id: 4,
        time: "13:00-14:15",
        title: "午休 + 出发前准备",
        place: "住处 / 车上",
        coords: "-34.0527,23.3716",
        note: "午休 20-30 分钟；出发前一次性把车上补给整理好，避免路上分心找东西。",
        subItems: [
          {
            name: "出发前清单",
            detail: "水、湿巾、零食、薄外套、充电线、纸巾全部前置到可直接拿取的位置。",
          },
        ],
      },
      {
        id: 5,
        time: "14:15-14:55",
        title: "自驾：Plett -> Knysna",
        place: "N2 东向",
        coords: "-34.0363,23.0471",
        note: "单程约半小时级别，进 Knysna 后适合下午观景 + 早晚餐。",
        subItems: [
          {
            name: "驾驶策略",
            detail: "稳定巡航，不抢灯不压车；把精力留给观景和晚餐。",
          },
        ],
      },
      {
        id: 6,
        time: "15:10-16:10",
        title: "Knysna Heads（第一击：海口巨景）",
        place: "Knysna Heads Viewpoint",
        coords: "-34.0702,23.0777",
        note: "停车后走到观景点即可，45-60 分钟足够。先拍家庭合照，再拍风景照。",
        subItems: [
          {
            name: "观景点地图",
            detail: "到点即拍，不把时间耗在等待“完美光线”。",
            url: "https://www.google.com/maps/search/?api=1&query=Knysna+Heads+Viewpoint",
          },
        ],
      },
      {
        id: 7,
        time: "16:25-17:10",
        title: "Brenton-on-Sea（第二击：更松弛海岸线）",
        place: "Brenton-on-Sea",
        coords: "-34.0751,23.0240",
        note: "这段以放松节奏为主：孩子跑一跑，大人不赶时间，进入初一的舒服状态。",
        subItems: [
          {
            name: "海岸短停点",
            detail: "按停车便利和当时风况决定停留点，控制总时长避免晚餐后返程太晚。",
            url: "https://www.google.com/maps/search/?api=1&query=Brenton-on-Sea+Beach",
          },
        ],
      },
      {
        id: 8,
        time: "17:15-18:30",
        title: "Knysna 早晚餐（Waterfront 一带）",
        place: "Knysna Waterfront",
        coords: "-34.0369,23.0468",
        note: "建议在 Knysna 吃完再回 Plett。优先有水景/露台/灯光舒服、孩子累了可快速撤退的店。",
        subItems: [
          {
            name: "Drydock Food Co（推荐）",
            detail: "景观 + 菜单覆盖面强，适合家庭“稳妥新年晚餐”。",
            url: "https://www.drydock.co.za/?utm_source=chatgpt.com",
          },
          {
            name: "34 South",
            detail: "更轻松好吃不端着，生蚝与熟食选择灵活。",
            url: "https://www.34south.biz/?utm_source=chatgpt.com",
          },
          {
            name: "Tapas & Oysters（Tripadvisor）",
            detail: "水边露台氛围强，小食分享很适合家庭。",
            url: "https://www.tripadvisor.com/Restaurant_Review-g312664-d2703044-Reviews-Tapas_and_Oysters-Knysna_Western_Cape.html?utm_source=chatgpt.com",
          },
          {
            name: "Tapas & Oysters（官网）",
            detail: "查看菜单与营业信息。",
            url: "https://tapasknysna.co.za/?utm_source=chatgpt.com",
          },
        ],
      },
      {
        id: 9,
        time: "18:30-19:15",
        title: "返回 Plett",
        place: "Knysna -> Plettenberg Bay",
        coords: "-34.0527,23.3716",
        note: "控制返程节奏，尽量在天黑前后完成入城；回住处后只做简单收尾，留体力给 2/18。",
        subItems: [],
      },
    ],
  },
  "2026-02-18": {
    title: "Plett -> Swellendam 转场日（沿途精选 + 小镇收尾）",
    subtitle: "沿途停靠 60-70% + 小镇散步 30-40%，15:00 左右入住最稳",
    extraRouteActions: [
      {
        label: "Aan de Eike Guest House（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Aan+de+Eike+Guest+House+Swellendam",
      },
      {
        label: "Drostdy Museum（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Drostdy+Museum+Swellendam",
      },
      {
        label: "Dutch Reformed Church（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Dutch+Reformed+Church+Swellendam",
      },
      {
        label: "Swellendam 餐厅检索",
        href: "https://www.google.com/maps/search/?api=1&query=restaurants+in+Swellendam",
      },
    ],
    warnings: [
      "今日重心：沿途精选停靠 60-70%，Swellendam 小镇轻量收尾 30-40%，不把中途休息升级成半日游。",
      "酒店：Aan de Eike Guest House（C/O Swellengrebel St. & Hermanus Steyn St., Swellendam 6740）。",
      "入住窗口 14:00-18:00，建议 14:30-15:30 抵达；如晚点直接联系 +27 28 514 1066。",
      "次日退房 10:00-10:30；含早餐，提供免费停车与全区域免费 Wi-Fi。",
      "路上服务区密度不高于国内高速常见水平：车上前置水、零食、湿巾，减少临停焦虑。",
    ],
    itinerary: [
      {
        id: 1,
        time: "08:00-09:00",
        title: "早餐 + 退房准备",
        place: "Plettenberg Bay 住处",
        coords: "-34.0527,23.3716",
        note: "转场日先把节奏稳住：早餐吃扎实、行李分层装车，孩子路上即用物放前排可直接拿。",
        subItems: [
          {
            name: "车载即用箱",
            detail: "水、坚果、饼干、湿巾、纸巾、充电线集中放在前排，随停随取。",
          },
          {
            name: "出门前 1 分钟检查",
            detail: "证件、手机、车钥匙、房门钥匙/门禁码、导航目的地一次性确认。",
          },
        ],
      },
      {
        id: 2,
        time: "09:00-10:30",
        title: "从 Plett 出发（N2 主线）",
        place: "Plettenberg Bay -> Wilderness / Mossel Bay",
        coords: "-33.9917,22.5791",
        note: "今天策略是“精选停靠”，不做一路打卡拉满；把体力和时间留给下午入住与小镇散步。",
        subItems: [
          {
            name: "主路线建议",
            detail: "走 N2 主线，按实时路况微调；不为了小众点位绕远路。",
          },
          {
            name: "沿途导航检索",
            detail: "用于临时找加油站和洗手间，优先选择容易进出的站点。",
            url: "https://www.google.com/maps/search/?api=1&query=petrol+station+on+N2+Western+Cape",
          },
        ],
      },
      {
        id: 3,
        time: "10:30-12:00",
        title: "放电停靠（A/B 二选一，停 60-90 分钟）",
        place: "Wilderness / Mossel Bay",
        coords: "-34.1831,22.1461",
        note: "核心是“休息 + 风景 + 洗手间 + 补水”。停够就走，避免把中途休息变成半日游。",
        subItems: [
          {
            name: "A 方案：Wilderness 海边步道",
            detail: "景观稳定、孩子可活动，适合轻量拉伸后继续上路。",
            url: "https://www.google.com/maps/search/?api=1&query=Wilderness+Beach+Western+Cape",
          },
          {
            name: "B 方案：Mossel Bay 轻量看海 + 补给",
            detail: "城市化程度更高，补给和洗手间通常更好找。",
            url: "https://www.google.com/maps/search/?api=1&query=Mossel+Bay+Waterfront",
          },
        ],
      },
      {
        id: 4,
        time: "12:00-13:00",
        title: "午餐（停车方便 + 上菜快）",
        place: "George / Mossel Bay",
        coords: "-33.9628,22.4617",
        note: "午餐只追求“快、稳、好停车”，避免在此段消耗下午入住窗口。",
        subItems: [
          {
            name: "选店原则",
            detail: "现场看停车便利和排队情况，减少步行切换和等位时间。",
          },
          {
            name: "餐厅检索入口",
            detail: "按你所在点位快速选店，不固定绑定单一餐厅。",
            url: "https://www.google.com/maps/search/?api=1&query=family+restaurant+George+Western+Cape",
          },
        ],
      },
      {
        id: 5,
        time: "13:00-14:30",
        title: "继续前往 Swellendam",
        place: "N2 西向",
        coords: "-34.0232,20.4417",
        note: "目标 14:30-15:30 抵达，给堵车、加油、临时休息留出缓冲，不压线赶入住。",
        subItems: [
          {
            name: "到店节奏",
            detail: "预计 15:00 左右最舒适；若晚于 17:30，建议提前电话通知酒店。",
          },
        ],
      },
      {
        id: 6,
        time: "14:30-15:30",
        title: "办理入住：Aan de Eike Guest House",
        place: "Aan de Eike Guest House, Swellendam",
        coords: "-34.0232,20.4417",
        note: "先完成入住与停车，再把次日早餐/退房节奏确认好，转场日到这里就算任务完成。",
        docKey: "hotel",
        docLabel: "酒店资料（本地）",
        subItems: [
          {
            name: "酒店地址",
            detail: "C/O Swellengrebel St. & Hermanus Steyn St., Swellendam 6740",
          },
          {
            name: "酒店电话",
            detail: "+27 28 514 1066（路上晚点可直接沟通）。",
          },
          {
            name: "入住与设施",
            detail: "Check-in 14:00-18:00；Check-out 10:00-10:30；含早餐；免费停车；免费 Wi-Fi。",
          },
        ],
      },
      {
        id: 7,
        time: "16:00-17:30",
        title: "Swellendam 轻量散步（历史核心环线）",
        place: "Drostdy Museum -> 历史街区 -> Dutch Reformed Church",
        coords: "-34.0228,20.4443",
        note: "转场日不再加大运动量，按“出片 + 放松 + 顺路晚饭”思路慢走收尾。",
        subItems: [
          {
            name: "第一站：Drostdy Museum（近）",
            detail: "从住处步行可达，适合先拍建筑与庭院。",
            url: "https://www.google.com/maps/search/?api=1&query=Drostdy+Museum+Swellendam",
          },
          {
            name: "第二段：历史街区慢走",
            detail: "看到顺眼街景就拍，不追求“走完所有路”。",
          },
          {
            name: "第三站：Dutch Reformed Church",
            detail: "作为地标收尾，周边晚餐选择也更集中。",
            url: "https://www.google.com/maps/search/?api=1&query=Dutch+Reformed+Church+Swellendam",
          },
        ],
      },
      {
        id: 8,
        time: "18:10-19:30",
        title: "晚餐（三选一：稳妥 / 氛围 / 轻松）",
        place: "Swellendam 主街与历史核心区",
        coords: "-34.0241,20.4461",
        note: "按当时排队情况快速决策即可，不为单店久等；转场日晚餐以节奏舒适优先。",
        subItems: [
          {
            name: "Field & Fork Country Kitchen（稳妥）",
            detail: "整体口碑稳定，家庭就餐容错高。",
            url: "https://www.google.com/maps/search/?api=1&query=Field+%26+Fork+Country+Kitchen+Swellendam",
          },
          {
            name: "La Belle Alliance（氛围）",
            detail: "在散步动线附近，适合“慢慢吃”的晚餐。",
            url: "https://www.google.com/maps/search/?api=1&query=La+Belle+Alliance+Swellendam",
          },
          {
            name: "Barrel and Blues / Woodpecker Pizzadeli（轻松）",
            detail: "如果只想快速吃完回酒店，这类选择更轻便。",
            url: "https://www.google.com/maps/search/?api=1&query=Woodpecker+Pizzadeli+Swellendam",
          },
        ],
      },
      {
        id: 9,
        time: "19:30-20:00",
        title: "回酒店收尾 + 早点休息",
        place: "Aan de Eike Guest House",
        coords: "-34.0232,20.4417",
        note: "今晚的高回报动作是早睡，为 2/19 的继续行程保留体力和专注度。",
        subItems: [],
      },
    ],
  },
  "2026-02-19": {
    title: "Swellendam -> Hermanus -> Clarence Drive -> Cape Town（海岸风景线）",
    subtitle: "把转场开成风景纪录片：Hermanus 午餐步道 + R44 海岸线 + Waterfront 轻松收尾",
    extraRouteActions: [
      {
        label: "Hermanus Cliff Path（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Hermanus+Cliff+Path",
      },
      {
        label: "Clarence Drive R44（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Clarence+Drive+R44",
      },
      {
        label: "Stony Point 企鹅栈道（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Stony+Point+Nature+Reserve",
      },
      {
        label: "Breakwater Lodge（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Protea+Hotel+Breakwater+Lodge+Cape+Town",
      },
      {
        label: "V&A Waterfront（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=V%26A+Waterfront+Cape+Town",
      },
    ],
    warnings: [
      "硬约束：Swellengrebel 住宿段建议 10:00 开始退房，10:30 出发最稳，不拖入午后路况。",
      "Breakwater Lodge 15:00 后可入住；酒店位于 V&A Waterfront；停车约 25 ZAR/天；含早餐。",
      "企鹅站（Betty's Bay）是加分项，不是必选项：若 16:00 仍在路上或明显疲劳，直接跳过。",
      "今晚策略：不再开车找餐厅，晚餐在 Waterfront 步行范围内解决，降低切换成本。",
      "抵达开普敦后先完成“停车-入住-放行李”，再去黄昏散步，体验会更完整。",
    ],
    itinerary: [
      {
        id: 1,
        time: "10:00-10:30",
        title: "退房 + 装车 + 出发前补给",
        place: "Aan de Eike Guest House（Swellendam）",
        coords: "-34.0232,20.4417",
        note: "10:00 开始退房动作，10:30 准时离开；上车前把补水、洗手间、导航一次性处理完。",
        subItems: [
          {
            name: "出发前 3 件事",
            detail: "房卡/钥匙确认、行李固定、车内即用包放前排。",
          },
          {
            name: "节奏目标",
            detail: "按点出发是今天整条海岸线不赶路的基础。",
          },
        ],
      },
      {
        id: 2,
        time: "10:30-12:00",
        title: "Swellendam -> Hermanus（移动回血段）",
        place: "N2 -> Hermanus",
        coords: "-34.4187,19.2345",
        note: "这段以稳定推进为主：司机专注开车，乘客补觉/吃零食，减少后段疲劳。",
        subItems: [
          {
            name: "路段特征",
            detail: "Overberg 开阔农田 + 远山视野，适合轻松推进。",
          },
        ],
      },
      {
        id: 3,
        time: "12:00-13:30",
        title: "Hermanus 午餐 + Cliff Path 轻量步行",
        place: "Hermanus（Cliff Path 一带）",
        coords: "-34.4246,19.2412",
        note: "午餐后走 30-45 分钟海崖步道，重心是“舒服体验”，不是追距离。",
        subItems: [
          {
            name: "午餐策略 A（推荐）",
            detail: "简餐/三明治/沙拉 + 咖啡，把体力留给后段 R44 观景路。",
          },
          {
            name: "午餐策略 B",
            detail: "正常正餐可行，但尽量控制在 60 分钟内，避免后段赶路。",
          },
          {
            name: "步道入口检索",
            detail: "就近开走，走到舒服就回头。",
            url: "https://www.google.com/maps/search/?api=1&query=Hermanus+Cliff+Path",
          },
        ],
      },
      {
        id: 4,
        time: "13:30-15:00",
        title: "Hermanus -> Clarence Drive（R44）观景段",
        place: "Clarence Drive R44",
        coords: "-34.3362,18.9446",
        note: "把这段当作“观景体验”而不是交通通道：见到观景位就短停，停够就走。",
        subItems: [
          {
            name: "停车策略",
            detail: "每个观景点控制 5-10 分钟，拍到就走，确保不挤压入住时段。",
          },
          {
            name: "看点关键词",
            detail: "峭壁、海湾弧线、礁石浪线、山体轮廓。",
          },
        ],
      },
      {
        id: 5,
        time: "15:00-15:45",
        title: "Betty's Bay（Stony Point 企鹅栈道，可选）",
        place: "Stony Point Nature Reserve",
        coords: "-34.3696,18.8921",
        note: "可选加分站：近距离看非洲企鹅、体力消耗低。若明显疲劳或偏晚，直接跳过。",
        subItems: [
          {
            name: "适合停留时长",
            detail: "30-45 分钟足够，避免把可选点变成主行程。",
          },
          {
            name: "入口检索",
            detail: "到点即停，按栈道单向浏览最省力。",
            url: "https://www.google.com/maps/search/?api=1&query=Stony+Point+Nature+Reserve",
          },
        ],
      },
      {
        id: 6,
        time: "15:45-17:15",
        title: "Betty's Bay -> Cape Town（V&A Waterfront）",
        place: "Cape Town 城区",
        coords: "-33.9037,18.4219",
        note: "进城后车速可能明显下降，保持平稳心态；到达 Waterfront 后改步行模式最省心。",
        subItems: [
          {
            name: "入城策略",
            detail: "优先直达酒店停车，减少临时找位和二次绕行。",
          },
        ],
      },
      {
        id: 7,
        time: "17:15-18:30",
        title: "入住 Breakwater Lodge + 放下行李",
        place: "Protea Hotel Breakwater Lodge",
        coords: "-33.9074,18.4169",
        note: "先完成停车/入住/洗漱换衣，再进入 Waterfront 黄昏散步，体感会明显更轻松。",
        docKey: "hotel",
        docLabel: "酒店资料（本地）",
        subItems: [
          {
            name: "入住关键点",
            detail: "Check-in 15:00 后；停车约 25 ZAR/天；早餐已含。",
          },
          {
            name: "酒店位置优势",
            detail: "步行可达 Waterfront，今晚可以全程不再开车。",
          },
        ],
      },
      {
        id: 8,
        time: "18:30-20:00",
        title: "V&A Waterfront 晚餐（步行范围内）",
        place: "V&A Waterfront",
        coords: "-33.9037,18.4219",
        note: "第一晚以“稳 + 近 + 轻松”优先：就在港口周边就餐，不追单点，不增加交通切换。",
        subItems: [
          {
            name: "选店原则",
            detail: "优先有景观位、等位可控、孩子可快速收尾的餐厅。",
          },
          {
            name: "餐厅检索入口",
            detail: "在 Waterfront 范围内实时选店。",
            url: "https://www.google.com/maps/search/?api=1&query=restaurants+in+V%26A+Waterfront+Cape+Town",
          },
        ],
      },
      {
        id: 9,
        time: "20:00-20:20",
        title: "资料收尾：上传当日行程 + 核对后续机票",
        place: "Breakwater Lodge",
        coords: "-33.9074,18.4169",
        note: "回房后把当天票据/截图导入“行程资料”，并顺手核对后续航段机票资料，次日会更轻松。",
        docKey: "flight",
        docLabel: "机票资料（本地）",
        subItems: [],
      },
    ],
  },
  "2026-02-20": {
    title: "桌山 + Bo-Kaap（城市轻徒步日）",
    subtitle: "上午冲桌山，下午彩色街拍照，晚餐回 V&A Waterfront 稳定收尾",
    summaryText: "08:00 出门准备 -> 09:00 桌山三连查 -> 09:30 桌山缆车观景 -> 15:30 Bo-Kaap -> 18:00 Waterfront 晚餐",
    extraRouteActions: [
      {
        label: "桌山实时状态与排队（官方）",
        href: "https://www.tablemountain.net/",
      },
      {
        label: "桌山购票（官方）",
        href: "https://www.tablemountain.net/plan-your-visit/buy-tickets",
      },
      {
        label: "桌山票价（官方）",
        href: "https://www.tablemountain.net/plan-your-visit/ticket-prices/",
      },
      {
        label: "Fast Track 说明（官方）",
        href: "https://www.tablemountain.net/plan-your-visit/fast-track",
      },
      {
        label: "Bo-Kaap 彩色街（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Bo-Kaap+Cape+Town",
      },
      {
        label: "Waterfront 餐厅检索",
        href: "https://www.google.com/maps/search/?api=1&query=restaurants+in+V%26A+Waterfront+Cape+Town",
      },
    ],
    warnings: [
      "先做“桌山三连查”：开放状态 + Lower/Upper waiting times + webcam 能见度；出现小时级排队就切 Plan B。",
      "桌山山顶风和能见度变化快：随身带防风外套、防晒、水和零食，别走远离主观景区的线路。",
      "Bo-Kaap 建议只白天逛，天色变暗就回撤；拍照时避免长时间高举手机在路口停留。",
      "带娃原则：风大时牵手，悬崖/边缘拍照不追极限角度，行程以节奏稳定优先。",
      "Plan B 不降级：上午改 Kirstenbosch 或 Waterfront 室内项目，下午 Bo-Kaap 与晚餐安排不变。",
    ],
    itinerary: [
      {
        id: 1,
        time: "08:00-09:00",
        title: "早餐 + 出门准备",
        place: "V&A Waterfront / 酒店",
        coords: "-33.9074,18.4169",
        note: "早餐吃饱，出门前把防风层、防晒、水和孩子零食一次性打包，避免现场反复翻包。",
        subItems: [
          {
            name: "随身包清单",
            detail: "薄羽绒或防风外套、防晒、饮水、小零食、充电宝。",
          },
          {
            name: "支付策略",
            detail: "刷卡为主，现金只带少量应急。",
          },
        ],
      },
      {
        id: 2,
        time: "09:00-09:10",
        title: "桌山三连查（决定今天冲不冲）",
        place: "出发前在线确认",
        coords: "",
        note: "先看开放状态与排队时长，再看 webcam 能见度；若已小时级等待，立刻切 Plan B，不把好心情押在排队上。",
        subItems: [
          {
            name: "检查项 1",
            detail: "Open/Closed、首末班、Lower/Upper waiting times。",
            url: "https://www.tablemountain.net/",
          },
          {
            name: "检查项 2",
            detail: "桌布云与山顶可见度。",
            url: "https://www.tablemountain.net/",
          },
          {
            name: "检查项 3",
            detail: "若等待时间爆表，上午切换 Kirstenbosch 或 Waterfront 室内保底。",
          },
        ],
      },
      {
        id: 3,
        time: "09:30-12:00",
        title: "桌山缆车上山 + 山顶平缓观景段",
        place: "Table Mountain Aerial Cableway",
        coords: "-33.9628,18.4039",
        note: "到下站先洗手间再排队；上山后只走轻松观景段，避免临时升级成全家徒步挑战。",
        subItems: [
          {
            name: "购票入口",
            detail: "优先在线购票，现场排队波动大。",
            url: "https://www.tablemountain.net/plan-your-visit/buy-tickets",
          },
          {
            name: "Fast Track 提醒",
            detail: "官方说明 Fast Track 仅在上下站售票处购买，不在线售卖。",
            url: "https://www.tablemountain.net/plan-your-visit/fast-track",
          },
          {
            name: "步行边界",
            detail: "能见度或风力变差时，立刻缩短停留并回缆车站。",
          },
        ],
      },
      {
        id: 4,
        time: "12:30-14:00",
        title: "午餐补给（就近省事 or Kloof Street）",
        place: "桌山下站 / Kloof Street & Gardens",
        coords: "-33.9288,18.4124",
        note: "今天节奏不求多，午餐目标是快速回血。就近吃最稳，想吃得更好再去 Kloof Street。",
        subItems: [
          {
            name: "选项 A（省时）",
            detail: "下山后在下站周边官方餐饮点快速解决。",
            url: "https://www.tablemountain.net/come-explore/food-and-beverage",
          },
          {
            name: "选项 B（更好吃）",
            detail: "去 Kloof Street/Gardens，热门店建议先订位。",
            url: "https://www.kloofstreethouse.co.za/reservations/",
          },
        ],
      },
      {
        id: 5,
        time: "14:00-15:20",
        title: "机动时段（Plan B / 回酒店短休）",
        place: "Kirstenbosch 或 V&A Waterfront",
        coords: "-33.9875,18.4327",
        note: "如果上午没上桌山，这里直接执行 Plan B；若上午顺利完成，就回酒店休整给下午和晚餐留体力。",
        subItems: [
          {
            name: "Plan B 1",
            detail: "Kirstenbosch 植物园，风大天气下体验更稳。",
            url: "https://www.google.com/maps/search/?api=1&query=Kirstenbosch+National+Botanical+Garden",
          },
          {
            name: "Plan B 2",
            detail: "Waterfront 室内项目，完全不受风影响。",
            url: "https://www.google.com/maps/search/?api=1&query=V%26A+Waterfront+Cape+Town",
          },
        ],
      },
      {
        id: 6,
        time: "15:30-17:00",
        title: "Bo-Kaap 彩色街区慢走拍照",
        place: "Bo-Kaap",
        coords: "-33.9187,18.4128",
        note: "挑 2-3 条彩色街拍照就够，不追求全区打卡；保持移动和节奏，避免在单点久留。",
        subItems: [
          {
            name: "拍照策略",
            detail: "先取景再拍，不边走边长时间举手机录像。",
          },
          {
            name: "体力策略",
            detail: "坡多时宁可少走几条街，也不要把晚餐前体力透支。",
          },
        ],
      },
      {
        id: 7,
        time: "17:00-18:00",
        title: "回 Waterfront 短休 + 整理照片",
        place: "Breakwater Lodge / V&A Waterfront",
        coords: "-33.9074,18.4169",
        note: "把步行模式切回休息模式，先喝水、补防晒、整理随身物品，晚餐体验会更顺。",
        subItems: [],
      },
      {
        id: 8,
        time: "18:00-20:00",
        title: "Waterfront 晚餐（早吃早收工）",
        place: "V&A Waterfront",
        coords: "-33.9037,18.4219",
        note: "18:00 左右开吃最稳，避免拖太晚；以“近、快、不折腾”为优先级。",
        subItems: [
          {
            name: "选项 1",
            detail: "Willoughby & Co（海鲜/寿司，热门，建议早点到）。",
            url: "https://www.waterfront.co.za/food-and-drinks/willoughby-co/",
          },
          {
            name: "选项 2",
            detail: "Den Anker（比利时风格，家庭友好）。",
            url: "https://www.tripadvisor.com/Restaurant_Review-g312659-d1145847-Reviews-Den_Anker-Cape_Town_Central_Western_Cape.html",
          },
        ],
      },
      {
        id: 9,
        time: "20:00-20:30",
        title: "收尾动作：为 2/21 退房+好望角日做预备",
        place: "Breakwater Lodge",
        coords: "-33.9074,18.4169",
        note: "今晚只做两件事：确认明早退房动线、把护照和贵重物品单独放好，次日能显著降压。",
        subItems: [
          {
            name: "明日硬约束",
            detail: "11:00 退房、19:40 起飞，16:30 前必须启动回机场回撤。",
          },
        ],
      },
    ],
  },
  "2026-02-21": {
    title: "好望角日 + 晚飞约堡（退房还车版）",
    subtitle: "早出发看海角主线，下午硬回撤，机场加油还车不赌运气",
    summaryText:
      "07:30 早餐打包 -> 08:30 退房出发 -> 11:10 Cape Point/好望角 -> 16:00 回撤 -> 17:15 Engen 加油 -> 17:30 Hertz 还车 -> 19:40 起飞",
    extraRouteActions: [
      {
        label: "Chapman's Peak 过路费",
        href: "https://www.chapmanspeakdrive.co.za/tariff/standard.html",
      },
      {
        label: "SANParks 门票与支付规则",
        href: "https://www.sanparks.org/parks/table-mountain/rates-entry-fees",
      },
      {
        label: "SANParks 闸口开放时间",
        href: "https://www.sanparks.org/parks/table-mountain/travel/entrance-gates",
      },
      {
        label: "Cape Point 访客说明",
        href: "https://capepoint.co.za/visitus/",
      },
      {
        label: "Engen Airport Convenience（加油）",
        href: "https://www.engen.co.za/store-details?loc=Engen+Airport+Convenience+Centre&locationid=033c0181-9668-4098-9d94-c95b7ac069e7",
      },
      {
        label: "Hertz Cape Town Airport（还车）",
        href: "https://www.hertz.co.za/car-rental-locations/cape-town-airport/",
      },
    ],
    warnings: [
      "硬约束：11:00 退房、19:40 起飞；今日原则是早出发、早回撤，最晚 16:30 开始往机场方向走。",
      "Cape Point 与 Boulders 入口按 SANParks 规则执行无现金支付，默认刷卡；Cape Point 常见按车一次结算。",
      "只在正规观景停车位停靠，车内不留任何可见物品；拍完即走，不在偏僻路肩久留。",
      "海角风大且有野生动物，严禁喂食；孩子全程手牵手，不走野路，不靠近悬崖边缘。",
      "今天体验上限由“回机场缓冲”决定：17:15 前到机场区域，17:30 前完成加油更稳。",
    ],
    itinerary: [
      {
        id: 1,
        time: "07:30-08:30",
        title: "早餐 + 打包 + 车内清空可见物品",
        place: "Breakwater Lodge",
        coords: "-33.9074,18.4169",
        note: "早餐吃饱并一次性整理贵重物品；护照、钱包、手机、相机、充电宝全部随身。",
        subItems: [
          {
            name: "重点检查",
            detail: "后备箱和后排不留可见背包、电脑包、相机包。",
          },
          {
            name: "今日时间闸门",
            detail: "16:30 回撤、17:15 到机场区域、19:40 起飞。",
          },
        ],
      },
      {
        id: 2,
        time: "08:30-09:00",
        title: "退房 + 装车出发",
        place: "Breakwater Lodge -> 开普半岛方向",
        coords: "-33.9074,18.4169",
        note: "退房后不回头补东西，直接进入半岛动线；今天每个可选站都可跳过，主线只保留高价值点。",
        docKey: "hotel",
        docLabel: "酒店资料（本地）",
        subItems: [],
      },
      {
        id: 3,
        time: "09:00-09:30",
        title: "Hout Bay（可选短停）",
        place: "Hout Bay",
        coords: "-34.0436,18.3516",
        note: "只做 20-30 分钟短停：上洗手间、买咖啡、让全家进入状态；若出发偏晚可直接跳过。",
        subItems: [
          {
            name: "跳过条件",
            detail: "若 09:20 后仍未到 Hout Bay，直接进入 Chapman's Peak 路段。",
          },
        ],
      },
      {
        id: 4,
        time: "09:40-10:10",
        title: "Chapman's Peak Drive 观景公路",
        place: "Chapman's Peak Drive",
        coords: "-34.0783,18.3586",
        note: "选择 1 个正规观景位短停 10 分钟即可；目标是拍到代表性海景，不做多点反复停靠。",
        subItems: [
          {
            name: "费用参考",
            detail: "小车标准过路费以官方现场为准（常见为 R66）。",
            url: "https://www.chapmanspeakdrive.co.za/tariff/standard.html",
          },
          {
            name: "停车原则",
            detail: "只停官方观景位，不在偏僻路肩临停。",
          },
        ],
      },
      {
        id: 5,
        time: "10:20-10:40",
        title: "Noordhoek 短休补给",
        place: "Noordhoek",
        coords: "-34.0999,18.3576",
        note: "完成洗手间和零食补给，给 11:10-14:00 的海角主菜段做准备。",
        subItems: [],
      },
      {
        id: 6,
        time: "11:10-14:00",
        title: "Cape Point + 好望角主游玩",
        place: "Cape Point / Cape of Good Hope",
        coords: "-34.2489,18.4742",
        note: "先走灯塔方向再去好望角标志点，保持主线路线，不在体力和风力不友好区域逗留。",
        subItems: [
          {
            name: "入园支付",
            detail: "入口无现金，刷卡支付；按现场与官方规则执行。",
            url: "https://www.sanparks.org/parks/table-mountain/rates-entry-fees",
          },
          {
            name: "闸口时间",
            detail: "出入园时间按月份变化，避免卡着关门离场。",
            url: "https://www.sanparks.org/parks/table-mountain/travel/entrance-gates",
          },
          {
            name: "午餐策略",
            detail: "优先园内 Two Oceans Restaurant 或自备简餐，减少折返。",
          },
        ],
      },
      {
        id: 7,
        time: "14:30-15:30",
        title: "Boulders 企鹅站（可选甜点）",
        place: "Boulders Beach",
        coords: "-34.1965,18.4516",
        note: "若 15:00 前仍在 Cape Point 深处或孩子明显疲劳，直接跳过此站，优先保证回撤时间。",
        subItems: [
          {
            name: "适合停留",
            detail: "30-45 分钟足够，拍到企鹅后即回撤。",
          },
        ],
      },
      {
        id: 8,
        time: "16:00-17:00",
        title: "硬回撤：往 CPT 机场方向走",
        place: "开普半岛 -> Cape Town International Airport",
        coords: "-33.9700,18.6021",
        note: "16:30 是最晚回撤线，不再临时加点。路况不确定时，优先保证还车与值机缓冲。",
        subItems: [
          {
            name: "今日策略",
            detail: "不追求“刚好”，只追求“宽松”。",
          },
        ],
      },
      {
        id: 9,
        time: "17:15-17:30",
        title: "Engen 机场站加满油 + 拍照留证据",
        place: "Engen Airport Convenience Centre",
        coords: "-33.9720,18.6036",
        note: "加到跳枪即停，拿收据并拍油表满格 + 车牌与加油站背景，随后直接去 Hertz 还车区。",
        subItems: [
          {
            name: "四步动作",
            detail: "跳枪即停、拿收据、拍两张证据照、确认油品不加错。",
          },
          {
            name: "24 小时站点",
            detail: "适合晚航班前的稳态加油。",
            url: "https://www.engen.co.za/store-details?loc=Engen+Airport+Convenience+Centre&locationid=033c0181-9668-4098-9d94-c95b7ac069e7",
          },
        ],
      },
      {
        id: 10,
        time: "17:30-17:45",
        title: "进入 Car Rental Returns -> Hertz 还车",
        place: "Hertz Cape Town International Airport (Ring Rd)",
        coords: "-33.9688,18.6017",
        note: "路上优先跟“Car Rentals / Car Rental Returns”路牌；入场后按 Hertz 车道停放并完成油量/里程确认。",
        docKey: "hertz",
        docLabel: "租车资料（本地）",
        subItems: [
          {
            name: "还车后动作",
            detail: "确认无遗留行李，保存还车凭证截图。",
            url: "https://www.hertz.co.za/car-rental-locations/cape-town-airport/",
          },
        ],
      },
      {
        id: 11,
        time: "17:45-19:10",
        title: "进航站楼晚餐 + 值机安检",
        place: "Cape Town International Airport (CPT)",
        coords: "-33.9700,18.6021",
        note: "在机场内解决晚餐最稳；优先完成值机和安检，再处理购物等可选动作。",
        docKey: "flight",
        docLabel: "机票资料（本地）",
        subItems: [
          {
            name: "航班节点",
            detail: "19:40 飞约堡，建议 17:15 前已到机场区域。",
          },
        ],
      },
    ],
  },
  "2026-02-22": {
    title: "约翰内斯堡返程日（SQ479 国际段）",
    subtitle: "赶飞机友好型：把变量清零，11:40 前到 JNB A 航站楼",
    summaryBadge: "返程关键日",
    summaryFocus: "返程闸门：10:30 退房｜11:40 前到 A 航站楼｜13:40 SQ479 起飞",
    summaryText:
      "07:30 早餐+收拾 -> 09:00 近场轻量活动 -> 10:30 退房 -> 11:10 动身去 A 航站楼 -> 11:40 前到达 -> 13:40 SQ479 起飞",
    extraRouteActions: [
      {
        label: "Southern Sun OR Tambo（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=Southern+Sun+OR+Tambo+International+Airport",
      },
      {
        label: "JNB Terminal A（地图）",
        href: "https://www.google.com/maps/search/?api=1&query=OR+Tambo+International+Airport+Terminal+A",
      },
      {
        label: "Singapore Airlines SQ479（航班查询）",
        href: "https://www.singaporeair.com/",
      },
    ],
    warnings: [
      "硬约束：SQ479 于 13:40 从 JNB（OR Tambo A 航站楼）起飞；国际段建议至少提前 2 小时到达航站楼，目标 11:40 前到位。",
      "酒店为 Southern Sun OR Tambo International Airport：2/21 入住、2/22 退房，退房时段 04:00-11:00，且订单含早餐。",
      "今日不建议进市区：周日路况与安检排队波动大，优先在酒店周边或直接去航站楼。",
      "最晚 11:30 到 A 航站楼；推荐 11:00-11:15 启动转场，宁可早到不压线。",
      "若使用酒店 shuttle，前一晚务必确认班车点位、发车间隔及是否要预约，避免临场信息不完整。",
    ],
    itinerary: [
      {
        id: 1,
        time: "07:30-09:00",
        title: "酒店早餐 + 清场式收拾",
        place: "Southern Sun OR Tambo International Airport",
        coords: "-26.1373,28.2410",
        note: "早餐已含在订单里，建议吃够蛋白质+碳水；核心目标是把变量清零，不把找物品这件事留到机场。",
        docKey: "hotel",
        docLabel: "酒店资料（本地）",
        subItems: [
          {
            name: "早餐策略",
            detail: "优先“能撑住排队和安检”的组合，减少机场内二次采购与排队。",
          },
          {
            name: "收拾策略",
            detail: "按“随身证件包 / 机舱保暖包 / 托运行李”三层打包，避免登机前重复翻箱。",
          },
        ],
      },
      {
        id: 2,
        time: "09:00-10:00",
        title: "轻量活动（仅近场，不进市区）",
        place: "酒店内 / 机场周边",
        coords: "-26.1373,28.2410",
        note: "根据体力二选一：酒店内休闲，或提前前往航站楼；今天不追景点，只追稳定。",
        subItems: [
          {
            name: "A 方案：酒店内休闲",
            detail: "咖啡、短走、孩子放电但不暴走，保持可随时回撤状态。",
          },
          {
            name: "B 方案：提前去航站楼",
            detail: "直接进入“等登机”节奏，换取更大时间缓冲。",
          },
        ],
      },
      {
        id: 3,
        time: "10:00-10:30",
        title: "退房前最后一轮口令检查",
        place: "酒店房间 / 大堂",
        coords: "-26.1373,28.2410",
        note: "按口令逐项过一遍：护照签证、值机信息、银行卡、充电器、转换插头、外套、药物、眼镜、耳机、行李牌与行李锁。",
        subItems: [
          {
            name: "证件组",
            detail: "护照、签证页、登机牌/值机确认、信用卡与少量现金。",
          },
          {
            name: "机舱组",
            detail: "孩子外套、药品、眼镜、耳机、充电器和转换插头。",
          },
        ],
      },
      {
        id: 4,
        time: "10:30-10:45",
        title: "退房 + 行李处理",
        place: "Southern Sun OR Tambo 前台",
        coords: "-26.1373,28.2410",
        note: "11:00 前完成退房最稳；若不立刻去机场，优先询问前台暂存行李与 shuttle 具体安排。",
        subItems: [
          {
            name: "Shuttle 三问",
            detail: "班车点位在哪里？大约多久一班？是否需要提前预约？",
          },
          {
            name: "行李策略",
            detail: "立即去机场就直接带走；若短暂停留则前台暂存，减少随身负担。",
          },
        ],
      },
      {
        id: 5,
        time: "10:45-11:10",
        title: "早午餐补给（稳妥型 / 效率型）",
        place: "酒店咖啡厅 / 航站楼餐饮区",
        coords: "-26.1373,28.2410",
        note: "今天餐饮只看执行效率：酒店吃更稳，航站楼吃更灵活但排队风险更高。",
        subItems: [
          {
            name: "稳妥型",
            detail: "在酒店或机场酒店咖啡厅快速吃完再动身，节奏可控。",
          },
          {
            name: "效率型",
            detail: "到 A 航站楼后再补给，但要预留排队不确定性。",
          },
        ],
      },
      {
        id: 6,
        time: "11:10-11:30",
        title: "转场：前往 JNB A 航站楼",
        place: "Southern Sun OR Tambo -> JNB Terminal A",
        coords: "-26.1367,28.2410",
        note: "目标不是“刚好 11:40 到”，而是“提前到并稳定进入值机流程”；11:00-11:15 动身最稳。",
        subItems: [
          {
            name: "时间目标",
            detail: "11:30 前到航站楼，11:40 视为最后稳态到达线。",
          },
        ],
      },
      {
        id: 7,
        time: "11:40-13:40",
        title: "值机 + 安检 + 出境 + 登机（SQ479）",
        place: "OR Tambo International Airport Terminal A",
        coords: "-26.1367,28.2410",
        note: "国际段排队波动更大，先确认登机口再安排用餐/购物；登机口若调整，以现场屏幕与航司信息为准。",
        docKey: "flight",
        docLabel: "机票资料（本地）",
        subItems: [
          {
            name: "登机策略",
            detail: "先完成值机与安检，再做可选动作，避免因临时改口影响节奏。",
          },
          {
            name: "关键航班信息",
            detail: "SQ479，13:40 起飞（JNB A 航站楼）。",
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
const DATE_SELECT_OPTIONS = [SUMMARY_VIEW_KEY, ...DATE_OPTIONS];

function formatDateLabel(dateStr) {
  if (dateStr === SUMMARY_VIEW_KEY) return "汇总页面";
  const { year, month, day } = parseDateParts(dateStr);
  const dateObj = new Date(year, month - 1, day);
  return `${dateStr}（${WEEKDAY_CN[dateObj.getDay()]}）`;
}

function viewKeyToHash(viewKey) {
  if (viewKey === SUMMARY_VIEW_KEY) return SUMMARY_HASH;
  return viewKey;
}

function hashToViewKey(hashValue) {
  if (hashValue === SUMMARY_HASH) return SUMMARY_VIEW_KEY;
  if (DATE_OPTIONS.includes(hashValue)) return hashValue;
  return "";
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

function parseCoordPair(coords) {
  if (!isValidCoordPair(coords)) return null;
  const [latRaw, lngRaw] = coords.split(",");
  return {
    lat: Number(latRaw),
    lng: Number(lngRaw),
  };
}

function buildGoogleEmbedUrl(query, zoom) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
}

function estimateOverviewZoom(span) {
  if (span >= 25) return 4;
  if (span >= 12) return 5;
  if (span >= 6) return 6;
  if (span >= 3) return 7;
  if (span >= 1.5) return 8;
  if (span >= 0.7) return 9;
  return 10;
}

function buildRouteOverview(coords) {
  const points = coords.map((item) => parseCoordPair(item)).filter(Boolean);
  if (points.length === 0) {
    return { query: SOUTH_AFRICA_CENTER, zoom: 5 };
  }

  let minLat = points[0].lat;
  let maxLat = points[0].lat;
  let minLng = points[0].lng;
  let maxLng = points[0].lng;

  points.forEach(({ lat, lng }) => {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  });

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;
  const span = Math.max(maxLat - minLat, maxLng - minLng);

  return {
    query: `${centerLat.toFixed(4)},${centerLng.toFixed(4)}`,
    zoom: estimateOverviewZoom(span),
  };
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
      embedSrc: buildGoogleEmbedUrl(SOUTH_AFRICA_CENTER, 5),
      action: null,
    };
  }

  if (coords.length === 1) {
    const only = coords[0];
    return {
      embedSrc: buildGoogleEmbedUrl(only, 12),
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
  const overview = buildRouteOverview(coords);

  return {
    embedSrc: buildGoogleEmbedUrl(overview.query, overview.zoom),
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

function getDailyHighlights(plan) {
  if (typeof plan.summaryText === "string" && plan.summaryText.trim()) {
    return plan.summaryText.trim();
  }
  const rows = Array.isArray(plan.itinerary) ? plan.itinerary.slice(0, 3) : [];
  if (rows.length === 0) return "待补充";

  return rows
    .map((row) => `${row.time} ${row.title}`)
    .join(" -> ");
}

function getDateRangeFrom(startDate) {
  const startIndex = DATE_OPTIONS.indexOf(startDate);
  if (startIndex < 0) return [...DATE_OPTIONS];
  return DATE_OPTIONS.slice(startIndex);
}

function getRemarkSummaryText(startDate) {
  const dates = getDateRangeFrom(startDate);
  const sections = [];

  dates.forEach((dateStr) => {
    const remarks = ensureDateRemarks(dateStr);
    const plan = getPlanForDate(dateStr);
    const rows = Object.entries(remarks)
      .map(([eventId, text]) => ({ eventId, text: String(text || "").trim() }))
      .filter((item) => item.text);

    if (rows.length === 0) return;

    const details = rows
      .map((item) => {
        const event = plan.itinerary.find((it) => String(it.id) === item.eventId);
        const eventLabel = event ? `${event.time} ${event.title}` : `行程 ${item.eventId}`;
        return `- ${eventLabel}\n${item.text}`;
      })
      .join("\n\n");

    sections.push(`${dateStr}\n${details}`);
  });

  if (sections.length === 0) {
    return "南非行程备注汇总\n\n当前范围内还没有备注内容。";
  }

  const now = new Date();
  const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return `南非行程备注汇总\n生成时间：${timestamp}\n\n${sections.join("\n\n")}`;
}

async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function normalizeNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const n = Number(value.trim());
  return Number.isFinite(n) ? n : null;
}

function parseCoordsFromUrl(url) {
  if (!url || typeof url !== "string") return { lat: null, lng: null };

  const patterns = [
    /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
    /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/,
    /[?&]query=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/,
  ];

  for (const pattern of patterns) {
    const matched = url.match(pattern);
    if (!matched) continue;
    return { lat: normalizeNumber(matched[1]), lng: normalizeNumber(matched[2]) };
  }

  return { lat: null, lng: null };
}

function isSouthAfricaCoords(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  return (
    lat >= SOUTH_AFRICA_BOUNDS.latMin &&
    lat <= SOUTH_AFRICA_BOUNDS.latMax &&
    lng >= SOUTH_AFRICA_BOUNDS.lngMin &&
    lng <= SOUTH_AFRICA_BOUNDS.lngMax
  );
}

function hasSouthAfricaHint(text) {
  const normalized = String(text || "").toLowerCase();
  return SOUTH_AFRICA_TEXT_HINTS.some((hint) => normalized.includes(hint));
}

function normalizeMapPlace(input) {
  const name = String(input.name || "").trim();
  const address = String(input.address || "").trim();
  const url = String(input.url || "").trim();

  let lat = normalizeNumber(input.lat);
  let lng = normalizeNumber(input.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    const fromUrl = parseCoordsFromUrl(url);
    if (Number.isFinite(fromUrl.lat) && Number.isFinite(fromUrl.lng)) {
      lat = fromUrl.lat;
      lng = fromUrl.lng;
    }
  }

  return {
    name: name || "未命名地点",
    address,
    url,
    lat: Number.isFinite(lat) ? lat : null,
    lng: Number.isFinite(lng) ? lng : null,
  };
}

function isSouthAfricaPlace(place) {
  if (isSouthAfricaCoords(place.lat, place.lng)) return true;
  return hasSouthAfricaHint(`${place.name} ${place.address} ${place.url}`);
}

function dedupeMapPlaces(places) {
  const seen = new Set();
  const output = [];

  places.forEach((rawPlace) => {
    const place = normalizeMapPlace(rawPlace);
    if (!isSouthAfricaPlace(place)) return;

    const coordKey = Number.isFinite(place.lat) && Number.isFinite(place.lng) ? `${place.lat.toFixed(6)},${place.lng.toFixed(6)}` : "";
    const key = `${place.name.toLowerCase()}|${place.address.toLowerCase()}|${coordKey}|${place.url}`;
    if (seen.has(key)) return;
    seen.add(key);
    output.push(place);
  });

  output.sort((a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"));
  return output;
}

function parsePlacesFromText(text) {
  const rows = String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return rows.map((line) => {
    const urlMatch = line.match(/https?:\/\/\S+/i);
    const url = urlMatch ? urlMatch[0] : "";
    const name = url ? line.replace(url, "").replace(/[-|：:]\s*$/, "").trim() : line;
    const coords = parseCoordsFromUrl(url);

    return {
      name: name || "未命名地点",
      address: line,
      url,
      lat: coords.lat,
      lng: coords.lng,
    };
  });
}

function pickString(obj, keys) {
  for (const key of keys) {
    if (typeof obj[key] === "string" && obj[key].trim()) {
      return obj[key].trim();
    }
  }
  return "";
}

function pickNumber(obj, keys) {
  for (const key of keys) {
    const n = normalizeNumber(obj[key]);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function extractPlaceFromObject(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return null;

  const name = pickString(obj, ["name", "title", "label", "placeName"]);
  const address = pickString(obj, ["address", "formattedAddress", "vicinity", "description"]);
  const url = pickString(obj, ["url", "mapsUrl", "googleMapsUri", "link"]);

  let lat = pickNumber(obj, ["lat", "latitude"]);
  let lng = pickNumber(obj, ["lng", "lon", "longitude"]);

  if ((!Number.isFinite(lat) || !Number.isFinite(lng)) && obj.location && typeof obj.location === "object") {
    lat = pickNumber(obj.location, ["lat", "latitude"]);
    lng = pickNumber(obj.location, ["lng", "lon", "longitude"]);
  }

  if ((!Number.isFinite(lat) || !Number.isFinite(lng)) && obj.coordinates && typeof obj.coordinates === "object") {
    lat = pickNumber(obj.coordinates, ["lat", "latitude"]);
    lng = pickNumber(obj.coordinates, ["lng", "lon", "longitude"]);
  }

  if (!name && !address && !url && !Number.isFinite(lat) && !Number.isFinite(lng)) {
    return null;
  }

  return {
    name: name || "未命名地点",
    address,
    url,
    lat,
    lng,
  };
}

function collectPlacesFromJson(value, collector) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectPlacesFromJson(item, collector));
    return;
  }

  if (!value || typeof value !== "object") return;

  const place = extractPlaceFromObject(value);
  if (place) collector.push(place);

  Object.values(value).forEach((nested) => {
    if (nested && typeof nested === "object") {
      collectPlacesFromJson(nested, collector);
    }
  });
}

function mergeMapPlaces(incomingPlaces) {
  mapPlacesSouthAfrica = dedupeMapPlaces([...mapPlacesSouthAfrica, ...incomingPlaces]);
  localStorage.setItem(STORAGE_KEYS.mapPlacesSouthAfrica, JSON.stringify(mapPlacesSouthAfrica));
}

function clearMapPlaces() {
  mapPlacesSouthAfrica = [];
  localStorage.removeItem(STORAGE_KEYS.mapPlacesSouthAfrica);
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
    return "";
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
        ? `<a class="btn" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">打开链接</a>`
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
  const titleEl = document.getElementById("currentTitle");
  const subtitleEl = document.getElementById("currentSubtitle");

  if (dateStr === SUMMARY_VIEW_KEY) {
    titleEl.textContent = "南非行程汇总";
    subtitleEl.textContent = "";
    document.title = "南非旅行助手 · 汇总";
    return;
  }

  titleEl.textContent = plan.title;
  subtitleEl.textContent = plan.subtitle;
  document.title = `南非旅行助手 · ${dateStr}`;
}

function toggleViewCards(showSummary) {
  document.querySelectorAll(".daily-card").forEach((card) => {
    card.hidden = showSummary;
  });

  document.querySelectorAll(".summary-card").forEach((card) => {
    card.hidden = !showSummary;
  });
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

  titleEl.textContent = "行程资料导入（隐私）";
  hintEl.textContent = `${dateStr} 可上传当天资料（PDF/图片等），仅保存在本机浏览器。`;
  panelEl.innerHTML = `
    <label>${dateStr} 行程资料（可多选）
      <input type="file" id="itineraryDocsInput" multiple />
    </label>
  `;
}

function renderDocs(dateStr) {
  const docsEl = document.getElementById("docs");
  docsEl.innerHTML = "";

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
}

function renderSummaryItineraryCard() {
  const listEl = document.getElementById("summaryItineraryList");
  listEl.innerHTML = "";

  DATE_OPTIONS.forEach((dateStr) => {
    const plan = getPlanForDate(dateStr);
    const badgeHtml =
      typeof plan.summaryBadge === "string" && plan.summaryBadge.trim()
        ? `<div class="summary-row-badge">${escapeHtml(plan.summaryBadge.trim())}</div>`
        : "";
    const focusHtml =
      typeof plan.summaryFocus === "string" && plan.summaryFocus.trim()
        ? `<p class="summary-row-focus">${escapeHtml(plan.summaryFocus.trim())}</p>`
        : "";

    const li = document.createElement("li");
    li.innerHTML = `
      ${badgeHtml}
      <div class="summary-row-title">${formatDateLabel(dateStr)}</div>
      <p class="summary-row-detail">${escapeHtml(getDailyHighlights(plan))}</p>
      ${focusHtml}
    `;
    listEl.appendChild(li);
  });
}

function renderEmbassyCard() {
  const listEl = document.getElementById("embassyContacts");
  listEl.innerHTML = "";

  EMBASSY_CONTACTS.forEach((row) => {
    const li = document.createElement("li");
    const lines = [
      row.address ? `地址：${row.address}` : "",
      row.servicePhone ? `业务电话：${row.servicePhone}` : "",
      `领保应急：${row.emergencyPhone}`,
    ]
      .filter(Boolean)
      .join("<br/>");

    li.innerHTML = `
      <div class="summary-row-title">${escapeHtml(row.name)}</div>
      <p class="summary-row-detail">${lines}</p>
      <a class="btn" href="${escapeHtml(row.website)}" target="_blank" rel="noopener">打开官网</a>
    `;
    listEl.appendChild(li);
  });
}

function renderFuelGuideCard() {
  const listEl = document.getElementById("fuelGuideList");
  listEl.innerHTML = "";

  FUEL_GUIDE_STEPS.forEach((row) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="summary-row-title">${escapeHtml(row.title)}</div>
      <p class="summary-row-detail">${escapeHtml(row.detail)}</p>
    `;
    listEl.appendChild(li);
  });
}

function renderSummaryDocsListByDate(dateStr) {
  const statusEl = document.getElementById("summaryDocsStatus");
  const listEl = document.getElementById("summaryDocsList");
  if (!statusEl || !listEl) return;

  listEl.innerHTML = "";
  if (!DATE_OPTIONS.includes(dateStr)) {
    statusEl.textContent = "请先选择日期";
    return;
  }

  const rows = ensureItineraryDocs(dateStr);
  statusEl.textContent = `${dateStr} 已添加 ${rows.length} 个附件（支持多选上传）`;

  if (rows.length === 0) {
    const li = document.createElement("li");
    li.textContent = "暂无附件，点击上方上传可一次选多个文件。";
    listEl.appendChild(li);
    return;
  }

  rows.forEach((row) => {
    const li = document.createElement("li");
    li.innerHTML = `<button class="btn itinerary-doc-btn" data-doc-date="${dateStr}" data-doc-id="${row.id}">${escapeHtml(row.name)}</button>`;
    listEl.appendChild(li);
  });
}

function renderSummaryDocsOptions() {
  const selectEl = document.getElementById("summaryDocsDate");
  if (!selectEl) return;

  selectEl.innerHTML = DATE_OPTIONS.map(
    (dateStr) => `<option value="${dateStr}">${formatDateLabel(dateStr)}</option>`
  ).join("");

  if (!DATE_OPTIONS.includes(selectEl.value)) {
    selectEl.value = DATE_OPTIONS[0];
  }

  renderSummaryDocsListByDate(selectEl.value);
}

function renderSummaryRemarkStartOptions() {
  const selectEl = document.getElementById("summaryRemarkStartDate");
  if (!selectEl) return;

  selectEl.innerHTML = DATE_OPTIONS.map(
    (dateStr) => `<option value="${dateStr}">${formatDateLabel(dateStr)}</option>`
  ).join("");

  if (!DATE_OPTIONS.includes(selectEl.value)) {
    selectEl.value = DATE_OPTIONS[0];
  }
}

function renderTipCultureCard() {
  const listEl = document.getElementById("tipCultureList");
  listEl.innerHTML = "";

  TIP_CULTURE_ITEMS.forEach((row) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="summary-row-title">${escapeHtml(row.title)}</div>
      <p class="summary-row-detail">${escapeHtml(row.detail)}</p>
    `;
    listEl.appendChild(li);
  });
}

function renderMapPlacesList() {
  const statusEl = document.getElementById("mapPlacesStatus");
  const listEl = document.getElementById("mapPlacesList");
  if (!statusEl || !listEl) return;

  listEl.innerHTML = "";
  if (mapPlacesSouthAfrica.length === 0) {
    statusEl.textContent = "尚未提取到南非地点";
    return;
  }

  statusEl.textContent = `已提取 ${mapPlacesSouthAfrica.length} 个南非地点`;

  mapPlacesSouthAfrica.forEach((place) => {
    const location = Number.isFinite(place.lat) && Number.isFinite(place.lng) ? `${place.lat}, ${place.lng}` : "坐标未提供";
    const mapUrl = place.url || (Number.isFinite(place.lat) && Number.isFinite(place.lng) ? mapsSearchUrl(`${place.lat},${place.lng}`, place.name) : "");

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="summary-row-title">${escapeHtml(place.name)}</div>
      <p class="summary-row-detail">${escapeHtml(place.address || "")}<br/>${escapeHtml(location)}</p>
      ${mapUrl ? `<a class="btn" href="${escapeHtml(mapUrl)}" target="_blank" rel="noopener">打开地图</a>` : ""}
    `;
    listEl.appendChild(li);
  });
}

function renderSummaryPage() {
  renderSummaryItineraryCard();
  renderEmbassyCard();
  renderFuelGuideCard();
  renderSummaryDocsOptions();
  renderSummaryRemarkStartOptions();
  renderMapPlacesList();
  renderTipCultureCard();
}

function renderDateOptions() {
  const dateSelect = document.getElementById("dateSelect");
  dateSelect.innerHTML = DATE_SELECT_OPTIONS.map(
    (dateStr) => `<option value="${dateStr}">${formatDateLabel(dateStr)}</option>`
  ).join("");
}

function updateDateSwitcherState() {
  const dateSelect = document.getElementById("dateSelect");
  const prevBtn = document.getElementById("prevDateBtn");
  const nextBtn = document.getElementById("nextDateBtn");

  const index = DATE_SELECT_OPTIONS.indexOf(activeDate);
  dateSelect.value = activeDate;
  prevBtn.disabled = index <= 0;
  nextBtn.disabled = index >= DATE_SELECT_OPTIONS.length - 1;
}

function renderActiveDate() {
  if (activeDate === SUMMARY_VIEW_KEY) {
    toggleViewCards(true);
    renderHeader(activeDate, null);
    renderSummaryPage();
    updateDateSwitcherState();
    return;
  }

  toggleViewCards(false);
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
  if (!DATE_SELECT_OPTIONS.includes(dateStr)) return;
  if (activeDate !== dateStr) {
    activeDate = dateStr;
  }

  renderActiveDate();

  if (syncHash) {
    const hashValue = viewKeyToHash(dateStr);
    if (window.location.hash !== `#${hashValue}`) {
      window.location.hash = hashValue;
    }
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

function loadMapPlaces() {
  const raw = localStorage.getItem(STORAGE_KEYS.mapPlacesSouthAfrica);
  if (!raw) {
    mapPlacesSouthAfrica = [];
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      mapPlacesSouthAfrica = [];
      return;
    }
    mapPlacesSouthAfrica = dedupeMapPlaces(parsed);
  } catch {
    mapPlacesSouthAfrica = [];
  }
}

function bindInputs() {
  const itineraryDocsInput = document.getElementById("itineraryDocsInput");

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
    const index = DATE_SELECT_OPTIONS.indexOf(activeDate);
    if (index <= 0) return;
    setActiveDate(DATE_SELECT_OPTIONS[index - 1]);
  });

  document.getElementById("nextDateBtn").addEventListener("click", () => {
    const index = DATE_SELECT_OPTIONS.indexOf(activeDate);
    if (index >= DATE_SELECT_OPTIONS.length - 1) return;
    setActiveDate(DATE_SELECT_OPTIONS[index + 1]);
  });

  window.addEventListener("hashchange", () => {
    const hashValue = window.location.hash.replace("#", "");
    const viewKey = hashToViewKey(hashValue);
    if (!viewKey) return;
    if (viewKey === activeDate) return;
    setActiveDate(viewKey, false);
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

function bindSummaryActions() {
  const buildBtn = document.getElementById("buildRemarksSummaryBtn");
  const shareBtn = document.getElementById("shareRemarksToNotesBtn");
  const startDateSelect = document.getElementById("summaryRemarkStartDate");
  const previewEl = document.getElementById("summaryRemarkPreview");
  const summaryDocsDateSelect = document.getElementById("summaryDocsDate");
  const summaryDocsInput = document.getElementById("summaryItineraryDocsInput");
  const placesFileInput = document.getElementById("mapPlacesJsonInput");
  const placesTextInput = document.getElementById("mapPlacesTextInput");
  const parseTextBtn = document.getElementById("parseMapPlacesTextBtn");
  const clearPlacesBtn = document.getElementById("clearMapPlacesBtn");

  if (buildBtn && startDateSelect && previewEl) {
    buildBtn.addEventListener("click", () => {
      const startDate = DATE_OPTIONS.includes(startDateSelect.value) ? startDateSelect.value : DATE_OPTIONS[0];
      latestRemarksSummaryText = getRemarkSummaryText(startDate);
      previewEl.textContent = latestRemarksSummaryText;
    });
  }

  if (shareBtn && previewEl) {
    shareBtn.addEventListener("click", async () => {
      if (!latestRemarksSummaryText) {
        latestRemarksSummaryText = previewEl.textContent.trim() || getRemarkSummaryText(DATE_OPTIONS[0]);
        previewEl.textContent = latestRemarksSummaryText;
      }

      try {
        if (navigator.share) {
          await navigator.share({
            title: "南非行程备注汇总",
            text: latestRemarksSummaryText,
          });
          return;
        }
      } catch (error) {
        console.error(error);
      }

      try {
        await copyText(latestRemarksSummaryText);
        alert("备注汇总已复制。iPhone 上可粘贴到“备忘录”保存。");
      } catch (error) {
        console.error(error);
        alert("无法自动分享/复制，请手动复制预览内容。");
      }
    });
  }

  if (summaryDocsDateSelect) {
    summaryDocsDateSelect.addEventListener("change", (event) => {
      renderSummaryDocsListByDate(event.target.value);
    });
  }

  if (summaryDocsInput && summaryDocsDateSelect) {
    summaryDocsInput.addEventListener("change", (event) => {
      const dateStr = DATE_OPTIONS.includes(summaryDocsDateSelect.value) ? summaryDocsDateSelect.value : DATE_OPTIONS[0];
      onItineraryDocsImport(dateStr, event.target.files)
        .then(() => {
          renderSummaryDocsListByDate(dateStr);
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          event.target.value = "";
        });
    });
  }

  if (placesFileInput) {
    placesFileInput.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const raw = await file.text();
        const json = JSON.parse(raw);
        const extracted = [];
        collectPlacesFromJson(json, extracted);
        mergeMapPlaces(extracted);
        renderMapPlacesList();
      } catch (error) {
        console.error(error);
        alert("JSON 解析失败，请确认是有效的 Google Takeout 导出文件。");
      } finally {
        event.target.value = "";
      }
    });
  }

  if (parseTextBtn && placesTextInput) {
    parseTextBtn.addEventListener("click", () => {
      const extracted = parsePlacesFromText(placesTextInput.value);
      mergeMapPlaces(extracted);
      renderMapPlacesList();
    });
  }

  if (clearPlacesBtn && placesTextInput) {
    clearPlacesBtn.addEventListener("click", () => {
      clearMapPlaces();
      placesTextInput.value = "";
      renderMapPlacesList();
    });
  }
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
loadMapPlaces();
bindDateSwitcher();
bindActionClicks();
bindRemarkEditing();
bindSummaryActions();
bindIosNoZoom();
renderDateOptions();

const initialHash = window.location.hash.replace("#", "");
const initialViewKey = hashToViewKey(initialHash);
if (initialViewKey) {
  activeDate = initialViewKey;
}

setActiveDate(activeDate);
