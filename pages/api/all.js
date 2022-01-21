import db from "data/icons";

// 📦 Show all content ->
export default function handler(req, res) {
  res.status(200).json(db);
}
