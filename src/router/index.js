const Router = require('koa-router');
const router = new Router();

const addTask = require('../api/test');

router.post('/addTask', async (ctx) => {
  try {
    ctx.body = await addTask();
  } catch (e) {
    console.log('err', e);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.get('/', async (ctx) => {
  ctx.body = 'Rouret work';
});

module.exports = router;
