import db from "data/svgs.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { SvgData } from "@/interfaces/svgData";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SvgData[]>
) {
  // Begin with the last id in the db:
  const svgs = db.sort((a, b) => b.id - a.id);
  return res.status(200).json(svgs);
}
