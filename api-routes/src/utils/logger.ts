import pkg from "../../package.json" with { type: "json" };
import { formatDate } from "./formatDate";

const PREFIX = `[@svgl/api v${pkg.version}]`;

const date = () => formatDate(new Date());

export const logger = {
  info: (msg: string) => console.log(`${date()} - ✅ ${PREFIX} ${msg}`),
  error: (msg: string, err?: unknown) =>
    console.error(`${date()} - ❌ ${PREFIX} ${msg}`, err ?? ""),
  warn: (msg: string) => console.warn(`${date()} - ⚠️  ${PREFIX} ${msg}`),
  ready: (msg: string) => console.log(`${date()} - 🚀 ${PREFIX} ${msg}`),
};
