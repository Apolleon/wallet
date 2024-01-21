const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const getStatisticValues = require("./helpers/getStatisticValues");
const Datastore = require("nedb");
const db = {};
db.purchases = new Datastore("purchases.db");
db.collections = new Datastore("collections.db");

let mainWindow;
let loadingwindow = null;
let statistics = [];

async function createWindow() {
  await client.connect().catch((e) => console.log(e));

  loadingwindow = new BrowserWindow({
    frame: false,
    movable: false,
    transparent: true,
  });

  loadingwindow.loadFile("./public/loading.html");
  loadingwindow.show();
  setTimeout(() => {
    const startUrl =
      process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, "../build/index.html"),
        protocol: "file:",
        slashes: true,
      });
    mainWindow = new BrowserWindow({
      width: 1100,
      height: 790,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });
    mainWindow.loadURL(startUrl);
    loadingwindow.hide();
    mainWindow.on("closed", function () {
      mainWindow = null;
    });
  }, 3000);

  const initStatistics = async () => {
    const boughtsInit = await db.purchases.find({});
    const collectionsInit = await db.collections.find({});
    statistics = getStatisticValues(collectionsInit, boughtsInit);
  };

  initStatistics();

  //Purchases Api

  ipcMain.on("get-boughts", async (event) => {
    const result = await db.boughtItems.find({});
    event.reply("all-boughts", result);
  });

  ipcMain.on("add-bought", async (event, boughtItem) => {
    await db.boughtItems.insert(boughtItem);
    statistics = initStatistics();
    const result = await db.boughtItems.find({});
    event.reply("all-boughts", result);
  });

  ipcMain.on("delete-bought", async (event, boughtItemDate) => {
    await boughtItems.deleteOne({ filterDate: boughtItemDate });
    const result = await db.boughtItems.find({});
    statistics = initStatistics();
    event.reply("all-boughts", result);
  });

  //collections api

  ipcMain.on("get-collections", async (event) => {
    const result = await db.collections.find({});
    event.reply("all-collections", result);
  });

  ipcMain.on("add-collection", async (event, collectionItem) => {
    await db.collections.insert(collectionItem);
    const result = await db.collections.find({});
    event.reply("all-collections", result);
  });

  ipcMain.on("edit-collection", async (event, { oldName, newName }) => {
    await db.collections.update(
      { collection: oldName },
      { $set: { collection: newName } },
      { multi: false }
    );
    const result = await db.collections.find({});
    event.reply("all-collections", result);
  });

  //statistics api

  ipcMain.on("get-statistics", async (event) => {
    event.reply("all-statistics", statistics);
  });
}

// Start Application

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
