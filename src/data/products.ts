export type BrandSlug =
  | "polyplastics"
  | "asahi-kasei"
  | "ccp"
  | "teijin"
  | "celanese"
  | "solvay"
  | "umg"
  | "lati"
  | "ajp"
  | "usi";

export type Brand = {
  slug: BrandSlug;
  name: string;
  nameEn: string;
  origin: string;
  tagline: string;
  description: string;
};

export type Product = {
  slug: string;
  brand: BrandSlug;
  series: string;
  material: string; // POM, PA66, etc.
  grades: string[];
  feature: string;
  applications: string[];
};

export const brands: Brand[] = [
  {
    slug: "polyplastics",
    name: "宝理",
    nameEn: "Polyplastics",
    origin: "日本",
    tagline: "全球工程塑料领导品牌",
    description:
      "日本宝理是工程塑料领域的全球领导者，旗下 DURACON® POM、DURANEX® PBT、DURAFIDE® PPS、TOPAS® COC、LAPEROS® LCP 等系列被广泛应用于汽车、电子电器、5G 通讯、医疗器械等高端领域。",
  },
  {
    slug: "asahi-kasei",
    name: "旭化成",
    nameEn: "Asahi Kasei",
    origin: "日本",
    tagline: "材料科技 · 创造价值",
    description:
      "日本旭化成株式会社旗下工程塑料事业部，主营 TENAC™ POM、LEONA™ PA66、XYRON™ mPPO、STYRAC™ AS/SAN 等系列，以耐久性、阻燃性、耐化学性见长，深耕汽车、新能源与电子产业。",
  },
  {
    slug: "ccp",
    name: "长春化工",
    nameEn: "Chang Chun Plastics",
    origin: "台湾",
    tagline: "亚洲工程塑料一体化制造商",
    description:
      "台湾长春集团（CCP）是全球少数从单体到改性料垂直一体化的工程塑料制造商，主力产品涵盖 LUPOX® PBT、LUPOY® PC、PA6/PA66、EVA/EVOH、环氧树脂等，以稳定供货与高性价比著称。",
  },
  {
    slug: "teijin",
    name: "帝人",
    nameEn: "Teijin",
    origin: "日本",
    tagline: "高性能 PC 与复合材料专家",
    description:
      "日本帝人株式会社是全球领先的高性能聚碳酸酯生产商，旗下 PANLITE® PC、MULTILON® PC/ABS、PANLITE® AM 等系列在光学、汽车车灯、电子电器、医疗等领域具有标杆地位。",
  },
  {
    slug: "celanese",
    name: "塞拉尼斯",
    nameEn: "Celanese",
    origin: "美国",
    tagline: "全球工程材料巨头",
    description:
      "美国塞拉尼斯（Celanese）是全球领先的工程材料公司，主营 Hostaform® POM、Celanex® PBT、Vandar® PBT 合金、Fortron® PPS、Vectra® LCP、Celstran® 长玻纤等系列，覆盖汽车、电子、医疗与工业应用。",
  },
  {
    slug: "solvay",
    name: "苏威",
    nameEn: "Solvay",
    origin: "比利时",
    tagline: "高性能特种聚合物",
    description:
      "比利时苏威是全球高性能聚合物领导者，旗下 Ryton® PPS、Amodel® PPA、KetaSpire® PEEK、Radel® PPSU、Udel® PSU、Ixef® PARA 等系列广泛应用于航空航天、汽车、电子、医疗器械等高端领域。",
  },
  {
    slug: "umg",
    name: "日本UMG",
    nameEn: "UMG ABS",
    origin: "日本",
    tagline: "高品质 ABS / ASA 专业制造",
    description:
      "日本 UMG ABS 株式会社（三菱化学与宇部兴产合资）专注 ABS、ASA、AES、PMMA 共聚物等苯乙烯系工程塑料，以耐候、耐冲击与稳定品质闻名，主力品牌 UMG ABS、DIAPET、UMEX。",
  },
  {
    slug: "lati",
    name: "拉提",
    nameEn: "LATI",
    origin: "意大利",
    tagline: "欧洲特种工程塑料专家",
    description:
      "意大利 LATI 是欧洲知名的特种改性工程塑料制造商，提供 LATAMID® PA、LATILUB® 自润滑、LATICONTHER® 导热、LATIOHM® 导电、LATIGRAY® 抗静电、LASTIL® PPS 等系列，专注高端定制化解决方案。",
  },
  {
    slug: "ajp",
    name: "亚聚",
    nameEn: "Asia Polymer (APC)",
    origin: "台湾",
    tagline: "EVA 与聚乙烯专业生产商",
    description:
      "台湾亚聚（亚洲聚合 APC）是台塑集团旗下专业 EVA 与 LDPE 制造商，主力产品 ASIA EVA 系列广泛用于光伏胶膜、发泡鞋材、电线电缆、热熔胶与农膜领域。",
  },
  {
    slug: "usi",
    name: "台聚",
    nameEn: "USI Corporation",
    origin: "台湾",
    tagline: "EVA / LDPE / VAE 一体化供应",
    description:
      "台湾台聚集团（USI）是亚洲领先的 EVA、LDPE 与 VAE 乳液生产商，旗下 USI EVA、ELVALOY、Taisox 系列广泛应用于光伏封装、发泡鞋材、电线电缆、热熔胶等行业。",
  },
];

export const products: Product[] = [
  // Polyplastics
  {
    slug: "duracon-pom",
    brand: "polyplastics",
    series: "DURACON®",
    material: "POM",
    grades: ["M90-44", "M270-44", "M450-44", "CH-10", "GH-25", "TX-21", "SW-01", "NW-02"],
    feature: "高刚性、耐疲劳、低摩擦，齿轮 / 精密结构件首选",
    applications: ["精密齿轮", "汽车燃油系统", "拉链滑块", "办公设备"],
  },
  {
    slug: "duranex-pbt",
    brand: "polyplastics",
    series: "DURANEX®",
    material: "PBT",
    grades: ["300FP", "500FP", "701FP", "3300", "7300", "713LD"],
    feature: "玻纤增强系列，阻燃 V-0，耐热耐电气",
    applications: ["汽车连接器", "继电器外壳", "线圈骨架", "LED 支架"],
  },
  {
    slug: "durafide-pps",
    brand: "polyplastics",
    series: "DURAFIDE®",
    material: "PPS",
    grades: ["1130A1", "1140A6", "6165A6", "6565A7"],
    feature: "耐高温 220℃+，超强耐化学，尺寸稳定",
    applications: ["新能源汽车水泵", "电子封装", "传感器外壳"],
  },
  {
    slug: "topas-coc",
    brand: "polyplastics",
    series: "TOPAS®",
    material: "COC",
    grades: ["6013", "8007", "5013"],
    feature: "高透明环烯烃共聚物，医疗 / 光学级",
    applications: ["医疗包装", "光学镜片", "诊断耗材"],
  },
  {
    slug: "laperos-lcp",
    brand: "polyplastics",
    series: "LAPEROS®",
    material: "LCP",
    grades: ["E130i", "S475", "A130", "E471i"],
    feature: "液晶聚合物，超薄成型 0.2mm，5G 高频低损耗",
    applications: ["5G 连接器", "Type-C 接口", "FPC 元件"],
  },

  // Asahi Kasei
  {
    slug: "tenac-pom",
    brand: "asahi-kasei",
    series: "TENAC™",
    material: "POM",
    grades: ["3010", "4520", "4013", "HC450", "LA543", "LM511"],
    feature: "均聚 / 共聚双线齐全，耐磨改性 LM 系列业内标杆",
    applications: ["汽车内饰", "门窗滑轮", "家电齿轮"],
  },
  {
    slug: "leona-pa66",
    brand: "asahi-kasei",
    series: "LEONA™",
    material: "PA66 / PA66+PA6I",
    grades: ["90G33", "SN11", "SG101", "FR370", "1402S"],
    feature: "高耐热阻燃尼龙，玻纤 33% 主力规格",
    applications: ["汽车进气歧管", "断路器", "电动工具壳体"],
  },
  {
    slug: "xyron-mppo",
    brand: "asahi-kasei",
    series: "XYRON™",
    material: "mPPO",
    grades: ["540Z", "X9108", "G701H"],
    feature: "改性聚苯醚，低介电、阻燃、轻量化",
    applications: ["新能源汽车电池组件", "光伏接线盒", "5G 滤波器"],
  },
  {
    slug: "styrac-as",
    brand: "asahi-kasei",
    series: "STYRAC™",
    material: "AS / SAN",
    grades: ["767", "769", "780", "AT-08"],
    feature: "高透明苯乙烯-丙烯腈共聚物",
    applications: ["化妆品包装", "餐具", "家电透明件"],
  },

  // CCP
  {
    slug: "lupox-pbt",
    brand: "ccp",
    series: "LUPOX®",
    material: "PBT",
    grades: ["1100", "3300", "GP-1000H", "GP-2300H", "GP-2306F"],
    feature: "性价比之王，常用 30% 玻纤增强阻燃",
    applications: ["连接器", "继电器", "汽车电气件"],
  },
  {
    slug: "lupoy-pc",
    brand: "ccp",
    series: "LUPOY®",
    material: "PC",
    grades: ["300-10", "300-15", "305", "3022IR", "1303-15"],
    feature: "高透明 PC，光学 / 阻燃 / 耐冲击全系列",
    applications: ["导光板", "LED 灯罩", "电子外壳"],
  },
  {
    slug: "ccp-pa",
    brand: "ccp",
    series: "PA6 / PA66",
    material: "PA",
    grades: ["1010C2", "1011GB", "1014GB"],
    feature: "通用尼龙，玻纤增强系列稳定供应",
    applications: ["扎带", "电机配件", "结构件"],
  },
  {
    slug: "ccp-eva-evoh",
    brand: "ccp",
    series: "EVA / EVOH",
    material: "EVA",
    grades: ["7350M", "7470M", "EVAL F101B"],
    feature: "高阻隔 EVOH，光伏胶膜级 EVA",
    applications: ["光伏封装", "食品阻隔包装", "热熔胶"],
  },

  // Teijin 帝人
  {
    slug: "panlite-pc",
    brand: "teijin",
    series: "PANLITE®",
    material: "PC",
    grades: ["L-1225Y", "L-1250Y", "G-3430H", "K-1300Y", "AD-5503"],
    feature: "高透明、高流动 PC，光学 / 车灯 / 电子外壳标杆",
    applications: ["汽车车灯", "导光板", "电子外壳", "光学镜片"],
  },
  {
    slug: "multilon-pcabs",
    brand: "teijin",
    series: "MULTILON®",
    material: "PC/ABS",
    grades: ["TN-7100", "T-3713BH", "T-3714"],
    feature: "PC/ABS 合金，高韧性 + 易加工，汽车内饰首选",
    applications: ["汽车内饰", "电子外壳", "IT 设备"],
  },

  // Celanese 塞拉尼斯
  {
    slug: "hostaform-pom",
    brand: "celanese",
    series: "Hostaform®",
    material: "POM",
    grades: ["C9021", "C13031", "C27021", "S9243", "MT24F01"],
    feature: "全球 POM 经典品牌，刚性 + 耐磨 + 尺寸稳定",
    applications: ["精密齿轮", "汽车结构件", "燃油系统"],
  },
  {
    slug: "celanex-pbt",
    brand: "celanese",
    series: "Celanex®",
    material: "PBT",
    grades: ["2300GV1/30", "3300", "3216", "XFR® 6840"],
    feature: "玻纤增强阻燃 PBT，电气电子主流牌号",
    applications: ["连接器", "线圈骨架", "继电器"],
  },
  {
    slug: "fortron-pps",
    brand: "celanese",
    series: "Fortron®",
    material: "PPS",
    grades: ["1140A4", "1140L4", "6165A6", "ICE® 1140"],
    feature: "线性 PPS，耐高温耐化学，新能源汽车专用",
    applications: ["新能源汽车水泵", "电池组件", "传感器"],
  },
  {
    slug: "vectra-lcp",
    brand: "celanese",
    series: "Vectra®",
    material: "LCP",
    grades: ["E130i", "E471i", "S475", "MT1300"],
    feature: "薄壁高流动 LCP，5G 高频连接器与精密元件",
    applications: ["5G 连接器", "Type-C", "FPC"],
  },

  // Solvay 苏威
  {
    slug: "ryton-pps",
    brand: "solvay",
    series: "Ryton®",
    material: "PPS",
    grades: ["R-4-200BL", "R-4-220BL", "R-7-120BL", "BR111BL"],
    feature: "支化型 PPS，耐高温 240℃，强耐化学腐蚀",
    applications: ["汽车冷却系统", "化工泵阀", "电池模组"],
  },
  {
    slug: "amodel-ppa",
    brand: "solvay",
    series: "Amodel®",
    material: "PPA",
    grades: ["A-1133HS", "A-4133HS", "AS-1933HS", "AT-1002"],
    feature: "高温尼龙 PPA，连续使用温度 150℃+",
    applications: ["SMT 连接器", "汽车发动机舱", "电动工具"],
  },
  {
    slug: "ketaspire-peek",
    brand: "solvay",
    series: "KetaSpire®",
    material: "PEEK",
    grades: ["KT-820", "KT-880", "KT-820 GF30", "KT-820 CF30"],
    feature: "高性能 PEEK，耐 260℃ 长期使用",
    applications: ["航空航天", "医疗植入", "半导体"],
  },
  {
    slug: "radel-ppsu",
    brand: "solvay",
    series: "Radel®",
    material: "PPSU",
    grades: ["R-5500", "R-5100", "R-5800"],
    feature: "高温透明 PPSU，可反复蒸汽消毒",
    applications: ["医疗器械", "婴儿奶瓶", "管路接头"],
  },

  // UMG ABS 日本UMG
  {
    slug: "umg-abs",
    brand: "umg",
    series: "UMG ABS",
    material: "ABS",
    grades: ["S100N", "EX18A", "TM-21", "AP-H", "TP-10"],
    feature: "高品质日本 ABS，耐冲击 + 易加工 + 表面光泽",
    applications: ["汽车内外饰", "家电外壳", "OA 设备"],
  },
  {
    slug: "umg-asa",
    brand: "umg",
    series: "DIAPET® ASA",
    material: "ASA",
    grades: ["AT-08", "AS-72", "AS-80"],
    feature: "高耐候 ASA，户外不变色，替代 ABS 户外件",
    applications: ["汽车后视镜", "户外家电", "建材"],
  },
  {
    slug: "umg-aes",
    brand: "umg",
    series: "UMG AES",
    material: "AES",
    grades: ["BS-280", "BS-310"],
    feature: "EPDM 改性，耐候性 + 耐冲击平衡",
    applications: ["汽车外饰件", "户外电气件"],
  },

  // LATI 拉提
  {
    slug: "latamid-pa",
    brand: "lati",
    series: "LATAMID®",
    material: "PA6 / PA66",
    grades: ["66 H2 G/30", "6 H2 G/30", "6/10 H2"],
    feature: "意大利改性尼龙，玻纤 / 矿物增强系列齐全",
    applications: ["汽车结构件", "电动工具", "家电"],
  },
  {
    slug: "latilub",
    brand: "lati",
    series: "LATILUB®",
    material: "自润滑改性",
    grades: ["66 H2 G/25-V50", "POM L V/20", "PEEK V/30"],
    feature: "PTFE / 硅油 / 石墨自润滑，超低摩擦磨损",
    applications: ["精密齿轮", "轴承", "滑动机构"],
  },
  {
    slug: "laticonther",
    brand: "lati",
    series: "LATICONTHER®",
    material: "导热塑料",
    grades: ["62 GR/40", "PPS CP12", "PA6 CX12"],
    feature: "导热不导电 / 导热导电系列，替代铝散热件",
    applications: ["LED 散热器", "电机外壳", "电池冷却"],
  },
  {
    slug: "latiohm",
    brand: "lati",
    series: "LATIOHM®",
    material: "导电 / 抗静电",
    grades: ["62 H2 GR/15", "PA6 CD12", "PBT CD30"],
    feature: "碳纤 / 炭黑改性，可控表面电阻 10²–10⁹ Ω",
    applications: ["ESD 工装", "电子托盘", "燃油系统"],
  },

  // 亚聚 Asia Polymer
  {
    slug: "ajp-eva",
    brand: "ajp",
    series: "ASIA EVA",
    material: "EVA",
    grades: ["7350M", "7470M", "UE630", "UE633", "UE654-04"],
    feature: "VA 含量 14%–28% 系列齐全，光伏 / 鞋材 / 电缆通用",
    applications: ["光伏胶膜", "发泡鞋材", "电线电缆", "热熔胶"],
  },
  {
    slug: "ajp-ldpe",
    brand: "ajp",
    series: "ASIA LDPE",
    material: "LDPE",
    grades: ["F210", "F220", "G801"],
    feature: "高压低密度聚乙烯，吹膜 / 注塑 / 涂覆通用",
    applications: ["农膜", "包装膜", "电缆护套"],
  },

  // 台聚 USI
  {
    slug: "usi-eva",
    brand: "usi",
    series: "USI EVA",
    material: "EVA",
    grades: ["UE633", "UE634-04", "UE638-04", "UE2528"],
    feature: "光伏级 EVA 主力供应商，VA 含量精准可控",
    applications: ["光伏封装胶膜", "EVA 发泡", "热熔胶"],
  },
  {
    slug: "usi-ldpe",
    brand: "usi",
    series: "Taisox® LDPE",
    material: "LDPE",
    grades: ["LD2420H", "LD2426H", "LD3110"],
    feature: "高压聚乙烯，吹膜与挤出涂覆稳定供货",
    applications: ["包装薄膜", "复合膜", "电缆"],
  },
  {
    slug: "usi-vae",
    brand: "usi",
    series: "ELVALOY® VAE",
    material: "VAE 乳液",
    grades: ["DA-102H", "DA-101"],
    feature: "醋酸乙烯-乙烯共聚乳液，建筑涂料与粘接专用",
    applications: ["内墙涂料", "瓷砖胶", "无纺布"],
  },
];

export const materials = [
  { code: "POM", name: "聚甲醛", desc: "高刚性、耐磨、低摩擦，齿轮结构件首选" },
  { code: "PA66", name: "尼龙66", desc: "耐高温阻燃，汽车电气主力材料" },
  { code: "PBT", name: "聚酯", desc: "电气绝缘 + 阻燃，连接器线圈骨架" },
  { code: "PC", name: "聚碳酸酯", desc: "高透明高韧性，光学件外壳" },
  { code: "PPS", name: "聚苯硫醚", desc: "耐高温耐化学，新能源汽车关键材料" },
  { code: "LCP", name: "液晶聚合物", desc: "超薄高频，5G 与精密连接器" },
  { code: "mPPO", name: "改性聚苯醚", desc: "低介电、阻燃，光伏与新能源" },
  { code: "PPA", name: "高温尼龙", desc: "150℃+ 长期使用，SMT 连接器" },
  { code: "PEEK", name: "聚醚醚酮", desc: "顶级特种工程塑料，航空 / 医疗" },
  { code: "PPSU", name: "聚苯砜", desc: "可消毒高温透明，医疗器械" },
  { code: "ABS", name: "ABS 树脂", desc: "通用工程塑料，家电汽车" },
  { code: "ASA", name: "耐候 ASA", desc: "户外不变色，替代 ABS 户外件" },
  { code: "EVA", name: "乙烯醋酸乙烯", desc: "光伏胶膜 / 鞋材发泡" },
  { code: "LDPE", name: "低密度聚乙烯", desc: "薄膜、电缆、包装" },
  { code: "AS/SAN", name: "苯乙烯共聚物", desc: "高透明，包装与家电件" },
];

export const applications = [
  { slug: "automotive", name: "汽车零部件", desc: "进气歧管、连接器、燃油系统、内饰结构件" },
  { slug: "electronic", name: "电子电器", desc: "继电器、断路器、连接器、传感器外壳" },
  { slug: "appliance", name: "家电制造", desc: "齿轮、外壳、按键、透明件" },
  { slug: "connector", name: "精密连接器", desc: "Type-C、5G 高频、FPC、车载连接器" },
  { slug: "gear", name: "精密齿轮", desc: "POM 共聚 / 均聚齿轮、滑块、轴承" },
  { slug: "newenergy", name: "新能源", desc: "光伏接线盒、动力电池、充电桩、储能" },
];

export const company = {
  name: "厦门塑恩贸易有限公司",
  nameEn: "SUEN Plastic Trading Co., Ltd.",
  phone: "0592-26472",
  fax: "0592-6032367",
  email: "youty123@suenplastic.com",
  address: "厦门市湖里区枋湖北二路1519号",
  workhours: "周一至周六 8:30 – 18:00",
};
