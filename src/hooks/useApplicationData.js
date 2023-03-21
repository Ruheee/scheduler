import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Function alters the day state with the selected state
  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState({
          ...state,
          appointments,
        });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  };

  // both functions retrieve the apointments and the available interviewers for a selected day

  // Makes a request to the api and retrieves the data in the data base and assigns it to the declared states

  useEffect(() => {
    updateSpotsRemaining();
  }, [state.appointments]);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  const updateSpotsRemaining = () => {
    const updatedDays = state.days.map((day) => {
      const spots =
        day.appointments.length - day.appointments.filter((appointment) => {
          return state.appointments[appointment].interview;}).length;

      const updatedDay = {
        ...day,
        spots: spots,
      };
      return updatedDay;
    });

    setState((prev) => ({ ...prev, days: updatedDays }));
  };

  return { state, setDay, bookInterview, cancelInterview };
}
