export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Proxy request received:', {
      method: req.method,
      headers: req.headers,
      url: req.url
    });

    // Get the raw body as a buffer
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks);

    console.log('Body size:', body.length);

    // Forward the request to the external API
    const response = await fetch("http://106.51.226.42:9010/extract", {
      method: "POST",
      headers: {
        // Forward content-type and other relevant headers
        ...(req.headers['content-type'] && { 'content-type': req.headers['content-type'] }),
      },
      body: body,
    });

    console.log('External API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`External API error: ${response.status} - ${errorText}`);
      return res.status(response.status).json({ 
        error: 'External API error',
        status: response.status,
        message: errorText
      });
    }

    const data = await response.json();
    console.log('External API success, returning data');
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Disable body parsing to handle raw request body
export const config = {
  api: {
    bodyParser: false,
  },
};