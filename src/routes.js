import express from 'express';
import expressHealthCheck from 'express-healthcheck';
import versionHealthCheck from 'version-healthcheck';
import CONFIG from 'constants/config';
import memberController from 'controllers/member';

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
}

/* Member endpoints */

router.get('/orgs/:orgName/members', memberController.getMemberByOrganization);

router.post('/orgs/:orgName/members', memberController.addMember);

export default router;
