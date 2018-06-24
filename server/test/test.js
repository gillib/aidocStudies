let assert = require('assert');
let _ = require('lodash');

describe('Cache', function () {
    const AidocCache = require('../components/cache/aidocCache');
    const c1 = new AidocCache(30, 10);

    describe('adding', function () {
        it('should return null when the value is not in cache', function () {
            const id = 1;
            assert.equal(c1.get(id), undefined);
        });

        it('should return value after stored in cache', function () {
            const id = 1;
            const val = "cachedItem";
            c1.add(id, val);
            assert.equal(c1.get(id), val);
        });


        it('should keep only 10 items in cache', function () {
            const val = "cachedItem";
            c1.add(2, val);
            c1.add(3, val);
            c1.add(4, val);
            c1.add(5, val);
            c1.add(6, val);
            c1.add(7, val);
            c1.add(8, val);
            c1.add(9, val);
            c1.add(10, val);
            c1.add(11, val);
            assert.equal(c1.get(1), undefined);
        });
    });
});

describe('Studies Service', function () {
    const StudiesService = require('../studies/studies.service');
    const studies = new StudiesService(dbMock(), cacheMock(), cacheMock());

    describe('getMetadataByStudyId', function () {
        it('should return the correct value', function () {

            assert.equal(_.isEqual(
                studies.getMetadataByStudyId(123),
                {
                    patientId: 'a1',
                    seriesIds: ['abc', 'def'],
                    studiesAmount: 3
                }
            ), true);
        });
    });

    describe('getImageBySeriesId', function () {
        it('should return the correct value', function () {
            assert.equal(studies.getImageBySeriesId('def'), '==1234567==');
        });
    });
});

function dbMock() {
    return {
        load: function () {
        },
        docs: [
            {
                studyId: 123,
                seriesId: 'abc',
                patientId: 'a1'
            },
            {
                studyId: 123,
                seriesId: 'abc',
                patientId: 'a1'
            },
            {
                studyId: 123,
                seriesId: 'def',
                patientId: 'a1',
                data: '==1234567=='
            },
            {
                studyId: 456,
                seriesId: 'abc',
                patientId: 'a1'
            }
        ]
    }
}

function cacheMock() {
    return {
        add: function () {
        },
        get: function () {
        }
    }
}