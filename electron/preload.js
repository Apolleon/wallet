const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAllBoughts: () => ipcRenderer.send("get-boughts"),
  getAllStatistics: () => ipcRenderer.send("get-statistics"),
  handleStatistics: (statistics) =>
    ipcRenderer.on("all-statistics", statistics),
  addBoughtItem: (boughtItem) => ipcRenderer.send("add-bought", boughtItem),
  deleteBoughtItem: (boughtItemId) =>
    ipcRenderer.send("delete-bought", boughtItemId),
  handleCounter: (callback) => ipcRenderer.on("all-boughts", callback),
  getAllCollections: () => ipcRenderer.send("get-collections"),
  editCollection: (oldName, collectionName) =>
    ipcRenderer.send("edit-collection", oldName, collectionName),
  handleCollections: (collections) =>
    ipcRenderer.on("all-collections", collections),
  addCollection: (collection) => ipcRenderer.send("add-collection", collection),
});
