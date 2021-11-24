import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiService } from './api.service';

import ipDTO from '../dto/ip-transfer-dto';
import loginDTO from '../dto/login-transfer-dto';
import authByKeyDTO from 'src/dto/authByKey-transfer-dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('/getIp')
  // @HttpCode(204)
  getIp(@Body() ipBody: ipDTO): object {
    if (typeof ipBody.ip === 'string') {
      this.apiService.logIp(ipBody.ip);
      return {
        msg: 'Ip Request Succeed',
        currentIp: ipBody.ip,
      };
    } else {
      console.log(`Fail + ${ipBody}`);

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Ip Request Failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/login')
  loginAuth(@Body() loginData: loginDTO): object {
    const result = this.apiService.loginAuth(loginData);
    if (result) {
      return {
        status: true,
        userInfo: 'admin',
        key: 1000,
      };
    } else {
      return {
        status: false,
      };
    }
  }

  @Post('/authUser')
  getUserInfo(@Body() key: authByKeyDTO): object | void {
    return this.apiService
      .authUser(key)
      .then((data) => {
        console.log(data);
        const resData = { key: key.key, userName: key.userName, isValid: true };
        return resData;
      })
      .catch((err) => {
        console.log(err);
        const resData = { key: null, userName: null, isValid: false };
        return resData;
      });
  }
}
