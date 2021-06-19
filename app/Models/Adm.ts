import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuid} from 'uuid';
import Nome from './Nome';
import Hash from '@ioc:Adonis/Core/Hash';

export default class Adm extends BaseModel {
  @column({isPrimary: true})
  public id: string

  @hasOne(()=>Nome,{
    foreignKey: 'adm_id'
  })
  public usuario: HasOne<typeof Nome>

  @column()
  public email: string

  @column()
  public senha: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async crieUUID (model: Adm){
    if(!model.id){
      model.id = uuid();
    }
  }
  
  @beforeSave()
  public static async salveHASH (model: Adm){
    if(model.$dirty.senha){
      model.senha = await Hash.make(model.senha);
    }
  }
}
