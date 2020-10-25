import React from "react"
import { Form, Row, Col, Button, } from "react-bootstrap"
import {BsChevronDoubleRight } from "react-icons/bs"

import ColumnReceiverSelect from "./ColumnReceiverSelect"
import "./ColumnReceiver.css"

const ColumnReceiver = (props) => {
  return (
    <Row className="ColumnReceiver">
      <Form.Label as={Col} sm={5} 
        className='d-flex align-items-center p-0'
        style={{justifyContent: "center"}}
      >
        <Button
          size=""
          className="text-nowrap"
          variant="primary"
          onClick={props.handleReceiverButtonClick}
        >
          <BsChevronDoubleRight size="1.0rem" style={{position:"relative", bottom:"1px"}}/>
            &nbsp;{props.name}&nbsp;
          <BsChevronDoubleRight size="1.0rem" style={{position:"relative", bottom:"1px"}}/>
          </Button>
      </Form.Label>
      <Col sm={7} className="pt-1 pb-1">
       <ColumnReceiverSelect size={props.size} /> 
      </Col>
    </Row>
  )
}

export default ColumnReceiver