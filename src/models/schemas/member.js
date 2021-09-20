import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const memberModel = sequelize.define('member', {
  userName: DataTypes.STRING,
  avatarUrl: DataTypes.STRING,
  followers: DataTypes.BIGINT,
  following: DataTypes.BIGINT,
});

export default memberModel;
