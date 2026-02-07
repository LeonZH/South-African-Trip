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
