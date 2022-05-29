const Task = require('../models/task');
const asyncWrapper = require('../middleware/sync');
const { createCustomError } = require('../errors/custom-error')



const getAllTasks = asyncWrapper(async(req, res) => {

    const tasks = await Task.find({});
    res.status(200).json({ status: 'success', tasks, amount: tasks.length });

});


const createTask = asyncWrapper(async(req, res) => {

    const task = await Task.create(req.body);
    res.status(201).json({ status: 'success', task })



});

const getTask = asyncWrapper(async(req, res, next) => {

    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {

        return next(createCustomError(`No task with ID: ${taskID}`, 404))

    }
    res.status(200).json({ status: "success", task })

});



const deleteTask = asyncWrapper(async(req, res) => {

    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with ID: ${taskID}`, 404));
    }

    res.status(200).json({ status: 'success', message: 'deleted', task });

})

const updateTask = asyncWrapper(async(req, res) => {


    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return next(createCustomError(`No task with ID: ${taskID}`, 404));
    }
    res.status(200).json({ status: "success", task })


});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}