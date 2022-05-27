const express = require('express');
const path = require('path');
const Main = require('./models/main');
const bp = require('body-parser');

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
app.use(bp.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.post('/save', async (req, res) => {
  console.log(req.body);
  await Main.findOne({where: {
    date: req.body.date,
    time: req.body.time,
  }})
  .then((obj) => {
    if(obj) {
      obj.update({
        keyword: req.body.keyword,
        category: req.body.category,
        situation: req.body.situation,
        process: req.body.process,
      });
    } else {
      Main.create({
        keyword: req.body.keyword,
        category: req.body.category,
        situation: req.body.situation,
        process: req.body.process,
        date: req.body.date,
        time: req.body.time,
      });
    }
    res.send('ok');
  })
})

app.listen(app.get('port'), () => {
  console.log('3001번 포트에서 대기 중');
});