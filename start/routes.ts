/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import View from '@ioc:Adonis/Core/View'

//exiba todos os indices
Route.get('/', 'NomesController.index').as('home.page')

//exiba um indice
Route.get('nome/:id', 'NomesController.show')

Route.get('create', 'NomesController.create').as('create.view')

Route.group(()=>{
    //crie um indice
    Route.post('store', 'NomesController.store').as('store.save')

    //atualize um indice
    Route.put('update/:id', 'NomesController.update').as('update.indice')

    //delete um indice
    Route.get('delete', 'NomesController.showDelete').as('view.delete')
    
    Route.delete('/delete/:id', 'NomesController.delete').as('delete.indice')
}).middleware(['admMiddleware']);

Route.post('/criar/usuario', 'SessionsController.registrar').as('store.register')

Route.get('/logar', 'SessionsController.viewLogin').as('login.view');

Route.post('/logar', 'SessionsController.logar')

Route.get('/logout', 'SessionsController.logout');
