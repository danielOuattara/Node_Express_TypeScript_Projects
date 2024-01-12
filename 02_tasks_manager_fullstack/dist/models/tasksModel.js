"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Cannot be empty"],
        trim: true,
        maxlength: [50, "Max length 50 chars"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, updatedAt: false });
const Task = (0, mongoose_1.model)("Task", TaskSchema);
exports.default = Task;
