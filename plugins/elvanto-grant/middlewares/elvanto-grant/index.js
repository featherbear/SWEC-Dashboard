'use strict'

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash')
let a = require('grant')

module.exports = strapi => {
  return {
    async initialize () {
      let grantStore = await strapi.store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
        key: 'grant'
      })

      let data = await grantStore.get()
      if (!data['elvanto']) return

      data['elvanto'] = {
        ...data['elvanto'],
        ...{
          authorize_url: 'https://api.elvanto.com/oauth',
          access_url: 'https://api.elvanto.com/oauth/token',
          oauth: 2,
          scope: ['ManagePeople', 'ManageCalendar'],
          custom_params: {
            type: 'web_server'
          },
          dynamic: ["redirect_uri"]
        }
      }

      await grantStore.set({ key: 'grant', value: data })

      // console.log("Injected grant:elvanto");
    }
  }
}
