export default class Logger {
	constructor(options) {
		// this.options = options;
	}

	onLoad() {
		// const { path, dir } = this.options;
		
	}

  info (...args) {
    console.log(...args);
  }

  error(...args) {
    console.log(...args);
  }
}
