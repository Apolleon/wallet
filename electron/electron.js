const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const getStatisticValues = require("./helpers/getStatisticValues");
const Datastore = require("nedb");

const db = {};
db.purchases = new Datastore("purchases.db");
db.collections = new Datastore("collections.db");
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
    icon: "../src/img/icon.gif",
  });

  loadingwindow.loadFile("../public/loading.html");
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
      height: 890,
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

  const initStatistics = async (month = new Date().getMonth()) => {
    const boughtsInit = await new Promise((resolve) => {
      db.purchases.find({}, (err, docs) => {
        if (!err) resolve(docs);
      });
    });
    const collectionsInit = await new Promise((resolve) => {
      db.collections.find({}, (err, docs) => {
        if (!err) resolve(docs);
      });
    });

    return getStatisticValues(collectionsInit, boughtsInit, month);
  };

  statistics = await initStatistics();

  //Purchases Api

  ipcMain.on("get-boughts", (event) => {
    db.purchases.find({}, (err, docs) => {
      if (!err) event.reply("all-boughts", docs);
    });
  });

  ipcMain.on("add-bought", async (event, boughtItem) => {
    await db.purchases.insert(boughtItem);

    db.purchases.find({}, (err, docs) => {
      if (!err) {
        event.reply("all-boughts", docs);
        statistics = initStatistics();
      }
    });
  });

  ipcMain.on("delete-bought", async (event, boughtItemId) => {
    await db.purchases.remove({ _id: boughtItemId });

    db.purchases.find({}, (err, docs) => {
      if (!err) {
        event.reply("all-boughts", docs);
        statistics = initStatistics();
      }
    });
  });

  //collections api

  ipcMain.on("get-collections", (event) => {
    db.collections.find({}, (err, docs) => {
      if (!err) event.reply("all-collections", docs);
    });
  });

  ipcMain.on("add-collection", (event, collectionItem) => {
    db.collections.insert(collectionItem, (err, docs) => {
      if (!err) {
        db.collections.find({}, (err, docs) => {
          if (!err) {
            event.reply("all-collections", docs);
          }
        });
      }
    });
  });

  ipcMain.on("delete-collection", (event, id) => {
    db.collections.remove({ _id: id }, (err, docs) => {
      if (!err) {
        db.collections.find({}, (err, docs) => {
          if (!err) {
            event.reply("all-collections", docs);
          }
        });
      }
    });
  });

  ipcMain.on("edit-collection", (event, { _id, collection, newName }) => {
    db.collections.update(
      { _id: _id },
      { $set: { collection: newName } },
      { multi: false }
    );

    db.purchases.update(
      { collectionName: collection },
      { $set: { collectionName: newName } },
      { multi: true }
    );

    db.collections.find({}, (err, docs) => {
      if (!err) {
        event.reply("all-collections", docs);
      }
    });

    db.purchases.find({}, (err, docs) => {
      if (!err) {
        event.reply("all-boughts", docs);
        statistics = initStatistics();
      }
    });
  });

  //statistics api

  ipcMain.on("get-statistics", async (event) => {
    event.reply("all-statistics", statistics);
  });

  ipcMain.on("get-month-statistics", async (event, month) => {
    const monthStats = await initStatistics(month);
    event.reply("month-statistics", monthStats);
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
