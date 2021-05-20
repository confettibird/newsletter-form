import Option from "./option";
import items from "../data";

class Options {
  constructor(optionsWrapper) {
    this.wrapper = optionsWrapper;
    this.options = [];
    //loop through options
    for (let item of items) {
      let option = new Option(item);
      this.wrapper.appendChild(option.row);
      this.options.push(option);
    }
  }

  // deselect all newsletters
  reset() {
    for (let option of this.options) {
      option.deselect();
    }
  }
  
  //randomly select newsletters if user is previously subscribed
  selectRandom() {
    this.options.forEach((option) => {
        if(Math.random() > 0.5){
            option.select()
        } else{
            option.deselect()
        }
    })
  }
}

export default Options;
