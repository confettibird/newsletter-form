import "./style/main.scss";
import "normalize.css";
import Options from "./components/options";
import Signup from "./components/signup";


const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get("email");

const optionsWrapper = document.querySelector(".form-option-row-wrapper");
const options = new Options(optionsWrapper);

const submitWrapper =  document.querySelector(".form-submission-container");
const signup = new Signup(submitWrapper, options);
