'use strict';

/**
 *  post-table controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::post-table.post-table' ,({ strapi }) => ({
    async createMany(ctx) {
      console.log(ctx.request.body)
      // const {data }= ctx.request.body;
      // console.log(data)
      const entries = await strapi.service('api::post-table.post-table').createMany(ctx);
      return entries;
    },
    
  })
 );
