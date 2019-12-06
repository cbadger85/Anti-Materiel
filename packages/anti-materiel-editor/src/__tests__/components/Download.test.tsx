import React from 'react';
import { Download } from '../../components/Download/Download';
import { shallow } from 'enzyme';

beforeAll(() => {
  delete window.URL;

  //@ts-ignore
  window.URL = {
    createObjectURL: jest.fn(() => 'url'),
    revokeObjectURL: jest.fn(),
  };
});

describe('<Download />', () => {
  it('should convert the data to json and put it in the href attribute', () => {
    const data = {
      foo: 'bar',
    };

    const filename = 'data';

    const wrapper = shallow(<Download data={data} filename={filename} />);

    const href = wrapper
      .find('a')
      .hostNodes()
      .props().href;

    expect(href).toBe('url');
  });

  it('should convert the data to json and put it in the href attribute', () => {
    const data = {
      foo: 'bar',
    };

    const filename = 'data';

    const wrapper = shallow(<Download data={data} filename={filename} />);

    const download = wrapper
      .find('a')
      .hostNodes()
      .props().download;

    expect(download).toBe(`${filename}.json`);
  });
});
