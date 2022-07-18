// imports
const { readFileSync, readdirSync, rename } = require("fs");
const { resolve } = require("path");

function readJsonFile(file) {
  let bufferData = readFileSync(file);
  let stData = bufferData.toString();
  let data = JSON.parse(stData);
  return data;
}

const frename = async () => {
  // Watchdog Folder path
  const metadata = readJsonFile(resolve(__dirname, "./metadata.json"));
  const imageDirPath = resolve(metadata.dir_path);
  let files = [];
  console.log(metadata);
  try {
    files = readdirSync(imageDirPath, (err) => console.log(err));
  } catch (err) {
    return "Couldn't find the folder";
  }

  // Seperating the named and unnamed files
  const named_files = files.filter((file) => !isNaN(file.split(".")[0]));
  const unnamed_files = files.filter((file) => isNaN(file.split(".")[0]));

  const sorted_named_files = named_files.sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });

  // Gets the heighest numbered file in the folder
  let last_file = sorted_named_files[sorted_named_files.length - 1];

  // Renaming
  if (last_file === undefined) last_file = "0.eclipsu";
  unnamed_files.forEach((unnamed_file, i) => {
    const oldFilePath = imageDirPath + `\\${unnamed_file}`;
    const newFilePath = imageDirPath + `\\${parseInt(last_file.split(".")[0]) + (i += 1)}\.${unnamed_file.split(".")[1]}`;

    rename(oldFilePath, newFilePath, (err) => void 0);
  });
  return "Sucess";
};

module.exports = { frename };
