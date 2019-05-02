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

Route.get('files', 'FileController.index')

Route.post('uploadthumbnail', 'ThumbnailDbxController.store')
Route.delete('uploadthumbnail/:id', 'ThumbnailDbxController.destroy')

Route.post('uploadfile', 'FileDbxController.store')
Route.delete('uploadfile/:id', 'FileDbxController.destroy')

// all
Route.get('category', 'CategoryController.index').middleware(['auth'])
Route.get('subcategory', 'SubCategoryController.index').middleware(['auth'])
Route.get('post', 'PostController.index').middleware(['auth'])

Route.get('home', 'HomePostController.index').middleware(['auth'])

Route.get('users/show', 'UserController.show').middleware(['auth'])

Route.get('filtercategory', 'FilterPostController.filter').middleware(['auth'])
Route.get('filter', 'FilterPostController.index').middleware(['auth'])

Route.resource('roles', 'RoleController').apiOnly()

Route.resource('permissions', 'PermissionController').apiOnly()

// Only admin
Route.group(() => {
  Route.post('/files', 'FileController.store')
  Route.resource('/files', 'FileController')
    .apiOnly()
    .except(['index', 'show'])

  Route.resource('category', 'CategoryController')
    .apiOnly()
    .except(['index', 'show'])
  Route.resource('subcategory', 'SubCategoryController')
    .apiOnly()
    .except(['index', 'show'])
  Route.resource('post', 'PostController')
    .apiOnly()
    .except(['index', 'show'])

  Route.resource('home', 'HomePostController')
    .apiOnly()
    .except(['index', 'show'])
}).middleware(['auth', 'is:(administrator || moderator)'])

Route.resource('users', 'UserController')
  .apiOnly()
  .except(['store', 'show'])
