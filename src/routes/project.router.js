const Router = require('koa-router');

const {
  createProject,
  destroyProject,
  updateProject,
  findOneProject,
  findAllProject,
  updatePublish,
} = require('../controllers/project.controller');

const projectRouter = new Router({ prefix: '/projects' });

projectRouter.post('/', createProject);

projectRouter.delete('/:id', destroyProject);

projectRouter.put('/:id', updateProject);

projectRouter.patch('/:id/isPublish', updatePublish);

projectRouter.get('/:id', findOneProject);

projectRouter.get('/', findAllProject);

module.exports = projectRouter;