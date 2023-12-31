// types.ts (or any other appropriate file)



export interface StatusResponse {
    success: boolean;
    message: string;
}

export interface LoginMutation {
    sellerAuthTokenCreate: StatusResponse;
}

export interface LoginMutationVariables {
    username: string;
    password: string;
}

export interface RegisterMutation {
    sellerAuthRegister: StatusResponse;
}

export interface RegisterMutationVariables {
    name: string;
    email: string;
    phone: string;
    password: string;
    receiveWhatsAppUpdates: boolean;
}


export interface LoginServiceResponse {
    success: boolean;
    user?: {
        id: string;
        name: string;
        // Add other user fields as needed
    };
    token?: string;
    message?: string;
}

export interface RegisterServiceResponse {
    success: boolean;
    user?: {
        id: string;
        name: string;
        // Add other user fields as needed
    };
    token?: string;
    message?: string;
}