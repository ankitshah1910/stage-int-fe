import axios from 'axios';

const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default server;
