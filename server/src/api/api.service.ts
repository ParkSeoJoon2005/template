import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { truncateSync } from 'fs';
import authByKeyDTO from 'src/dto/authByKey-transfer-dto';
import loginDTO from 'src/dto/login-transfer-dto';

@Injectable()
export class ApiService {
  logIp(ip: string): void {
    console.log(` {
        msg: 'Success',
        ipAddress: ${ip},
    }`);
  }

  loginAuth(data: loginDTO): Boolean {
    if (data.id === 'admin' && data.password === '1234') {
      return true;
    } else {
      console.log(`Login Failed : ${data.id} & ${data.password}`);
      return false;
    }
  }

  authUser(key:authByKeyDTO){
    return new Promise((resolve,rejects)=>{
      if(key.key === 1000) {
        resolve(true)
      } else {
        rejects("Key is not valid")
      }
    })
  }
}
