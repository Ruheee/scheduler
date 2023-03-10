import React, { Fragment } from "react";
import classNames from "classnames";


import "components/InterviewItem.scss"



export default function InterviewListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  const ShowName = () => {

    if (props.selected) {
      return <Fragment> <img className="interviewers__item-image" src={props.avatar} alt={props.name} /> {props.name} </Fragment>
    }
    return <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
  }

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <ShowName />
    </li>
  )
}