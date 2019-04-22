'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')
const dbx = require('../../Service/dropBox')
const Drive = use('Drive')

class UploadDropboxController {
  async upload ({ request }) {
    try {
      const upload = request.file('file', { size: '100mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const read = await Drive.get(fileName)

      const dbxUpload = async function (contents) {
        dbx
          .filesUpload({ path: '/' + fileName, contents: contents })
          .then(function (response) {
            console.log(response)
            createShareLink(response.name)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
      await dbxUpload(read)

      const createShareLink = function (arg) {
        dbx
          .sharingCreateSharedLink({
            path: '/' + arg
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (err) {
            console.log(err)
          })
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })
      await Drive.delete(fileName)
      return file
    } catch (error) {}
  }
}

module.exports = UploadDropboxController
