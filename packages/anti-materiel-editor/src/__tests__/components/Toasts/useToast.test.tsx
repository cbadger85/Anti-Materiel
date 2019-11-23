import { mount } from "enzyme";
import React from "react";
import { Button } from "../../../components/Button/Button";
import { Toast } from "../../../components/Toasts/Toast";
import { ToastProvider } from "../../../components/Toasts/ToastProvider";
import { useToast } from "../../../components/Toasts/useToast";

const Dummy: React.FC = () => {
  const makeToast = useToast();

  return <Button onClick={() => makeToast("test")} />;
};

describe("useToast", () => {
  const wrapper = mount(
    <ToastProvider>
      <Dummy />
    </ToastProvider>
  );

  it("should make a toast when makeToast is called", () => {
    wrapper.find(Button).simulate("click");

    const toast = wrapper.find(Toast);

    expect(toast).toHaveLength(1);
  });
});
