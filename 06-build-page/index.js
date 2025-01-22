const fs = require('fs');
const path = require('path');

function read_file(file) {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file, { encoding: "utf-8" });
  
      let data = "";
  
      stream.on("data", (chunk) => (data += chunk));
      stream.on("end", () => resolve(data));
      stream.on("error", (error) => reject(error));
    });
  }
  function copyDir(source, dirname) {
    const sourceDir = path.join(__dirname, source);
    const destinationDir = path.join(__dirname, dirname);
  
    fs.mkdir(destinationDir, { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
  
      fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error('Ошибка при чтении директории:', err);
          return;
        }
  
        for (let file of files) {
          const sourcePath = path.join(sourceDir, file.name);
          const destinationPath = path.join(destinationDir, file.name);
  
          if (file.isDirectory()) {
            // Рекурсивно копируем вложенные директории
            copyDir(path.join(source, file.name), path.join(dirname, file.name));
          } else {
            // Копируем файлы
            fs.copyFile(sourcePath, destinationPath, (err) => {
              if (err) {
                console.error(`Ошибка при копировании файла ${file.name}:`, err);
                return;
              }
            });
          }
        }
      });
    });
  }
  



function copy_style(){
    fs.readdir(`${__dirname}\\styles`, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error('Ошибка при чтении директории:', err);
          return;
        }
        const stream2 = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), {
                 
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
              
             
                stream2.write(data);
          });
      
          }
        }
        
      });
}

  (async () => {
    try {
const stream = fs.createReadStream(path.join(__dirname, 'template.html'), { encoding: "utf-8" });
const componentsDir = path.join(__dirname, 'components');
const componentFiles = await fs.promises.readdir(componentsDir, { withFileTypes: true });
let data = "";



stream.on("data", (chunk) => (data += chunk));

stream.on("end", async() => {
  
  for (const file of componentFiles) {
    if (file.isFile() && path.extname(file.name) === '.html') {
      
      const componentName = path.basename(file.name, '.html');
      const componentPath = path.join(componentsDir, file.name);
      const componentContent = await read_file(componentPath)
      data = data.replace(`{{${componentName}}}`, componentContent);
      
     
    }
  }
    
    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        const stream1 = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'), {
         
            encoding: 'utf-8',
          });
        
            stream1.write(data);
          
            copy_style()  
            copyDir('assets', 'project-dist\\assets')
    })


});

} catch (error) {
    console.error("Ошибка при чтении файлов:", error);
  }
})();




