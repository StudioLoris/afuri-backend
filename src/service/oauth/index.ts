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
        const {is_valid, user_id} = await externalAPI.getFbTokenDebugInfo(token);
        return is_valid && (user_id === oauthId);
      default:
        return false;
    }
  }

}

const service = new OauthService();

export default service;
