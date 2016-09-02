import 'babel-polyfill';
import { sleep } from './common';

class Login {

	start() {
		(async () => {
			console.log('start');
			await sleep(2000);
			console.log('This page is login');
			console.log('end');
		})();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const login = new Login();
	login.start();
});

