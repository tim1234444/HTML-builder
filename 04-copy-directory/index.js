const fs = require('fs');
const path = require('path');
function copyDir(dirname) {
  fs.rm(path.join(__dirname, dirname), { recursive: true, force: true }, (err) => {
    if (err) {
      return console.error('Ошибка при удалении директории:', err);
    }
  fs.mkdir(path.join(__dirname, dirname), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    fs.readdir(`${__dirname}\\files`, (err, files) => {
      if (err) {
        console.error('Ошибка при чтении директории:', err);
        return;
      }
      for (let file of files) {
        const sourcePath = path.join(__dirname, 'files', file);
        const destinationPath = path.join(__dirname, dirname, file);

        fs.copyFile(sourcePath, destinationPath, (err) => {
          if (err) {
            console.error(`Ошибка при копировании файла ${file}:`, err);
            return;
          }
        });
      }
    });
  });
}
  )}
copyDir('files-copy')
