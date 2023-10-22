import { promises as fs } from 'fs';
import path from 'path';
import { createThumb, imageThumb } from '../resize-image';

describe('Test resize image function', (): void => {
  it('error when invalid with', async () => {
    const error: null | string = await createThumb({
      filename: 'bridge',
      width: '-30',
      height: '30'
    });
    expect(error).not.toBeNull();
  });

  it('error when fileName not exist', async () => {
    const error: null | string = await createThumb({
      filename: 'abc',
      width: '30',
      height: '30'
    });
    expect(error).not.toBeNull();
  });

  it('success resize image', async () => {
    await createThumb({ filename: 'bridge', width: '200', height: '200' });

    const resizeImage: string = path.resolve(imageThumb, `bridge-200x200.jpg`);
    let errorFile: null | string = '';

    try {
      await fs.access(resizeImage);
      errorFile = null;
    } catch {
      errorFile = 'Error file';
    }

    expect(errorFile).toBeNull();
  });
});
