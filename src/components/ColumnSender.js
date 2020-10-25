import React from "react"
import { Form } from "react-bootstrap"

const ColumnSender = (props) => {
  const disabled = props.columns.length <= 1
  return (
            <Form.Control
             size="sm"
             as="select"
             multiple={true}
             htmlSize={props.htmlSize}
             onChange={props.onChange}
             value={props.columns
              .filter(column=>column.selected)
              .map(column=>column.value)
            }
             disabled={disabled}
             custom
            >
              {
                props.columns
                .filter(col=>!col.consumed)
                .map((col, i)=>(
                  <option key={i} value={i}>
                    {col.name}
                  </option>
                ))
              }
            </Form.Control>
  )
}

export default ColumnSender