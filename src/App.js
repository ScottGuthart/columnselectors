import React, { useState, useEffect } from 'react';
import './App.css';
import { Form, Container, Tabs, Tab, Row, Col} from 'react-bootstrap'
import bsCustomFileInput from "bs-custom-file-input"

import DataFileForm from "./components/DataFileForm"

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [maxdiffFile, setMaxdiffFile] = useState(undefined);
  const [maxdiffColumns, setMaxdiffColumns] = useState(["No MaxDiff File"]);

  useEffect(() => {
    bsCustomFileInput.init();
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  useEffect(() => {
    if(maxdiffFile !== undefined){
      console.log(maxdiffFile.name)
      const requestOptions = {
        method: 'POST',
        body: maxdiffFile,
      }
      setMaxdiffColumns(["Loading..."])
      fetch('/api/columns', requestOptions)
      .then(res => res.json())
      .then(data => {
        // const { columns } = data
        console.log(data)
        setMaxdiffColumns(data)
      })
      .catch(error => {
        console.log(error)
      })
    }
    else {
      setMaxdiffColumns(["No MaxDiff file"])
    }
  }, [maxdiffFile]);

  return (
    <Container className="p-3" style={{maxWidth: "800px"}}>
      <h1 class="pb-3">Augmented MaxDiff</h1>
      <Tabs variant="tabs" defaultActiveKey="upload">
        <Tab eventKey="upload" title="Upload">
          <p class="pt-3">
            <Form >
              {/* <MaxDiffForm 
                onChange={f => setMaxdiffFile(f)}
                maxdiffColumns = {maxdiffColumns}
              /> */}
              <DataFileForm 
                name= "Max Diff File"
                accept= ".csv, .xlsx, .xls, .sav"
                onChange= {f=> setMaxdiffFile(f)}
                columns= {maxdiffColumns}
                ColumnSelectors= {[
                  {
                    name: "Best Columns",
                    instructions: "Select the columns with the data for the best item",
                  },
                  {
                    name: "Worst Columns",
                    instructions: "Select the columns with the data for the worst item",
                  },
                ]}
              />
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
