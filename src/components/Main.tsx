import axios from "axios";
import useLocalStorage from "../effects/useLocalStorage"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setDogs, setLoading, setError } from '../store/dogSlice';

const Main = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dogs, loading, error } = useSelector((state: any) => state.dogs);

  const logout = () => {
    setToken('');
  }

  const getDogs = () => {
    if (!token) {
      return;
    }
    dispatch(setLoading(true)); // ми передаємо action, який повертаємо з action creator'а `setLoading`
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response => {
      dispatch(setDogs(response.data));
      console.log(response.data);
    }).catch(error => {
      // ми переадресуємо користувача на сторінку авторизації (припускаючи що причиною помилки є застарілий чи зламаний токен)
      logout();
      navigate('/login');
    }).finally(() => {
      dispatch(setLoading(false));
    });
  }

  useEffect(getDogs, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (token) {
    return <>
      Ви авторизовані<br/>
      <button onClick={logout}>Вийти</button>
      <br/>
      {dogs.map(dog => {
        return <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={dog.image}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {dog.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Колір: {dog.color}<br/>
              Порода: {dog.breed}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/${dog._id}`}>Деталі</Link>
          </CardActions>
        </Card>;
      })}
    </>
  } else {
    return <>
      <Link to="/login">Авторизуватися</Link>
    </>
  }
}

export default Main
