import React, { useState, useEffect } from 'react';
import './App.css';
import { Form, Container, Tabs, Tab, } from 'react-bootstrap'
import bsCustomFileInput from "bs-custom-file-input"

import getSelectedValues from "./getSelectedValues"
import DataFileForm from "./components/DataFileForm"
import dataFileFormItems from "./dataFileFormItems"


function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [DataGroupings, setDataGroupings] = useState(
    dataFileFormItems.map((dataFile)=>{
      return ({
        name: dataFile.name,
        id: dataFile.id,
        groups: dataFile.ColumnReceivers.map((receiver)=>{
          return ({
            name: receiver.name,
            id: receiver.id,
            members: [],
          })
        }), 
      })
    })
  )
  const [maxdiffFile, setMaxdiffFile] = useState(undefined)
  const [maxdiffColumns, setMaxdiffColumns] = useState(
    [{
      name: "No MaxDiff File",
      consumed: false,
      selected: false,
      value: 0,
    }]
    );
  useEffect(() => {
    console.log('useEffect: Page Load')
    bsCustomFileInput.init();
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  useEffect(() => {
    console.log('useEffect: MaxDiff File Change')
    if(maxdiffFile !== undefined){
      console.log(`Filename: ${maxdiffFile.name}`)
      setMaxdiffColumns(["Loading..."])
      const requestOptions = {
        method: 'POST',
        body: maxdiffFile,
      }
      fetch('/api/columns', requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log("Column Data Received")
        console.log(data)
        setMaxdiffColumns(data.map((column, i)=> {
          return {
            name: column, 
            consumed:false, 
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
      setMaxdiffColumns([{
        name: "No MaxDiff file",
        consumed: true,
        selected: false,
        value: 0,
      }])
    }
  }, [maxdiffFile]);

  const handleColumnSenderChange = (event) => {
    const selectedValues = getSelectedValues(event.target)
    setMaxdiffColumns((prevMaxDiffColumns) => {
      console.log('previous:')
      console.log(prevMaxDiffColumns)
      const newMaxdiffColumns = prevMaxDiffColumns.map((column, i)=>{
        return (
          {
            ...column,
            selected: selectedValues.includes(i),
          }
          )
        })
        return newMaxdiffColumns
      })
  }

  const handleMaxdiffFileUpload = (event) => {
    const file = event.target.files[0]
    setMaxdiffFile(file)
  }

  const handleReceiverButtonClick = (i, event) => {
    console.log(`Receiver Button Click ${i}`)
  }

  const dataFileForms = dataFileFormItems.map(dataFileFormInfo=>{
      return (
        <DataFileForm 
          name={dataFileFormInfo.name}
          FileUploader= {{
            formats: dataFileFormInfo.formats,
            onChange: handleMaxdiffFileUpload
          }}
          columns={maxdiffColumns}
          ColumnSender={{
            onChange: handleColumnSenderChange
          }}
          ColumnReceivers={{
            info: dataFileFormInfo.ColumnReceivers,
            handleButtonClick: handleReceiverButtonClick,
          }}
          
        />
      )
    })

  return (
    <Container className="p-3" style={{maxWidth: "800px"}}>
      <h1 className="pb-3">Augmented MaxDiff</h1>
      <Tabs variant="tabs" defaultActiveKey="upload">
        <Tab eventKey="upload" title="Upload">
          <p className="pt-3">
            <Form >
              {dataFileForms}
            </Form>
          </p>
        </Tab>
        <Tab eventKey="select-data" title="Select Data">
        </Tab>
      </Tabs>
        <p>The current time is {currentTime}.</p>
    </Container>
  );
}

export default App;
