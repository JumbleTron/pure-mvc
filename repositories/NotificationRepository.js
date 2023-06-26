import Notification from '../model/Notification.js';

export default class NotificationRepository {
  getAll() {
    return Notification.findAll();
  }

  getById(id) {
    return Notification.findByPk(id);
  }

  async create(title, description) {
    await Notification.create({
      title,
      description,
    });
  }
}
