import React from "react"
import { Form, Row, Col} from 'react-bootstrap'

const ColumnSelector = (props) => {
  return (
    <>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            {props.name}
            <Form.Text className="text-muted">
              {props.instructions}
            </Form.Text>
          </Form.Label>
          <Col sm={10}>
            <Form.Control size="sm" as="select" multiple={true} htmlSize={10} custom>
              {props.columns.map((col, i)=>(
                <option key={i} value={i}>
                  {col}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
    </>
  )
}

export default ColumnSelector