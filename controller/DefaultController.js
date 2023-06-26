import { AbstractController } from './AbstractController.js';

export default class DefaultController extends AbstractController {
  async indexAction() {
    this.renderView('default/index.ejs', {});
  }
}
