const btoa = require("btoa");
const { getVideoController, getVideoUseCase } = require("../GetVideo");

class UploadVideoController {
    uploadVideoUseCase;

    constructor(uploadVideoUseCase) {
        this.uploadVideoUseCase = uploadVideoUseCase;
    }

    async handle(request, response) {
        console.log(request.body);
        var result = this.uploadVideoUseCase.execute(request.body.filename);
        
        if(result) {
            return response.status(200).redirect("/");
        }

        return response.status(500).redirect("/?uploaded=false");
    }

}

module.exports = { UploadVideoController }