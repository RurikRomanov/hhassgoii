import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

let minersOnline = 25;

function generateBlockData(id: string) {
  return {
    id,
    difficulty: `${Math.floor(Math.random() * 10 + 180)}.${Math.floor(Math.random() * 9)}K`,
    reward: Math.floor(Math.random() * 100 + 950),
    timestamp: new Date().toISOString()
  };
}

app.get('/api/hashgo-data', (req, res) => {
  minersOnline += Math.floor(Math.random() * 5) - 2; // Случайное изменение числа майнеров
  minersOnline = Math.max(0, Math.min(minersOnline, 100)); // Ограничиваем число майнеров от 0 до 100

  const currentBlock = generateBlockData(`${Math.floor(186 + Math.random() * 5)}.${Math.floor(Math.random() * 9)}K`);
  
  const history = Array.from({length: 5}, (_, i) => 
    generateBlockData(`${Math.floor(181 + i + Math.random() * 3)}.${Math.floor(Math.random() * 9)}K`)
  );

  const data = {
    minersOnline,
    currentBlock,
    shares: Math.floor(Math.random() * 100),
    history
  };

  res.json(data);
});

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});

