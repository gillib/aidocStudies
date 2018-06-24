$(document).ready(() => {
    const {ipcRenderer} = require('electron');

    $('#getImageBySeriesIdForm').submit(($event) => {
        $event.preventDefault();

        const seriesId = $('#seriesId').val();
        console.log(seriesId);
        ipcRenderer.send('window-pic-message', {seriesId});
    });

    $('#getMetadataByStudyIdForm').submit(($event) => {
        $event.preventDefault();

        const studyId = $('#studyId').val();
        if (!studyId) return;

        $.get('http://localhost:5050/getMetadataByStudyId/' + studyId, (metadata) => {
            const jsonPretty = JSON.stringify(metadata, null, '\t');
            $("#metadataJSON").text(jsonPretty);
        });
    });
});