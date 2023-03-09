export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  
  const foundDay = state.days.find(item => day === item.name);
  
  if (state.days.length < 1 || foundDay === undefined) {
    return []
  }

  const foundDayAppointments = foundDay.appointments.map((id) => state.appointments[id])

  return foundDayAppointments;
}