const math = require('mathjs');

exports.calculate = (req, res) => {
  try {
    const { expression } = req.body;
    
    if (!expression) {
      return res.status(400).json({ error: 'Expression is required' });
    }

    // Basic safety check to prevent malicious code injection
    if (/[a-zA-Z`'"\\]/.test(expression)) {
      return res.status(400).json({ error: 'Invalid characters in expression' });
    }

    const result = math.evaluate(expression);
    res.json({ result });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(400).json({ error: 'Invalid mathematical expression' });
  }
};