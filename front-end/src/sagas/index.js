import { all } from "redux-saga/effects"
import authSagaWatcher from "./components/auth/auth-saga"
import productsSagaWatcher from "./components/products/products-saga"
import meSagaWatcher from "./components/me/me-saga"
import usersSagaWatcher from "./components/users/users-saga"

export default function* rootSaga() {
    yield all([
        authSagaWatcher(),
        productsSagaWatcher(),
        meSagaWatcher(),
        usersSagaWatcher()
    ])
}