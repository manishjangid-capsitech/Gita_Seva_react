/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-X7PVO5zQIDQHY33-bPqDYKrAk18tsF4",
  authDomain: "my-test-166410.firebaseapp.com",
  databaseURL: "https://my-test-166410.firebaseio.com",
  projectId: "my-test-166410",
  storageBucket: "my-test-166410.appspot.com",
  messagingSenderId: "1020144171538",
  appId: "291301805425699",
  domainname: "https://api.gitaseva.org/v1",
  indiaId: "a1776bcc572c0730d7577d55",
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;