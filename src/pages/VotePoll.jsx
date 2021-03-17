import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

export default function VotePoll() {
  const [pollData, setPollData] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getPollData() {
      try {
        const response = await fetch(`/api/poll/${id}`);
        console.log(response);
        const data = await response.json();
        setPollData(data);
      } catch (err) {
        console.error(err);
      }
    }
    getPollData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const toSend = Array.from(formData).reduce((obj, field) => {
      const [name, value] = field;
      obj[name] = value;
      return obj;
    }, {});

    try {
      const response = await fetch(`/api/poll/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(toSend),
      });
      if (!response.ok) {
        throw new Error(`Response was not okay, ${response.status}, ${response.statusText}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      history.push(`/${id}/results`, responseData);
    } catch (err) {
      console.error(`There was an error: ${err}`);
    }
  }

  if (!pollData) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Vote Poll View</h1>
      <h2>{pollData.question}</h2>
      <form onSubmit={handleSubmit}>
        {pollData.choices.map((choice) => (
          <div key={choice._id}>
            <input type="radio" name="vote" id={choice.value} value={choice._id} />
            <label htmlFor={choice.value}>{choice.value}</label>
          </div>
        ))}
        <button type="submit">Vote</button>
      </form>
    </>
  );
}
