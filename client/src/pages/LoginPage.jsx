import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../store/auth/thunks'
import setUserToLocal from '../store/auth/actions'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const GoToPageMain = () => { navigate('/') };

  const WraperBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    padding: '20px',
    boxSizing: 'border-box', // Включаем padding в размер контейнер
  });

  const DarkTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      backgroundColor: 'white',
      borderRadius: '4px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'blue', // цвет окантовки
      },
      '&:hover fieldset': {
        borderColor: 'green', // цвет окантовки при наведении
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', // цвет окантовки при фокусе
      },
    },
    '& .MuiInputLabel-root': {
      color: 'DarkSlateBlue', // цвет надписи
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#808080', // цвет надписи при фокусе
    }
  });

  const  resultState = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();

  const theme = createTheme();
  let userForm = ''
  let password = ''
  const setUserForm = (e) =>{
    userForm = e;
  }

  const setPassword = (e) =>{
    password = e
  }
  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращает стандартное поведение отправки формы
    const request = async () => {
      const req = {
        username: userForm,
        password, 
      }
      await dispatch(loginUserThunk(req));
    }
    request();
  }

  useEffect(() => {
    if (resultState != null && resultState.isAuthenticated === true) {
      dispatch(setUserToLocal.setUserToLocal(resultState))
      GoToPageMain();
    }
  }, [resultState]);

  return (
    <WraperBox>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <DarkTextField
                sx={{

                }}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setUserForm(e.target.value)}
              />
              <DarkTextField
                sx={{ backgroundColor: 'white' }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

    </WraperBox>
  );
}

export default LoginPage
