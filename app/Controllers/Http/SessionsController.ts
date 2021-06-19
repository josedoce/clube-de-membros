import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash';
import View from '@ioc:Adonis/Core/View';
import Adm from 'App/Models/Adm';
import Nome from 'App/Models/Nome';

export default class SessionsController {
    public async viewLogin({}:HttpContextContract)
    {
        const view = View.getRenderer();
        return await view.render('login');
    }

    public async registrar({request, response, session}: HttpContextContract)
    {
        const {email, senha, nome, idade} = request.body();
        if(await Adm.findBy('email', email)){
            return response.redirect().toRoute('login.view');
        }
        const adm = await Adm.create({ email, senha });
        const adm_id = await Adm.findBy('email',adm.email);
        if(!adm_id){
            return response.redirect().toRoute('home.page');
        }
        const mNome = await Nome.create({adm_id:adm_id.id, nome, idade});
        
        if(adm.$isPersisted && mNome.$isPersisted){
            console.log('o usuario foi salvo: ', mNome)
            session.put('usuario', adm.email);
            return response.redirect().toRoute('home.page');
        }
        return response.redirect().toRoute('login.view')
        
    }

    public async logar({request,response, session}:HttpContextContract)
    {
        const {email, senha} = request.body();
        const adm = await Adm.findBy('email', email);
        if(!adm){
            return response.redirect().toRoute('login.view');
        }
        if(await Hash.verify(adm.senha, senha)){
            session.put('usuario', adm.email);
            return response.redirect().toRoute('home.page');
        }
        return response.redirect().toRoute('login.view');
    }
    
    public async logout({session, response}:HttpContextContract)
    {
        session.forget('usuario');
        return response.redirect().toRoute('login.view');
    }
}
