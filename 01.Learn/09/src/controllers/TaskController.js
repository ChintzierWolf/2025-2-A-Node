const Task = require('../models/Task');

exports.getTasks = async (req,res) => {
    try
    {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    }
    
    catch(err)
    {
        console.log('Error: ', err);
        res.status(400).send({error: err});
    }
}
       
exports.createTasks = async (req,res) => {
    try
    {
        const task = new Task(
            {description: req.body.description});
        await task.save();
        res.status(201).send(task);
    }
    
    catch(err)
    {
        console.log('Error: ', err);
        res.status(400).send({error: err});
    }
}

exports.updateTasks = async (req,res) => {
    try 
    {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!task){
            res.status(404).send({message: 'Task Not Found'});
        }
        res.status(200).send(task);
    }
    
    catch(err)
    {
        res.status(400).send({error:err});    
    }
}

exports.deleteTask = async (req,res) => {
    try 
    {
        const task = await Task.findByIdAndDelete(req.params.id);
    
        if(!task)
        {
            res.status(404).send({message: 'Task Not Found'});
        }

        else
        {
            res.status(204).send();
        }
    } 
    
    catch (err) 
    {
        res.status(400).send({error: err});
    }
}