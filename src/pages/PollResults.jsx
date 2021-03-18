import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function PollResults() {
  const { id } = useParams();
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

  useEffect(() => {
    const wsUrl = process.env.REACT_APP_PRODUCTION_URL || "ws://localhost:8080";
    const ws = new WebSocket(`${wsUrl}/${id}`);
    ws.addEventListener("message", (event) => {
      setPollData(JSON.parse(event.data));
    });
    ws.addEventListener("error", (e) => {
      console.error("error:", e);
    });
    ws.addEventListener("close", (e) => {
      console.log("closed:", e);
    });
    return () => {
      ws.close();
    };
  }, [id]);

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
