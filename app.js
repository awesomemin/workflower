const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3001);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(app.get('port'), () => {
  console.log('3001번 포트에서 대기 중');
});