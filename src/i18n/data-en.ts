// English overlays for brand / product / material / application content
import type { BrandSlug } from "@/data/products";

export const brandsEn: Record<BrandSlug, { origin: string; tagline: string; description: string }> = {
  polyplastics: {
    origin: "Japan",
    tagline: "Global leader in engineering plastics",
    description:
      "Polyplastics is a global leader in engineering plastics. Its DURACON® POM, DURANEX® PBT, DURAFIDE® PPS, TOPAS® COC and LAPEROS® LCP series are widely used in automotive, electronics, 5G communications and medical devices.",
  },
  "asahi-kasei": {
    origin: "Japan",
    tagline: "Materials Science · Creating Value",
    description:
      "Asahi Kasei's Engineering Plastics division supplies TENAC™ POM, LEONA™ PA66, XYRON™ mPPO and STYRAC™ AS/SAN, known for durability, flame retardance and chemical resistance — serving automotive, new energy and electronics industries.",
  },
  ccp: {
    origin: "Taiwan",
    tagline: "Asia's vertically integrated engineering plastics maker",
    description:
      "Chang Chun Plastics (CCP) is one of the few engineering plastics makers worldwide that is vertically integrated from monomer to compounded resin. Flagship products include LUPOX® PBT, LUPOY® PC, PA6/PA66, EVA/EVOH and epoxy resins — known for stable supply and competitive value.",
  },
  teijin: {
    origin: "Japan",
    tagline: "High-performance PC and composites specialist",
    description:
      "Teijin Limited is a world-leading producer of high-performance polycarbonate. PANLITE® PC, MULTILON® PC/ABS and PANLITE® AM are benchmark materials for optical, automotive lighting, electronics and medical applications.",
  },
  celanese: {
    origin: "USA",
    tagline: "Global engineering materials giant",
    description:
      "Celanese Corporation is a global leader in engineering materials. Its portfolio — Hostaform® POM, Celanex® PBT, Vandar® PBT alloys, Fortron® PPS, Vectra® LCP and Celstran® LFT — serves automotive, electronics, medical and industrial sectors.",
  },
  solvay: {
    origin: "Belgium",
    tagline: "High-performance specialty polymers",
    description:
      "Solvay is a global leader in high-performance polymers. Ryton® PPS, Amodel® PPA, KetaSpire® PEEK, Radel® PPSU, Udel® PSU and Ixef® PARA are widely used in aerospace, automotive, electronics and medical devices.",
  },
  umg: {
    origin: "Japan",
    tagline: "Premium ABS / ASA specialist",
    description:
      "UMG ABS Inc. (a joint venture of Mitsubishi Chemical and Ube Industries) focuses on ABS, ASA, AES and PMMA copolymers — recognized for weather resistance, impact strength and consistent quality. Brands include UMG ABS, DIAPET and UMEX.",
  },
  lati: {
    origin: "Italy",
    tagline: "European specialty engineering plastics expert",
    description:
      "LATI Industria Termoplastici is a leading European manufacturer of specialty compounded engineering plastics, offering LATAMID® PA, LATILUB® self-lubricating, LATICONTHER® thermally conductive, LATIOHM® conductive/ESD, LATIGRAY® EMI shielding and LASTIL® PPS — focused on high-end custom solutions.",
  },
  ajp: {
    origin: "Taiwan",
    tagline: "EVA and polyethylene specialist",
    description:
      "Asia Polymer Corporation (APC) is a long-established Taiwanese EVA and LDPE producer. ASIA EVA grades are widely used in photovoltaic encapsulation, footwear foam, wire & cable, hot-melt adhesives and agricultural film.",
  },
  usi: {
    origin: "Taiwan",
    tagline: "EVA / LDPE / VAE integrated supplier",
    description:
      "USI Corporation is one of Asia's leading EVA, LDPE and VAE emulsion producers. USI EVA, ELVALOY® VAE and Taisox® LDPE serve photovoltaic encapsulation, foam, cable, hot-melt and coatings industries.",
  },
};

// Product feature + applications EN overlays, keyed by product slug
export const productsEn: Record<string, { feature: string; applications: string[] }> = {
  "duracon-pom": { feature: "High rigidity, fatigue and low friction — preferred for gears and precision parts", applications: ["Precision gears", "Automotive fuel systems", "Zipper sliders", "Office equipment"] },
  "duranex-pbt": { feature: "Glass-fiber reinforced, V-0 flame retardant, heat and electrical resistance", applications: ["Automotive connectors", "Relay housings", "Coil bobbins", "LED brackets"] },
  "durafide-pps": { feature: "Heat resistance to 220°C+, excellent chemical resistance and dimensional stability", applications: ["EV water pumps", "Electronic encapsulation", "Sensor housings"] },
  "topas-coc": { feature: "Transparent COC, medical / optical grade", applications: ["Medical packaging", "Optical lenses", "Diagnostic consumables"] },
  "laperos-lcp": { feature: "Liquid crystal polymer, 0.2mm thin-wall molding, 5G high-frequency low loss", applications: ["5G connectors", "Type-C interfaces", "FPC components"] },
  "tenac-pom": { feature: "Both homopolymer and copolymer lines; wear-resistant LM series an industry benchmark", applications: ["Automotive interior", "Window pulleys", "Appliance gears"] },
  "leona-pa66": { feature: "High-heat flame-retardant nylon, 33% GF being the mainstream grade", applications: ["Auto intake manifolds", "Circuit breakers", "Power tool housings"] },
  "xyron-mppo": { feature: "Modified PPO, low dielectric, flame retardant and lightweight", applications: ["EV battery components", "PV junction boxes", "5G filters"] },
  "styrac-as": { feature: "Transparent styrene-acrylonitrile copolymer", applications: ["Cosmetic packaging", "Tableware", "Transparent appliance parts"] },
  asaclean: { feature: "Asahi Kasei OEM purging compound — fast color/material change without disassembly", applications: ["Injection molding screw cleaning", "Extruder color change", "Hot runner cleaning", "Residue removal for high-temp plastics"] },
  "lupox-pbt": { feature: "Value champion, commonly 30% GF flame retardant", applications: ["Connectors", "Relays", "Automotive electricals"] },
  "lupoy-pc": { feature: "Transparent PC, full optical / flame-retardant / impact-resistant range", applications: ["Light guide plates", "LED diffusers", "Electronic housings"] },
  "ccp-pa": { feature: "General nylon, glass-fiber reinforced series stocked", applications: ["Cable ties", "Motor parts", "Structural parts"] },
  "ccp-eva-evoh": { feature: "High-barrier EVOH, photovoltaic-grade EVA", applications: ["PV encapsulation", "Food barrier packaging", "Hot-melt adhesives"] },
  "panlite-pc": { feature: "High clarity, high flow PC — benchmark for optical / automotive lighting / electronic housings", applications: ["Automotive lighting", "Light guide plates", "Electronic housings", "Optical lenses"] },
  "multilon-pcabs": { feature: "PC/ABS alloy, tough and easy to process — preferred for automotive interiors", applications: ["Automotive interior", "Electronic housings", "IT equipment"] },
  "hostaform-pom": { feature: "Classic global POM — rigidity, wear resistance, dimensional stability", applications: ["Precision gears", "Auto structural parts", "Fuel systems"] },
  "celanex-pbt": { feature: "GF reinforced flame-retardant PBT — mainstream for E&E", applications: ["Connectors", "Coil bobbins", "Relays"] },
  "fortron-pps": { feature: "Linear PPS, heat and chemical resistant — dedicated to EV thermal management", applications: ["EV water pumps", "Battery components", "Sensors"] },
  "vectra-lcp": { feature: "Thin-wall high-flow LCP for 5G high-frequency connectors and precision components", applications: ["5G connectors", "Type-C", "FPC"] },
  "ryton-pps": { feature: "Branched PPS, 240°C heat resistance, strong chemical resistance", applications: ["Automotive cooling", "Chemical pumps & valves", "Battery modules"] },
  "amodel-ppa": { feature: "High-temp polyamide, continuous use above 150°C", applications: ["SMT connectors", "Engine compartment", "Power tools"] },
  "ketaspire-peek": { feature: "High-performance PEEK, continuous use at 260°C", applications: ["Aerospace", "Medical implants", "Semiconductors"] },
  "radel-ppsu": { feature: "Transparent PPSU — repeated steam sterilization", applications: ["Medical devices", "Baby bottles", "Pipe fittings"] },
  "umg-abs": { feature: "Premium Japanese ABS — impact, processability and surface gloss", applications: ["Auto interior/exterior", "Appliance housings", "OA equipment"] },
  "umg-asa": { feature: "Weatherable ASA, no color change outdoors — replaces ABS in exterior parts", applications: ["Automotive mirrors", "Outdoor appliances", "Building materials"] },
  "umg-aes": { feature: "EPDM modified — balanced weatherability and impact", applications: ["Auto exterior", "Outdoor electrical parts"] },
  "latamid-pa": { feature: "Italian compounded nylon — full range of GF / mineral reinforced grades", applications: ["Auto structural", "Power tools", "Appliances"] },
  latilub: { feature: "PTFE / silicone / graphite self-lubricating — extremely low friction and wear", applications: ["Precision gears", "Bearings", "Sliding mechanisms"] },
  laticonther: { feature: "Thermally conductive insulating / conductive grades — aluminum heat-sink replacement", applications: ["LED heat sinks", "Motor housings", "Battery cooling"] },
  latiohm: { feature: "Carbon fiber / black modified — controlled surface resistance 10²–10⁹ Ω", applications: ["ESD tooling", "Electronic trays", "Fuel systems"] },
  "ajp-eva": { feature: "VA content 14%–28% full range — PV / footwear / cable universal", applications: ["PV encapsulation film", "Footwear foam", "Wire & cable", "Hot-melt adhesives"] },
  "ajp-ldpe": { feature: "High-pressure LDPE — blown film / injection / coating", applications: ["Agricultural film", "Packaging film", "Cable sheathing"] },
  "usi-eva": { feature: "Major supplier of PV-grade EVA, precise VA content control", applications: ["PV encapsulation film", "EVA foam", "Hot-melt adhesives"] },
  "usi-ldpe": { feature: "High-pressure PE, stable supply for blown film and extrusion coating", applications: ["Packaging film", "Laminated film", "Cable"] },
  "usi-vae": { feature: "Vinyl acetate-ethylene emulsion — for construction coatings and adhesives", applications: ["Interior coatings", "Tile adhesives", "Non-wovens"] },
};

export const materialsEn: Record<string, { name: string; desc: string }> = {
  POM: { name: "Polyoxymethylene", desc: "High rigidity, wear resistance, low friction — preferred for gears" },
  PA66: { name: "Nylon 66", desc: "Heat-resistant flame-retardant nylon, automotive electrical workhorse" },
  PBT: { name: "Polybutylene Terephthalate", desc: "Electrical insulation + FR for connectors and coil bobbins" },
  PC: { name: "Polycarbonate", desc: "Transparent, tough — optical parts and housings" },
  PPS: { name: "Polyphenylene Sulfide", desc: "Heat + chemical resistance, key for EV thermal management" },
  LCP: { name: "Liquid Crystal Polymer", desc: "Ultra-thin high-frequency — 5G and precision connectors" },
  mPPO: { name: "Modified PPO", desc: "Low dielectric, FR — PV and new energy" },
  PPA: { name: "High-temp Polyamide", desc: "Long-term use above 150°C, SMT connectors" },
  PEEK: { name: "Polyetheretherketone", desc: "Top-tier specialty plastic — aerospace / medical" },
  PPSU: { name: "Polyphenylsulfone", desc: "Sterilizable high-temp transparent — medical devices" },
  ABS: { name: "ABS Resin", desc: "General engineering plastic — appliances, automotive" },
  ASA: { name: "Weatherable ASA", desc: "No color change outdoors — replaces ABS in exterior parts" },
  EVA: { name: "Ethylene-Vinyl Acetate", desc: "PV encapsulation film / footwear foam" },
  LDPE: { name: "Low Density Polyethylene", desc: "Film, cable, packaging" },
  "AS/SAN": { name: "Styrene Copolymer", desc: "Transparent — packaging and appliance parts" },
};

export const applicationsEn: Record<string, { name: string; desc: string }> = {
  automotive: { name: "Automotive Parts", desc: "Intake manifolds, connectors, fuel systems, interior structures" },
  electronic: { name: "Electronics", desc: "Relays, breakers, connectors, sensor housings" },
  appliance: { name: "Home Appliances", desc: "Gears, housings, buttons, transparent parts" },
  connector: { name: "Precision Connectors", desc: "Type-C, 5G high-frequency, FPC, automotive connectors" },
  gear: { name: "Precision Gears", desc: "POM copolymer / homopolymer gears, sliders, bearings" },
  newenergy: { name: "New Energy", desc: "PV junction boxes, traction batteries, charging piles, ESS" },
};

export const companyEn = {
  name: "Xiamen SUEN Plastic Trading Co., Ltd.",
  address: "No.1519 Fanghu North 2nd Road, Huli District, Xiamen, Fujian, China",
  workhours: "Mon–Sat 8:30–18:00",
};

// Brand-details EN overlays, keyed by brand slug
export type BrandDetailEn = {
  hq: string;
  history: string;
  highlights: string[];
  signatureSeries: { series: string; material: string; desc: string }[];
  industries: string[];
  specs: { grade: string; material: string; props: string }[];
};

export const brandDetailsEn: Partial<Record<BrandSlug, BrandDetailEn>> = {
  teijin: {
    hq: "Tokyo, Japan",
    history:
      "Teijin Limited is a Japanese century-old integrated chemicals and high-performance materials company. Its high-performance polymers division is a global leader in polycarbonate (PC) and PC alloys — PANLITE® PC and MULTILON® PC/ABS are benchmark materials for automotive lighting, optical light-guide, and electronic enclosures.",
    highlights: [
      "Top-3 global high-performance PC maker",
      "Industry benchmark for optical / lighting-grade PC",
      "World-leading PC/ABS alloy technology",
      "Factory authorized + complete TDS / SDS / RoHS / REACH",
    ],
    signatureSeries: [
      { series: "PANLITE® PC", material: "Polycarbonate", desc: "Full range: general, optical, FR, glass-fiber reinforced" },
      { series: "MULTILON®", material: "PC/ABS alloy", desc: "Tough + easy processing — mainstream auto interior" },
      { series: "PANLITE® AM", material: "FR PC/ABS", desc: "UL94 V-0, E&E enclosures" },
    ],
    industries: ["Automotive lighting", "EV", "Optical display", "Electronics", "Medical devices", "Safety equipment"],
    specs: [
      { grade: "PANLITE L-1225Y", material: "General transparent PC", props: "MFR 11 g/10min · Tensile 65 MPa · HDT 128°C · Transmittance 89%" },
      { grade: "PANLITE G-3430H", material: "30% GF reinforced PC", props: "Tensile 130 MPa · Flexural mod. 7800 MPa · HDT 145°C" },
      { grade: "MULTILON T-3713BH", material: "PC/ABS alloy", props: "MFR 18 g/10min · Notched Izod 60 kJ/m² · HDT 110°C" },
      { grade: "PANLITE AM-9930H", material: "FR PC/ABS", props: "UL94 V-0 @1.5mm · Notched Izod 40 kJ/m²" },
    ],
  },
  celanese: {
    hq: "Texas, USA",
    history:
      "Celanese Corporation is a global leader in engineering materials and specialty chemicals. After acquiring DuPont's Mobility & Materials business in 2022, it became one of the world's largest engineering plastics suppliers, with a portfolio covering nearly every high-end engineering plastic — POM, PBT, PPS, LCP, PA, LFT and more.",
    highlights: [
      "One of the world's largest engineering plastics suppliers",
      "Hostaform® POM is the recognized global benchmark",
      "Vectra® LCP is the standard for 5G high-frequency materials",
      "Factory direct authorization with long-term stable supply",
    ],
    signatureSeries: [
      { series: "Hostaform®", material: "POM copolymer", desc: "Classic POM, preferred for gears / structural parts" },
      { series: "Celanex® / Vandar®", material: "PBT / PBT alloy", desc: "Mainstream for E&E and automotive" },
      { series: "Fortron®", material: "Linear PPS", desc: "Dedicated to EV cooling systems" },
      { series: "Vectra®", material: "LCP", desc: "5G high frequency, ultra-thin connectors" },
      { series: "Celstran®", material: "Long glass fiber reinforced", desc: "Metal-replacement structural parts" },
    ],
    industries: ["Automotive", "EV powertrain", "5G communications", "Electronics", "Medical", "Industrial machinery"],
    specs: [
      { grade: "Hostaform C9021", material: "General POM", props: "Density 1.41 · MFR 9 g/10min · Tensile 67 MPa · HDT 110°C" },
      { grade: "Celanex 2300GV1/30", material: "30% GF PBT", props: "Tensile 135 MPa · Flexural mod. 10000 MPa · HDT 215°C" },
      { grade: "Fortron 1140A4", material: "40% GF PPS", props: "Tensile 195 MPa · HDT 270°C · UL94 V-0" },
      { grade: "Vectra E130i", material: "30% GF LCP", props: "Tensile 135 MPa · HDT 230°C · Dielectric 3.7@1MHz" },
    ],
  },
  solvay: {
    hq: "Brussels, Belgium",
    history:
      "Solvay is a global leader in high-performance specialty polymers, focused on PEEK, PPS, PPSU, PSU, PPA and PARA — serving aerospace, medical implants, semiconductors and new energy. Material performance and traceability are an industry benchmark.",
    highlights: [
      "Global leader in high-performance specialty polymers",
      "Covers the pyramid top from PPS to PEEK",
      "Aerospace and medical-implant certified",
      "Full factory authorization with complete regulatory support",
    ],
    signatureSeries: [
      { series: "Ryton® PPS", material: "Branched PPS", desc: "Continuous use at 240°C" },
      { series: "Amodel® PPA", material: "High-temp polyamide", desc: "SMT reflow capable" },
      { series: "KetaSpire® PEEK", material: "Polyetheretherketone", desc: "Top-tier specialty plastic" },
      { series: "Radel® PPSU", material: "Polyphenylsulfone", desc: "Steam sterilization grade" },
      { series: "Udel® PSU", material: "Polysulfone", desc: "High-temp transparent" },
    ],
    industries: ["Aerospace", "Medical implants & devices", "Semiconductors", "EV", "High-end electronic connectors", "Oil & gas"],
    specs: [
      { grade: "Ryton R-4-200BL", material: "40% GF PPS", props: "Tensile 195 MPa · HDT 260°C · UL94 V-0 @0.8mm" },
      { grade: "Amodel A-1133HS", material: "33% GF PPA", props: "Tensile 230 MPa · HDT 285°C · Water absorption <0.5%" },
      { grade: "KetaSpire KT-820", material: "Pure PEEK", props: "Tensile 100 MPa · Continuous use 260°C · UL94 V-0" },
      { grade: "Radel R-5500", material: "PPSU", props: "Tensile 70 MPa · HDT 207°C · Transparent, sterilizable" },
    ],
  },
  umg: {
    hq: "Tokyo, Japan",
    history:
      "UMG ABS Inc., a joint venture of Japan's Ube Industries and Mitsubishi Chemical, is a premium Japanese maker of ABS / ASA / AES styrenic engineering plastics. Products are known for weatherability, impact resistance, low VOC and superior surface gloss — long supplying Japanese automakers and premium appliance brands.",
    highlights: [
      "Premium Japanese ABS manufacturer",
      "Industry-leading ASA outdoor weatherability",
      "Low VOC, meeting Japanese OEM interior requirements",
      "Stable supply with refined pellet quality control",
    ],
    signatureSeries: [
      { series: "UMG ABS", material: "ABS", desc: "Full range: general / high rigidity / FR / plating grade" },
      { series: "DIAPET® ASA", material: "ASA", desc: "Outdoor weatherable, replaces ABS exterior" },
      { series: "UMG AES", material: "AES", desc: "EPDM modified — weather + impact balance" },
      { series: "UMEX®", material: "PMMA/ABS alloy", desc: "High gloss, paint-free" },
    ],
    industries: ["Auto interior/exterior", "White goods", "OA equipment", "Building materials", "Toys & stationery"],
    specs: [
      { grade: "UMG ABS S100N", material: "General ABS", props: "MFR 23 g/10min · Notched Izod 23 kJ/m² · HDT 88°C" },
      { grade: "UMG ABS EX18A", material: "High-impact ABS", props: "Notched Izod 38 kJ/m² · Tensile 41 MPa" },
      { grade: "DIAPET AT-08", material: "ASA", props: "QUV 2000h ΔE<3 · Notched Izod 22 kJ/m² · HDT 95°C" },
      { grade: "UMG AES BS-280", material: "AES", props: "Notched Izod 30 kJ/m² · Excellent ozone / UV resistance" },
    ],
  },
  lati: {
    hq: "Varese, Italy",
    history:
      "LATI Industria Termoplastici S.p.A. is a leading European manufacturer of specialty compounded engineering plastics, focused on high-end custom solutions. Its portfolio covers self-lubricating, thermally conductive, electrically conductive, ESD, flame-retardant and long-glass-fiber reinforced compounds — serving automotive, electronics, medical and industrial sectors.",
    highlights: [
      "European specialty compounder",
      "Custom formulations with flexible small-batch supply",
      "Top-tier self-lubricating / thermally conductive / conductive tech",
      "Complete UL Yellow Card + REACH / RoHS / food-contact certifications",
    ],
    signatureSeries: [
      { series: "LATAMID®", material: "PA compounds", desc: "Nylon glass-fiber / mineral reinforced series" },
      { series: "LATILUB®", material: "Self-lubricating", desc: "PTFE / silicone / graphite modified" },
      { series: "LATICONTHER®", material: "Thermally conductive", desc: "Conductive insulating / conductive variants" },
      { series: "LATIOHM®", material: "Conductive / ESD", desc: "Controlled surface resistance 10²–10⁹ Ω" },
      { series: "LATIGRAY®", material: "EMI shielding", desc: "EMI / RFI shielding plastics" },
      { series: "LASTIL®", material: "PPS compounds", desc: "High-temp chemical resistant" },
    ],
    industries: ["Auto structural", "Precision gears / bearings", "Electronics", "LED thermal", "Medical", "Industrial automation"],
    specs: [
      { grade: "LATAMID 66 H2 G/30", material: "30% GF PA66", props: "Tensile 180 MPa · Flexural mod. 9000 MPa · HDT 250°C" },
      { grade: "LATILUB 66 H2 G/25-V50", material: "PA66 + GF + PTFE", props: "Dynamic friction coef. 0.15 · Wear reduced 80%" },
      { grade: "LATICONTHER 62 GR/40", material: "Conductive PA6", props: "Thermal conductivity 2.0 W/m·K · Volume resistance >10¹³ Ω·cm" },
      { grade: "LATIOHM 62 H2 GR/15", material: "Conductive PA6", props: "Surface resistance 10⁴ Ω/sq · Tensile 90 MPa" },
    ],
  },
  ajp: {
    hq: "Taipei, Taiwan",
    history:
      "Asia Polymer Corporation (APC) is a long-established Taiwanese EVA and LDPE producer, technically partnered with Mitsui Chemicals. APC is one of the major PV-grade EVA suppliers in the Chinese-speaking region, known for precise VA content and batch stability.",
    highlights: [
      "Long-established Taiwanese EVA / LDPE producer",
      "Major PV-grade EVA supplier",
      "Full VA range 9%–28%",
      "Stable batch quality, suitable for scale production",
    ],
    signatureSeries: [
      { series: "ASIA EVA", material: "EVA", desc: "PV / footwear / cable / hot-melt" },
      { series: "ASIA LDPE", material: "LDPE", desc: "High-pressure LDPE for blown film / injection / coating" },
    ],
    industries: ["PV encapsulation", "Footwear foam", "Wire & cable", "Hot-melt / lamination", "Packaging film", "Agricultural film"],
    specs: [
      { grade: "UE630", material: "PV-grade EVA (VA 28%)", props: "MFR 15 g/10min · for PV film extrusion" },
      { grade: "UE633", material: "PV / foam EVA", props: "MFR 20 g/10min · VA 28% · excellent clarity" },
      { grade: "ASIA EVA 7470M", material: "Footwear foam EVA", props: "MFR 2.5 g/10min · VA 18% · high expansion ratio" },
      { grade: "ASIA LDPE F210", material: "Blown film LDPE", props: "MFR 2.0 g/10min · Density 0.921 g/cm³" },
    ],
  },
  usi: {
    hq: "Taipei, Taiwan",
    history:
      "USI Corporation is an integrated olefin group from Taiwan, leading Asia in EVA, LDPE and VAE emulsion capacity. USI supplies major PV module makers, footwear and cable manufacturers worldwide, with long-standing technical partnerships with Dow and Mitsui.",
    highlights: [
      "Asia's leading EVA / LDPE integrated supplier",
      "World-leading PV-grade EVA shipment",
      "Precise VA content control with batch stability",
      "Full EVA / LDPE / VAE product matrix",
    ],
    signatureSeries: [
      { series: "USI EVA", material: "EVA", desc: "PV / foam / hot-melt / cable full range" },
      { series: "Taisox® LDPE", material: "LDPE", desc: "Blown film / injection / extrusion coating" },
      { series: "ELVALOY® VAE", material: "VAE emulsion", desc: "Construction coatings / tile adhesives / non-wovens" },
    ],
    industries: ["PV encapsulation", "Footwear foam", "Wire & cable", "Hot-melt", "Construction coatings", "Packaging film"],
    specs: [
      { grade: "USI UE633", material: "PV EVA (VA 28%)", props: "MFR 20 g/10min · high transmittance · for PV film" },
      { grade: "USI UE2528", material: "Foam EVA (VA 25%)", props: "MFR 3 g/10min · high expansion & rebound" },
      { grade: "Taisox LD2420H", material: "Blown film LDPE", props: "MFR 2.0 g/10min · Density 0.923 g/cm³" },
      { grade: "ELVALOY DA-102H", material: "VAE emulsion", props: "Solid 55% · pH 4–6 · excellent water/alkali resistance" },
    ],
  },
};
