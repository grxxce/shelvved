<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login to account
                    </h1>
                    <form @submit.prevent="Login" class="space-y-4 md:space-y-6" action="#" novalidate>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="" v-model="email">
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="" v-model="password">
                        </div>

                        <div class="inline-flex items-center justify-center w-full">
                            <hr class="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700">
                            <span
                                class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
                        </div>

                        <div class="inline-flex items-center justify-center w-full">
                            <button v-on:click="signInWithGoogle" type="button"
                                class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                                <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab"
                                    data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 488 512">
                                    <path fill="currentColor"
                                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                                    </path>
                                </svg>
                                Sign in with Google
                            </button>
                        </div>


                        <!-- <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div> 
                    </div> -->

                    </form>
                    <button v-on:click="signIn" type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                        in</button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don't have an account? <a href="/register"
                            class="font-medium underline text-primary-600 hover:underline dark:text-primary-500">Sign Up</a>
                    </p>

                    <div v-if="errMsg"
                        class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        {{ errMsg }}
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from "vue";
import { getAuth, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useRouter } from 'vue-router';

export default {
    setup() {
        console.log("setting up")
        const router = useRouter();
        const email = ref("");
        const password = ref("");
        const auth = getAuth();
        let errMsg = ref("");

        const signIn = () => {
            console.log("trying to sign in")
            if (email.value) {

                signInWithEmailAndPassword(auth, email.value, password.value)
                    .then((data) => {
                        console.log("successfully signed in!");
                        console.log(data)
                        router.push('/library')
                    })
                    .catch((error) => {
                        console.log(error.code)
                        switch (error.code) {
                            case "auth/wrong-password":
                                errMsg.value = "Incorrect password";
                                break;
                            case "auth/invalid-email":
                                errMsg.value = "Invalid email";
                                break;
                            case "auth/user-not-found":
                                errMsg.value = "No account with this email was found";
                                break;
                            default:
                                errMsg.value = "Email or password was incorrect";
                                break;
                        }
                    })
            }
        }

        const signInWithGoogle = () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
            .then((result) => {
                console.log("noice, trying to redirect")
                console.log(result.user)
                router.push("/library")
            })
            .catch((error) => {
                // handle error
                console.log("oop found an error")
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log("error code: ", errorCode)
                console.log("error message: ", errorMessage)
                // console.log("email: ", email)
                console.log("credentials: ",credential)
            })
        }
        // console.log(email.value)
        // console.log(signIn())
        return {
            signInWithGoogle,
            signIn,
            email,
            password,
            errMsg
        }
    }
}

    // const signInWithGoogle = () =>{

    // }
</script>
