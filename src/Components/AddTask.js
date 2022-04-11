import { useState } from "react";

const AddTask = (props) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reminder, setReminder] = useState(false);

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };
  const dateHandler = (e) => {
    setDate(e.target.value);
  };
  const timeHandler = (e) => {
    setTime(e.target.value);
  };
  const reminderHandler = (e) => {
    setReminder(e.currentTarget.checked);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please Add New Task");
      return;
    }
    props.onAddTask({ text, date, time, reminder });

    setText("");
    setDate("");
    setTime("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="New Task"
          value={text}
          onChange={textChangeHandler}
        />
      </div>
      <div className="form-control">
        <label>Date & Time</label>
        <input type="date" value={date} onChange={dateHandler} />
      </div>
      <div className="form-control">
        <label>Time</label>
        <input type="time" value={time} onChange={timeHandler} />
      </div>
      <div className="form-control form-control-check">
        <label>Add Reminder</label>
        <input type="checkbox" value={reminder} onChange={reminderHandler} />
      </div>
      <input
        type="submit"
        checked={props.reminder}
        value="Save Task"
        className="btn btn-block"
      />
    </form>
  );
};

export default AddTask;
