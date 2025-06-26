// pages/api/nextjs-model-info.js
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const modelInfo = {
      scale: "1.0",
      face_count: 412,
      created_by: "Paul Bourke, March 2012",
    };

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(modelInfo);
  } catch (error) {
    console.error('Error in nextjs-model-info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}