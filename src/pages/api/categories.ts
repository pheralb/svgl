import type { NextApiRequest, NextApiResponse } from "next";
import db from "data/svgs.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get unique categories:
  const categories = db
    .map((svg) => svg.category)
    .filter((category, index, array) => array.indexOf(category) === index);
  res.status(200).json(categories);
}
