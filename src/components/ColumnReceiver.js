import React from "react"
import { Form, Row, Col, } from "react-bootstrap"

import ColumnReceiverSelect from "./ColumnReceiverSelect"
import ColumnReceiverButton from "./ColumnReceiverButton"
import "./ColumnReceiver.css"

const ColumnReceiver = (props) => {
  return (
    <Row className="ColumnReceiver">
      <Form.Label as={Col} sm={5} 
        className='d-flex align-items-center p-0'
        style={{justifyContent: "center"}}
      >
      <ColumnReceiverButton 
       name={props.name}
       handleClick={props.handleReceiverButtonClick}
       buttonAction={props.buttonAction}
      />
      </Form.Label>
      <Col sm={7} className="pt-1 pb-1">
       <ColumnReceiverSelect
        size={props.size}
        columns={props.columns}
        onChange={props.onChange}
       /> 
      </Col>
    </Row>
  )
}

export default ColumnReceiver