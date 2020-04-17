const http = require("http");
const data = require("./urls.json");
const URL = require("url");
const port = 3000;
const fs = require("fs");
const path = require("path");

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, "urls.json"),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err;
      cb(JSON.stringify({ message: "deleted ok" }));
    }
  );
}

http
  .createServer((req, res) => {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });
    const { name, url, del } = URL.parse(req.url, true).query;

    //all resources
    if (!name || !url) return res.end(JSON.stringify(data));

    //delete
    if (del) {
      dataTotal = data.urls;
      data.urls = data.urls.filter((item) => String(item.url) !== String(url));
      return writeFile((message) => {
        res.end(message);
      });
    }

    data.urls.push({ name, url });
    return writeFile((message) => res.end(message));
  })
  .listen(port, () => console.log(`api is running on port ${port}`));
