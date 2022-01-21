import db from "data/icons";

// 📦 Show categories ->
export default function handler(req, res) {
  try {
    const categories = db
      .map((item) => item.category)
      .filter((category, index, self) => self.indexOf(category) === index);
    return res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
