import React, {useEffect, useState, useCallback} from "react"
import { Row, Col } from 'react-bootstrap'

import getSelectedValues from "../getSelectedValues"
import FileUploader from "./FileUploader"
import ColumnReceiver from "./ColumnReceiver"
import ColumnSender from "./ColumnSender"

const DataFileForm = (props) => {
  const [dataFile, setDataFile] = useState(undefined)
  const [columns, setColumns] = useState([])

  const [activeSelect, setActiveSelect] = useState(null);
  
  const getButtonAction = (receiverID) => {
    console.log(`getButtonAction ${receiverID}`)
    if (activeSelect !== undefined) {
      if(activeSelect === receiverID) {
        return "depart"
      }
      return "arrive"
    }
    return "none"
  }
 
  useEffect(()=>{
    setActiveSelect(()=>{
      const selectedColumns = columns.filter(column=>column.selected)
      if (typeof(selectedColumns) === "object"
          && selectedColumns.length > 0)
      {
        return selectedColumns[0].location
      }
      return undefined
      
    })
  },[columns])

  useEffect(() => {
    console.log('useEffect: File Change')
    if(dataFile !== undefined){
      console.log(`Filename: ${dataFile.name}`)
      setColumns(["Loading..."])
      const requestOptions = {
        method: 'POST',
        body: dataFile,
      }
      fetch('/api/columns', requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log("Column Data Received")
        console.log(data)
        setColumns(data.map((column, i)=> {
          return {
            name: column, 
            location:null,
            selected:false, 
            value:i,
          }
        }))
      })
      .catch(error => {
        console.log(error)
      })
    }
    else {
      setColumns([])
    }
  }, [dataFile]);

  const handleColumnSelectChange = (event) => {
    const selectedValues = getSelectedValues(event.target)
    console.log(selectedValues)
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column, i)=>{
        return (
          {
            ...column,
            selected: selectedValues.includes(i),
          }
          )
        })
        return newColumns
      })
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    setDataFile(file)
  }

  const calculateSenderSize = (columnReceivers) => {
    const sumOfReceiverSizes = columnReceivers
                              .reduce((n, {size}) => n + size, 0)

    const senderSize = sumOfReceiverSizes + 7

    return senderSize
  }

  const handleReceiverButtonClick = useCallback((receiverID) => {
    console.log(`handleButton ${receiverID}`)
    setColumns((prevColumns)=> {
      const selectedColumns = prevColumns.filter(column=>column.selected)
      return (
        prevColumns.map((column)=>{
          let newLocation
          if(selectedColumns.includes(column)) {
            if (column.location === receiverID) {
              newLocation = null
            }
            else {
              newLocation = receiverID
            }
          }
          else {
            newLocation = column.location
          }
          return (
            {
              ...column,
              location: newLocation
            }
          )
        })
      )
    })
  },[])

  return (
      <>
      <h3 className="mt-3 mb-3">{props.name}</h3>
        <FileUploader
          name={props.name}
          formats={props.formats}
          onChange={handleFileUpload}
        />
        <Row className="ml-0 d-flex align-items-center">
          <Col sm={4} className="pl-0">
              <ColumnSender
               onChange={handleColumnSelectChange}
               columns={
                 columns
                 .filter(column=>column.location==null)
               } 
               htmlSize={
                 calculateSenderSize(props.columnReceivers)
                }
              />
          </Col>
          <Col sm={8}>
            {props.columnReceivers.map((columnReceiver, i) => {
              return (
                <ColumnReceiver
                 name={columnReceiver.name}
                 size={columnReceiver.size}
                 id={columnReceiver.id}
                 key={i}
                  columns={
                    columns
                    .filter(column=>column.location === columnReceiver.id)
                  }
                 buttonAction={getButtonAction(columnReceiver.id)}
                 handleReceiverButtonClick={(event)=>{
                   handleReceiverButtonClick(i, event)
                  }
                 }
                 onChange={handleColumnSelectChange}
                />
              )
            })}
          </Col>
        </Row>
      </>
  )
}


export default DataFileForm