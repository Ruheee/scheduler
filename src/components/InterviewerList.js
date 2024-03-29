import React from "react";
import PropTypes from 'prop-types'; 
import InterviewListItem from "./InterviewerListItem";

import "components/InterviewItem.scss"
import "components/InterviewList.scss"




export default function InterviewList(props) {
  const interviewers = props.interviewers
  const interviewerItem = interviewers.map(interviewer =>

    <InterviewListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
    />

  )
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{props.name}</h4>
      <ul className="interviewers__list">
        {interviewerItem}
      </ul>
    </section>
  )
}

InterviewList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

