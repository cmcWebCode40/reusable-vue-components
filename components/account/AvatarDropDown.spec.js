import { shallowMount } from "@vue/test-utils";
import Account from "./Account.vue";

describe("AvatarDropDown.vue", () => {
  it("renders all components props when passed", () => {

    const logo = "logo";
    const onError = async () => jest.fn();
    const contextName = "onError";
    const onSuccess = async () => jest.fn();

    const wrapper = shallowMount(Account, {
      props: { logo, contextName, onError, onSuccess },
    });
    expect(wrapper.element);
  });
});