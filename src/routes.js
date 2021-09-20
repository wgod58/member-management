import express from 'express';
import expressHealthCheck from 'express-healthcheck';
import swaggerUi from 'swagger-ui-express';
import versionHealthCheck from 'version-healthcheck';
import CONFIG from 'constants/config';
import memberController from 'controllers/member';
import apiSwagger from 'swagger/apis.json';

const router = express.Router();

/* Monitoring */
router.get(
  '/up',
  expressHealthCheck({
    healthy: () => ({ result: 'OK' }),
  }),
);

if (CONFIG.ENVIRONMENT === 'development') {
  router.get('/version', versionHealthCheck);
  /* Swagger Doc */
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(apiSwagger));
}

/* Member endpoints */

router.get('/orgs/:orgName/members', memberController.getMemberByOrganization);

router.post('/orgs/:orgName/members', memberController.addMember);

export default router;
