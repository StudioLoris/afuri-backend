const OAUTH_PROVIDER = {
  FACEBOOK: 'facebook',
};

class OauthService {

  constructor() {
  }

  public async validate(provider : string, token : string) {
    switch(provider) {
      case OAUTH_PROVIDER.FACEBOOK:
        /* Check Facebook token here */
        return true;
      default:
        return false;
    }
  }

}

const service = new OauthService();

export default service;
