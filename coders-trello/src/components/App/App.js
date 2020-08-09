import React, { useState } from 'react';
import { Container, Row, Col, Button, Tooltip } from "reactstrap";
import { connect } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrFormAdd } from "react-icons/gr"

import { APP_COLUMNS, DISPLAY_TEXT, MAX_NO_OF_TASKS, TOOLTIP_MESSAGES } from "../../constants";
import { CardContainer, AddTask } from "..";
import "./App.css";


function App({ numberOfBacklogs }) {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    const [isOpen, addTaskBtn] = useState(false);
    const addTaskBtnClicked = () => addTaskBtn(!isOpen);

    return (
        <Container fluid className="app__container">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick
                draggable
            />
            <Row className="app__header">
                <h1>
                    <b>{DISPLAY_TEXT.APP_TITLE}</b>
                </h1>
            </Row>
            <Row className="app__columns_wrapper">
                {APP_COLUMNS.map(appColumn => <Col key={appColumn.id} lg={3} md={3} sm={6} xs={12} className="app__column">
                    <CardContainer info={appColumn} />
                </Col>)}
            </Row>
            <AddTask
                isOpen={isOpen}
                closeAddTaskModal={addTaskBtn}
            />
            <Button
                disabled={MAX_NO_OF_TASKS.BACKLOGS <= numberOfBacklogs}
                className="app__add_task_btn"
                style={{ borderRadius: 40, backgroundColor: "#8DAA9D" }}
                id="addTaskTooltip"
                onClick={addTaskBtnClicked}
            >
                <GrFormAdd className="app__add_task_btn" size={50} />
            </Button>
            <Tooltip placement="right" isOpen={tooltipOpen} target="addTaskTooltip" toggle={toggle}>
                {MAX_NO_OF_TASKS.BACKLOGS > numberOfBacklogs ? TOOLTIP_MESSAGES.ADD_TASK : TOOLTIP_MESSAGES.MAX_BACKLOG_REACHED}
            </Tooltip>
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        numberOfBacklogs: state.task.tasks.backlogs.length,
    };
}

export default connect(mapStateToProps, null)(App);