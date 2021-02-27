import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";

export const getMyCart = () => ({ type: "GET_MY_CART" })
export const getMyCartRequest = () => ({ type: "GET_MY_CART_REQUEST" })
export const getMyCartSuccess = payload => ({ type: "GET_MY_CART_SUCCESS", payload })
export const getMyCartFailed = error => ({ type: "GET_MY_CART_FAILED", error })

export function* getMyCartSaga() {
    yield put(getMyCartRequest())
    try {
        let { data: payload } = yield call(axios,"/me/cart")
        yield put(getMyCartSuccess(payload))
    } catch(err){
        yield put(getMyCartFailed(err))
    }
}

export default function* meSageWatcher() {
    yield takeEvery("GET_MY_CART", getMyCartSaga)
}