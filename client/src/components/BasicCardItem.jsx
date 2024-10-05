import { Card, CardContent, Typography, Box, CardActions, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function BasicCardItem({ userItem }) {

  const navigate = useNavigate();

  const GoToPageDetails = () => {

    navigate(`/details/${userItem.id}`, {
      state: { userItem: userItem },
    });

  };

  return (
    <Card sx={{ minWidth: 275, margin: 3, alignContent:'center' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="red" gutterBottom>
           User Id - {userItem.id}
        </Typography>
        <Typography variant="h5" component="div">
          <Box>
            {userItem.userItemname}
          </Box>
        </Typography>
        <Typography variant="body2">
          Email - {userItem.email}
        </Typography>
        <Typography variant="body2">
          Password - {userItem.password}
        </Typography>
        <Typography variant="body2">
          Age -  {userItem.age}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignContent: 'center' }}  >
        <Button size="small" onClick={GoToPageDetails}>Детально</Button>
      </CardActions>
    </Card>
  )
}

export default BasicCardItem
