import { HttpContext } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from "@ioc:Adonis/Core/View";
import Membro from "App/Models/Membro";

export default class NomesController {
    public async index({session}:HttpContextContract)
    {
        const nomes = await Membro.all();
        const view = View.getRenderer();
        return await view.render('welcome', {pessoas: nomes, logado: session.get('usuario')});
    }

    public async show({params}: HttpContext)
    {
        const {id} = params;
        const nome = await Membro.find(id);
       
        return nome;
    }

    public async create({request}: HttpContext)
    {
        const view = View.getRenderer();
        return await view.render('criar');
    }

    public async store({request, response}: HttpContext)
    {
        const {nome, idade} = request.body();
        //aqui entra o banco de dados
        const usuario = await Membro.create({
            nome,
            idade
        })
        if(!usuario.$isPersisted){
            return response.redirect().toRoute('store.save');
        }
        return response.redirect().toRoute('home.page', {nome: 'maria'});
    }

    public async update({request, response})
    {
        const {id} = request.params();
        const {nome, idade} = request.body();
        const usuario = await Membro.findOrFail(id);
        await usuario.merge({nome, idade}).save();
        if(usuario.$isPersisted){
            return response.redirect().toRoute('view.delete');
        }
        return response.redirect().toRoute('view.delete');
    }

    public async showDelete({params})
    {
        const nomes = await Membro.all();
        const view = View.getRenderer();
        return await view.render('delete', {pessoas: nomes, dados: params});
    }

    public async delete({params, response}: HttpContext)
    {
        const {id} = params;
        const nome = await Membro.findOrFail(id);
        await nome.delete();
        if(!nome.$isDeleted){
            return response.redirect().toRoute('view.delete');
        }
        return response.redirect().toRoute('view.delete');
    }
}