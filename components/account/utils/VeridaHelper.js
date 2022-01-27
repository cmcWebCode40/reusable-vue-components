/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentType, Network } from "@verida/client-ts";
import { EventEmitter } from "events";
import store from 'store'
import { hasSession, VaultAccount } from "@verida/account-web-vault";


const VUE_APP_VAULT_CONTEXT_NAME = "Verida: Vault";

const CONTEXT_NAME_IN_LOCAL_STORAGE = 'AppContext'

const VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER = "https://db.testnet.verida.io:5002/";

const VUE_APP_LOGO_URL = "https://assets.verida.io/verida_login_request_logo_170x170.png";


class VeridaHelpers extends EventEmitter {
  client = {};
  profile = {};
  context = {};
  account = {};
  did = "";
  connected = false;
  contextName = '';


  constructor() {
    super()
    this.contextName = store.get(CONTEXT_NAME_IN_LOCAL_STORAGE)
  }

  async connect({ contextName, logo }) {
    this.account = new VaultAccount({
      defaultDatabaseServer: {
        type: "VeridaDatabase",
        endpointUri: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
      },
      defaultMessageServer: {
        type: "VeridaMessage",
        endpointUri: VUE_APP_VERIDA_TESTNET_DEFAULT_SERVER,
      },
      vaultConfig: {
        request: {
          logoUrl: logo || VUE_APP_LOGO_URL,
        },
      },
    });

    if (!this.contextName) {
      this.contextName = contextName
      store.set(CONTEXT_NAME_IN_LOCAL_STORAGE, contextName)
    }

    this.context = await Network.connect({
      client: {
        environment: EnvironmentType.TESTNET,
      },
      account: this.account,
      context: {
        name: contextName,
      },
    });

    this.did = await this.account.did();

    await this.initProfile();

    if (this.context) {
      this.connected = true;
    }
    this.emit("connected", this.connected);
  }

  async initProfile() {
    const client = await this.context.getClient();
    const profile = await client.openProfile(this.did, "Verida: Vault");
    const cb = async () => {
      const data = await profile.getMany();
      this.profile = data
      this.emit("profileChanged", this.profile);
    };
    profile.listen(cb);
    await cb();
  }

  autoLogin() {
    return hasSession(this.contextName);
  }

  async getProfile(did) {
    const profileInstance = await this.client.openProfile(
      did,
      VUE_APP_VAULT_CONTEXT_NAME,
      "basicProfile"
    );

    if (profileInstance) {
      this.profile = await profileInstance.getMany({}, {});
      if (this.profile) {
        this.profile.did = did;
      }
    }
    return true;
  }

  async logout() {
    await this.context.getAccount().disconnect(this.contextName);
    this.context = null;
    this.account = null;
    this.connected = false;
    this.did = "";
    store.remove(CONTEXT_NAME_IN_LOCAL_STORAGE)
  }
}

const VeridaHelper = new VeridaHelpers();

export default VeridaHelper;
