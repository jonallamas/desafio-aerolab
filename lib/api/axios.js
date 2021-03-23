import axios from 'axios'

export default axios.create({
    baseURL: 'https://coding-challenge-api.aerolab.co',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQyOTQ3MTdlNzE4NzAwMjBlMzhmNDQiLCJpYXQiOjE2MTQ5NzYxMTN9.125Y6919aG8n-jjvqNnqdI69RtURTB2-mpFiG4EPyoE`
    }
})