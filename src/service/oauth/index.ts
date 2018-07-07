import externalAPI from '../externalAPI';

const OAUTH_PROVIDER = {
  FACEBOOK: 'facebook',
  LINE: 'line',
};

interface UserProfile {
  id : string;
  name : string;
  picture : string;
  email : string;
}

class OauthService {

  constructor() {
  }

  public async validate(provider : string, token : string, oauthId : string) : Promise<boolean> {
    switch(provider) {
      case OAUTH_PROVIDER.FACEBOOK:
        /* Check Facebook token here */
        const {is_valid, user_id} = await externalAPI.getFbTokenDebugInfo(token);
        return is_valid && (user_id === oauthId);
      default:
        return false;
    }
  }

  public async getAccessToken(provider : string, code : string) : Promise<string> {
    switch(provider) {
      case OAUTH_PROVIDER.LINE:
        return externalAPI.getLineAccessToken(code);
      case OAUTH_PROVIDER.FACEBOOK:
        const data = await externalAPI.getFacebookAccessToken(code);
        return data;
    }
  }

  public async getUserProfile(provider : string, accessToken : string) : Promise<UserProfile> {
    switch(provider) {
      case OAUTH_PROVIDER.FACEBOOK:
        const { id, name, email } = await externalAPI.getFacebookProfile(accessToken);
        return { id, name, email, picture: '' };
      case OAUTH_PROVIDER.LINE:
        const { displayName, pictureUrl, userId } = await externalAPI.getLineProfile(accessToken);
        return {
          name: displayName,
          picture: pictureUrl,
          id: userId,
          email: 'line@line.me', // hard-coded line email for now
        };
    }
  }
}

const service = new OauthService();

export default service;
