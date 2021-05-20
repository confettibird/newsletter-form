class Signup {
  constructor(submitWrapper, options) {
    const urlParams = new URLSearchParams(window.location.search);
    let email = urlParams.get("email");
    if (!email) {
      email = "";
      this.had_email = false;
    } else {
      options.selectRandom();
      this.had_email = true;
    }

    this.wrapper = submitWrapper;
    this.options = options;
    this.wrapper.innerHTML = `
        <input type="text" value="${email}" class="form-email-input form-submit-format" placeholder="Enter your email">
        <button class="form-submit-btn form-submit-format">Subscribe</button>
        <span class="opt-out-container">
            <input type="checkbox" id="opt-out" name="opt-out">
            <label for="opt-out">I do not want to receive information about future newsletters.</label>
        </span>
    `;
    const error = document.querySelector(".error-msg");

    this.submitBtn = this.wrapper.querySelector(".form-submit-btn");
    let submitCount = 0;
    this.submitBtn.addEventListener("click", () => {
      //if email valid, submit form
      if (this.validate()) {
        if (submitCount === 0) {
          this.submitBtn.disabled = true;
          setTimeout(() => {
            this.submitBtn.disabled = false;
            error.innerHTML = `An error has occurred. Please try again.`;
            error.style.display = "block";
          }, 2000);
        } else {
          this.submit();
          error.style.display = "none";
        }

        submitCount += 1;
      }
    });
    //grab opt-out checkbox
    this.checkBox = this.wrapper.querySelector("#opt-out");
    this.checkBox.addEventListener("click", (e) => {
      if (e.target.checked) {
        //if opt-out checked, deselect all newsletters
        this.options.reset();
      }
    });
    //grab email input
    this.input = this.wrapper.querySelector(".form-email-input");
  }
  //validate email
  validate() {
    if (validateEmail(this.input.value)) {
      return true;
    } else {
      alert("Invalid email");
      return false;
    }
  }
  //submit data
  async submit() {
    try {
      const response = await fetch("/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          email: this.input.value,
          newsletters: this.options.options
            .filter((option) => {
              return option.data.selected;
            })
            .map((option) => option.data.id),
          optOut: this.checkBox.checked,
        }),
      });
      const data = await response.json();
      this.options.wrapper.innerHTML = "";
      this.wrapper.innerHTML = "";
      const header = document.querySelector(".form-heading");
      header.querySelector(".heading").innerHTML = "Thank you!";
      let message = "";
      if (this.checkBox.checked && this.had_email) {
        message = "You've been unsubscribed";
      } else if (!this.checkBox.checkBox && !this.had_email) {
        message = "You have been subscribed";
      } else {
        message = "Your preferences have been updated";
      }
      header.querySelector(".subheading").innerHTML = message;
    } catch (error) {
      console.log(error);
      alert("There was an error, please try again");
    }
  }
}

//regex email validator
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default Signup;
