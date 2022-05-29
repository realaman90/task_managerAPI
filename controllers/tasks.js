const Task = require('../models/task');

const getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find({});
        // res.status(200).json({ tasks, amount: tasks.length });
        res.status(200).json({ status: 'success', tasks, amount: tasks.length });


    } catch (error) {
        res.status(500).json({ status: "error", msg: error.name });
    }
};


const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ status: 'success', task })

    } catch (error) {
        res.status(500).json({ status: "error", msg: error.name });
    }

}

const getTask = async(req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne({ _id: taskID });
        if (!task) {
            return res.status(404).json({ status: "error", msg: `No task with id ${taskID}` });
        }

        res.status(200).json({ status: "success", task })

    } catch (error) {
        res.status(500).json({ status: "error", msg: error })
    }
}



const deleteTask = async(req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findByIdAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ status: 'error', message: `No task not found with id: ${taskID}` });
        }


        res.status(200).json({ status: 'success', message: 'deleted', task });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error });
    }
}

const updateTask = async(req, res) => {

    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true
        });
        if (!task) {

            return res.status(404).json({ status: 'error', message: `No task not found with id: ${taskID}` });
        }
        res.status(200).json({ status: "success", task })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}