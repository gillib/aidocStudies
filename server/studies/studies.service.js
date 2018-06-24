const _ = require('lodash');
const FsJsonDb = require('../components/db/fsJsonDb');

const AidocCache = require('../components/cache/aidocCache');

class StudiesService {
    constructor(db = new FsJsonDb('/Users/gilbartsion/Dev/Aidoc/output'), seriesCache = new AidocCache(), metaCache = new AidocCache()) {
        this.db = db;
        this.db.load();

        this._seriesCache = seriesCache;
        this._metaCache = metaCache;
    }

    getMetadataByStudyId(studyId) {
        let study = this._metaCache.get(studyId);

        if (!study) {

            const studies = _.filter(this.db.docs, {studyId});
            if (studies.length === 0) {
                return new Error('study id does not exist')
            }

            const seriesIds = new Set();
            _.forEach(studies, study => seriesIds.add(study.seriesId));

            study = {
                patientId: studies[0].patientId,
                seriesIds: Array.from(seriesIds),
                studiesAmount: studies.length
            };

            this._metaCache.add(studyId, study);
        }

        return study;
    }

    getImageBySeriesId(seriesId) {
        let instancesOfSeriesId = this._seriesCache.get(seriesId);
        if (!instancesOfSeriesId) {
            instancesOfSeriesId = _.filter(this.db.docs, {seriesId});
            this._seriesCache.add(seriesId, instancesOfSeriesId);
        }
        const randomInstanceOfSeries = instancesOfSeriesId[getRandomInt(instancesOfSeriesId.length)];
        if (!randomInstanceOfSeries) {
            return new Error('series id does not exist')
        }

        return randomInstanceOfSeries.data;
    }
}

module.exports = StudiesService;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}