export default function handler(req, res) {
  res.status(200).json({ 
    message: 'API proxy is working!',
    method: req.method,
    timestamp: new Date().toISOString(),
    headers: req.headers
  });
}