import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
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
  const [mostPlayedCategories, setMostPlayedCategories] = useState<any[]>([]);
  const [leastPlayed, setLeastPlayed] = useState<any[]>([]);
  const [commonPlayers, setCommonPlayers] = useState<any[]>([]);
  const [unplayed, setUnplayed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playedEnough, setPlayedEnough] = useState(true);

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
                  x: entry.title,
                  y: entry.percentage,
                  label: `${entry.title} ${entry.percentage}%`,
                },
              ]);
            }
            for (let entry of result.data.most_played_categories) {
              setMostPlayedCategories((oldData) => [
                ...oldData,
                {
                  x: entry.name,
                  y: entry.percentage,
                  label: `${entry.name} ${entry.percentage}%`,
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
            if (result.data.gamenights_finished < 5) {
              setPlayedEnough(false);
            }
            setLeastPlayed(result.data.least_played_games);
            setUnplayed(result.data.games_not_played);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [props.token]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>
        Welcome to Game Knight, {props.user}!
      </h1>
      <div id="play-stats-page">
        {playedEnough ? (
          <>
            <div id="most-played">
              <h2>Weekday Stats</h2>
              <div id="weekday-vis-container">
                <Box>
                  {loading ? (
                    <h4>Loading...</h4>
                  ) : (
                    <VictoryChart
                      width={700}
                      height={500}
                      padding={{ left: 150, top: 50, right: 50, bottom: 150 }}
                      domainPadding={45}
                      theme={VictoryTheme.material}
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
                  )}
                </Box>
                <Box>
                  {loading ? (
                    <h4>Loading...</h4>
                  ) : (
                    <VictoryChart
                      width={700}
                      height={500}
                      padding={{ left: 150, top: 50, right: 50, bottom: 150 }}
                      domainPadding={45}
                      theme={VictoryTheme.material}
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
                  )}
                </Box>
                <Box>
                  {loading ? (
                    <h4>Loading...</h4>
                  ) : (
                    <VictoryChart
                      width={700}
                      height={500}
                      padding={{ left: 150, top: 50, right: 50, bottom: 150 }}
                      domainPadding={45}
                      theme={VictoryTheme.material}
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
                  )}
                </Box>
              </div>
            </div>
            <div id="gameplay-stats">
              <h2>Gameplay Stats</h2>
              {loading ? (
                <h4>Loading...</h4>
              ) : (
                <div id="pie-data">
                  <div id="most-played-games">
                    <h3>Most Played Games</h3>
                    <VictoryPie
                      labelComponent={<VictoryTooltip />}
                      data={mostPlayed}
                      colorScale={[
                        '#003f5c',
                        '#2f4b7c',
                        '#665191',
                        '#a05195',
                        '#d45087',
                        '#f95d6a',
                        '#ff7c43',
                        '#ffa600',
                        '#FFDD4A',
                        '#9FD356',
                      ]}
                    />
                  </div>
                  <div id="most-played-categories">
                    <h3>Most Played Games by Category</h3>
                    <VictoryPie
                      labelComponent={<VictoryTooltip />}
                      data={mostPlayedCategories}
                      colorScale={[
                        '#003f5c',
                        '#2f4b7c',
                        '#665191',
                        '#a05195',
                        '#d45087',
                        '#f95d6a',
                        '#ff7c43',
                        '#ffa600',
                        '#FFDD4A',
                        '#9FD356',
                      ]}
                    />
                  </div>
                </div>
              )}
              <div id="lowest-played-section">
                <div id="least-played">
                  <h3>Least Played Games</h3>
                  {loading ? (
                    <h4>Loading...</h4>
                  ) : (
                    <Carousel>
                      {leastPlayed.map((game: any) => (
                        <LeastPlayed
                          gameId={game.bgg}
                          gameName={game.name}
                          imageUrl={game.image}
                          amountPlayed={game.played}
                        />
                      ))}
                    </Carousel>
                  )}
                </div>
                <div id="unplayed">
                  <h3>These haven't even hit the table!</h3>
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
              </div>
            </div>
          </>
        ) : (
          <h2>Play a few game nights to start tracking your stats!</h2>
        )}
      </div>
    </>
  );
}
