import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
	apiKey: 'AIzaSyCYoK0fppiYMuXRV5cJjY6VcUEIB5XteY4',
	authDomain: 'sk-info.firebaseapp.com',
	databaseURL: 'https://sk-info.firebaseio.com',
	projectId: 'sk-info',
	storageBucket: 'sk-info.appspot.com',
	messagingSenderId: '969568619126',
	appId: '1:969568619126:web:5b31150b7db3a259'
}
firebase.initializeApp(config)
export const db = firebase.firestore()
