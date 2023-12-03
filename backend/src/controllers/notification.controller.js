import notificationModel from "../models/notification.model.js";

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

// export controller functions
const notificationController = {
  getNotificationByUserId,
};

export default notificationController;
