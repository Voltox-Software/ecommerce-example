import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";

export const postUsers = ({ first_name, last_name, email, password }) => ({ type: "POST_USERS", first_name, last_name, email, password })
export const postUsersRequest = () => ({ type: "POST_USERS_REQUEST" })
export const postUsersSuccess = payload => ({ type: "POST_USERS_SUCCESS", payload })
export const postUsersFailed = error => ({ type: "POST_USERS_FAILED", error })


export function* postUsersSaga({ 
    first_name, last_name, email, password
}) {
    yield put(postUsersRequest())
    try {
        let { data: payload } = 
            yield call(axios,{ data: { first_name, last_name, email, password }, url: "/users", method: "post" })
        yield put(postUsersSuccess(payload))
    } catch(err){
        yield put(postUsersFailed(err))
    }
}

export default function* usersSagaWatcher() {
    yield takeEvery("POST_USERS", postUsersSaga)
}