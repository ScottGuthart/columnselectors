import React from "react"
import { Button } from 'react-bootstrap'
import { BsChevronDoubleLeft,BsChevronDoubleRight, BsDash } from "react-icons/bs"

const ColumnReceiverButton = (props) => {
  if (props.buttonAction === 'arrive') {
    return (
      <Button
        size=""
        className="text-nowrap"
        variant="primary"
        onClick={props.handleClick}
      >
          <BsChevronDoubleRight size="1.0rem"
          style={{position:"relative", bottom:"1px"}}
          />
            &nbsp;{props.name}&nbsp;
          <BsChevronDoubleRight size="1.0rem"
          style={{position:"relative", bottom:"1px"}}
          />
      </Button>
    )
  }
  else if (props.buttonAction === "depart") {
    return (
      <Button
        size=""
        className="text-nowrap"
        variant="primary"
        onClick={props.handleClick}
      >
          <BsChevronDoubleLeft size="1.0rem"
          style={{position:"relative", bottom:"1px"}}
          />
            &nbsp;{props.name}&nbsp;
          <BsChevronDoubleLeft size="1.0rem"
          style={{position:"relative", bottom:"1px"}}
          />
      </Button>
    )
  }
  return (
      <Button
        size=""
        className="text-nowrap disabled"
        disabled={true}
        variant="secondary"
        onClick={props.handleClick}
      >
          <BsDash size="1.0rem"
          style={{position:"relative", bottom:"1px"}}
          />
            &nbsp;{props.name}&nbsp;
          <BsDash size="1.0rem"
          style={{position:"relative", bottom:"1px"}}
          />
      </Button>

  )
}

export default ColumnReceiverButton