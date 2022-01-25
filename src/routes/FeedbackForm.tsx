import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface feedbackProps {}

export default function FeedbackForm(props: feedbackProps) {
  let { gameId } = useParams();

  useEffect(() => {
    console.log(gameId);
    axios
      .get(`https://maestrodeljuego.herokuapp.com/gamenight/${gameId}`)
      .then((result: any) => {
        console.log(result.data);
      })
      .catch((error: any) => console.log(error));
  }, []);

  return (
    <div id="feedback-form">
      <h1>Thank you for attending</h1>
    </div>
  );
}
