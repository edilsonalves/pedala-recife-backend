import { DataTypes } from 'sequelize';
import sequelize from '../database';

const Road = sequelize.define('Road', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  extension: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isLessThanZero(value: number) {
        if (value < 0) {
          throw new Error('Extension must be greater than zero');
        }
      },
    },
  },
  hasBikeLane: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
      isInvalid(value: boolean) {
        if (value && Number(this.bikeLaneExtension) === 0) {
          throw new Error(
            'HasBikeLane must be false or bikeLaneExtension must be greater than zero'
          );
        }

        if (!value && Number(this.bikeLaneExtension) > 0) {
          throw new Error('HasBikeLane must be true or bikeLaneExtension must be equal zero');
        }
      },
    },
  },
  bikeLaneExtension: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isNumeric: true,
      isLessThanZero(value: number) {
        if (value < 0) {
          throw new Error('BikeLaneExtension must be greater than zero');
        }
      },
      isGreaterThanExtension(value: number) {
        if (value > Number(this.extension)) {
          throw new Error('BikeLaneExtension must be less than extension');
        }
      },
    },
  },
  bikeLanePercentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isNumeric: true,
    },
  },
});

export default Road;
