import React from 'react';
import * as _ from "lodash";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CustomModal = ({ isOpen, header, body, footer }) => {
    return (
        <Modal isOpen={isOpen}>
            {!_.isNull(header) && <ModalHeader>{header}</ModalHeader>}
            {!_.isNull(body) && <ModalBody>{body}</ModalBody>}
            {!_.isNull(footer) && <ModalFooter>{footer}</ModalFooter>}
        </Modal>
    );
};

export default CustomModal;