export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create a new request to forward to the external API
    const response = await fetch("http://106.51.226.42:9010/extract", {
      method: "POST",
      headers: {
        // Forward content-type and other relevant headers
        ...(req.headers['content-type'] && { 'content-type': req.headers['content-type'] }),
        ...(req.headers['content-length'] && { 'content-length': req.headers['content-length'] }),
      },
      body: req.body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    });
  }
}

// Disable body parsing to handle raw request body
export const config = {
  api: {
    bodyParser: false,
  },
};