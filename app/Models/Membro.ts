import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuid} from 'uuid'

export default class Membro extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome: string

  @column()
  public idade: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async crieUUID(model: Membro){
    if(!model.id){
      model.id = uuid()
    }
  }
}
