'use strict';

const Movies = require('../db/queries/movies');
const Errors = require('../../lib/errors');

const UnauthorizedError = Errors.UnauthorizedError;

const getAll = async (ctx) => {
  try {
    if (!ctx.isAuthenticated()) {
      throw new UnauthorizedError('User not authenticated');
    }

    const movies = await Movies.getAllMovies();
    ctx.body = { status: 'success', data: movies };
  } catch (err) {
    throw err;
  }
};

module.exports = { getAll };