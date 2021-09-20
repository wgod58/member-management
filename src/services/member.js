import { memberModel, organizationModel } from 'models/index';
import logger from 'utils/logger';

const nameSpace = 'service/member';

/**
 * Add member
 * @param {Object} data
 * @param {string} data.orgName
 * @param {string} data.userName
 * @param {string} data.avatarUrl
 * @param {number} data.followers
 * @param {number} data.following
 */
async function addMember({
  orgName,
  userName,
  avatarUrl,
  followers,
  following,
}) {
  const [org] = await organizationModel.findOrCreate({
    where: { orgName },
  });
  const [memberInstance] = await memberModel.findOrCreate({
    where: { userName },
    defaults: { userName, avatarUrl, followers, following },
  });

  await org.addMember(memberInstance);

  logger.info(
    `${nameSpace} :addMember success =>orgName:${orgName}  member:${memberInstance.id}`,
  );
}

/**
 * Get member by org name
 * @param {Object} data
 * @param {string} data.orgName
 */
async function getMemberByOrganization({ orgName }) {
  const org = await organizationModel.findOne({
    where: { orgName },
  });
  const members = await org.getMembers({
    raw: true,
    order: [['followers', 'DESC']],
  });

  logger.info(`${nameSpace} :getMemberByOrganization =>${orgName}  `);

  return members;
}

export default {
  getMemberByOrganization,
  addMember,
};
