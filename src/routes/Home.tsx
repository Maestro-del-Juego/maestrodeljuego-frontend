import { Box, Button, Typography, Grid } from '@mui/material';
import FeatureBlock from '../components/FeatureBlock';
import { useNavigate } from 'react-router-dom';
import pieces from '../assets/game-pieces.png';

export default function Home() {
  const navigate = useNavigate();
  const handleClickToReg = () => {
    navigate('/registration/');
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box className="home-screen-left" sx={{ marginLeft:12, marginTop:6 }}>
                    <Typography variant="h2" sx={{ fontWeight:"bold", textAlign:"center", fontFamily:'Raleway' }}>Play More Games</Typography>
                    <Typography variant="h5" sx={{ marginLeft:10, marginRight:10, marginTop:6, marginBottom:6, fontFamily:'Roboto Condensed' }}>
                        Game Knight helps you optimize your game nights for maximum fun, so you spend more time playing and less time worrying about logistics.
                    </Typography>
                    <Button variant="contained" sx={{ p:3, display:"block", margin:"auto", backgroundColor:"#759eb8" }} onClick={handleClickToReg}>
                        <Typography variant="h6" sx={{ color:"white", fontFamily:"Raleway", fontWeight:"bold" }}>Register Now</Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box className="home-screen-right" sx={{ marginRight:12, marginTop:6 }}>
                    <img className="home-image" src={pieces} alt="Board game" />
                </Box>
            </Grid>
        </Grid>
        </Box>
        <Box className="home-screen-upper-box" sx={{ display:"inline" }}>
        
        </Box>
        <Box className="feature-list" sx={{ backgroundColor:"#334195" }}>
        <FeatureBlock
            featureIcon="/icon4.svg"
            featureName="Hosting made easy"
            featureDetails="Seamlessly organize your next game night and invite guests to join in on the planning process by giving them a vote on what games will hit the table."
        />
        <FeatureBlock
            featureIcon="/icon1.svg"
            featureName="Build a perfect game night"
            featureDetails="Maximize enjoyment by collecting feedback from your guests to see which games and days of the week get everyone excited to play."
        />
        <FeatureBlock
            featureIcon="/icon5.svg"
            featureName="End the scheduling hassle"
            featureDetails="Pick a time, date, and a handful of games, then let your guests do the rest. Lock in the details, and you're ready for game night!"
        />
        <FeatureBlock
            featureIcon="/icon6.svg"
            featureName="Track your play stats"
            featureDetails="Keep track of which games you play most, what genres are most popular, and which games you haven't played at all."
        />
        <FeatureBlock
            featureIcon="/icon2.svg"
            featureName="Catalog your collection"
            featureDetails="Keep a list of all the board games in your collection to quickly add these to your event without the need to check your closet."
        />
        <FeatureBlock
            featureIcon="/icon3.svg"
            featureName="Play more of your games"
            featureDetails="Are your guests ready to play something new? See which games haven't left the shelf and add them to the next event."
        />
      </Box>
    </>
  );
}
