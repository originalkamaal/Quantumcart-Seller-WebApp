// authService.ts

import { showToast } from '../../../helpers/utils';
import client from '../../../helpers/graphql';
import { LoginMutation, LoginMutationVariables, LoginServiceResponse, RegisterMutation, RegisterMutationVariables, RegisterServiceResponse } from './types';
import { LOGIN_MUTATION, REGISTER_MUTATION } from './qgl';

export const loginUserService = async ({ username, password }: LoginMutationVariables): Promise<LoginServiceResponse> => {
  try {
    const response = await client.mutate<LoginMutation, LoginMutationVariables>({
      mutation: LOGIN_MUTATION,
      variables: { username, password },
    });

    const { message, success } = response.data!.sellerAuthTokenCreate;

    if (success) {
      showToast('Logged in successfully', 'success');
      return { success: true, message: "Logged in successfully" };
    } else {
      showToast(message ?? 'Authentication failed', 'error');
      return { success: false };
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('An error occurred during login:', error);
    return { success: false, message: "An error occurred during login:" };
  }
};


export const registerUserService = async ({ name, email, phone, password, receiveWhatsAppUpdates }: RegisterMutationVariables): Promise<RegisterServiceResponse> => {
  try {
    const { data } = await client.mutate<RegisterMutation, RegisterMutationVariables>({
      mutation: REGISTER_MUTATION,
      variables: { name, email, phone, password, receiveWhatsAppUpdates },
    });

    const { success, message } = data!.sellerAuthRegister;

    if (success) {
      showToast('User registered successfully', 'success');
      return { success: true };
    } else {
      showToast(message ?? 'Something went wrong', 'error');
      return { success: false, message: message ?? 'Something went wrong' };
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('An error occurred during registration:', error);
    return { success: false, message: 'An error occurred during registration' };
  }
};
