export const MAIN_REQUEST = 'MAIN_REQUEST';

export interface MainRequest {
    type: typeof MAIN_REQUEST;
    sportPositon: {
        name: string;
        position: string;
    }
}

export interface MainState{
    mainInfor: MainRequest | null;
    loading: boolean;
    error: string | null;
}

export type MainActionTypes =
  | MainRequest;
