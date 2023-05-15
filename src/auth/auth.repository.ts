import { Repository } from "typeorm";
// import { User } from "./auth.entity";
import { CustomRepository } from "src/typeorm/typeorm.decorator";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./auth.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialDto:AuthCredentialDto) : Promise<{accessToken:string}> {
        const {username, email,accessToken} = authCredentialDto;
        const user = this.create({username,email})

        try {
            await this.save(user)
            return {accessToken}
        } catch (error) {
        
            if(error.code === "ER_DUP_ENTRY"){
                throw new ConflictException('existing user')
            }else{
                throw new InternalServerErrorException()
            }
        }
       
    }
}