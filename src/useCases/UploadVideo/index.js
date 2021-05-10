const { UploadVideoController } = require("./UploadVideoController");
const { UploadVideoUseCase } = require("./UploadVideoUseCase");

const uploadVideoUseCase = new UploadVideoUseCase();
const uploadVideoController = new UploadVideoController(uploadVideoUseCase);

module.exports = { uploadVideoController, uploadVideoUseCase };