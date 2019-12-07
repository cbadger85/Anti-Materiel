import { shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Button } from '../../components/Button/Button';
import { Upload } from '../../components/Upload/Upload';
import * as util from '../../utils/readFileAsText';

jest.mock('../../utils/readFileAsText', () => {
  return {
    readFileAsText: jest
      .fn()
      .mockResolvedValueOnce(`["bar"]`)
      .mockResolvedValueOnce(`["bar"]`)
      .mockRejectedValueOnce(`["bar"]`)
      .mockResolvedValue('foo'),
  };
});

describe('<Upload />', () => {
  it('should not have a file loaded when mounted', async () => {
    const onLoad = jest.fn();
    const onError = jest.fn();

    const wrapper = shallow(<Upload onLoad={onLoad} onError={onError} />);

    const fileName = wrapper.find('.upload__filename--none-specified');
    const loadButton = wrapper.find('.upload__load-button');

    expect(fileName.exists()).toBe(true);
    expect(loadButton.props().disabled).toBe(true);
  });

  it('should load the file into state', async () => {
    const onLoad = jest.fn();
    const onError = jest.fn();

    const wrapper = shallow(<Upload onLoad={onLoad} onError={onError} />);

    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: { files: [new File(['file'], 'foo')] },
      });
    });

    const fileName = wrapper.find('.upload__filename');

    expect(fileName.text()).toContain('foo');
  });

  it('should call onLoad when the load button is clicked', async () => {
    const onLoad = jest.fn();
    const onError = jest.fn();

    const wrapper = shallow(<Upload onLoad={onLoad} onError={onError} />);

    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: { files: [new File(['file'], 'foo')] },
      });
    });

    await act(async () => {
      wrapper
        .find(Button)
        .last()
        .simulate('click');
    });

    expect(onLoad).toBeCalledWith(['bar']);
  });

  it('should call onError if the file fails to load', async () => {
    const onLoad = jest.fn();
    const onError = jest.fn();

    const wrapper = shallow(<Upload onLoad={onLoad} onError={onError} />);

    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: { files: [new File(['file'], 'foo')] },
      });
    });

    await act(async () => {
      wrapper
        .find(Button)
        .last()
        .simulate('click');
    });

    expect(onError).toBeCalled();
  });

  it('should call onError if the json is invalid', async () => {
    const onLoad = jest.fn();
    const onError = jest.fn();

    const wrapper = shallow(<Upload onLoad={onLoad} onError={onError} />);

    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: { files: [new File(['file'], 'foo')] },
      });
    });

    await act(async () => {
      wrapper
        .find(Button)
        .last()
        .simulate('click');
    });

    expect(onError).toBeCalled();
  });

  it('should reset the filename to blank after loading', async () => {
    const onLoad = jest.fn();
    const onError = jest.fn();

    const wrapper = shallow(<Upload onLoad={onLoad} onError={onError} />);

    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: { files: [new File(['file'], 'foo')] },
      });
    });

    await act(async () => {
      wrapper
        .find(Button)
        .last()
        .simulate('click');
    });

    const fileName = wrapper.find('.upload__filename--none-specified');
    const loadButton = wrapper.find('.upload__load-button');

    expect(fileName.exists()).toBe(true);
    expect(loadButton.props().disabled).toBe(true);
  });
});
