
const yup = require("yup");

let isEmailValid = email => {
 let parts = email.split("@").filter(x => x)
 if (parts.length !== 2) return false
 let second_part_parts  = parts[1].split(".").filter(x => x)
 if (second_part_parts.length === 1) return false
 return true
}

module.exports = {
    email: yup.string().test(val => !val || isEmailValid(val)),
    password: yup.string().min(8),
    positive_integer_as_string: yup.string().test("is-integer", val => !val || !isNaN(Number(val))),
    param_id: yup.string()
        .test(val => val === undefined || !isNaN(Number(val)))
        .test(val => val === undefined || Number(val) > 0),
    id: yup.number().integer().positive()

}
