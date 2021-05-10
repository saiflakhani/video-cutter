const fs = require("fs");
const { resolve } = require("path");
const { createTemporaryFolder } = require("../CreateTemporaryFolder");

class UploadVideoUseCase {
    execute(path) {
        const filepath = resolve(createTemporaryFolder.path, 'edited', path);
        const newPath = resolve(createTemporaryFolder.path, 'uploaded', path);
        const fileExists = fs.existsSync(filepath);
        const THIRTY_SECONDS = 30 * 1000;


        if(fileExists) {
            console.log("File exists!");
            fs.rename(filepath, newPath, function (err) {
                if (err) throw err
                console.log('Successfully renamed - AKA moved!')
            });

            return true;
        }

        return false;
    }
}
module.exports = { UploadVideoUseCase };