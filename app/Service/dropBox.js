var fetch = require('isomorphic-fetch') // or another library of choice.
var Dropbox = require('dropbox').Dropbox
const Env = use('Env')

const dbx = new Dropbox({
  accessToken: Env.get('DROPBOX_ACESSTOKEN'),
  fetch: fetch
})
// dbx
//   .filesListFolder({ path: '' })
//   .then(function (response) {
//     console.log(response)
//   })
//   .catch(function (error) {
//     console.log(error)
//   })
module.exports = dbx
