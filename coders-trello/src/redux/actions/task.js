import { CARDS } from "./actionTypes";

export function cardDropped(moveTaskTo) {
    return {
        type: CARDS.DROPPED,
        moveTaskTo
    }
}

export function addTask(task) {
    return {
        type: CARDS.ADD_TASK,
        task
    }
}

export function deleteTask(key, idOfTaskToBeRemoved) {
    return {
        type: CARDS.DELETE_TASK,
        key,
        idOfTaskToBeRemoved
    }
}

export function taskDraggingStarted(task, moveTaskFrom) {
    return {
        type: CARDS.TASK_DRAGGING_STARTED,
        task,
        moveTaskFrom
    }
}