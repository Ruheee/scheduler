import React from "react";
import classNames from "classnames";



import "components/DayListItem.scss"



export default function DayListItem(props) {

  const FormatSpots = () => {
    
    if(props.spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    }

    if(props.spots === 1) {
      return <h3 className="text--light">{props.spots} spot remaining</h3>
    }

     return <h3 className="text--light">{props.spots} spots remaining</h3>
  }

  let dayClass = classNames("li",{
    "day-list__item": props,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <FormatSpots />
    </li>
  );
}