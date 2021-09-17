const express = require('express');
const cors = require('cors');

const helper = require('./caloriesCount');

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

app.post('/api/search', async (req, res) => {
    const { ingredients } = req.body;

    try {
        const totalCalories = await helper.getIngredientsCalories(ingredients);
        res.status(200).send({
            calories: totalCalories
        });
    } catch (err) {
        console.log(err);
        res.status(400).send('Something went wrong...');
    }
});

app.get('*', (req, res) => {
    res.status(403).send('Forbidden Access');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API Server listening on port: ${PORT}`);
});