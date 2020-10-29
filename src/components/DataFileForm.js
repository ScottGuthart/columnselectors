import React, {useEffect, useState} from "react"
import { Row, Col } from 'react-bootstrap'

import getSelectedValues from "../getSelectedValues"
import FileUploader from "./FileUploader"
import ColumnReceiver from "./ColumnReceiver"
import ColumnSender from "./ColumnSender"

const DataFileForm = (props) => {
  const [dataFile, setDataFile] = useState(undefined)
  const [columns, setColumns] = useState([])

  const [lastSelect, setLastSelect] = useState(undefined);
  const [lastTravel, setlastTravel] = useState({
    departure: undefined,
    arrival: undefined,
  })
  const [buttonActions, setButtonActions] = useState(()=>{
    let newButtonActions = {}
    props.columnReceivers.forEach(receiver=>{
      newButtonActions[receiver.id] = "none"
    })
    return newButtonActions
  })
  
  const getButtonActions = () => {
    let newButtonActions = {}
    props.columnReceivers.forEach((receiver)=>{
      let travelInfo = getTravelInfo(receiver.id)
      let possibleArrivals = getColumnsToMove(travelInfo)
      let buttonAction;
      if (possibleArrivals.length > 0){
        buttonAction = travelInfo.arrival === receiver.id ? "arrive" : "depart"
      }
      else {
        buttonAction = "none"
      }
      newButtonActions[receiver.id] = buttonAction
    })
    return newButtonActions
  }
  useEffect(()=>{
    setButtonActions(getButtonActions())
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
  /**
   * Returns travelInfo for where items would move if a receiver button were
   * pressed
   * @param {number} receiverID 
   */
  const getTravelInfo = (receiverID) => {
    const senderID = null
    let travelInfo;
    const justArrivedAtReceiver = (lastSelect === senderID 
                                   && lastTravel.arrival === receiverID)
    if (justArrivedAtReceiver) { // Then go back to column sender
      travelInfo = {arrival: senderID, departure: receiverID}
    }
    else {
      const justWentToSender = (
        lastTravel.arrival === senderID
        && lastTravel.departure !== receiverID
      )
      if (justWentToSender) {
        travelInfo = {
          arrival: receiverID,
          departure: senderID
        }
      }
      else {
        const justPickedFromOrArrivedAtSender = (lastSelect === senderID || 
                                      lastTravel.arrival === senderID)
        console.log('Standard Behavior')
        travelInfo = {
          arrival: justPickedFromOrArrivedAtSender ? receiverID : senderID,
          departure: justPickedFromOrArrivedAtSender ? senderID : receiverID,
        }
      }
    }
    return travelInfo
  }
  const getColumnsToMove = (travelInfo) => {
    const columnsToMove = columns
    .filter(column=>{
      return ( column.location === travelInfo.departure
        && column.selected )
      })
      .map(column=>column.value)
    return columnsToMove
  }

  const handleReceiverButtonClick = (receiverID) => {
    const travelInfo = getTravelInfo(receiverID)
    const columnsToMove = getColumnsToMove(travelInfo)
    if (columnsToMove.length > 0) {
      setlastTravel(travelInfo)
      console.log(`${travelInfo.departure} >> ${travelInfo.arrival}`)
      setColumns((prevColumns)=>{
        const newColumns = prevColumns.map((column, i)=>{
          return (
            {
              ...column,
              location: (
                columnsToMove.includes(i) ? travelInfo.arrival : column.location
              ),
            }
          )
        })
        return newColumns
      })
    }
  }
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
                onBlur={()=>setLastSelect(null)}
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
                 buttonAction={buttonActions[columnReceiver.id]}
                 handleReceiverButtonClick={(event)=>{
                   handleReceiverButtonClick(i, event)
                  }
                 }
                 onChange={handleColumnSelectChange}
                 onBlur={()=>setLastSelect(columnReceiver.id)}
                />
              )
            })}
          </Col>
        </Row>
      </>
  )
}


export default DataFileForm