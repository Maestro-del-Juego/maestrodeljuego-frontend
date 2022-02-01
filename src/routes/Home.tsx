import { Box, Button, Typography, Grid } from '@mui/material'
import FeatureBlock from "../components/FeatureBlock";
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
        <Box sx={{ flexGrow:1 }}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box className="home-screen-left" sx={{ marginLeft:12, marginTop:12 }}>
                <Typography variant="h2" sx={{ fontWeight:"bolder", textAlign:"center" }}>Some Big Text Words</Typography>
                <Typography variant="h6" sx={{ marginLeft:12, marginTop:6, marginBottom:6 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit.</Typography>
                <Link className="register-link-button" to="/registration/">
                <Button variant="contained" sx={{ p:3, display:"block", margin:"auto" }}>
                    <Typography variant="h6">Register Now</Typography>
                </Button>
                </Link>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box className="home-screen-right" sx={{ marginRight:12, marginTop:12 }}>
                    <img className="home-image" src="/catan.jpg" alt="Board game" />
                </Box>
            </Grid>
        </Grid>
        </Box>
        <Box className="home-screen-upper-box" sx={{ display:"inline" }}>
        
        </Box>
        <Box className="feature-list" sx={{ backgroundColor:"#334195" }}>
        <FeatureBlock
            featureIcon="/icon1.svg"
            featureName="Plan your game nights"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon2.svg"
            featureName="Collect feedback"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon3.svg"
            featureName="Track your play stats"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon4.svg"
            featureName="Make hosting easy"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon5.svg"
            featureName="Play more of your games"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon6.svg"
            featureName="Organize your collection"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        </Box>
        </>
    )
}