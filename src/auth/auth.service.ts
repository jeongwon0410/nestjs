import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.entity';
import { authenticate } from 'passport';

@Injectable()
export class AuthService {
    constructor(
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){}


    // async singUp(authCredentialDto:AuthCredentialDto) : Promise<void> {
    //     return await this.userRepository.createUser(authCredentialDto)
    // }

    // async signIn(authCredentialDto: AuthCredentialDto) : Promise<{accessToken:string}> {
    //     const {username, password} = authCredentialDto

    //     const user = await this.userRepository.findOne({where:{username}})

    //     if(user && (await bcrypt.compare(password,user.password))){
    //         const payload = {username}
    //         const accessToken = await this.jwtService.sign(payload)
    //         return {accessToken}
    //     }else{
    //         throw new UnauthorizedException('login failed')
    //     }
    // }

    async googleLogin(authCredentialDto:AuthCredentialDto) : Promise<{accessToken:string}> {

        if (!authCredentialDto) {
            throw new UnauthorizedException('no google user')
        }else{
            const {username,email} = authCredentialDto
            const  admin = await this.userRepository.findOne({where:{email}})
            if(admin){
                const payload = {email}
                const accessToken = await this.jwtService.sign(payload)
                return {accessToken}
            }else{
                await this.userRepository.createUser(authCredentialDto)
                const payload = {email}
                const accessToken = await this.jwtService.sign(payload)
                return {accessToken}
                
             
            }
            
        }

      }

}
