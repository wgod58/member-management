import responses from 'constants/responses';
import memberService from 'services/member';
import logger from 'utils/logger';

const nameSpace = 'controller/member';

/**
 * Handle express req and res to get members by org name
 * @param {Object} req
 * @param {Object} res
 */
async function getMemberByOrganization(req, res) {
  try {
    const data = { ...req.query, ...req.body, ...req.params };
    const { orgName } = data;

    if (!orgName) {
      logger.info(
        `${nameSpace} :getMemberByOrganization =>Miss params orgName:${orgName}`,
      );
      return res
        .status(responses.MISS_PARAMETERS.status)
        .json(responses.MISS_PARAMETERS.message);
    }

    const members = await memberService.getMemberByOrganization({
      orgName,
    });

    res.status(responses.OK.status).json(members);
  } catch (error) {
    res.status(responses.SERVER_ERROR.status).json(error.message);
  }
}

/**
 * Handle express req and res to add member
 * @param {Object} req
 * @param {Object} res
 */
async function addMember(req, res) {
  try {
    const data = { ...req.query, ...req.body, ...req.params };
    const { orgName, avatarUrl, followers, following, userName } = data;

    if (!(orgName && avatarUrl && followers && following && userName)) {
      logger.info(
        `${nameSpace} :addMember =>Miss params orgName:${orgName} userName:${userName} avatarUrl:${avatarUrl} followers:${followers} following:${following}`,
      );
      return res
        .status(responses.MISS_PARAMETERS.status)
        .json(responses.MISS_PARAMETERS.message);
    }

    await memberService.addMember({
      orgName,
      userName,
      avatarUrl,
      followers,
      following,
    });

    res.status(responses.UPDATE_SUCCESS.status).json();
  } catch (error) {
    res.status(responses.SERVER_ERROR.status).json(error.message);
  }
}

export default {
  getMemberByOrganization,
  addMember,
};
