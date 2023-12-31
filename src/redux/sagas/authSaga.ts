import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  registerUserSuccess,
  loginUserSuccess,
  loginUserFailure,
  registerUserFailure,
  resetRedirectToLogin,
} from "../slices/authSlice";
import {
  loginUserService,
  registerUserService,
} from "../services/auth/auth_services";
import { LoginResponse, OnboardingProgressResponse, RegisterResponse } from "../../types";
import { showToast } from "../../helpers/utils";

function* registerUserSaga(action: any) {
  try {
    const { payload } = action;
    const response: RegisterResponse = yield call(registerUserService, {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      receiveWhatsAppUpdates: payload.receiveWhatsAppUpdates,
    });
    if (response.success) {
      yield put(registerUserSuccess({ ...response }));
    } else {
      yield put(registerUserFailure());
    }
  } catch (error: any) {
    yield call(showToast, error ?? "Something went wrong", "error");
    console.error(error);
    yield put(loginUserFailure());
  }
}

function* loginUserSaga({ payload }: any) {
  try {
    const response: LoginResponse = yield call(loginUserService, {
      username: payload.username,
      password: payload.password,
    });

    if (response.success) {
      yield put(loginUserSuccess(response));
    } else {
      yield put(loginUserFailure());
    }
  } catch (error) {
    console.error(error);

    yield put(loginUserFailure());
  }
}
function* authSaga() {
  yield takeEvery("auth/registerUserStart", registerUserSaga);
  yield takeEvery("auth/loginUserStart", loginUserSaga);
}

export default authSaga;
