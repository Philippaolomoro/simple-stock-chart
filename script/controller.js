const csv = require("fast-csv");
const fs = require("fs");
const { axiosUtil } = require("./axiosUtil");
const path = require("path");
const websocket = require("ws");

exports.getData = async (req, res) => {
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
        // console.log(row)
        rows.push(row);
      })
      .on("end", () => {
        res.send(rows);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};
