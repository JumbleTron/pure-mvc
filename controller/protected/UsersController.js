import { UserModel } from '../../model/UserModel.js';
import { AbstractController } from '../AbstractController.js';

export default class UsersController extends AbstractController {
  constructor(req, res) {
    super(req, res);
    this.model = new UserModel();
  }

  async indexAction() {
    const users = await this.model.getAll();
    this.renderView('users/index.ejs', { users });
  }
  entityAction() {
    this.renderView('users/entity.ejs', { userID: this.getId() });
  }

  createAction() {
    this.renderView('users/index.ejs', {});
  }

  editAction() {
    this.renderView('users/entity.ejs', { userID: this.getId() });
  }
}
