import React from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { RiDeleteBinLine } from "react-icons/ri";

import { connect } from "react-redux";

import { deleteTask, taskDraggingStarted } from "../../redux/actions/task";
import "./CustomCard.css";

const getBorderColorAsPerStateOfTask = (stateOfTask) => {
    switch (stateOfTask) {
        case "development":
            return "yellow";
        case "codeReview":
            return "";
        case "acceptance":
            return "green";
        default: return "red";
    }
}

const onTaskDrag = (event, taskDraggingStarted, task, stateOfTask) => {
    event.preventDefault();
    taskDraggingStarted(task, stateOfTask);
}

const CustomCard = ({ task, stateOfTask, deleteTask, taskDraggingStarted, editTask }) => {
    return (
        <Card className="custom_card__wrapper"
            draggable={true}
            onDrag={(event) => onTaskDrag(event, taskDraggingStarted, task, stateOfTask)}
            style={{ backgroundColor: "#fff", border: `2px solid ${getBorderColorAsPerStateOfTask(stateOfTask)}` }}
        >
            <CardBody className="custom_card__body">
                <CardTitle className="custom_card__title">
                    {task.title}
                    <span className="custom_card__title_delete_icon">
                        <RiDeleteBinLine id="deleteTaskTooltip" onClick={() => deleteTask(stateOfTask, task.id)} />
                    </span>
                </CardTitle>
                <hr style={{ margin: 4, border: "1px solid #E6E6E6" }} />
                <CardText className="custom_card__title custom_card__desc">{task.desc}</CardText>
                <CardText className="custom_card__title custom_card__date">{task.date}</CardText>
            </CardBody>
        </Card>
    );
};

export default connect(null, { deleteTask, taskDraggingStarted })(CustomCard);