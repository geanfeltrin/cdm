'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })
      console.log(file)

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
