import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { Modal } from '../../components/Modal/Modal';

describe('<Modal />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  // add a div with #modal-root id to the global body
  //@ts-ignore
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  //@ts-ignore
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  afterEach(() => {
    wrapper.unmount();
  });

  it('should not show the modal if isShown is false', () => {
    wrapper = mount(<Modal />);

    const modal = wrapper.find('#modal');

    expect(modal).toHaveLength(0);
  });

  it('should show the modal if isShown is true', () => {
    wrapper = mount(<Modal isShown />);

    const modal = wrapper.find('#modal');

    expect(modal.length).toBeTruthy();
  });

  it('should call onClickOutside when the background is clicked', () => {
    const onClickOutside = jest.fn();
    wrapper = mount(<Modal isShown onClickOutside={onClickOutside} />);

    wrapper
      .find('.modal')
      .hostNodes()
      .simulate('click');

    expect(onClickOutside).toBeCalled();
  });

  it('should render its children', () => {
    const Dummy = () => <div />;
    wrapper = mount(
      <Modal isShown>
        <Dummy />
      </Modal>,
    );

    const children = wrapper.find(Dummy);

    expect(children).toHaveLength(1);
  });
});
