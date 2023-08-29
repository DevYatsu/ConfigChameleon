import { FormatVariants } from "../components/ConversionButtonsSection.tsx";
type Formats = "json" | "yaml" | "csv" | "xml";

const supportedTypes: Record<Formats, FormatVariants[]> = {
  json: ["YAML", "XML", "JSONL", "CSV"],
  yaml: ["CSV", "JSON", "XML", "TOML"],
  csv: ["JSON", "TOML", "XML", "YAML"],
  xml: ["CSV", "YAML", "JSON", "BEAUTIFIER"],
};

export default supportedTypes;
