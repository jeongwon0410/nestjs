import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: "69834496048-7f41nf7eug5aqefl3e1fr91js0dqgcq2.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: 'http://localhost:3001/auth/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos, id } = profile
    const user = {
        id:id,
        email: emails[0].value,
        username: name.givenName
    }
    done(null, user);
  }
}

