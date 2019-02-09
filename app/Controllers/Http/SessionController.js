'use strict'
const User = use('App/Models/User')

class SessionController {
  async index ({ auth }) {
    const user = await auth.getUser()
    const roles = await user.getRoles()
    return roles
  }
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
