const fs = require("fs");

const removeDir = (pathToDir) => {
  if (fs.existsSync(pathToDir)) {
    const files = fs.readdirSync(pathToDir);

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (fs.statSync(pathToDir + "/" + filename).isDirectory()) {
          removeDir(pathToDir + "/" + filename);
        } else {
          fs.unlinkSync(pathToDir + "/" + filename);
        }
      });
      fs.rmdirSync(pathToDir);
    } else {
      fs.rmdirSync(pathToDir);
    }
  } else {
    console.log("Directory path not found.");
  }
};

module.exports = removeDir;
