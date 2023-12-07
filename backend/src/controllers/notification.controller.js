import notificationModel from "../models/notification.model.js";
import { generateTimestamp } from "../utils/tools.js";

const getNotificationByUserId = async (req, res) => {
  try {
    const notification = await notificationModel.getNotificationByUserId(
      req.params.id
    );
    console.log(notification);
    res.status(200).send(notification);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

const createNotification = async (req, res) => {
  try {
    console.log("body", req.body);
    // get timestamp
    const timestamp = generateTimestamp();
    req.body.timestamp = timestamp;

    const notificationId = await notificationModel.createNotification(req.body);
    console.log(notificationId);
    const payload = {
      notificationId,
      message: "success",
    };
    res.status(200).send(payload);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

// export controller functions
const notificationController = {
  getNotificationByUserId,
  createNotification,
};

export default notificationController;
