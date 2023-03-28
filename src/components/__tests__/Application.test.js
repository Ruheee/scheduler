import React from "react";
import axios from "axios";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText
} from "@testing-library/react";

import { prettyDOM } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );  

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const monday = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(monday, "2 spots remaining")).toBeInTheDocument();
});


it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"))
  
    // 3. Click the "Edit" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    )

    fireEvent.click(queryByAltText(appointment, "Edit"))

    // 4. Change the student name to "Lydia Miller-Jones" and change the Interviewer
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    })
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));
    
    // 6. Check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Check that the appointment was saved by searching the new student's name
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining" 
    const monday = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining" 
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
})

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

   // 1. Render the Application
   const { container, debug } = render(<Application />);

   // 2. Wait until the text "Archie Cohen" is displayed
   await waitForElement(() => getByText(container, "Archie Cohen"));

   // 3. Click the Aadd button on the first appointment
   const appointment = getAllByTestId(container, "appointment")[0];
   fireEvent.click(getByAltText(appointment, "Add"))

   // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
   fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
     target: { value: "Lydia Miller-Jones" }
   })
   
   // 5. Click the first interviewer in the list
   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
   
   // 6. Click the "Save" button on that same appointment
   fireEvent.click(getByText(appointment, "Save"));

   // 7. Check that the element with the text "Error" is displayed
   await waitForElement(() => getByText(appointment, "Error"))

   // 8. Click on the Close and Cancel button
   fireEvent.click(getByAltText(appointment, "Close"));
   fireEvent.click(getByText(appointment, "Cancel"));

   // 9. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"  
   const monday = getAllByTestId(container, "day").find(day =>
     queryByText(day, "Monday")
   );
   expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  // 1. Render the Application
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed
  await waitForElement(() => getByText(container, "Archie Cohen"))

  // 3. Click the "Delete" button on the booked appointment
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  )
  
  fireEvent.click(queryByAltText(appointment, "Delete"))

  // 4. Check that the confirmation message is shown
  expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();
  
  // 5. Click the "Confirm" button on the confirmation
  fireEvent.click(getByText(appointment, "Confirm"))

  // 6. Check that the element with the text "Error" is displayed
  await waitForElement(() => getByText(appointment, "Error"))

  // 7. Click on the Close and Cancel button
  fireEvent.click(getByAltText(appointment, "Close"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining"  
  const monday = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
});

});
