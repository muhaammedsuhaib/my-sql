"use strict";
import { Task } from "../models/index.js";

export const get_all_task = async (req, res) => {
    const tasks = await Task.findAll();
    res.status(200).json({ message: "All task retrieved successfully", data: tasks });
}
export const create_task = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const newTask = await Task.create({ title, description });
    res.status(201).json({ message: "Task created successfully", data: newTask });

}
export const update_task = async (req, res) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, completed } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.status(200).json({ message: "Task updated successfully", data: task });

}
export const delete_task = async (req, res) => {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
}