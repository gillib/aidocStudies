const express = require('express');
const StudiesService = require('./studies.service');

const router = express.Router();
const studies = new StudiesService();

router.get('/getMetadataByStudyId/:studyId', function (req, res, next) {
    const studyId = req.params.studyId;
    res.respond(studies.getMetadataByStudyId(studyId));
});

router.get('/getImageBySeriesId/:seriesId', function (req, res, next) {
    const seriesId = req.params.seriesId;

    const imgBase64 = studies.getImageBySeriesId(seriesId);
    const img = new Buffer(imgBase64, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': img.length
    });
    res.end(img);
});

module.exports = router;
