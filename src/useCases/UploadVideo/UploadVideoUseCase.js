const fs = require("fs");
const { resolve } = require("path");
const { createTemporaryFolder } = require("../CreateTemporaryFolder");

class UploadVideoUseCase {
    execute(path) {
        const filepath = resolve(createTemporaryFolder.path, 'edited', path);
        console.log("Filepath", filepath);
        const newPath = resolve('/home/ubuntu', 'recordings', path);
        const fileExists = fs.existsSync(filepath);
        const THIRTY_SECONDS = 30 * 1000;
        console.log("File exists", fileExists);


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