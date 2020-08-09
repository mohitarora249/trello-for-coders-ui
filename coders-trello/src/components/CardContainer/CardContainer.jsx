import React from 'react';
import { Row, Col, Card, CardTitle, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import * as _ from "lodash";

import CustomCard from "../CustomCard/CustomCard";
import { cardDropped } from "../../redux/actions/task";
import { DISPLAY_TEXT } from "../../constants";

import "./CardContainer.css";

function CardContainer(props) {
    const { info, tasks, cardDropped } = props;
    return (
        <Card style={{ backgroundColor: "#E6E6E6", height: "85vh" }} className="card_container__wrapper">
            <CardTitle className="card_container__title">
                <h4><b>{info.label}</b></h4>
            </CardTitle>
            <hr style={{ margin: 0 }} />
            <CardBody style={{ overflowY: "auto", height: "85vh" }} onDrop={() => cardDropped(info.value)} onDragOver={event => event.preventDefault()}>
                <Row>
                    {_.isEmpty(tasks[info.value]) ? <Col xs={12} className="card_container__no_tasks_message">
                        <b>{DISPLAY_TEXT.NO_TASKS_PRESENT}</b>
                    </Col> :
                        tasks[info.value].map(task => <Col key={task.id} xs={12}>
                            <CustomCard task={task} stateOfTask={info.value} />
                        </Col>)}
                </Row>
            </CardBody>
        </Card >
    );
};

function mapStateToProps(state) {
    return {
        tasks: state.task.tasks
    };
}

export default connect(mapStateToProps, { cardDropped })(CardContainer);