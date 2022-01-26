import axios from 'axios';
import { useEffect, useState } from 'react';
import * as V from 'victory';

interface statProps {
  user: string;
  token: string;
}

export default function PlayStats(props: statProps) {
  const [weekdayStats, setWeekdayStats] = useState({});
  const [avgOverallFeedback, setAvgOverallFeedback] = useState<any[]>([]);
  const [avgAttendRatio, setAvgAttendRatio] = useState<any[]>([]);
  const [avgSessionLen, setAvgSessionLen] = useState<any[]>([]);
  const [avgGameNum, setAvgGameNum] = useState<any[]>([]);
  const [avgPlayerNum, setAvgPlayerNum] = useState<any[]>([]);
  const [sessionsNum, setSessionsNum] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      try {
        axios
          .get('https://maestrodeljuego.herokuapp.com/auth/users/me/', {
            headers: {
              Authorization: `Token ${props.token}`,
            },
          })
          .then((result) => {
            console.log(result);
            setWeekdayStats(result.data.weekday_stats);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  return (
    <div id="play-stats-page">
      <h1>Welcome to Game Master, {props.user}!</h1>
      <div id="most-played">
        <div id="by-title">
          <h3>Most Played Games</h3>
        </div>
        <div id="by-genre">
          <h3>Most Played Genres</h3>
        </div>
      </div>
    </div>
  );
}
