const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 5000;

http
  .createServer((req, res) => {
    const file = req.url === "/" ? "index.html" : req.url;
    const filePath = path.join(__dirname, "public", file);
    const extName = path.extname(filePath);

    const allowedFileTypes = [".html", ".css", ".js"];
    const allowed = allowedFileTypes.find((item) => item == extName);

    if (!allowed) return;

    fs.readFile(filePath, (err, content) => {
      //if (err) throw err;
      res.end(content);
    });
  })
  .listen(port, () => console.log(`Server is up on port ${port}`));
