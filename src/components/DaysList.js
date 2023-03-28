import React from "react";
import DayListItem from "./DayListItem";

import "components/InterviewList.scss"

export default function DayList(props) {
  const days = props.days
  const dayItem = days.map(day =>

    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />

  )

  return (
    <ul>
      {dayItem}
    </ul>
  )
}