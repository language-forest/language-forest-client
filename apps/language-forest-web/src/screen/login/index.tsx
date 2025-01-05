import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "../../component/auth/GoogleLogin";

export const LoginScreen = () => {
  const clientId =
    "534905735410-e72i9oi4k8sqe2fpcn55q4m2645fbgnr.apps.googleusercontent.com";

  return (
    <div>
      <div>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default LoginScreen;
