//create an express app
const express = require('express');
const app = express();
const port = 5000;

//Parse body To use req.body
app.use(express.json());

require('dotenv').config();
const Project = require('./Project');
const blog = require('./blog');

//GET Method

app.get('/', (req, res) => { 
    res.send('Hello, World!');
});
//Creating an endpoint for display the projects 
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Creating an endpoint for display the blogs  
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST method

//Creating a endpoint for creating a project
app.post('/projects', async (req, res) => {
    //Get Output to console
    console.log(req.body);

    //send data to Frontend
    //res.send('Hello from Backend');

    const project = new Project(req.body);
    try {
        const newProjects = await project.save();
        res.status(201).json(newProjects);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Patch method

//Creating the endpoint for updating a project by ID
app.patch('/projects/:id', async (req, res) => {
    //get id to console
    console.log(req.params.id);

    try{
        const project = await Project.findById(req.params.id);
        if(project){
            project.set(req.body);
            const updateProject = await project.save();
            res.json(updateProject);
        } else{ 
            res.status(404).json({message: err.message });
        }
    } catch (err){
        res.status(500).json({ message: err.message });
    }  
});

//Delete method

//Delete a project by ID
app.delete('/projects/:id', async (req, res) => {
    try{
        const result = await Project.findByIdAndDelete(req.params.id);
        if(result){
            res.json({message: 'Project delected'});
        } else{ 
            res.status(404).json({message: 'Project not found' });
        }
    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

// Create link to Database
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});




