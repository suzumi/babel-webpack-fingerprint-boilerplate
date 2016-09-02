import 'babel-polyfill';
import { sleep } from './common';

class MyPage {

	async start() {
		console.log('start');
		await sleep(2000);
		console.log('This page is mypage');
		console.log('end');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const myPage = new MyPage();
	myPage.start();
});

