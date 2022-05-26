const express = require('express');
const path = require('path');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3001);

sequelize.sync({force: false})
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(app.get('port'), () => {
  console.log('3001번 포트에서 대기 중');
});