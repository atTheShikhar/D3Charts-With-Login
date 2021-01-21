import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validate = (username,password,props) => {
    toast.configure();
    if(username === "" || password === "") {
        toast.warn("Please enter both Username and Password!",{position: toast.POSITION.TOP_CENTER});
    }
    else if (username === "John" && password === "12345") {
        props.authentication.onAuthentication();
        props.history.push('/column-chart')
        toast.success("Welcome John");
    } else if (username === "MICKY" && password === "98765") {
        props.authentication.onAuthentication();
        props.history.push('/pie-chart');
        toast.success("Welcome MICKY");
    } else {
        toast.error('Invalid Username or Password!',{position: toast.POSITION.TOP_CENTER});
        //props.history.push('/')
    }
}
export default validate;