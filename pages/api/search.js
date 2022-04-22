import db from "data/svgs";

export default function handler(req, res) {
  const { id, q, c } = req.query;

  // 🔎 Search by id (ex: ?id=1) ->
  if (id) {
    const item = db.find((item) => item.id === +id);
    return res.status(200).json(item);
  }

  // 🔎 Search by query (ex: ?q=d) ->
  if (q) {
    const results = db.filter((product) => {
      const { title } = product;
      return title.toLowerCase().includes(q.toLowerCase());
    });
    return res.status(200).json(results);
  }

  // 🔎 Search by category (ex: ?c=library) ->
  if (c) {
    const results = db.filter((product) => {
      const { category } = product;
      return category.toLowerCase().includes(c.toLowerCase());
    });
    return res.status(200).json(results);
  }

  // ✖ Error ->
  res.status(400).json({ info: 'Error: api query not found.' });
}
