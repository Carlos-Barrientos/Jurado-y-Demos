import fs from 'fs';
const file = 'src/data/store.js';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\.catch\(\(\) => \{\}\)/g, ".catch(e => { console.error('FIREBASE ERROR:', e); alert('Error al guardar en la nube: ' + e.message); })");
fs.writeFileSync(file, content);
console.log('Patch applied.');
