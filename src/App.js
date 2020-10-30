import React, { useEffect } from 'react';
import './App.css';
import { Form, Container, Tabs, Tab, } from 'react-bootstrap'
import bsCustomFileInput from "bs-custom-file-input"

import DataFileForm from "./components/DataFileForm"
import dataFileFormItems from "./dataFileFormItems"


function App() {
  useEffect(() => {
    console.log('useEffect: Page Load')
    bsCustomFileInput.init();
  }, []);


  const dataFileForms = dataFileFormItems.map(dataFileFormInfo=>{
      return (
        <DataFileForm 
          name={dataFileFormInfo.name}
          formats= {dataFileFormInfo.formats}
          columnReceivers={dataFileFormInfo.columnReceivers}
        />
      )
    })

  return (
    <Container className="p-3   mt-5" style={{maxWidth: "900px"}}>
      <h1 className="mb-5">Column Selector Demo</h1>
      <Tabs variant="tabs" defaultActiveKey="upload">
        <Tab eventKey="upload" title="Upload">
          <p className="pt-3">
            <Form >
              {dataFileForms}
            </Form>
          </p>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
