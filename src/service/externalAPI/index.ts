import axios from 'axios';
import * as querystring from 'querystring';
import appService from '../app';

/* tslint:disable */
const getFacebookAccessTokenURL = (code : string) => `https://graph.facebook.com/v3.0/oauth/access_token?client_id=1934419210183456&redirect_uri=http://localhost:8080/verifyOauth/facebook&client_secret=82279378bdd605af7be2f0a0745c293f&code=${code}`;

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

  public async getLineAccessToken(code : string) {
    try {
      const { data, headers } = await axios.post(
        'https://api.line.me/oauth2/v2.1/token',
        querystring.stringify({
          grant_type: 'authorization_code',
          code,
          client_id: '1590579283',
          client_secret: '306036f74ef670e524592cc8e01ba44d',
          redirect_uri: 'http://localhost:8080/verifyOauth/line'
        }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      );
      // console.log(data, headers);
      return data.access_token;
    } catch(err) {
      console.log('Error when requiring LINE OAUTH ACCESS TOKEN');
    }
  }

  public async getLineProfile(accesToken : string) : Promise<{ displayName : string, pictureUrl : string, userId : string }> {
    const { data } = await axios.get('https://api.line.me/v2/profile', { headers: { 'Authorization': `Bearer ${accesToken}` } });
    return data;
  }

  public async getFacebookAccessToken(code : string) {
    try {
      const { data } = await axios.get(getFacebookAccessTokenURL(code));
      return data.access_token;
    } catch(err) {
      console.log('error getting FB access token', err.response.data);
    }
  }

  public async getFacebookProfile(accessToken : string) {
    const { data } = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`);
    return data;
  }
}

const externalApi = new ExternalApi();

export default externalApi;
