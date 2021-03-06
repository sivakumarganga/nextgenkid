import { app, BrowserWindow, screen, protocol, globalShortcut } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
//import * as mime from 'mime-types';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  const PROTOCOL = 'file';
  protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
    //console.log(`request: ${request.url}`);
    let directoryName=__dirname;
    //directoryName="D:\\core\\mine\\nextgenkid\\nextgenkid\\dist";
    try{
      let url = request.url.substr(PROTOCOL.length + 4);
      fs.access(url, (err) => {
        if (err) {
          //console.log(`Error:1:${url} ${err}`);
          let relativePath = url.substr(2);
          // if(path.extname(relativePath)==".js"||path.extname(relativePath)==".css"){
          //   console.log(`relativePath : ${relativePath}`);
          //   relativePath=relativePath.replace("/apps","");
          // }
          // console.log(`File does not exist ${__dirname} url:${relativePath}}`);
          url = path.join(directoryName, relativePath);
        }
        if (!fs.existsSync(url)) {
          console.log(`Error:2:${url} ExtName:${path.extname(url)} Error:${err}`);
          if(!path.extname(url).length){
              // Path when running electron executable
              let pathIndex = './index.html';
              if (fs.existsSync(path.join(directoryName, '../dist/index.html'))) {
                // Path when running electron in local folder
                pathIndex = '../dist/index.html';
              }
              url = path.join(directoryName, pathIndex);
          }                   
        }
        url = path.normalize(url);        
        // console.log(`Final Check Url:${url}} ${mime.lookup(url)||'empty'} Ctype:${mime.contentType(url)||'empty'}`);
        //console.log(`Final Check Url:${url}}`);
        callback({ path: url });
      });
    }catch(e){
      console.log(`request error: ${request.url}`);
      console.log(e);
    }
  });

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    autoHideMenuBar: true,
    alwaysOnTop: (serve) ? false : true,
    closable: (serve) ? true : false,
    fullscreen: true,
    modal: true,
    focusable: true,
    useContentSize: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent:true, //(serve) ? true : false,
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });


  if (serve) {
    win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(path.join(__dirname, '/../node_modules/electron'))
    });
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    win.loadURL(url.format({
      pathname: path.join(__dirname, pathIndex),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  // app.on('ready', () => {    
  //   setTimeout(createWindow, 400)
  // });
  app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+Alt+Q', () => {
      app.quit();
      console.log("Closing the application");
    });
    globalShortcut.register('CommandOrControl+B', () => {
      win.webContents.goBack();
      console.log("Closing the application");
    });
  }).then(createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
