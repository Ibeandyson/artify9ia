const Validator = require('validator');
const isEmpty = require('is-empty');
const {default: validator} = require('validator');

module.exports = validateRegistration = () => {
    //Setting errors
    let errors = {};

    // converting empty firlds to an string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.frist_name = !isEmpty(data.frist_name) ? data.frist_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.state = !isEmpty(data.state) ? data.state : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    //username check
    if (Validator.isEmpty(data.username)) {
        errors.username = 'user name field is empty';
    }

    //first name check
    if (Validator.isEmpty(data.frist_name)) {
        errors.frist_name = 'first name field is empty';
    }
    //last name check
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = 'last name field is empty';
    }
    //phone check
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'phone field is empty';
    }
    //addres check
    if (Validator.isEmpty(data.address)) {
        errors.address = 'addres field is empty';
    }
    //last name check
    if (Validator.isEmpty(data.state)) {
        errors.state = 'state field is empty';
    }

    //username check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'email field is empty';
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'invalid email';
    }

    // password check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'password field is empty';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'comfirm password field is required';
    }
    if (!Validator.isLength(data.password, {min: 8, max: 30})) {
        errors.password = 'password must be least 8 characters';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password = 'passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
