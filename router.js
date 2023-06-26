import { parse } from 'url';

export default async function useRouter(req, res, db) {
  const parsedUrl = parse(req.url, true);
  const pathSegments = parsedUrl.pathname
    .split('/')
    .filter((segment) => segment !== '');
  const controllerName = getControllerNameFromPath(pathSegments);

  try {
    if (controllerName === 'favicon.ico') {
      return;
    }
    const ControllerClass = await import(`./controller/${controllerName}.js`);
    const controller = new ControllerClass.default(req, res, db);
    const lastPathElement = pathSegments.pop();
    const objectId = parseInt(lastPathElement);
    const method = req.method;
    let actionName = 'index';

    if (controllerName.startsWith('protected') && !req.isAuthenticated()) {
      res.redirect('/auth');
    }

    if (method === 'GET' && !isNaN(objectId)) {
      actionName = 'entity';
    }
    if (
      (method === 'PUT' || method === 'PATCH' || method === 'POST') &&
      !isNaN(objectId)
    ) {
      actionName = 'edit';
    }
    if (method === 'POST' && isNaN(objectId)) {
      actionName = 'create';
    }
    if (lastPathElement === 'logout') {
      actionName = 'logout';
    }

    if (typeof controller[`${actionName}Action`] === 'function') {
      controller[`${actionName}Action`]();
    } else {
      throw new Error(
        `Method ${actionName} does not exist in controller ${controllerName}`
      );
    }
  } catch (error) {
    console.log(error);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Not found');
  }
}

function getControllerNameFromPath(pathSegments) {
  if (pathSegments.length > 0) {
    if (pathSegments[0] === 'protected') {
      return `${pathSegments.join('/')}Controller`;
    }

    return `${pathSegments[0]}Controller`;
  }

  return 'DefaultController';
}
