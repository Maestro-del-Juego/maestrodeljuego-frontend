import axios from 'axios';
import { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { Box } from '@mui/material';

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
            for (let [key, value] of Object.entries(
              result.data.weekday_stats.avg_attend_ratio
            )) {
              setAvgAttendRatio((oldData) => [
                ...oldData,
                {
                  day: key,
                  vote: value,
                },
              ]);
            }
            for (let [key, value] of Object.entries(
              result.data.weekday_stats.avg_overall_feedback
            )) {
              setAvgOverallFeedback((oldData) => [
                ...oldData,
                {
                  day: key,
                  vote: value,
                },
              ]);
            }
            for (let [key, value] of Object.entries(
              result.data.weekday_stats.avg_player_num
            )) {
              setAvgPlayerNum((oldData) => [
                ...oldData,
                {
                  day: key,
                  vote: value,
                },
              ]);
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [props.token]);

  return (
    <div id="play-stats-page">
      <h1>Welcome to Game Master, {props.user}!</h1>
      <div id="most-played">
        <div id="weekday-stats">
          <h3>Weekday Stats</h3>
          <div id="weekday-vis-container">
            <Box>
              {avgAttendRatio.length > 0 ? (
                <VictoryChart
                  width={700}
                  height={500}
                  padding={{ left: 150, top: 50, right: 50, bottom: 150 }}
                  domainPadding={45}
                >
                  <VictoryAxis
                    label="Average Attendance Ratio per Weekday for Game Nights"
                    style={{
                      axisLabel: { fontSize: 20, padding: 40 },
                      ticks: { stroke: 'grey', size: 5 },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    style={{ ticks: { stroke: 'grey', size: 5 } }}
                  />
                  <VictoryBar data={avgAttendRatio} x="day" y="vote" />
                </VictoryChart>
              ) : (
                <h2>Loading...</h2>
              )}
            </Box>
            <Box>
              {avgOverallFeedback.length > 0 ? (
                <VictoryChart
                  width={700}
                  height={500}
                  padding={{ left: 150, top: 50, right: 50, bottom: 150 }}
                  domainPadding={45}
                >
                  <VictoryAxis
                    label="Average Overall Score for Gamenights per Weekday"
                    style={{
                      axisLabel: { fontSize: 20, padding: 40 },
                      ticks: { stroke: 'grey', size: 5 },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    style={{ ticks: { stroke: 'grey', size: 5 } }}
                  />
                  <VictoryBar data={avgOverallFeedback} x="day" y="vote" />
                </VictoryChart>
              ) : (
                <h2>Loading...</h2>
              )}
            </Box>
            <Box>
              {avgPlayerNum.length > 0 ? (
                <VictoryChart
                  width={700}
                  height={500}
                  padding={{ left: 150, top: 50, right: 50, bottom: 150 }}
                  domainPadding={45}
                >
                  <VictoryAxis
                    label="Average Attendance per Weekday for Game Nights"
                    style={{
                      axisLabel: { fontSize: 20, padding: 40 },
                      ticks: { stroke: 'grey', size: 5 },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    style={{ ticks: { stroke: 'grey', size: 5 } }}
                  />
                  <VictoryBar data={avgPlayerNum} x="day" y="vote" />
                </VictoryChart>
              ) : (
                <h2>Loading...</h2>
              )}
            </Box>
          </div>
        </div>
        <div id="by-genre">
          <h3>Most Played Genres</h3>
        </div>
      </div>
    </div>
  );
}
