import MyAccount from './Account.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Example/Account',
    component: MyAccount,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        logo: "",
        contextName: "",
    },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { MyAccount },
    template: '<my-account  v-bind="$props" />',
});

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Default.args = {
    logo: "Verida: Account Component",
    contextName: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    onError: () => { },
    onSuccess: () => { },
    onLogout: () => { }
};
