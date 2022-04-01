/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnvironmentType, Network } from "@verida/client-ts";
import { EventEmitter } from "events";

import { VaultAccount, hasSession } from "@verida/account-web-vault";

import { Profile, Connect } from "../interface";


const VUE_APP_VAULT_CONTEXT_NAME = "Verida: Vault";

export const VERIDA_SESSION = '_verida_auth_context';


const VUE_APP_LOGO_URL =
  "https://assets.verida.io/verida_login_request_logo_170x170.png";

class VeridaHelpers extends EventEmitter {
  public profile: Profile;
  public context: any;
  private account: any;
  public did?: string;
  public connected?: boolean;
  public contextName?: string | any;

  constructor() {
    super();
    this.profile = {
      avatar: {},
      name: "",
      country: "",
    }
  }

  public async connect({ contextName, logo }: Connect): Promise<void> {
    this.account = new VaultAccount({
      request: {
        logoUrl: logo || VUE_APP_LOGO_URL,
      }
    });

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

    if (this.context) {
      this.connected = true;
    }
    this.emit("connected", this.connected);
  }

  public async initProfile(): Promise<void> {
    const client = await this.context.getClient();
    const profile = await client.openPublicProfile(this.did, VUE_APP_VAULT_CONTEXT_NAME);
    const cb = async () => {
      const data = await profile.getMany();
      this.profile = {
        avatar: data.avatar,
        name: data.name,
        country: data.country,
        description: data.description,
        did: this.did

      };
      this.emit("profileChanged", this.profile);
    };
    profile.listen(cb);
    await cb();
  }

  async autoLogin(contextName: string) {
    await this.connect({
      contextName
    })
  }

  hasSession(contextName: string): boolean {
    return hasSession(contextName)
  }

  async logout(): Promise<void> {
    await this.context.getAccount().disconnect(this.contextName);
    this.context = null;
    this.account = null;
    this.connected = false;
    this.profile = {
      avatar: {},
      name: "",
      country: "",
    }
    this.did = "";
  }
}

const VeridaHelper = new VeridaHelpers();

export default VeridaHelper;
