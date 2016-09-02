import 'babel-polyfill';
import { sleep } from './common';

class MyPage {

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
	const myPage = new MyPage();
	myPage.start();
});

