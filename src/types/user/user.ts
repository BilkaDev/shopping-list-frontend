export interface messageResponse {
    message: string;
}

export type RegisterUserResponse = { id: string; email: string };

export type ChangePasswordResponse = messageResponse
export type RecoverPasswordResponse = ChangePasswordResponse;
export type AddAvatarResponse = ChangePasswordResponse;

export type RecoverPasswordRequest = {
    email: string;
};
export type ChangePasswordRequest = {
    pwd: string;
    newPwd: string;
};
