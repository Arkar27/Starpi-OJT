'use strict';

/**
 *  hello controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::hello.hello' ,({ strapi }) => ({
//     async findAll(ctx) {
//       const entries = await strapi.db.query("api::hello.hello").findMany();
  
//       ctx.body = entries;
//     },
//   }));


module.exports = createCoreController('api::hello.hello' ,({ strapi }) => ({
    async changePassword(ctx) {
      const userFromContext = ctx.state.user;
    
        if (!userFromContext) {
          return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }
    
        const params = _.assign({}, ctx.request.body);
        if (
          params.currentPassword &&
          params.newPassword &&
          params.confirmNewPassword &&
          params.newPassword === params.confirmNewPassword
        ) {
          console.log('this is testing')
    
          const user = await strapi.plugins['users-permissions'].services.user.fetch({
            id: userFromContext.id,
          }, ['role']);
    
          const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(params.currentPassword, user.password);
    
          if (!user) {
            return ctx.badRequest('User does not exist');
          }
    
          if (!validPassword) {
            return ctx.badRequest('Old password does not match.')
          }
    
          let updateData = { password: params.newPassword };
          const data = await strapi.plugins['users-permissions'].services.user.edit({ id: user.id }, updateData);
          return ctx.send(sanitizeUser(data));
        }
    
        return ctx.badRequest('New passwords do not match.');
      
    },
  }));