import { ipcRenderer } from "electron";

export const downloadFromUrl = (url: string) => {
    ipcRenderer.send("download", url);
}

export const notifyMainThread = (message: string) => {
    ipcRenderer.send("notify", message);
}