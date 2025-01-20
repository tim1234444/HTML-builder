const fs = require('fs');
const path = require('path');


fs.readdir(`${__dirname}\\styles`, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Ошибка при чтении директории:', err);
    return;
  }
  const stream1 = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), {
           
    encoding: 'utf-8',
  });
  for (let file of files) {
    if (file.isFile() && path.extname(file.name).substring(1) == 'css') {
      const filePath = path.join(__dirname, 'styles', file.name);

      const stream = fs.createReadStream(filePath, {
        encoding: 'utf-8',
      });

      let data = '';

      stream.on('data', (chunk) => (data += chunk));
      stream.on('end', () => {
        
       
          stream1.write(data);
    });

    }
  }
  
});

