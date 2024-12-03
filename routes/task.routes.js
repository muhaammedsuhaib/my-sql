"use strict";
import express from 'express';
import { create_task, delete_task, get_all_task, update_task } from '../controllers/task.controllers.js';
import try_catch from '../middlewares/try_catch.js';
const router = express.Router();

router.route("/tasks")
    .get(try_catch(get_all_task))
    .post(try_catch(create_task));
router.route("/tasks/:id")
    .put(try_catch(update_task))
    .delete(try_catch(delete_task));


export default router;