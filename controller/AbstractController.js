import ejs from 'ejs';
import fs from 'fs';
import { parse } from 'url';

export class AbstractController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  getId() {
    return parseInt(
      parse(this.req.url, true)
        .pathname.split('/')
        .filter((segment) => segment !== '')
        .pop()
    );
  }

  renderView(viewPath, params) {
    const htmlContent = fs.readFileSync(`./view/${viewPath}`, 'utf8');
    const template = ejs.compile(htmlContent, { views: ['view'] });
    this.res.end(template(params));
  }
}
