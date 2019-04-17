'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const dbx = require('../../Service/dropBox')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async index () {
    dbx
      .filesListFolder({ path: '' })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024

      const upload = request.file('file', { size: '2mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      if (upload.size < UPLOAD_FILE_SIZE_LIMIT) {
        await fs.readFile(path.join(__dirname, 'upload'), 'utf8', function (
          err,
          contents
        ) {
          if (err) {
            console.log('Error: ', err)
          }

          // This uploads basic.js to the root of your dropbox
          dbx
            .filesUpload({ path: '/' + fileName, contents: contents })
            .then(function (response) {
              console.log(response)
            })
            .catch(function (err) {
              console.log(err)
            })
        })
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }

  async destroy ({ params, response }) {
    const file = await File.findOrFail(params.id)

    try {
      promisify(fs.unlink)(
        path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.file)
      )

      await file.delete()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao delatar o arquivo' } })
    }
  }
}

module.exports = FileController
