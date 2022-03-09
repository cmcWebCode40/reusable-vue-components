
import { shallowMount } from "@vue/test-utils";
import { VdaLogin } from "../../../components/account/src/lib-components/index";

//https://github.com/vuejs/vue-jest/issues/389

const componentProps = {
    onLogout: () => jest.fn(),
    onError: () => jest.fn(),
    onSuccessLogin: () => jest.fn(),
    contextName: 'Account component',
}


describe("VdaLogin.vue", () => {
    it.skip("renders component correctly without error", () => {
        const wrapper = shallowMount(VdaLogin, {
            props: {
                ...componentProps
            },
        });

        const button = wrapper.find('p');

        expect(button.text()).toContain('Use the button below to connect with Verida Vault');

        expect(wrapper.props().contextName).toBe('Account component');
    });
});
