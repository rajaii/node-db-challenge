
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments('id');
    tbl.string('name', 128)
        .notNullable();
    tbl.string('description', 128);
    tbl.boolean('completed')
        .defaultTo(0);
  })
  .createTable('tasks', tbl => {
    tbl.increments('id');
    tbl.string('description', 128)
        .notNullable();
    tbl.string('notes', 128);
    tbl.boolean('completed')
        .defaultTo(0);
    tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id') //could using just projects.id and no inTable call work?
        .inTable('projects');
  })
  .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('name', 128)
        .notNullable();
      tbl.string('description', 128);
  })
  .createTable('projects_resources', tbl => {
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('projects.id');//Could 'id' and then call inTable work here?
      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resources.id');
      tbl.primary(['project_id', 'resource_id']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects_resources')
  .dropTableIfExists('resources')
  .dropTableIfExists('tasks')
  .dropTableIfExists('projects');
};
