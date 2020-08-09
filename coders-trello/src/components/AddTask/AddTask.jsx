import React, { Component } from 'react';
import { Form, Button } from 'reactstrap';
import { connect } from "react-redux";
import * as _ from "lodash";

import CustomFormGroup from "../CustomFormGroup/CustomFormGroup";
import CustomModal from "../CustomModal/CustomModal";
import { addTask } from "../../redux/actions/task";
import { DISPLAY_TEXT, TOAST_MESSAGES } from "../../constants";
import { toast } from 'react-toastify';

import "./AddTask.css";

class AddTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: null,
            title: null,
            desc: null,
            errorMessage: "",
            id: "",
        };
    }

    getTaskFormBody = () => {
        let { title, desc, date } = this.state;
        return (
            <>
                <Form>
                    <CustomFormGroup
                        label="Title"
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        isMandatory={true}
                        onInputChange={this.onInputChange}
                    />
                    <CustomFormGroup
                        label="Description"
                        type="textarea"
                        placeholder="Description"
                        name="desc"
                        value={desc}
                        isMandatory={true}
                        onInputChange={this.onInputChange}
                    />

                    <CustomFormGroup
                        label="Due Date"
                        type="date"
                        placeholder="Date"
                        name="date"
                        value={date}
                        isMandatory={true}
                        onInputChange={this.onInputChange}
                    />
                </Form>
                {!_.isEmpty(this.state.errorMessage) && <div className="add_task__error_message">{this.state.errorMessage}</div>}
            </>
        );
    }

    onInputChange = (key, e) => {
        this.setState({ [key]: e.target.value });
    }

    areMandatoryFieldsPresent = () => {
        let errorMessage = '';
        Object.keys(this.state).map(key => {
            if (_.isNull(this.state[key])) {
                errorMessage = DISPLAY_TEXT.ALL_FIELDS_ARE_MANDATORY;
            }
        });
        if (_.isEmpty(errorMessage)) {
            return true;
        }
        this.setState({ errorMessage });
        return false;
    }

    addTaskBtnClicked = () => {
        if (this.areMandatoryFieldsPresent()) {
            let task = _.omit(_.cloneDeep(this.state), ["errorMessage"]);
            this.props.addTask(task);
            this.props.closeAddTaskModal(false);

            toast(TOAST_MESSAGES.TASK_ADDED);
            this.setState({
                date: null,
                title: null,
                desc: null,
                errorMessage: ""
            })
        }
    }

    geTTaskFormFooter = () => {
        return (
            <>
                <Button style={{backgroundColor: "#4f8a8b"}} onClick={this.addTaskBtnClicked}>Add</Button>{' '}
                <Button color="secondary" onClick={() => this.props.closeAddTaskModal(false)}>Cancel</Button>
            </>
        );
    }

    render() {
        return (
            <CustomModal
                isOpen={this.props.isOpen}
                header={<b><h2>Add Task</h2></b>}
                body={this.getTaskFormBody()}
                footer={this.geTTaskFormFooter()}
            />
        );
    }
}

export default connect(null, { addTask })(AddTask);