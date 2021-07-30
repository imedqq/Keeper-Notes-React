import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { Zoom } from "@material-ui/core";

function CreateArea(props) {
  const titleRef = React.useRef(null);
  const [note, setNote] = React.useState({
    title: "",
    content: ""
  });
  const [expanded, setExpanded] = React.useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
  }

  function expand() {
    if (!expanded) {
      setExpanded(true);
      setTimeout(function () {
        titleRef.current.focus();
      }, 1);
    }
  }
  function close() {
    setExpanded(false);
  }

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          hidden={!expanded}
          ref={titleRef}
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={expanded ? "3" : "1"}
          onClick={expand}
        />
        <Zoom in={expanded}>
          <Fab
            onClick={(event) => {
              submitNote(event);
              props.addNote(note);
              setNote({ title: "", content: "" });
              close();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
