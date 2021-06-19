import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Adms extends BaseSchema {
  protected tableName = 'adms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index()
      table.string('email').notNullable()
      table.string('senha').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
