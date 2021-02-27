import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";

export const getProducts = () => ({ type: "GET_PRODUCTS" })
export const getProductsRequest = () => ({ type: "GET_PRODUCTS_REQUEST" })
export const getProductsSuccess = payload => ({ type: "GET_PRODUCTS_SUCCESS", payload })
export const getProductsFailed = error => ({ type: "GET_PRODUCTS_FAILED", error })

export function* getProductsSaga() {
    yield put(getProductsRequest())
    try {
        let { data: payload } = 
            yield call(axios,"/products")
        yield put(getProductsSuccess(payload)) 
    } catch(err){
        yield put(getProductsFailed(err))
    }
}

export default function* productsSagaWatcher() {
    yield takeEvery("GET_PRODUCTS", getProductsSaga)
}