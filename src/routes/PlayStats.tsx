import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryPie,
} from 'victory';
import { Box } from '@mui/material';
import LeastPlayed from '../components/LeastPlayed';
import GameCard from '../components/GameCard';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
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
  const [mostPlayed, setMostPlayed] = useState<any[]>([]);
  const [leastPlayed, setLeastPlayed] = useState<any[]>([]);
  const [commonPlayers, setCommonPlayers] = useState<any[]>([]);
  const [unplayed, setUnplayed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
            for (let entry of result.data.most_played_games) {
              setMostPlayed((oldData) => [
                ...oldData,
                {
                  x: entry.name,
                  y: entry.played,
                },
              ]);
            }
            for (let entry of result.data.most_common_players) {
              setCommonPlayers((oldData) => [
                ...oldData,
                {
                  name: entry.name,
                  play_count: entry.attended,
                },
              ]);
            }
            setLeastPlayed(result.data.least_played_games);
            setUnplayed(result.data.games_not_played);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
    setLoading(false);
  }, [props.token]);

  return (
    <div id="play-stats-page">
      <h1>Welcome to Game Knight, {props.user}!</h1>
      <div id="most-played">
        <div id="weekday-stats">
          <h2>Weekday Stats</h2>
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
              ) : loading ? (
                <h4>Loading...</h4>
              ) : (
                <h4>Play a few game nights to start tracking your stats!</h4>
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
              ) : loading ? (
                <h2>Loading...</h2>
              ) : (
                <h4>Play a few game nights to start tracking your stats!</h4>
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
              ) : loading ? (
                <h4>Loading...</h4>
              ) : (
                <h4>Play a few game nights to start tracking your stats!</h4>
              )}
            </Box>
          </div>
        </div>
        <div id="gameplay-stats">
          <h2>Gameplay Stats</h2>
          {mostPlayed.length > 0 ? (
            <Box>
              <h4>Most Played Games</h4>
              <VictoryPie data={mostPlayed} />
            </Box>
          ) : loading ? (
            <h4>Loading...</h4>
          ) : (
            <h4>Play a few game nights to start tracking your stats!</h4>
          )}
          <Box>
            <h4>Least Played Games</h4>
            <div id="least-played">
              {loading ? (
                <h4>Loading...</h4>
              ) : (
                leastPlayed.map((game: any) => (
                  <LeastPlayed
                    gameId={game.bgg}
                    gameName={game.name}
                    imageUrl={game.image}
                    amountPlayed={game.played}
                  />
                ))
              )}
            </div>
          </Box>
          <Box>
            <h4>These haven't even hit the table!</h4>
            <div id="unplayed">
              {loading ? (
                <h4>Loading...</h4>
              ) : (
                <Carousel>
                  {unplayed.map((game: any) => (
                    <GameCard
                      gameId={game.bgg}
                      gameName={game.name}
                      imageUrl={game.image}
                      pubYear={game.pub_year}
                    />
                  ))}
                </Carousel>
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
