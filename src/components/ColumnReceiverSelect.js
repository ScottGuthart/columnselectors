import React from "react"
import { Form } from "react-bootstrap"

const ColumnReceiverSelect = (props) => {
    const disabled = props.columns.length === 0
    return (
          <Form.Control
          onChange={props.onChange}
          onBlur={props.onBlur}
          size={props.size === 1 ? "" : "sm"}
          as="select"
          multiple={props.size !== 1}
          value={props.columns
                 .filter(column=>column.selected)
                 .map(column=>column.value)
          }
          htmlSize={props.size}
          disabled={disabled}
          custom
          >
            {
              props.columns
              .map((col, i)=>(
                <option key={col.value} value={col.value}>
                  {col.name}
                </option>
              ))
            }
          </Form.Control>
    )
}
export default ColumnReceiverSelect