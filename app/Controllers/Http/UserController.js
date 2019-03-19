'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
    
    const user = await User.query()
      .with('roles')
      .with('permissions')      
      .fetch()

//  const users = await User.query().paginate()
    return user
  }

  async store ({ request }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ])

    const user = await User.create(data)

    if (roles) {
      await user.roles().attach(roles)
    }
    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return user
  }

  async update ({ request, params }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ])
   
    const user = await User.findOrFail(params.id)

    user.merge(data)

    await user.save()

    if (roles) {
      await user.roles().sync(roles)
    }
    if (permissions) {
      await user.permissions().sync(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return user
  }

  async show ({ auth }) {
    const user = await auth.getUser()    
    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
