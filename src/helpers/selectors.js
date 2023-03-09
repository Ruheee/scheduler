export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  
  const foundDay = state.days.find( item => item.name === day );
  
  if (state.days.length < 1 || foundDay === undefined) {
    return []
  }

  const foundDayAppointments = foundDay.appointments.map((id) => state.appointments[id])

  return foundDayAppointments;
}

export function getInterview(state, interview) {
  
  // if (interview) {
  //   const { student, interviewer } = interview;
  //   const { id, name, avatar } = state.interviewers[interviewer];
  //   return {
  //     student,
  //     interviewer: {
  //       id,
  //       name,
  //       avatar
  //     }
  //   };
  // } 
  //   return null;

  let obj = {};
  
  if (interview === null) {
    return null;
  }
  let interviewer = interview.interviewer;
  if (state.interviewers[interviewer].id === interviewer) {
    obj["student"] = interview.student;
    obj["interviewer"] = state.interviewers[interviewer];
  } 
  return obj;
}