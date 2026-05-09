import type { BrandSlug } from "./products";

export type SpecRow = { grade: string; material: string; props: string };

export type BrandDetail = {
  founded?: string;
  hq?: string;
  history: string;
  highlights: string[]; // 核心优势
  signatureSeries: { series: string; material: string; desc: string }[];
  industries: string[]; // 应用行业
  specs: SpecRow[]; // 代表性材料参数摘要
};

export const brandDetails: Partial<Record<BrandSlug, BrandDetail>> = {
  teijin: {
    founded: "1918",
    hq: "日本东京",
    history:
      "帝人株式会社（Teijin Limited）是日本百年化纤与高性能材料综合企业，旗下高性能聚合物事业部是全球聚碳酸酯（PC）及其合金的领导者，PANLITE® PC 与 MULTILON® PC/ABS 是汽车车灯、光学导光、电子外壳的标杆材料。",
    highlights: [
      "全球前三的高性能 PC 制造商",
      "光学级 / 车灯级 PC 行业标杆",
      "PC/ABS 合金技术全球领先",
      "原厂授权 + 完整 TDS / SDS / RoHS / REACH",
    ],
    signatureSeries: [
      { series: "PANLITE® PC", material: "聚碳酸酯", desc: "通用、光学、阻燃、玻纤增强全规格" },
      { series: "MULTILON®", material: "PC/ABS 合金", desc: "高韧 + 易加工，汽车内饰主力" },
      { series: "PANLITE® AM", material: "PC/ABS 阻燃", desc: "UL94 V-0，电子电器外壳" },
    ],
    industries: ["汽车车灯", "新能源汽车", "光学显示", "电子电器", "医疗器械", "安全防护"],
    specs: [
      { grade: "PANLITE L-1225Y", material: "通用透明 PC", props: "MFR 11 g/10min · 拉伸强度 65 MPa · HDT 128℃ · 透光率 89%" },
      { grade: "PANLITE G-3430H", material: "30% 玻纤增强 PC", props: "拉伸强度 130 MPa · 弯曲模量 7800 MPa · HDT 145℃" },
      { grade: "MULTILON T-3713BH", material: "PC/ABS 合金", props: "MFR 18 g/10min · 缺口冲击 60 kJ/m² · HDT 110℃" },
      { grade: "PANLITE AM-9930H", material: "阻燃 PC/ABS", props: "UL94 V-0 @1.5mm · 缺口冲击 40 kJ/m²" },
    ],
  },

  celanese: {
    founded: "1918",
    hq: "美国得克萨斯州",
    history:
      "塞拉尼斯（Celanese Corporation）是全球领先的工程材料与特种化学品企业，2022 年并购杜邦移动出行与材料业务后，成为全球最大的工程塑料供应商之一，旗下品牌矩阵涵盖 POM、PBT、PPS、LCP、PA、长玻纤等几乎所有高端工程塑料类别。",
    highlights: [
      "全球最大工程塑料供应商之一",
      "Hostaform® POM 全球公认基准",
      "Vectra® LCP 5G 高频材料标杆",
      "原厂直接授权，长期稳定供货",
    ],
    signatureSeries: [
      { series: "Hostaform®", material: "POM 共聚", desc: "经典 POM，齿轮 / 结构件首选" },
      { series: "Celanex® / Vandar®", material: "PBT / PBT 合金", desc: "电气电子与汽车主流" },
      { series: "Fortron®", material: "线性 PPS", desc: "新能源汽车冷却系统专用" },
      { series: "Vectra®", material: "LCP", desc: "5G 高频、超薄连接器" },
      { series: "Celstran®", material: "长玻纤增强", desc: "金属替代结构件" },
    ],
    industries: ["汽车", "新能源动力", "5G 通讯", "电子电器", "医疗", "工业机械"],
    specs: [
      { grade: "Hostaform C9021", material: "通用 POM", props: "密度 1.41 · MFR 9 g/10min · 拉伸强度 67 MPa · HDT 110℃" },
      { grade: "Celanex 2300GV1/30", material: "30% 玻纤 PBT", props: "拉伸 135 MPa · 弯曲模量 10000 MPa · HDT 215℃" },
      { grade: "Fortron 1140A4", material: "40% 玻纤 PPS", props: "拉伸 195 MPa · HDT 270℃ · UL94 V-0" },
      { grade: "Vectra E130i", material: "30% GF LCP", props: "拉伸 135 MPa · HDT 230℃ · 介电常数 3.7@1MHz" },
    ],
  },

  solvay: {
    founded: "1863",
    hq: "比利时布鲁塞尔",
    history:
      "比利时苏威集团（Solvay）是全球高性能特种聚合物的领导者，专注于 PEEK、PPS、PPSU、PSU、PPA、PARA 等顶级特种工程塑料，广泛服务航空航天、医疗植入、半导体、新能源等最严苛工况，材料性能与可追溯性是行业基准。",
    highlights: [
      "高性能特种聚合物全球领导者",
      "覆盖从 PPS 到 PEEK 的金字塔顶端材料",
      "符合航空航天与医疗植入级认证",
      "原厂全规格授权与完整法规支持",
    ],
    signatureSeries: [
      { series: "Ryton® PPS", material: "支化 PPS", props: "耐 240℃ 长期使用" } as any,
      { series: "Amodel® PPA", material: "高温尼龙", props: "耐 SMT 回流焊" } as any,
      { series: "KetaSpire® PEEK", material: "聚醚醚酮", props: "顶级特种塑料" } as any,
      { series: "Radel® PPSU", material: "聚苯砜", props: "蒸汽消毒级" } as any,
      { series: "Udel® PSU", material: "聚砜", props: "高温透明" } as any,
    ].map(({ series, material, props }: any) => ({ series, material, desc: props })),
    industries: ["航空航天", "医疗植入与器械", "半导体", "新能源汽车", "电子高端连接器", "石油天然气"],
    specs: [
      { grade: "Ryton R-4-200BL", material: "40% GF PPS", props: "拉伸 195 MPa · HDT 260℃ · UL94 V-0 @0.8mm" },
      { grade: "Amodel A-1133HS", material: "33% GF PPA", props: "拉伸 230 MPa · HDT 285℃ · 吸水率 < 0.5%" },
      { grade: "KetaSpire KT-820", material: "纯 PEEK", props: "拉伸 100 MPa · 连续使用 260℃ · UL94 V-0" },
      { grade: "Radel R-5500", material: "PPSU", props: "拉伸 70 MPa · HDT 207℃ · 透明可消毒" },
    ],
  },

  umg: {
    founded: "2002",
    hq: "日本东京",
    history:
      "UMG ABS 株式会社由日本宇部兴产与三菱化学合资成立，是日本顶级 ABS / ASA / AES 苯乙烯系工程塑料专业制造商。产品以高耐候、高耐冲击、低 VOC、表面光泽优异著称，长期为日系汽车与高端家电厂商配套。",
    highlights: [
      "日系顶级 ABS 制造商",
      "ASA 户外耐候性能业内领先",
      "低 VOC，符合日系车厂内饰要求",
      "稳定供货与精细化粒型管控",
    ],
    signatureSeries: [
      { series: "UMG ABS", material: "ABS", desc: "通用 / 高刚 / 阻燃 / 电镀级齐全" },
      { series: "DIAPET® ASA", material: "ASA", desc: "户外耐候，替代 ABS 户外件" },
      { series: "UMG AES", material: "AES", desc: "EPDM 改性，耐候 + 耐冲击" },
      { series: "UMEX®", material: "PMMA/ABS 合金", desc: "高光泽免喷涂" },
    ],
    industries: ["汽车内外饰", "白色家电", "OA 办公设备", "建材", "玩具与文具"],
    specs: [
      { grade: "UMG ABS S100N", material: "通用 ABS", props: "MFR 23 g/10min · 缺口冲击 23 kJ/m² · HDT 88℃" },
      { grade: "UMG ABS EX18A", material: "高耐冲击 ABS", props: "缺口冲击 38 kJ/m² · 拉伸 41 MPa" },
      { grade: "DIAPET AT-08", material: "ASA", props: "QUV 2000h ΔE<3 · 缺口冲击 22 kJ/m² · HDT 95℃" },
      { grade: "UMG AES BS-280", material: "AES", props: "缺口冲击 30 kJ/m² · 优异耐臭氧 / 耐紫外" },
    ],
  },

  lati: {
    founded: "1945",
    hq: "意大利瓦雷泽",
    history:
      "意大利 LATI Industria Termoplastici S.p.A. 是欧洲领先的特种改性工程塑料制造商，专注高端定制化解决方案。产品矩阵覆盖自润滑、导热、导电、抗静电、阻燃、长玻纤增强等十余个改性方向，广泛服务汽车、电子、医疗与工业领域。",
    highlights: [
      "欧洲特种改性塑料专家",
      "可定制化配方与小批量灵活供货",
      "自润滑 / 导热 / 导电技术业内顶尖",
      "完整 UL 黄卡 + REACH / RoHS / 食品接触认证",
    ],
    signatureSeries: [
      { series: "LATAMID®", material: "PA 改性", desc: "尼龙玻纤 / 矿物增强系列" },
      { series: "LATILUB®", material: "自润滑改性", desc: "PTFE / 硅油 / 石墨改性" },
      { series: "LATICONTHER®", material: "导热塑料", desc: "导热不导电 / 导热导电" },
      { series: "LATIOHM®", material: "导电 / ESD", desc: "可控表面电阻 10²–10⁹ Ω" },
      { series: "LATIGRAY®", material: "电磁屏蔽", desc: "EMI / RFI 屏蔽塑料" },
      { series: "LASTIL®", material: "PPS 改性", desc: "高温耐化学" },
    ],
    industries: ["汽车结构件", "精密齿轮 / 轴承", "电子电气", "LED 散热", "医疗器械", "工业自动化"],
    specs: [
      { grade: "LATAMID 66 H2 G/30", material: "30% GF PA66", props: "拉伸 180 MPa · 弯曲模量 9000 MPa · HDT 250℃" },
      { grade: "LATILUB 66 H2 G/25-V50", material: "PA66 + GF + PTFE", props: "动摩擦系数 0.15 · 磨损率降低 80%" },
      { grade: "LATICONTHER 62 GR/40", material: "导热 PA6", props: "导热系数 2.0 W/m·K · 体积电阻 >10¹³ Ω·cm" },
      { grade: "LATIOHM 62 H2 GR/15", material: "导电 PA6", props: "表面电阻 10⁴ Ω/sq · 拉伸 90 MPa" },
    ],
  },

  ajp: {
    founded: "1976",
    hq: "台湾台北",
    history:
      "亚洲聚合股份有限公司（Asia Polymer Corporation, APC，俗称亚聚）是台湾老牌 EVA 与 LDPE 制造商，与日本三井化学技术合作，是华人地区光伏胶膜级 EVA 主力供应商之一，产品以 VA 含量精准、批次稳定著称。",
    highlights: [
      "台湾老牌 EVA / LDPE 专业生产商",
      "光伏级 EVA 主力供应商",
      "VA 含量 9%–28% 全规格覆盖",
      "稳定批次品质，适合规模化生产",
    ],
    signatureSeries: [
      { series: "ASIA EVA", material: "EVA", desc: "光伏胶膜 / 鞋材 / 电缆 / 热熔胶" },
      { series: "ASIA LDPE", material: "LDPE", desc: "高压低密度聚乙烯，吹膜 / 注塑 / 涂覆" },
    ],
    industries: ["光伏封装", "鞋材发泡", "电线电缆", "热熔胶 / 复合", "包装薄膜", "农业薄膜"],
    specs: [
      { grade: "UE630", material: "光伏级 EVA (VA 28%)", props: "MFR 15 g/10min · 适合光伏胶膜挤出" },
      { grade: "UE633", material: "光伏 / 发泡 EVA", props: "MFR 20 g/10min · VA 28% · 优异透明性" },
      { grade: "ASIA EVA 7470M", material: "鞋材发泡 EVA", props: "MFR 2.5 g/10min · VA 18% · 高发泡倍率" },
      { grade: "ASIA LDPE F210", material: "吹膜 LDPE", props: "MFR 2.0 g/10min · 密度 0.921 g/cm³" },
    ],
  },

  usi: {
    founded: "1964",
    hq: "台湾台北",
    history:
      "台湾台聚集团（USI Corporation）是亚洲领先的烯烃产业一体化集团，旗下 EVA、LDPE、VAE 乳液产能位居亚洲前列，是全球光伏组件厂、鞋材厂、电缆厂的主要原料供应商，与陶氏、三井等国际企业有长期技术合作。",
    highlights: [
      "亚洲领先 EVA / LDPE 一体化供应商",
      "光伏级 EVA 出货量全球领先",
      "VA 含量精准可控，批次稳定",
      "完整 EVA / LDPE / VAE 产品矩阵",
    ],
    signatureSeries: [
      { series: "USI EVA", material: "EVA", desc: "光伏 / 发泡 / 热熔胶 / 电缆全系列" },
      { series: "Taisox® LDPE", material: "LDPE", desc: "吹膜 / 注塑 / 挤出涂覆" },
      { series: "ELVALOY® VAE", material: "VAE 乳液", desc: "建筑涂料 / 瓷砖胶 / 无纺布" },
    ],
    industries: ["光伏封装", "鞋材发泡", "电线电缆", "热熔胶", "建筑涂料", "包装薄膜"],
    specs: [
      { grade: "USI UE633", material: "光伏 EVA (VA 28%)", props: "MFR 20 g/10min · 高透光率 · 适合光伏胶膜" },
      { grade: "USI UE2528", material: "发泡 EVA (VA 25%)", props: "MFR 3 g/10min · 高发泡倍率与回弹" },
      { grade: "Taisox LD2420H", material: "吹膜 LDPE", props: "MFR 2.0 g/10min · 密度 0.923 g/cm³" },
      { grade: "ELVALOY DA-102H", material: "VAE 乳液", props: "固含 55% · pH 4–6 · 优异耐水耐碱" },
    ],
  },
};
