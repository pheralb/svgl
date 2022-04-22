import db from "data/svgs";

// 📦 Show all content ->
export default function handler(req, res) {
  res.status(200).json(db);
}
