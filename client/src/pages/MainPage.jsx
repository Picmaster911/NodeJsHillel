import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Hidden } from "@mui/material";
import BasicCardItem from "../components/BasicCardItem";
import axios from "axios";

function MainPage() {
  const [users, setUsers] = useState([]);

  const apiCall = () => {
    axios
      .post("api/users/getall")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <header className="App-header">
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Hidden smUp>
          <Typography variant="h4" component="p" marginTop="5px">
            Hillel Test User
          </Typography>
        </Hidden>
        <Grid item xs={12}>
          {!users ? (
            <Typography variant="h1">Load data</Typography>
          ) : (
            <Grid container spacing={2}>
              {users.map((user) => (
                <Grid
                  display="flex"
                  align-items="center"
                  justifyContent="center"
                  item
                  key={user.id}
                  xs={12}
                  sm={6}
                  md={3}
                >
                  <Box sx={{ maxWidth: 350, width: "100%" }}>
                    <BasicCardItem userItem={user} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </header>
  );
}

export default MainPage;
