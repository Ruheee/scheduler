import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // gather the information from onSave which comes from the form
  // create an interview obj from the gathered information
  // pass the interview obj and interview id to props.bookinterview

  function save(name, interviewer) {
    if (!name || !interviewer) return transition(ERROR_SAVE);
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    // props.id is the interview id
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  const confirmDelete = () => transition(CONFIRM);

  const emptyInterview = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete this appointment?"}
          onConfirm={() => emptyInterview(props.id)}
          onCancel={() => back()}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && (
        <Error message="Couldn't save the appointment" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Couldn't delete the appointment"
          onClose={() => back()}
        />
      )}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirmDelete}
          onEdit={() => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(student, interviewer) => save(student, interviewer)}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(student, interviewer) => save(student, interviewer)}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
    </article>
  );
}
