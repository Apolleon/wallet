const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const getStatisticValues = require("./helpers/getStatisticValues");
const Datastore = require("nedb");

const db = {};
db.purchases = new Datastore("./purchases.db");
db.collections = new Datastore("./collections.db");
db.collections.loadDatabase();
db.purchases.loadDatabase();

let mainWindow;
let loadingwindow = null;
let statistics = [];

async function createWindow() {
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
  }, 2000);

  const initStatistics = async () => {
    const boughtsInit = await new Promise((resolve) =>
      db.purchases.find({}, (err, docs) => {
        if (!err) resolve(docs);
      })
    );
    const collectionsInit = await new Promise((resolve) =>
      db.collections.find({}, (err, docs) => {
        if (!err) resolve(docs);
      })
    );
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
    const result = await new Promise((resolve) =>
      db.collections.find({}, (err, docs) => {
        if (!err) resolve(docs);
      })
    );
    event.reply("all-collections", result);
  });

  ipcMain.on("add-collection", async (event, collectionItem) => {
    console.log(collectionItem);
    await new Promise((resolve) =>
      db.collections.insert(collectionItem, (err, doc) => {
        if (!err) resolve();
      })
    );
    const result = await new Promise((resolve) =>
      db.collections.find({}, (err, docs) => {
        if (!err) resolve(docs);
      })
    );
    console.log(result);
    event.reply("all-collections", result);
  });

  ipcMain.on("edit-collection", async (event, { oldName, newName }) => {
    db.collections.update(
      { collection: oldName },
      { $set: { collection: newName } },
      { multi: false }
    );

    db.purchases.update(
      { collectionName: oldName },
      { $set: { collection: newName } },
      { multi: true }
    );
    const result = await db.collections.find({});
    const purchaseRes = await db.purchases.find({});
    event.reply("all-collections", result);
    event.reply("all-boughts", purchaseRes);
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
