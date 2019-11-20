import {
  ToastActionTypes,
  AddToastAction,
  RemoveToastAction,
  Toast,
} from '../../../components/Toasts/toastsTypes';
import {
  addToast,
  removeToast,
  toastReducer,
} from '../../../components/Toasts/toastReducer';

const mockedToast = {
  text: 'test',
  color: 'info',
  id: '1234',
  duration: 700,
};

jest.mock('../../../components/Toasts/createToast.ts', () => ({
  createToast: jest.fn(() => mockedToast),
}));

describe('toastReducer', () => {
  describe('addToast', () => {
    it('should create an addToast action', () => {
      const toastAction = addToast('test');

      const expectedToastAction = {
        type: ToastActionTypes.ADD_TOAST,
        payload: { text: 'test', color: 'info', id: '1234', duration: 700 },
      };

      expect(toastAction).toEqual(expectedToastAction);
    });
  });

  describe('removeToast', () => {
    it('should create a removeToast action', () => {
      const toastAction = removeToast('1234');

      const expectedToastAction = {
        type: ToastActionTypes.REMOVE_TOAST,
        payload: { id: '1234' },
      };

      expect(toastAction).toEqual(expectedToastAction);
    });
  });

  describe('toastReducer', () => {
    it('should add a toast when called with a addToast action', () => {
      const addToastAction: AddToastAction = {
        type: ToastActionTypes.ADD_TOAST,
        payload: {
          text: 'test',
          color: 'info',
          id: '1234',
          duration: 700,
        },
      };

      const state = toastReducer([], addToastAction);

      const expectedState = [
        { text: 'test', color: 'info', id: '1234', duration: 700 },
      ];

      expect(state).toEqual(expectedState);
    });
  });

  it('should remove a toast when called with a removeToast action', () => {
    const removeToastAction: RemoveToastAction = {
      type: ToastActionTypes.REMOVE_TOAST,
      payload: { id: '1234' },
    };

    const prevState: Toast[] = [
      { text: 'test', color: 'info', id: '1234', duration: 700 },
    ];

    const state = toastReducer(prevState, removeToastAction);

    const expectedState: Toast[] = [];

    expect(state).toEqual(expectedState);
  });
});
