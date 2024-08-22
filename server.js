const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'dist')));

// 모든 요청을 index.html로 라우팅 (SPA를 위해)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8601;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
