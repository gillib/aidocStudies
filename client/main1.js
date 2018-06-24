const {app, BrowserWindow, ipcMain} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let winMain, winImg;

ipcMain.on('window-pic-message', (event, args) => {
    // const file = args.file;
    // createOther(file);
    console.log(args);

    winImg.send('window-pic-reply', args);
});

function createWindow() {
    // Create the browser window.
    winMain = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    winMain.loadFile('index.html');

    // Open the DevTools.
    // win.webContents.openDevTools()

    // Emitted when the window is closed.
    winMain.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        winMain = null;
    });
}

function createOther(file) {
    winImg = new BrowserWindow({width: 550, height: 550});
    winImg.loadFile(file);
    winImg.on('closed', () => {
        winImg = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    createOther('seriesImagePage.html');
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (winMain === undefined) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.