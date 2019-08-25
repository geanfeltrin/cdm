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
Route.get('users/show', 'UserController.show').middleware(['auth'])
Route.get('filter/:id', 'FilterPostController.show').middleware(['auth'])
Route.get('filter', 'FilterPostController.index').middleware(['auth'])

Route.post('uploadthumbnail', 'DropboxThumbnailController.store').middleware([
  'auth'
])
Route.delete(
  'uploadthumbnail/:id',
  'DropboxThumbnailController.destroy'
).middleware(['auth'])

Route.post('uploadfile', 'DropboxDownloadController.store').middleware([
  'auth'
])
Route.delete('uploadfile/:id', 'DropboxDownloadController.destroy').middleware([
  'auth'
])

// Only admin
Route.group(() => {
  Route.post('/files', 'FileController.store')
  Route.resource('/files', 'FileController')
    .apiOnly()
    .except(['index', 'show'])

  Route.resource('category', 'CategoryController')
    .apiOnly()
    .except(['index'])
  Route.resource('subcategory', 'SubCategoryController')
    .apiOnly()
    .except(['index', 'show'])

  Route.resource('post', 'PostController')
    .apiOnly()
    .except(['index', 'show'])

  Route.resource('permissions', 'PermissionController').apiOnly()

  Route.resource('roles', 'RoleController').apiOnly()

  Route.resource('users', 'UserController')
    .apiOnly()
    .except(['store'])
}).middleware(['auth', 'is:(administrator || moderator)'])
