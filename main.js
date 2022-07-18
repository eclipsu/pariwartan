const fs = require("fs");
const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

const { frename } = require("./rename");
const metadata = require("./metadata.json");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 400,
    icon: "./assets/icon.ico",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, "src/FrontEnd/index.html"));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("hello", async (event, data) => {
  const reply = await frename();
  event.reply("rename-reply", reply);
});

ipcMain.on("open-folder", async (event, data) => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.canceled == true) return;
  const newMetadata = { ...metadata, dir_path: result.filePaths[0] };
  fs.writeFile(path.resolve(__dirname, "./metadata.json"), JSON.stringify(newMetadata, null, 4), (err) => {
    if (err) return console.log(err);
  });
});
