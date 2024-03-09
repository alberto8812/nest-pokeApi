import { Injectable } from '@nestjs/common';
import { HttpAdapter } from "../interface/http-adapter.interface";
import axios, { AxiosInstance } from 'axios';

//debe implementar la interface  seclarada
@Injectable()
export class AxiosAdapter implements HttpAdapter {

    //es un envoltrio del caodigo
    private axios: AxiosInstance=axios;

    async get<T>(url: string): Promise<T> {
        try {
            const {data }=await this.axios.get<T>(url);
            return data
        } catch (error) {
            throw new Error( 'this is an error  -check logs')
        }
    }


}