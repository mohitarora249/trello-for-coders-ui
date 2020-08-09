import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

import "./CustomFormGroup.css";

const CustomFormGroup = ({ label, name, placeholder, type, onInputChange, isMandatory }) => {
    return (
        <FormGroup>
            {isMandatory ? <span className="custom_form_group__mandatory_mark">*</span> : ""}
            <Label for={name}> {label}</Label>
            <Input type={type} name={name} id={name} placeholder={placeholder} onChange={(e) => onInputChange(name, e)} />
        </FormGroup >
    );
};

export default CustomFormGroup;