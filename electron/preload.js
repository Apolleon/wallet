const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAllBoughts: () => ipcRenderer.send("get-boughts"),
  addBoughtItem: (boughtItem) => ipcRenderer.send("add-bought", boughtItem),
  deleteBoughtItem: (boughtItemId) =>
    ipcRenderer.send("delete-bought", boughtItemId),
  handleBoughts: (callback) => ipcRenderer.on("all-boughts", callback),
  getAllCollections: () => ipcRenderer.send("get-collections"),
  editCollection: (oldName, collectionName) =>
    ipcRenderer.send("edit-collection", oldName, collectionName),
  deleteCollection: (id) => ipcRenderer.send("delete-collection", id),
  handleCollections: (collections) =>
    ipcRenderer.on("all-collections", collections),
  addCollection: (collection) => ipcRenderer.send("add-collection", collection),
  getAllStatistics: () => ipcRenderer.send("get-statistics"),
  handleStatistics: (statistics) =>
    ipcRenderer.on("all-statistics", statistics),
  getMonthStatistics: (month) =>
    ipcRenderer.send("get-month-statistics", month),
  handleMonthStatistics: (statistics) =>
    ipcRenderer.on("month-statistics", statistics),
});
