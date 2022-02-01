import { Box, Button, Typography, Grid } from '@mui/material'
import FeatureBlock from "../components/FeatureBlock";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const handleClickToReg = () => {
        navigate('/registration/');
    }

    return (
        <>
        <Box sx={{ flexGrow:1 }}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box className="home-screen-left" sx={{ marginLeft:12, marginTop:12 }}>
                    <Typography variant="h2" sx={{ fontWeight:"bolder", textAlign:"center" }}>Play More Games</Typography>
                    <Typography variant="h6" sx={{ marginLeft:10, marginRight:10, marginTop:6, marginBottom:6 }}>
                        Game Knight helps you optimize your game nights for maximum fun, so you spend more time playing and less time deciding what to play.
                    </Typography>
                    <Button variant="contained" sx={{ p:3, display:"block", margin:"auto" }} onClick={handleClickToReg}>
                        <Typography variant="h6">Register Now</Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box className="home-screen-right" sx={{ marginRight:12, marginTop:12 }}>
                    <img className="home-image" src="/meeples.jpeg" alt="Board game" />
                </Box>
            </Grid>
        </Grid>
        </Box>
        <Box className="home-screen-upper-box" sx={{ display:"inline" }}>
        
        </Box>
        <Box className="feature-list" sx={{ backgroundColor:"#759eb8" }}>
        <FeatureBlock
            featureIcon="/icon4.svg"
            featureName="Make hosting easy"
            featureDetails="Seamlessly organize your next game night and invite guests to join in on the planning process by giving them a vote on what games will hit the table."
        />
        <FeatureBlock
            featureIcon="/icon1.svg"
            featureName="Build a perfect game night"
            featureDetails="Maximize enjoyment by collecting feedback from your guests to see which games and days of the week get everyone excited to play."
        />
        <FeatureBlock
            featureIcon="/icon5.svg"
            featureName="Play more of your games"
            featureDetails="Know what you're playing before you gather."
        />
        <FeatureBlock
            featureIcon="/icon2.svg"
            featureName="Placeholder text is here"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices, velit aliquet rutrum congue, augue leo suscipit eros, non porta sapien erat porta eros. Nullam."
        />
        <FeatureBlock
            featureIcon="/icon3.svg"
            featureName="Placeholder text is here"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices, velit aliquet rutrum congue, augue leo suscipit eros, non porta sapien erat porta eros. Nullam."
        />
        <FeatureBlock
            featureIcon="/icon6.svg"
            featureName="Placeholder text is here"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices, velit aliquet rutrum congue, augue leo suscipit eros, non porta sapien erat porta eros. Nullam."
        />
        </Box>
        </>
    )
}