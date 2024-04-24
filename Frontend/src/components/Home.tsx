import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { loginWithRedirect } = useAuth0();
    return (
      <div className="flex flex-col justify-center items-center h-screen" style={{ marginTop: "-7rem" }}>
        <h1 className="text-6xl text-center mb-8">Your help to manage the references Bla Bla Bla ...</h1>
        <div className="space-y-4">
          <button className="btn btn-lg mr-6 w-36" onClick={() => loginWithRedirect()}>Log in</button>
          <button className="btn btn-neutral btn-lg w-36">Sign up</button>
        </div>
      </div>
    );
  }
  