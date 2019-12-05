import React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { mount, shallow } from 'enzyme';

describe('<ErrorBoundary />', () => {
  it('should set the error to state if an error is thrown', () => {
    const Dummy = () => <span />;

    const wrapper = shallow(
      <ErrorBoundary>
        <Dummy />
      </ErrorBoundary>,
    );

    const error = new Error('error');

    wrapper.find(Dummy).simulateError(error);

    expect(wrapper.state()).toEqual({ error });
  });

  it('should render the error component if error', () => {
    const Dummy = () => <span />;

    const wrapper = shallow(
      <ErrorBoundary>
        <Dummy />
      </ErrorBoundary>,
    );

    const error = new Error('error');

    wrapper.find(Dummy).simulateError(error);

    const errorComponent = wrapper.find('.error-boundary').hostNodes();

    expect(errorComponent.exists()).toBe(true);
  });

  it('should render the children if no error', () => {
    const Dummy = () => <span />;

    const wrapper = shallow(
      <ErrorBoundary>
        <Dummy />
      </ErrorBoundary>,
    );

    const dummy = wrapper.find(Dummy);

    expect(dummy.exists()).toBe(true);
  });
});
