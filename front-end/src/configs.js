
let hostname = window.location.host.split(":")[0]

let url;

if (hostname === "localhost") {
    url = "http://localhost:4848/api/v1"
} else {
    url = "http://3.142.96.246:4848/"
}
export const baseURL = url

// mysql://gjergjk71:gjergji.123@ec2-18-216-25-193.us-east-2.compute.amazonaws.com:3306/v_checkout
// mysql://rxen8ekcio14bznd:clzef1ivs4ltj4ks@jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/koolnd23w3mhnmtg