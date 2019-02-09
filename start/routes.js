'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sessions', 'SessionController.store')
Route.get('sessions', 'SessionController.index').middleware(['auth'])

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.Update')

Route.get('/files/:id', 'FileController.show')

// all
Route.get('category', 'CategoryController.index').middleware(['auth'])
Route.get('subcategory', 'SubCategoryController.index').middleware(['auth'])
Route.get('post', 'PostController.index').middleware(['auth'])

// Only admin
Route.group(() => {
  Route.resource('permissions', 'PermissionController').apiOnly()

  Route.resource('roles', 'RoleController').apiOnly()
  Route.resource('users', 'UserController')
    .apiOnly()
    .except(['post'])

  Route.post('/files', 'FileController.store')

  Route.resource('category', 'CategoryController')
    .apiOnly()
    .except(['get'])
  Route.resource('subcategory', 'SubCategoryController')
    .apiOnly()
    .except(['get'])

  Route.resource('post', 'PostController')
    .apiOnly()
    .except(['get'])
}).middleware(['auth', 'is:(administrator || moderator)'])
