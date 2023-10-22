// Lib import
const fs = require('fs');
const path = require('node:path');
const sharp = require('sharp');

// File import
import { ResizeImageParam } from './type';
import { ImageParam } from './type';

const fsp = fs.promises;
export const imageFull = path.resolve(__dirname, '../assets/images/full');
export const imageThumb = path.resolve(__dirname, '../assets/images/thumb');

/**
 * Get Image function
 */
export const getImagePath = async (params: ImageParam) => {
  if (!params.filename) {
    return null;
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
    return null;
  }
};

/**
 * Check if an image is available.
 */
export const isImageAvailable = async (fileName: string = '') => {
  if (!fileName) {
    return false;
  }
  const getAvailable = getAvailableImageNames();
  return (await getAvailable).includes(fileName);
};

/**
 * Retrieve available image names.
 */
export const getAvailableImageNames = async () => {
  try {
    return (await fsp.readdir(imageFull)).map(
      (fileName: string): string => fileName.split('.')[0]
    );
  } catch {
    return [];
  }
};

/**
 * Check if thumb is available
 */
export const isThumbAvailable = async (params: ImageParam) => {
  if (!params.filename || !params.width || !params.height) {
    return false;
  }

  const filePath = path.resolve(
    imageThumb,
    `${params.filename}-${params.width}x${params.height}.jpg`
  );

  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
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

/**
 * Create thumb image
 */
export const createThumb = async (params: ImageParam) => {
  if (!params.filename || !params.width || !params.height) {
    return null;
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
 * Check validate path
 */
export const validateFilePath = async (query: ImageParam) => {
  // Check existence with and height
  if (!query.width && !query.height) {
    return null;
  }

  // Check valid filename query param
  if (!(await isImageAvailable(query.filename))) {
    return `Please provide a suitable 'filename' query param`;
  }

  // Check valid with query param
  const width = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return "Please provide a suitable 'with' query param";
  }

  // Check valid height query param
  const height = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return "Please provide a suitable 'height' query param";
  }
  return null;
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
    return null;
  } catch {
    return 'Image cannot be process...';
  }
};
