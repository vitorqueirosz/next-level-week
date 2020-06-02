import express from 'express';

const app = express();


app.get('/users', (req, res) => {
    res.json([
        'Vitor',
        'Tie',
        'Tie 2',
        'Tie 3',
        'Tie 4',
    ])
})

app.listen(3333, () => {
    console.log('Running!')
});

