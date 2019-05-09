'use strict'

const DropboxDownload = use('App/Models/DropboxDownload')
const Helpers = use('Helpers')
const dbx = require('../../Service/dropBox')
const Drive = use('Drive')

class FileDbxController {
  async index ({ request, response, view }) {}

  async store ({ request }) {
    try {
      const upload = request.file('file', { size: '100mb' })

      const fileName = `${Date.now()}.${upload.extname}`

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

      const correctUrl = url =>
        url.substring(0, url.indexOf('?dl=0')).concat('?dl=1')

      const newUrl = await correctUrl(url)

      const file = await DropboxDownload.create({
        url: newUrl,
        path: path
      })
      await Drive.delete(fileName)
      return file
    } catch (error) {}
  }

  async show ({ params, request, response, view }) {}

  async update ({ params, request, response }) {}

  async destroy ({ params, request, response }) {
    try {
      const file = await DropboxDownload.findOrFail(params.id)

      await dbx.filesDelete({ path: file.path })

      await file.delete()
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = FileDbxController
