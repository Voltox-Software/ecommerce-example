import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoggedInOnly from "../components/LoggedInOnly";
import NotLoggedInOnly from "../components/NotLoggedInOnly";

let only_logged_in = [
    { path: "/", Component: lazy(() => import('./Home')) },
    { path: "/home", Component: lazy(() => import('./Home')) },
    { path: "/my_cart", Component: lazy(() => import('./MyCart')) },
    { path: "/logout", Component: lazy(() => import('./Logout')) }
]

let only_not_logged_in = [
    { path: "/login", Component: lazy(() => import('./Login')) },
    { path: "/register", Component: lazy(() => import('./Register')) },
    // { path: "/register", Component: lazy(() => import('./Register')) },
]

export default routes_props => {
    return (
        <Suspense fallback={""}>
            {
                only_logged_in.map(({path, Component},i) => (
                        <Route key={i} exact path={path} component={props => {
                            return (
                                <LoggedInOnly redirect_to="/login">
                                    <Component getCartItemsCount={routes_props.getCartItemsCount} {...props}/>
                                </LoggedInOnly>
                            )
                        }} />
                ))
            }
            {
                only_not_logged_in.map(({path, Component},i) => (
                        <Route key={i} exact path={path} component={props => {
                            return (
                                <NotLoggedInOnly redirect_to="/">
                                    <Component {...props}/>
                                </NotLoggedInOnly>
                            )
                        }} />
                ))
            }
        </Suspense>
    )
}