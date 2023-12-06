import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';


const app = express();
app.use(cors());
const externalApiUrl = 'https://reactcase.unalmustafa.com/Order/List';
app.use('/api', createProxyMiddleware({ target: 'https://reactcase.unalmustafa.com/Order/List', changeOrigin: true }));


app.get('/make-request', async (req: Request, res: Response) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`${externalApiUrl}?Page=${page}`); 
        res.send( response.data.data);
    } catch (error) {
        console.error('Error making the request:');
        res.status(500).send('Server Error');
    }
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});
