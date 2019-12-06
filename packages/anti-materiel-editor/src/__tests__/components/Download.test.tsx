import React from 'react';
import { Download } from '../../components/Download/Download';
import { shallow } from 'enzyme';

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

    expect(href).toBe(
      'data:text/json;charset=utf-8,%7B%22foo%22%3A%22bar%22%7D',
    );
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
