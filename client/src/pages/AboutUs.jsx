import React from 'react'
import { Box, Typography, Grid, Divider } from '@mui/material'
import { styled } from '@mui/system';

const CustomDivider = styled(Divider)({
    backgroundColor: '#364b47', // Измените цвет здесь
  });


function AboutUs() {
    return (
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12}>
                <Typography sx={{ marginTop: '100px' }} variant="h4" component="p" >
                   Ithillel test API auth controller
                </Typography>
                <CustomDivider />
            </Grid>
            <Box
                sx={{
                    marginTop: '40px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                    padding: '20px',
                    boxSizing: 'border-box', // Включаем padding в размер контейнера
                }}>
                <Typography variant="h5" component="p">
                    Component  About
                </Typography>
                <Typography variant="h5" component="p">
                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta tempore delectus, rerum nisi necessitatibus, neque odio voluptates ea laboriosam est voluptatibus eius ipsum corporis temporibus a commodi! A, eius nemo!
                </Typography>
            </Box>
        </Grid>
    )
}

export default AboutUs
