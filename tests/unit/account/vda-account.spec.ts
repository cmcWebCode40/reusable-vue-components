global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import { shallowMount } from "@vue/test-utils";
import VdaAccount from "../../../components/account/src/lib-components/vda-account.vue";

//https://github.com/vuejs/vue-jest/issues/389

const componentProps = {
    onLogout: () => jest.fn(),
    onError: () => jest.fn(),
    onSuccessLogin: () => jest.fn(),
    contextName: 'Account component',
}

describe("VdaAccount.vue", () => {

    it("renders component correctly without error", () => {
        const wrapper = shallowMount(VdaAccount, {
            props: {
                ...componentProps
            },
        });
        const button = wrapper.find('button')

        expect(button.text()).toContain('Login with Verida');

        expect(wrapper.props().contextName).toBe('Account component');
    });

    it("Connect with vault  correctly", async () => {
        const wrapper = shallowMount(VdaAccount, {
            props: {
                ...componentProps
            },
        });

        const box = wrapper.find(".loading");


        const button = wrapper.find('button');

        await button.trigger('click');

        expect(wrapper.vm.connected).toBe(true)

        expect(box.exists()).toBe(false)
    });
    it("When connect Vault throws an error", async () => {
        const wrapper = shallowMount(VdaAccount, {
            props: {
                ...componentProps
            },
        });

        const button = wrapper.find('button');

        const errorDiv = wrapper.find('.error');

        await button.trigger('click');

        expect(wrapper.vm.connected).toBe(false)

        expect(errorDiv.exists()).toBe(false)
    });
});
