import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setPending(false);
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false);
      });
    // signIn("password", { email, password, flow: "signUp" })
    //   .catch(() => {
    //     setError("Invalid email or password");
    //   })
    //   .finally(() => {
    //     setPending(false);
    //   });
  };
  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md gap-x-2 text-sm flex items-center mb-4">
          <TriangleAlert className="size-4" />
          {error}
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Full Name"
            type=""
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="w-full relative"
            disabled={pending}
            onClick={() => {
              handleProviderSignUp("google");
            }}
            variant="outline"
            size="lg"
          >
            <FcGoogle className="size-5 absolute left-2.5" />
            Continue with Google
          </Button>
          <Button
            className="w-full relative"
            disabled={false}
            onClick={() => {
              handleProviderSignUp("github");
            }}
            variant="outline"
            size="lg"
          >
            <FaGithub className="size-5 absolute left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setState("signIn")}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
