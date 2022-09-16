const csv = require("fast-csv");
const fs = require("fs");
const { axiosUtil } = require("./axiosUtil");
const path = require("path");

exports.getData =(req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  setInterval(async () =>{ 
    try {
      const cryptoData = await axiosUtil();

      let csvStream = csv.format({ headers: true });

      if (!fs.existsSync("public/files/export/")) {
        if (!fs.existsSync("public/files")) {
          fs.mkdirSync("public/files/", { recursive: true });
        }
        if (!fs.existsSync("public/files/export/")) {
          fs.mkdirSync("./public/files/export/", { recursive: true });
        }
      }
        const writableStream = fs.createWriteStream(
          "public/files/export/data.csv"
        );

        writableStream.on("error", function (err) {
          console.log(err.message);
        });

        csvStream.pipe(writableStream);

        for (var key in cryptoData) {
          if (cryptoData.hasOwnProperty(key)) {
            csvStream.write({
              name: key,
              price: cryptoData[key].data.prices,
            });
          }
          // await new Promise((resolve) => {
          //   writableStream.once("drain", resolve);
          // });
        }

        csvStream.end();
        writableStream.end();

      let rows = [];
      fs.createReadStream("public/files/export/data.csv")
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => console.error(error))
        .on("data", (row) => {
          rows.push(row);
        })
        .on("end", () => {
          res.write(JSON.stringify(rows));
          res.end();
        });     
    } catch (error) {
      res.status(400).json(error);
    }
  }, 10000)
};
