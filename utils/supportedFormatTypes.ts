import { FormatVariants } from "../components/ConversionButtonsSection.tsx";
type Formats = "json" | "yaml" | "csv" | "xml";

const supportedFormatTypes: Record<Formats, FormatVariants[]> = {
  json: ["YAML", "XML", "JSONL", "CSV"],
  yaml: ["CSV", "JSON", "XML", "TOML"],
  csv: ["JSON", "TOML", "XML", "YAML"],
  xml: ["CSV", "YAML", "JSON", "BEAUTIFIER"],
};

const formatSiteMapUrls = [
  ...supportedFormatTypes.json.map((t) => `/json/${t.toLowerCase()}`),
  ...supportedFormatTypes.yaml.map((t) => `/yaml/${t.toLowerCase()}`),
  ...supportedFormatTypes.csv.map((t) => `/csv/${t.toLowerCase()}`),
  ...supportedFormatTypes.xml.map((t) => `/xml/${t.toLowerCase()}`),
];

export { formatSiteMapUrls, supportedFormatTypes };
