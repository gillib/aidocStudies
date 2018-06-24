const {ipcRenderer} = require('electron');
ipcRenderer.on('window-pic-reply', (event, args) => {
    console.log(args);
    $(document).ready(() => {
        $('#seriesImage').attr("src", 'http://localhost:5050/getImageBySeriesId/' + args.seriesId);
    });
});
