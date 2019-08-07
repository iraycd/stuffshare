let find = require('find');
let fs = require('fs');

let dirname = __dirname + '/src/Front-end/Web/assets/markers'
let files = find.fileSync(/\.png$/, dirname);

let result = files.map(async item => {
  let result = item.replace(dirname, '.').replace(/\\/g, '/');
  let size = result.split('/').length;
  let fileBuff = await fs.readFileSync(result).toString('base64');
  return {
    buff: fileBuff,
    path: result
  }
})

let app = async () => {
  let filesResult = await Promise.all(result);
  let test = filesResult.map(async item => {
    let name = item.path.split('/')[item.path.split('/').length - 1];
    console.log(name)
    let template = await fs.readFileSync(__dirname + '/src/Front-end/Web/assets/markers/template').toString();
    let redTempl =template.replace(/{color}/g, '#ff7c7c')
    redTempl=String(redTempl.replace('{base}', item.buff));

    let blueTempl =template.replace(/{color}/g, '#4DB1CF')
    blueTempl=String(blueTempl.replace('{base}', item.buff));
    let greenTempl =template.replace(/{color}/g, '#979c73')
    greenTempl=String(greenTempl.replace('{base}', item.buff));

    let blackTempl =template.replace(/{color}/g, '#000000')
    blackTempl=String(blackTempl.replace('{base}', item.buff));
    await fs.writeFileSync(__dirname + '/src/Front-end/Web/assets/markers/'+name.split('.')[0]+'-red.svg',redTempl)
    await fs.writeFileSync(__dirname + '/src/Front-end/Web/assets/markers/'+name.split('.')[0]+'-blue.svg',blueTempl)
    await fs.writeFileSync(__dirname + '/src/Front-end/Web/assets/markers/'+name.split('.')[0]+'-green.svg',greenTempl)
    await fs.writeFileSync(__dirname + '/src/Front-end/Web/assets/markers/'+name.split('.')[0]+'-black.svg',blackTempl)

  })

  await Promise.all(test)
  //let name = console.log(filesResult)

}
app()