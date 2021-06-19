import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Membros extends BaseSchema {
  protected tableName = 'membros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index()
      table.string('nome')
      table.integer('idade')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
