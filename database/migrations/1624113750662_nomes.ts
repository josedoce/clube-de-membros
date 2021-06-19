import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Nomes extends BaseSchema {
  protected tableName = 'nomes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').index()
      table.uuid('adm_id')
            .references('adms.id')
            .onDelete('CASCADE').onUpdate('CASCADE')
      table.string('nome').notNullable()
      table.integer('idade').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
