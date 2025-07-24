import dotenv from 'dotenv';
import { HevyClient } from './domain/usecases/HevyClient';
import { AxiosHttpClient } from './plugins/axios.plugin';

dotenv.config();

const apiKey = process.env.API_KEY || '';

(async () => {
    const httpClient = new AxiosHttpClient(apiKey);
    const hevy = new HevyClient(httpClient);
    const workouts = await hevy.getWorkouts();
    console.log(workouts);
})();
