import express from "express";
import fs from "fs";
import morgan from "morgan";

const app = express();
app.use(express.json());

app.use(morgan("dev"));

const FILE = "./members.json";

function load() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function save(members) {
  fs.writeFileSync(FILE, JSON.stringify(members, null, 2));
}

app.get("/", (req, res) => {
  res.send(
    "Welcome to the IEEE Student Branch API! 1. Use GET /members to see all members 2. POST /members to add a member, and 3. DELETE /members/:usn to remove a member.",
  );
});

app.get("/members", (req, res) => {
  const members = load();
  res.json({ count: members.length, members });
});

app.post("/members", (req, res) => {
  const { name, usn, domain, clubName, position, phone } = req.body;

  if (!name || !usn || !domain || !clubName || !position || !phone) {
    return res.status(400).json({
      error:
        "All fields are required: name, usn, domain, clubName, position, phone.",
    });
  }
  if (usn.length !== 10) {
    return res
      .status(400)
      .json({ error: "USN must be exactly 10 characters." });
  }

  const members = load();

  if (members.find((m) => m.usn === usn)) {
    return res
      .status(409)
      .json({ error: "A member with this USN already exists." });
  }

  const newMember = { name, usn, domain, clubName, position, phone };
  members.push(newMember);
  save(members);

  res
    .status(201)
    .json({ message: "Member added successfully.", member: newMember });
});

app.delete("/members/:usn", (req, res) => {
  const members = load();
  const index = members.findIndex((m) => m.usn === req.params.usn);

  if (index === -1) {
    return res.status(404).json({ error: "Member not found." });
  }

  const removed = members.splice(index, 1)[0];
  save(members);

  res.status(200).json({
    message: `${removed.name} (${removed.usn}) removed successfully.`,
  });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`),
);
