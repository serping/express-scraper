const fs = require('fs-extra');


const sourceDir = './node_modules/header-generator/data_files'; 

const targetDir = 'dist/data_files';  

fs.copy(sourceDir, targetDir, (err) => {
  if (err) {
    console.error('Error copying directory:', err);
  } else {
    console.log('Directory copied successfully!');
  }
});

 