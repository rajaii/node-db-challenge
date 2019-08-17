const db = require('./data/db-config.js');

module.exports = {
    findResources,
    postResources,
    findProjects,
    postProjects,
    findTasks,
    postTask,
}

function findResources() {
    return db('resources');
}

function postResources(resource) {
    return db('resources').insert(resource);
}

function findProjects() {
    return db('projects');
    
}
function postProjects(project) {
    return db('projects').insert(project);
}
function findTasks(id) {
    return db('tasks')
    .join('projects', 'projects.id', '=', 'tasks.project_id')
    .select('project_id','projects.name as project_name', 'tasks.id', 'tasks.description', 'tasks.notes', 'tasks.completed')
    .where({project_id: id})
}

function postTask(task) {
    return db('tasks').insert(task);
}   