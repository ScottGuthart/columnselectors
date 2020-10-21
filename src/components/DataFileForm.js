import React from "react"
import { Form, Row, Col} from 'react-bootstrap'

import ColumnSelector from "./ColumnSelector"

const DataFileForm = (props) => {
  return (
      <>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            {props.name}
          </Form.Label>
          <Col sm={10}>
            <Form.File
              id="maxdiff-file"
              label="Select File"
              custom
              accept={props.formats}
              onChange={(event) => {
                const file = event.target.files[0]
                props.onChange(file)
              }}
            />
          </Col>
        </Form.Group>
        {props.ColumnSelectors.map(columnSelector=> {
          return (
            <ColumnSelector 
              name={columnSelector.name}
              instructions={columnSelector.instructions}
              columns={props.columns}
            />
          )
        })}
        {/* <ColumnSelector 
          name='Best Columns'
          instructions="Select the columns with the data for the best item."
          columns={props.maxdiffColumns}
        /> */}
      </>
  )
}

export default DataFileForm