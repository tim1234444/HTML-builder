const fs = require('fs');
const path = require('path');
fs.readdir(`${__dirname}\\secret-folder` , {withFileTypes: true}, (err, files) => { 
    if (err) {
        console.error("Ошибка при чтении директории:", err);
        return;
    }
    for (let file of files) {
        if (file.isFile()){
            const filePath = path.join(__dirname, 'secret-folder', file.name);
            fs.stat(filePath, (err, stats) => {
                console.log(` ${file.name} - ${path.extname(file.name).substring(1)} - ${(stats.size / 1024).toFixed(2)} KB`);
                
              });
      
       
        }
    }
});
