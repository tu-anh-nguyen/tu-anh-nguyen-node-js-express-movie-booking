const { Sequelize } = require('sequelize');
const { SugarError } = require('../../helpers/errors');
const {
  Movie,
  ShowTime,
  Theater,
  TheaterChain,
  TheaterBrand,
} = require('../../models');
const { ErrMovieNotFound } = require('../../pkg/appError');
const groupAttributes = require('../../ultis/groupAttributes');

module.exports = async (movieId) => {
  try {
    const movie = await Movie.findOne({
      where: { id: movieId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!movie) {
      throw new SugarError(ErrMovieNotFound);
    }

    const showTimes = await ShowTime.findAll({
      where: { movieId },
      attributes: {
        exclude: ['movieId', 'createdAt', 'updatedAt'],
      },
      // raw: true,
      // attributes: {
      //   include: [
      //     [Sequelize.col('theater.name'), 'theaterName'],
      //     [Sequelize.col('theater.code'), 'theaterCode'],
      //     [Sequelize.col('theater.thumbnail'), 'theaterThumbnail'],
      //     [Sequelize.col('theater.chain_id'), 'chainId'],
      //   ],
      // },
      // groups: ['theaterId'],
      // include: {
      //   association: 'theater',
      //   attributes: [],
      // },
    });
    const groupedShowTimesByTheaterId = groupAttributes('theaterId', showTimes);

    const theaterIds = Object.keys(groupedShowTimesByTheaterId).map(
      (id) => +id
    );

    const theaters = await Theater.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: theaterIds,
        },
      },
    });

    const groupedTheatersByChainId = groupAttributes('chainId', theaters);
    const chainIds = Object.keys(groupedTheatersByChainId).map((id) => +id);

    const chains = await TheaterChain.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: chainIds,
        },
      },
    });

    const groupedChainsByBrandId = groupAttributes('brandId', chains);
    const brandIds = Object.keys(groupedChainsByBrandId).map((id) => +id);

    const brands = await TheaterBrand.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: brandIds,
        },
      },
    });

    const showTimesResults = [];
    for (const { dataValues: brand } of brands) {
      const chainGroup = [];
      for (const { dataValues: chain } of groupedChainsByBrandId[brand.id]) {
        const theaterGroups = [];
        for (const { dataValues: theater } of groupedTheatersByChainId[
          chain.id
        ]) {
          theaterGroups.push({
            ...theater,
            showTimes: groupedShowTimesByTheaterId[theater.id],
          });
        }
        chainGroup.push({ ...chain, theaters: theaterGroups });
      }
      showTimesResults.push({ ...brand, chains: chainGroup });
    }

    return {
      movie,
      brands: showTimesResults,
    };
  } catch (error) {
    throw new SugarError(error);
  }
};
