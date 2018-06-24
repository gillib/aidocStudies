const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class FsJsonDb {
    constructor(dirPath) {
        this._dirPath = dirPath;
    }

    load() {
        const fileNames = fs.readdirSync(this._dirPath);
        this._docs = _.map(fileNames, fileName => {
            const file = fs.readFileSync(path.join(this._dirPath, fileName), 'utf-8');
            return JSON.parse(file);
        });
        let x = 6;
    }

    get docs() {
        return this._docs;
    }
}

module.exports = FsJsonDb;


