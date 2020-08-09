import { TASKS } from "./actionTypes";

export function cardDropped(moveTaskTo) {
    return {
        type: TASKS.DROPPED,
        moveTaskTo
    }
}

export function addTask(task) {
    return {
        type: TASKS.ADD_TASK,
        task
    }
}

export function deleteTask(key, idOfTaskToBeRemoved) {
    return {
        type: TASKS.DELETE_TASK,
        key,
        idOfTaskToBeRemoved
    }
}

export function taskDraggingStarted(task, moveTaskFrom) {
    return {
        type: TASKS.TASK_DRAGGING_STARTED,
        task,
        moveTaskFrom
    }
}