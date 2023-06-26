import { DataTypes, Model } from 'sequelize';

import sequelize from '../sequelize.js';

class Notification extends Model {}

Notification.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        is: /^\w{3,}$/,
      },
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

export default Notification;
