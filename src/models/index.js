import memberModel from './schemas/member';
import organizationModel from './schemas/organization';

organizationModel.hasMany(memberModel);

export { memberModel, organizationModel };
