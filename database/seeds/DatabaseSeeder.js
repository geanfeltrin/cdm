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
const Factory = use('Factory')
const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    await User.create({
      username: 'geanfeltrin',
      email: 'gean.feltrin@residenciaeducacao.com.br',
      password: 'gean123'
    })
  }
}

module.exports = DatabaseSeeder
