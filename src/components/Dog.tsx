import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import useLocalStorage from '../effects/useLocalStorage';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Dog = () => {
  const [token, setToken] = useLocalStorage('token', '');
  const { dogId } = useParams();
  const dog: any = useSelector((state: RootState) =>
    state.dogs.dogs.find((dog: any) => dog._id === dogId)
  );
  const loading = useSelector((state: RootState) => state.dogs.loading);
  const error = useSelector((state: RootState) => state.dogs.error);
  const navigate = useNavigate();

  const logout = () => {
    setToken('');
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dog) {
      navigate('/');
  }

  if (token) {
    return <>
      Ви авторизовані<br/>
      <button onClick={logout}>Вийти</button>
      <br/>
      <Link to="/">На головну</Link>
      {dog && (
        <Card sx={{ maxWidth: 345 }}>
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
            <Button size="small">Деталі</Button>
          </CardActions>
        </Card>
      )}
    </>
  } else {
    return <>
      <Link to="/login">Авторизуватися</Link>
    </>
  }
}

export default Dog;