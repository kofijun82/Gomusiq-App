import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn();

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	return (
		<Button
			onClick={signInWithGoogle}
			variant="secondary"
			className="flex items-center justify-center w-full sm:w-auto text-white border-zinc-200 h-11 gap-2"
		>
			<img src="/google.png" alt="Google" className="w-5 h-5" />
			<span className="hidden sm:inline">Continue with Google</span>
		</Button>

	);
};
export default SignInOAuthButtons;
