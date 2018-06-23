import externalAPI from '../externalAPI';

const OAUTH_PROVIDER = {
  FACEBOOK: 'facebook',
};

class OauthService {

  constructor() {
  }

  public async validate(provider : string, token : string, oauthId : string) {
    switch(provider) {
      case OAUTH_PROVIDER.FACEBOOK:
        /* Check Facebook token here */
        const tokenInfo = await externalAPI.getFbTokenDebugInfo(token);
        if (tokenInfo.data.is_valid &&
            tokenInfo.data.user_id === oauthId) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }

}

const service = new OauthService();

export default service;
