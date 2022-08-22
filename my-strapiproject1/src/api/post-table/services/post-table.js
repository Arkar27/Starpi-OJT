'use strict';

/**
 * post-table service.
 */
const _=require("lodash");
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post-table.post-table', ({ strapi }) =>  ({
  // async find(ctx) {
  //   const {data} = await super.find(ctx);
  //   console.log('posts==>', data)
  //   return data
  // },

    async createMany(ctx) {
      const errPostList = [];
      let count = 0;
      let sameTitle = '';
      const { data } = ctx.request.body;
      console.log('data==> ',data);
      console.log(ctx.request.body);
      const entries = await strapi.entityService.findMany('api::post-table.post-table');
      console.log('entries==> ',entries)
      data.forEach((value)=>{
        console.log('check value 1 ===> ', value.title)
        entries.forEach((enValue)=>{
          console.log('check value 2 ===> ', enValue.title)
          if(value.title== enValue.title){
            console.log('Bingo ', enValue.title)
            count = count + 1;
            sameTitle = value.title;
          }
        })
      })
      if(count != 0){
        return {
           data: 1,
           value: sameTitle
         }
      }
      else{
        await Promise.all(
          
          _.map(data, async (element) => {
            console.log('=====Element===');
            let post = {
              data: {
                ...element
              }
            }
            // console.log(post);
            
  
            
            try {
              await strapi.entityService.create('api::post-table.post-table', post);
            } catch (error) {
              console.log(error, '===err===');
              errPostList.push({ 'title': element, 'error': error.message });
            }
          })
        );
        // console.log(errPostList);
        if (errPostList.length > 0) {
          return errPostList;
        } else {
          return { data: 0 };
        }
      }
      
      
    }
  
    
  }));
