const { v4: uuid } = require("uuid");
const ShareLinkMarketer = require("../../models/index").ShareLinkMarketer;
module.exports = {
  async shareLinkCompaign(req, res, next) {
    try {
      let uniqueCode = req.params;
      const shareLinkRecord = await ShareLinkMarketer.findOne({
        where: { uniqueCode },
      });
      if (!shareLinkRecord) {
        return res.status(400).json({
          success: false,
          message: "cant find this link",
          data: [],
        });
      }
      const updateShareLinkRecord = await ShareLinkMarketer.update(
        { click: shareLinkRecord.click + 1 },
        {
          where: { uniqueCode },
        }
      );
      res.status(201).json({
        success: true,
        message: "link sheared",
        data: shareLinkRecord,
      });
    } catch (error) {
      next(error);
    }
  },
};
