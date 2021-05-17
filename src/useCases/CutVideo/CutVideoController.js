const btoa = require("btoa");

class CutVideoController {
    cutVideoUseCase;

    constructor(cutVideoUseCase) {
        this.cutVideoUseCase = cutVideoUseCase;
    }

    toSeconds(time) {
        let [hours, minutes, seconds] = time.split(":").map(Number);

        minutes = hours * 60 + minutes;
        seconds = minutes * 60 + seconds;

        return seconds;
    }

    async handle(request, response) {
        console.log("REQUEST BODY", request.body);
        let { from, to } = request.body;
        console.log("Request File", request.file)
        const { filename, path: input } = request.file;
        const { editedFolder, rawFolder } = request;
        var prefix = request.body.company;
        var case_id = request.body.case + filename.slice(-4);

        const output = `${case_id}`;

        from = this.toSeconds(from);
        to = this.toSeconds(to);

        const truncated = await this.cutVideoUseCase.execute({ 
            input,
            output,
            from,
            to,
            rawFolder,
            editedFolder
        });

        if(truncated) {
            var return_str = `/cut/${btoa(output)}`
            if (prefix != undefined){
                return_str += `?prefix=`+prefix;
            }
            if (case_id != undefined){
                return_str += `&case_id=`+case_id;
            }
            return response.status(200).redirect(return_str);
        }

        return response.status(500).redirect("/?truncated=false");
    }
}

module.exports = { CutVideoController };