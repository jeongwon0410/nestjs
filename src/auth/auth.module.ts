import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmCustomModule } from 'src/typeorm/typeorm.module';
import { UserRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config'
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

const jwtConfig = config.get('jwt')
@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions:{
        expiresIn:jwtConfig.expiresIn
      }
    }),
    TypeOrmCustomModule.forCustomRepository([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy,JwtStrategy],
  exports: [GoogleStrategy,PassportModule,JwtStrategy]
})
export class AuthModule {}
