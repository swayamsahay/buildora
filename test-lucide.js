
const lucide = require('lucide-react');
if (lucide.ArrowRight) {
  console.log('ArrowRight is exported');
} else {
  console.log('ArrowRight is NOT exported');
  console.log('Available exports:', Object.keys(lucide).filter(k => k.includes('Arrow')));
}
