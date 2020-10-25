import React from "react"
import { Row, Col } from 'react-bootstrap'

import FileUploader from "./FileUploader"
import ColumnReceiver from "./ColumnReceiver"
import ColumnSender from "./ColumnSender"

const DataFileForm = (props) => {
  return (
      <>
      <h3 className="mt-3 mb-3">{props.name}</h3>
        <FileUploader
          name={props.name}
          formats={props.FileUploader.formats}
          onChange={props.FileUploader.onChange}
        />
        <Row className="ml-0 d-flex align-items-center">
          <Col sm={4} className="pl-0">
              <ColumnSender
               onChange={props.ColumnSender.onChange}
               columns={props.columns} 
               htmlSize={
                  7 + props.ColumnReceivers.info.reduce((n, {size}) => n + size, 0)
                }
              />
          </Col>
          <Col sm={8}>
            {props.ColumnReceivers.info.map((columnReceiver, i) => {
              return (
                <ColumnReceiver
                 name={columnReceiver.name}
                 size={columnReceiver.size}
                 key={i}
                 handleReceiverButtonClick={(event)=>{
                   props.ColumnReceivers.handleButtonClick(i, event)
                  }
                 }
                />
              )
            })}
          </Col>
        </Row>
      </>
  )
}

export default DataFileForm