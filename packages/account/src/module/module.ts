/*eslint-disable*/

import VeridaHelper from "@/helpers/VeridaHelper";

// Toast mutations
const INI_USER = "vda/INIT_USER";


type Actions = {
    commit: any;
    payload: any
}

// initial state
const state = {
    user: {},
    context: {}

};

// mutations
const mutations = {
    [INI_USER](state: { user: any[] }, profile: any) {
        state.user = profile;
    },
};

const actions = {
    initUser: (
        { commit }: Actions,
        { payload }: Actions
    ) => {
        console.log('From Store', VeridaHelper.context);
        commit(INI_USER, payload);
    },

};

const getters = {
    getUser(state: { items: any }) {
        return state.items;
    },
    getContext(state: { items: any }) {
        return state.items;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
