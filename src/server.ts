import app from './app';

const port = 3000;

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});