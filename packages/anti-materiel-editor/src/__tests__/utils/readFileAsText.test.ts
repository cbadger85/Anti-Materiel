import { readFileAsText } from '../../utils/readFileAsText';

describe('readFileAsText', () => {
  it('should read a file', async () => {
    const file = new File([JSON.stringify(['text'])], 'filename.json', {
      type: 'application.json',
    });

    expect.assertions(1);

    const text = await readFileAsText(file);

    expect(text).toBe(JSON.stringify(['text']));
  });
});
