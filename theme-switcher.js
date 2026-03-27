const fs = require('fs');
const path = require('path');

const directories = ['app', 'components'];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

directories.forEach(dir => {
  walkDir(dir, function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Global Replacements
      content = content.replace(/bg-dark-900/g, 'bg-slate-50');
      content = content.replace(/bg-dark-800/g, 'bg-white');
      content = content.replace(/bg-dark-700/g, 'bg-slate-100');
      content = content.replace(/from-dark-900/g, 'from-slate-50');
      content = content.replace(/to-dark-900/g, 'to-slate-50');
      content = content.replace(/via-dark-900/g, 'via-slate-50');
      content = content.replace(/from-dark-800/g, 'from-white');
      content = content.replace(/to-dark-800/g, 'to-white');
      
      // Text colors
      content = content.replace(/text-white/g, 'text-slate-900');
      content = content.replace(/text-gray-200/g, 'text-slate-800');
      content = content.replace(/text-gray-300/g, 'text-slate-700');
      content = content.replace(/text-gray-400/g, 'text-slate-600');
      content = content.replace(/text-gray-500/g, 'text-slate-500');
      
      // Borders
      content = content.replace(/border-white\/10/g, 'border-slate-200');
      content = content.replace(/border-white\/20/g, 'border-slate-300');
      content = content.replace(/hover:border-white\/20/g, 'hover:border-slate-300');
      
      // Background opacities
      content = content.replace(/bg-white\/5/g, 'bg-slate-100');
      content = content.replace(/bg-white\/10/g, 'bg-slate-200');
      content = content.replace(/hover:bg-white\/10/g, 'hover:bg-slate-200');
      content = content.replace(/bg-black\/80/g, 'bg-white\/90');
      
      // Special classes
      content = content.replace(/hover:text-white/g, 'hover:text-slate-900');
      
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
});

console.log('Replacements completed.');
