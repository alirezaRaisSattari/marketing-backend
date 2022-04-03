// moduels
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// models
const Document = require("../../models/index").Document;

class documentController {
  async index(req, res) {
    try {
      const document = await Document.findAll({
        where: { userId: req.user.id },
      });
      if (document == null) {
        res.status(400);
        throw new Error("you dont have documnet in api");
      }
      return res.json({
        success: true,
        message: "",
        data: document,
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      return res.json({
        success: false,
        message: "we cant find document",
      });
    }
  }
  async create(req, res) {
    try {
      const filePath = `${req.file.destination}/${req.file.filename}`.slice(1);
      const findDocumnet = await Document.findOne({
        where: { userId: req.user.id },
      });
      if (
        findDocumnet !== null &&
        findDocumnet.verificationMessage.length != 0
      ) {
        // remove sended documents
        const removeDocument = fs.unlinkSync(path.resolve(filePath));
        res.status(400);
        res.json({
          success: false,
          message: "you have document",
        });
      }
      const documentData = {
        id: uuidv4(),
        userId: req.user.id,
        role: "Marketer",
        name: req.user.username,
        filePath: process.env.domain + filePath,
        isVerified: false,
        verificationMessage: "",
      };
      const newDocument = await Document.create(documentData);
      return res.json({
        success: true,
        message: "document sended and needs to verification by admin",
      });
    } catch (error) {
      console.log(error);
      res.status(400);
      return res.json({
        success: false,
        message: "we cant add document",
      });
    }
  }
}

module.exports = new documentController();
