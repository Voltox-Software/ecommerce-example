import { all } from "redux-saga/effects"
import authSagaWatcher from "./components/auth/auth-saga"

export default function* rootSaga() {
    yield all([
        authSagaWatcher(),
    ])
}