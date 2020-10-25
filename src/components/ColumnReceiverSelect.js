import React from "react"
import { Form } from "react-bootstrap"

const ColumnReceiverSelect = (props) => {
  if (props.size === 1){
    return (
          <Form.Control
          size=""
          as="select"
          multiple={false}
          // htmlSize={props.size}
          custom
          >
          </Form.Control>
    )
  }
  return (
        <Form.Control
         size="sm"
         as="select"
         multiple={true}
         htmlSize={props.size}
         custom
        >
        </Form.Control>
  )
}
export default ColumnReceiverSelect