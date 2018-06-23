import axios from 'axios';
import appService from '../app';

interface FacebokTokenInfo {
  // app_id : string;
  // type : string;
  // application : string;
  // expires_at : number;
  is_valid? : boolean;
  // scopes : Array<string>;
  user_id? : string;
}

const request = axios.create();

class ExternalApi {

  private FB_APP_TOKEN_REP : string;

  constructor() {
    this.FB_APP_TOKEN_REP = `${appService.FB_APP_ID}|${appService.FB_APP_SECRET}`;
  }

  public async getFbTokenDebugInfo(userToken : string) : Promise<FacebokTokenInfo> {
    try {
      const res = await request.get('https://graph.facebook.com/debug_token', {
        params: {
          input_token: userToken,
          access_token: this.FB_APP_TOKEN_REP
        }
      });
      return res.data.data;
    } catch (err) {
      return {};
    }
  }
}

const externalApi = new ExternalApi();

export default externalApi;
