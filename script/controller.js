const csv = require("fast-csv");
const fs = require("fs");
const { axiosUtil } = require("./axiosUtil");
const path = require("path");

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

    const writableStream = fs.createWriteStream("public/files/export/data.csv");

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

    // console.log(rows);
    const options = {
      root: path.join(__dirname)
    }

    const file = "public/files/export/data.csv"

    return res.sendFile(file, options, (err)=> {
      if(err) console.error(err)
      console.log("File has been sent")
    })
  } catch (error) {
    res.status(400).json(error.message);
  }
};
