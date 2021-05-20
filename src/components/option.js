class Option {
  constructor(data) {
    this.data = data;
    this.row = document.createElement("div");
    this.row.classList.add("form-option-row");
    this.row.innerHTML = `
            <div class="option-items">
                <div class="option-img"></div>
            </div>
            <div class="option-items option-text">
                <h2 class="option-title">${this.data.title}</h2>
                <p class="option-body">${this.data.body}</p>
            </div>
            <div class="option-items">
                <div class="option-check-box"></div>
            </div>
        `;
    this.checkBox = this.row.querySelector(".option-check-box");
    this.row.addEventListener("click", () => {
      this.toggle();
    });
  }
  //toggle option
  toggle() {
    if (this.checkBox.classList.contains("option-selected")) {
      this.deselect();
    } else {
      this.select();
    }
  }

  //select option
  select() {
    this.checkBox.classList.add("option-selected");
    this.checkBox.innerHTML = '<i class = "fa fa-check"></i>';
    this.data.selected = true;
  }

  //deselect option
  deselect() {
    this.checkBox.classList.remove("option-selected");
    this.checkBox.innerHTML = "";
    this.data.selected = false;
  }
}
export default Option;
