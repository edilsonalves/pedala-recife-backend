import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Road from '../models/road.model';

const index = async (request: Request, response: Response) => {
  const { name } = request.query;

  try {
    const roads = await Road.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      order: [['name', 'ASC']],
    });

    return response.json(roads);
  } catch (error) {
    return response.json(error);
  }
};

const create = async (request: Request, response: Response) => {
  const { name, extension, bikeLaneExtension } = request.body;
  const bikeLanePercentage = getPercentage(bikeLaneExtension, extension);
  let hasBikeLane = false;

  if (bikeLaneExtension > 0) {
    hasBikeLane = true;
  }

  try {
    const road = await Road.create({
      name,
      extension,
      hasBikeLane,
      bikeLaneExtension,
      bikeLanePercentage,
    });

    return response.json(road);
  } catch (error) {
    return response.json(error);
  }
};

const update = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name, extension, hasBikeLane, bikeLaneExtension } = request.body;
  const bikeLanePercentage = getPercentage(bikeLaneExtension, extension);

  try {
    const road = await Road.findByPk(id);

    if (!road) {
      return response.json({ error: 'Register not found' });
    }

    await Road.update(
      {
        name,
        extension,
        hasBikeLane,
        bikeLaneExtension,
        bikeLanePercentage,
      },
      {
        where: {
          id,
        },
      }
    );

    return response.json(road);
  } catch (error) {
    return response.json(error);
  }
};

const destroy = async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const road = await Road.findByPk(id);

    if (!road) {
      return response.json({ error: 'Register not found' });
    }

    await Road.destroy({
      where: {
        id,
      },
    });

    return response.json(road);
  } catch (error) {
    return response.json(error);
  }
};

// auxiliary function
const getPercentage = (bikeLaneExtension: number, extension: number): number => {
  let bikeLanePercentage = (bikeLaneExtension / extension) * 100;

  if (!Number.isInteger(bikeLanePercentage)) {
    bikeLanePercentage = Number(bikeLanePercentage.toFixed(1));
  }

  return bikeLanePercentage;
};

const roadController = { index, create, update, destroy };
export default roadController;
