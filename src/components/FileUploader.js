import React from "react"
import { Form, Row, Col } from "react-bootstrap"

const FileUploader = (props) => {
  return (
        <Form.Group as={Row}>
          <Col sm={6}>
            <Form.File
              label={`Select ${props.name}`}
              custom
              accept={props.formats}
              onChange={props.onChange}
            />
          </Col>
        </Form.Group>
  )
}

export default FileUploader