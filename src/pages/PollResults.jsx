import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
export default function PollResults() {
  // const location = useLocation();
  const { id } = useParams();
  // const [pollData, setPollData] = useState(location.state || null);
  const [pollData, setPollData] = useState(null);

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
    if (pollData) return;
    getPollData();
  });

  if (!pollData) return <h1>Loading...</h1>;
  return (
    <>
      <h1>Poll Results!</h1>
      <h2>{pollData.question}</h2>
      <div>
        {pollData.choices.map((choice) => (
          <p key={choice._id}>
            {choice.value} {choice.votes}
          </p>
        ))}
      </div>
    </>
  );
}
