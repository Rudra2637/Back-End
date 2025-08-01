/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer'
import qr from 'qr-image'
import fs from 'fs'

const answers = await inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter the URL you want to convert to QR code:',
    },
  ])
//   console.log(answers)
  .then((answers) => {
    // Use user feedback for... whatever!!
    const qr_svg = qr.image(answers.url,{type:'png'})
    qr_svg.pipe(fs.createWriteStream('qr_code.png'))
    fs.writeFileSync('user_input.txt', answers.url, 'utf8');
    console.log('QR code generated and saved as qr_code.png');})
    
  .catch((error) => {
    console.log("Error in generating QR code:", error);
  });