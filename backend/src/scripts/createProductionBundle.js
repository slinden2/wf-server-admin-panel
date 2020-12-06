/* 
Script for creating the production bundle.
*/

const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");
const fs = require("fs");

const removeDir = require("./removeDir");

const deletePreviousBuild = () => {
  const pathToDir = path.join(__dirname, "../../dist");
  removeDir(pathToDir);
};

const buildBackend = async () => {
  await exec("npm run build:server");
};

const buildFrontend = async () => {
  const cwd = "../frontend";
  await exec("npm run build", { cwd });
};

const moveFrontendToBackendDir = async () => {
  const currentPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "frontend",
    "build"
  );
  const destinationPath = path.join(__dirname, "..", "..", "dist", "client");
  if (fs.existsSync(!destinationPath)) {
    fs.mkdirSync(destinationPath);
  }
  await fs.promises.rename(currentPath, destinationPath);
};

const main = async () => {
  console.log("Deleting previous build...");
  deletePreviousBuild();
  console.log("Building backend...");
  await buildBackend();
  console.log("Building frontend...");
  await buildFrontend();
  await moveFrontendToBackendDir();
  console.log("Done!");
};

main().catch((e) => console.error(e));
