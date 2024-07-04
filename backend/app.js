const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/product', (req, res) => {
    // Put my code here
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})