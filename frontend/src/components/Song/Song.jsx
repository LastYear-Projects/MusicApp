import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MediaControlCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
       
      }}
    >
      <Card sx={{ display: 'flex', backgroundColor: '#353839', width: '65%', height: '300px',borderRadius:"20px" }}>
        <CardMedia
          component="img"
          sx={{ width: 351 }}
          image="https://images.ctfassets.net/g8qtv9gzg47d/6SiUg4TCwLA9OfEy3KlQy7/41c90a47f0250d130323056f69f6cdca/5de2bba479d7577cd722e553.jpeg?fl=progressive&fm=jpg&q=80"
          alt="Baby Yoda"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '150px' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5" color="#d6d6d6" marginTop="10px">
              Song Title
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div" marginTop="20px">
              Artist
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div">
              Genre List
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div">
              Year
            </Typography>
            <Typography variant="subtitle1" color="#b8b8b8" component="div">
              Duration
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}>
              <Typography variant="subtitle1" color="#b8b8b8" component="div" marginLeft="400px">
                Price
              </Typography>
              <Button
                     variant="contained"
                     color="primary"
                     sx={{
                            marginLeft: '10px',
                            borderRadius: '30px',
                            backgroundColor: "#353839",
                            padding: "20px 10px", 
                            width:"140px",
                            height:"20px",
                            color: "#d6d6d6", 
                            border: "1px solid #fff", 
                            '&:hover': {
                            backgroundColor: "#d6d6d6",
                            color:"black"
                            },
                            }}
                >               
                 Add to Cart
                </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
