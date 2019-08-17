const express = require('express');

const router = express.Router();
const projectDb = require('./projectDbHelpers.js');

//completed should not be 1/0 t/f instead
/*

findTasks,
postTask,*/

router.get('/resources', async (req, res) => {
    try {
        let resources = await projectDb.findResources();
        res.status(200).json(resources);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
})

router.post('/resources', async (req, res) => {
    try {
        let newResource = await projectDb.postResources(req.body);
        res.status(201).json(newResource);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
})

router.get('/', async (req, res) => {
    try {
        let projects = await projectDb.findProjects();
        let newProjects = [];
            projects.map(project => {
                if(project.completed === 1) {
                    project.completed = 'true'
                    newProjects.push({...project, completed: project.completed})
                }  else {
                    project.completed = 'false'
                    newProjects.push({...project, completed: project.completed});
                }
            })

        
        console.log(projects)
        res.status(200).json(newProjects);
    }
    catch (err) {
        res.status(500).json(err)
        }
})

router.post('/', async (req, res) => {
    try {
        let newPost = await projectDb.postProjects(req.body);
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
})

router.get('/tasks', async (req, res) => {
    try {
        let task = await projectDb.findTasks();
        let newTask = [];
        task.map(t => {
            if (t.completed === 1) {
                t.completed = 'true';
                newTask.push({...task, completed: t.completed});
            } else {
                t.completed = 'false';
                newTask.push({...task, completed: t.completed});
            }
        })
        console.log(newTask)
        res.status(200).json(newTask);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.post('/tasks', async (req, res) => {
    try {
        let newTask = await projectDb.postTask(req.body);
        res.status(201).json(newTask);
    }
    catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router;