'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const User = use('App/Models/User')
const Role = use('Role')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      username: 'geanfeltrin',
      email: 'gean.feltrin@residenciaeducacao.com.br',
      password: 'gean123'
    })

    const role = await Role.findBy('slug', 'administrator')

    await user.roles().attach([role.id])
  }
}

module.exports = DatabaseSeeder
