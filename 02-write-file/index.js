const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('Введите данные \n');
const stream = fs.createWriteStream(path.join(__dirname, '02-write-file.txt'), {
  flags: 'a',
  encoding: 'utf-8',
});

process.on('exit', () => stdout.write('Good luck learning Node.js! \n'));
process.on('SIGINT', () => {
  process.exit();
});

stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    process.exit();
  }
  stream.write(data);
});
