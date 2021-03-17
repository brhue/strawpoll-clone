import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function CreatePoll() {
  const [pollOptions, setPollOptions] = useState(2);
  const formRef = useRef(null);
  const history = useHistory();

  async function handleSubmit(e) {
    const formData = new FormData(formRef.current);
    const dataToSend = Array.from(formData).reduce(
      (obj, field) => {
        const [name, value] = field;
        if (name.includes("choice") && value) {
          obj.choices.push(value);
        } else if (name.includes("question")) {
          obj[name] = value;
        }
        return obj;
      },
      { choices: [] }
    );
    e.preventDefault();
    try {
      const response = await fetch("/api/poll", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const data = await response.json();
      console.log(data);
      history.push(`/${data._id}`);
    } catch (err) {
      console.error(err);
    }
  }

  const optionInputs = [];
  for (let i = 1; i <= pollOptions; i++) {
    optionInputs.push(
      <div key={i}>
        <input
          type="text"
          placeholder="Poll option"
          name={`choice-${i}`}
          id={`choice-${i}`}
          onChange={() => {
            if (i === pollOptions) {
              setPollOptions(pollOptions + 1);
            }
          }}
        />
      </div>
    );
  }

  return (
    <>
      <h1>Create Poll View</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a question..." name="question" id="question" />
        {optionInputs}
        {/* <div>
          <input type="text" placeholder="Poll option" name="choice-1" id="choice-1" />
        </div>
        <div>
          <input type="text" placeholder="Poll option" name="choice-2" id="choice-2" />
        </div>
        <div>
          <input type="text" placeholder="Poll option" name="choice-3" id="choice-3" />
        </div> */}
        <div>
          <button type="submit">Create Poll</button>
        </div>
      </form>
    </>
  );
}
