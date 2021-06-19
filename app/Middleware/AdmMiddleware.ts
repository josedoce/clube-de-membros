import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdmMiddleware {
  public async handle ({response, session}: HttpContextContract, next: () => Promise<void>) {
    if(session.has('usuario')){
      return await next();
    }
    return response.redirect().toRoute('login.view');
  }
}
