import {
	getAuth,
	signInWithPopup,
	GithubAuthProvider,
	GoogleAuthProvider,
} from 'firebase/auth';
import { auth as fbAuth } from '../firebase/config'
import { usePromise } from '../components/PromiseHandle';

const SignInWithProvider = async ( providerName, auth=fbAuth ) => {
	/**
	  *	Required parameter: 
	  * 	providerName (only accepts "GitHub" or "Google").
	  *		
	  * Return:
	  *		{token: token, user: user, credential: credential}
	  */

	let provider = undefined;
	let providerOpt = providerName.toLowerCase() === "github" ? 0 : providerName.toLowerCase() === "google" ? 1 : -1;

	if (providerOpt === 0) {
		provider = new GithubAuthProvider();
		
	} else if (providerOpt === 1) {
		provider = new GoogleAuthProvider();
	} 
	
	if (providerOpt < 0 || !provider) 
	throw new Error( "Provider " + providerName + " not supported at the moment!" );
	
	let credential = undefined;
	const [result, error] = await usePromise(signInWithPopup(auth, provider));
	if (error) {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData.email;
		// The AuthCredential type that was used.
		if (providerOpt === 0) {
			credential = GithubAuthProvider.credentialFromError(error);
		} else {
			credential = GoogleAuthProvider.credentialFromError(error);
		}
		console.log("ErrCode: " + errorCode + "\n" + errorMessage + 
					"EmailUsed: " + email + "\n" +
					"Cred: " + credential);
		throw error;
	}

	if (providerOpt === 0) {
		credential = GithubAuthProvider.credentialFromResult(result);
	} else if (providerOpt === 1) {
		credential = GoogleAuthProvider.credentialFromResult(result);
	}

	const token = credential.accessToken;
	// The signed-in user info.
	const user = result.user;
	// IdP data available using getAdditionalUserInfo(result)
	// ...

	return {token: token, user: user, credential: credential};
}

export default SignInWithProvider;