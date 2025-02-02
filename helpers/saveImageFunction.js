const fs = require('fs');
const path = require('path');
const sharp = require('sharp');



const saveImage = async (base64Data, _id, type) => {
  const matches = base64Data.match(/^data:image\/([a-zA-Z]*);base64,/);
  if (!matches || matches.length !== 2) {
    throw new Error('Invalid image data');
  }
  
  const ext = matches[1];
  const imageBuffer = Buffer.from(base64Data.replace(/^data:image\/[a-zA-Z]*;base64,/, ''), 'base64');

  const uploadDir = getUploadDirectory(type);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${_id}.webp`;
  const filePath = path.join(uploadDir, fileName);

  await sharp(imageBuffer)
    .toFormat('webp')
    .toFile(filePath);

  return fileName;
};




/**
 * Devuelve el directorio de carga basado en el tipo de imagen.
 * @param {string} type - El tipo de imagen.
 * @returns {string} - El directorio de carga.
 * @throws {Error} - Si el tipo de imagen no es soportado.
 */
const getUploadDirectory = (type) => {
    switch (type) {
       case "user-img":
        return path.join('./', 'assets', 'user-img');
       case "message-img":
        return path.join('./', 'assets','message-img');      
      default:
        throw new Error(`Unsupported image type: ${type} in helpers\saveImageFunction.js`);
      }
  };
  




module.exports = {
  saveImage
};
