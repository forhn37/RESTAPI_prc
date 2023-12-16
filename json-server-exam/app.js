const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json());

// 간단한 라우트
app.get('/', async (req, res) => {
  try {
    // db.json 파일에서 데이터 읽기
    const data = await fs.readFile('./public/db.json');
    const jsonData = JSON.parse(data);

    res.json(jsonData);
  } catch (error) {
    console.error('Error reading data from db.json:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/data', async (req, res) => {
  try {
    // db.json 파일에서 데이터 읽기
    const data = await fs.readFile('db.json', 'utf-8');
    const jsonData = JSON.parse(data);

    // 새로운 데이터 추가
    const newData = req.body;
    jsonData.push(newData);

    // db.json 파일에 데이터 쓰기
    await fs.writeFile('db.json', JSON.stringify(jsonData, null, 2));

    res.json(jsonData);
  } catch (error) {
    console.error('Error writing data to db.json:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
