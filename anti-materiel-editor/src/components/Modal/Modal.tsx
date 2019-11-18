import React from 'react';
import FocusLock from 'react-focus-lock';
import { animated, useTransition } from 'react-spring';
import ReactDOM from 'react-dom';
import './Modal.scss';

export const Modal: React.FC<ModalProps> = ({ children, isShown }) => {
  const transition = useTransition(isShown, null, {
    from: { opacity: 0, transform: 'translate3d(0, -2rem, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, 2rem, 0)' },
  });

  return ReactDOM.createPortal(
    <div>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={{ opacity: props.opacity }}
              className="modal"
              id="modal"
            >
              <FocusLock>
                <animated.div style={props} className="modal-card">
                  {children}
                </animated.div>
              </FocusLock>
            </animated.div>
          ),
      )}
    </div>,
    document.getElementById('modal-root') as Element,
  );
};
interface ModalProps {
  isShown?: boolean;
}
