import { TASKS } from "../actions/actionTypes";
import { v4 as uuidv4 } from 'uuid';
import * as _ from "lodash";
import { toast } from 'react-toastify';
import { TOAST_MESSAGES, MAX_NO_OF_TASKS } from "../../constants";

const initialState = {
    tasks: {
        backlogs: [],
        development: [],
        codeReview: [],
        acceptance: []
    },
    draggedTask: null,
    moveTaskFrom: null
};

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case TASKS.DROPPED: {
            let tasks = _.cloneDeep(state.tasks);
            /* Conditions to check:-
                1) wheher we are dropping in the same zone.
                2) wheher development exceeds max number of tasks
                3) wheher backlogs exceeds max number of tasks
            */
            if (
                (action.moveTaskTo !== state.moveTaskFrom) &&
                (action.moveTaskTo !== "development" || (action.moveTaskTo === "development" && state.tasks.development.length < MAX_NO_OF_TASKS.DEVELOPMENT)) &&
                (action.moveTaskTo !== "backlogs" || (action.moveTaskTo === "backlogs" && state.tasks.backlogs.length < MAX_NO_OF_TASKS.BACKLOGS))) {
                tasks[action.moveTaskTo].push(state.draggedTask);
                _.remove(tasks[state.moveTaskFrom], { id: state.draggedTask.id });
                toast(TOAST_MESSAGES.TASK_MOVED);
            }
            return {
                ...state,
                tasks,
                draggedTask: null,
                moveTaskFrom: null
            };
        }
        case TASKS.ADD_TASK: {
            const backlogs = _.cloneDeep(state.tasks.backlogs);
            backlogs.push({ id: uuidv4(), ...action.task });
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    backlogs
                }
            };
        }
        case TASKS.DELETE_TASK: {
            let tasks = _.cloneDeep(state.tasks);
            _.remove(tasks[action.key], { id: action.idOfTaskToBeRemoved });
            toast(TOAST_MESSAGES.TASK_DELETED);
            return {
                ...state,
                tasks: {
                    ...tasks
                }
            };
        }
        case TASKS.TASK_DRAGGING_STARTED: {
            return {
                ...state,
                draggedTask: action.task,
                moveTaskFrom: action.moveTaskFrom
            };
        }
        default:
            return state;
    }
}