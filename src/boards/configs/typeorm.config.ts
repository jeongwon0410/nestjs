import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type:'mysql',
    host:'192.168.0.6',
    port:3306,
    username:'root',
    password:'1234',
    database:'test',
    entities:[__dirname+'/../**/*.entity.{js,ts}'],
    synchronize:true

}