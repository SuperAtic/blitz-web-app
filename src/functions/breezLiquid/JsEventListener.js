export class JsEventListener {
  constructor(callback) {
    this.callback = callback;
  }

  onEvent = (event) => {
    this.callback("EVENT RECEIVED", JSON.stringify(event));
  };
}
