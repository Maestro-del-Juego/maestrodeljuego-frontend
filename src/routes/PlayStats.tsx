import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  PolarGrid,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

interface statProps {
  user: string;
  token: string;
}

export default function PlayStats(props: statProps) {
  const dataTitle = [
    { name: 'Eclipse', value: 400 },
    { name: 'Caylus', value: 300 },
    { name: 'Dixit', value: 300 },
    { name: 'Sushi Go!', value: 200 },
    { name: 'Dominion', value: 278 },
    { name: 'Bristol', value: 189 },
  ];

  const dataGenre = [
    {
      subject: 'Bidding',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Deck-Building',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Dice',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Area Control',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'War Game',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'Traditional Cards',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  useEffect(() => {
    const loadData = () => {
      try {
        axios
          .get('https://maestrodeljuego.herokuapp.com/auth/users/me/', {
            headers: {
              Authorization: `Token ${props.token}`,
            },
          })
          .then((result) => console.log(result))
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
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              data={dataTitle}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
        <div id="by-genre">
          <h3>Most Played Genres</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataGenre}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
