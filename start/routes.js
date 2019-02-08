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

Route.post('users', 'UserController.store').middleware(['auth'])

Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.Update')

Route.get('/files/:id', 'FileController.show')

// all

Route.get('category', 'CategoryController.index').middleware(['auth'])
Route.get('subcategory', 'SubCategoryController.index').middleware(['auth'])
Route.get('post', 'PostController.index').middleware(['auth'])

// // Only Administrator
Route.group(() => {
  Route.post('/files', 'FileController.store')

  Route.resource('category', 'CategoryController')
    .apiOnly()
    .except(['get'])
  Route.resource('subcategory', 'SubCategoryController')
    .apiOnly()
    .except(['get'])
  Route.resource('post', 'PostController')
    .except(['get'])
    .apiOnly()

  Route.resource('permissions', 'PermissionController').apiOnly()
  Route.resource('roles', 'RoleController').apiOnly()
  Route.get('users', 'UserController.index')
}).middleware(['auth', 'is:(administrator || moderador)'])
