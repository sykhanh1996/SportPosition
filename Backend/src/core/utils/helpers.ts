import { DataStoredInToken, TokenData } from '@core/interfaces';
import crypto from 'crypto';


export const isEmptyObject = (obj: any): boolean => {
    return !Object.keys(obj).length;
};

export const randomTokenString = (): string => {
    return crypto.randomBytes(40).toString('hex');
};
