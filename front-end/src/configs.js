
let hostname = window.location.host.split(":")[0]

let baseURL;

if (hostname === "localhost") {
    baseURL = "http://localhost:4848/api/v1"
} else {
    baseURL = "http://3.15.153.64:4000/"
}
export const baseURL = "http://localhost:4848/api/v1"
