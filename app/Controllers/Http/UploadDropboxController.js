'use strict'

const LinkDownloadDbx = use('App/Models/Linkdownloaddbx')
const LinkThumbDbx = use('App/Models/Linkthumbdbx')
const Helpers = use('Helpers')
const dbx = require('../../Service/dropBox')
const Drive = use('Drive')

class UploadDropboxController {
  async uploadThumbnail ({ request }) {
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

      const response = await dbx.filesUpload({
        path: '/' + fileName,
        contents: read
      })

      const link = await dbx.sharingCreateSharedLink({
        path: '/' + response.name
      })

      const { url, path } = link

      const file = await LinkThumbDbx.create({
        url: url,
        path: path
      })
      await Drive.delete(fileName)
      return file
    } catch (error) {}
  }

  async uploadLink ({ request }) {
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

      const response = await dbx.filesUpload({
        path: '/' + fileName,
        contents: read
      })

      const link = await dbx.sharingCreateSharedLink({
        path: '/' + response.name
      })

      const { url, path } = link

      const file = await LinkDownloadDbx.create({
        url: url,
        path: path
      })
      await Drive.delete(fileName)
      return file
    } catch (error) {}
  }
}

module.exports = UploadDropboxController
