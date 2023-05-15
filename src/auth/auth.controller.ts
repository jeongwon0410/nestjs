import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './auth.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    // @Post('/signup')
    // signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto) : Promise<void>{

    //     return this.authService.singUp(authCredentialDto)
    // }

    // @Post('/signin')
    // signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto): Promise<{accessToken:string}> {
    //     return this.authService.signIn(authCredentialDto)
    // }

    @Get('/test')
    @UseGuards(AuthGuard('google'))
    test(@GetUser() user:User){
        console.log(user)
    }

    @Get('/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@GetUser() authCredentialDto:AuthCredentialDto) : Promise<{accessToken:string}>{
        return this.authService.googleLogin(authCredentialDto)
    }

}
