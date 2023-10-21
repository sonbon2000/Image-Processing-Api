// Lib import
const fs = require('fs');
const path = require('node:path');
const sharp = require('sharp');

// File import
import { ResizeImageParam } from './type';
import { ImageParam } from './type';

const fsp = fs.promises;
const imageFull = path.resolve(__dirname, '../assets/images/full');
const imageThumb = path.resolve(__dirname, '../assets/images/thumb');

/**
 * Get Image function
 */
export const getImagePath = async (params: ImageParam) => {
  if (!params.filename) {
    return;
  }

  // Get file pathName
  const filePath: string =
    params.width && params.height
      ? path.resolve(
          imageThumb,
          `${params.filename}-${params.width}x${params.height}.jpg`
        )
      : path.resolve(imageFull, `${params.filename}.jpg`);

  try {
    await fsp.access(filePath);
    return filePath;
  } catch {
    return;
  }
};

/**
 * Create Thumb path when start server
 */
export const createThumbPath = async () => {
  try {
    await fsp.access(imageThumb);
  } catch {
    fsp.mkdir(imageThumb);
  }
};

export const createThumb = async (params: ImageParam) => {
  if (!params.filename || !params.width || !params.height) {
    return;
  }

  const filePathFull = path.resolve(imageFull, `${params.filename}.jpg`);
  const filePathThumb = path.resolve(
    imageThumb,
    `${params.filename}-${params.width}x${params.height}.jpg`
  );

  return await resizeImage({
    sourceFile: filePathFull,
    targetFile: filePathThumb,
    imageWith: parseInt(params.width),
    imageHeight: parseInt(params.height)
  });
};

/**
 * Resize image function
 */
export const resizeImage = async (params: ResizeImageParam) => {
  try {
    await sharp(params.sourceFile)
      .resize(params.imageWith, params.imageHeight)
      .toFormat('jpeg')
      .toFile(params.targetFile);
    return;
  } catch {
    return 'Image cannot be process...';
  }
};
