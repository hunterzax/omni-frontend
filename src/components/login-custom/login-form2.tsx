"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useLogin } from "@refinedev/core";
import { useState } from "react";

export function LoginForm2({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const route = useRouter();
  const { mutate: login } = useLogin<{ email: string; password: string }>();

  const [email, setEmail] = useState("info@refine.dev");
  const [password, setPassword] = useState("refine-supabase");
  // const [email, setEmail] = useState("test@ierp.com");
  // const [password, setPassword] = useState("123456789");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>
        <Button
          onClick={handleLogin}
          className="w-full"
        >
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="60" height="60">
            <path fill="#4285F4" d="M23.49 12.27c0-.75-.07-1.48-.2-2.19H12v4.19h6.36c-.28 1.48-1.25 2.73-2.87 3.36v4.19h4.66c2.73-2.5 4.55-6.16 4.55-10.55z"/>
            <path fill="#34A853" d="M12 24c-5.52 0-10-4.48-10-10s4.48-10 10-10c5.52 0 10 4.48 10 10s-4.48 10-10 10z"/>
            <path fill="#FBBC05" d="M4.5 12C4.5 7.03 8.53 3 12 3c1.74 0 3.41.5 4.83 1.36L12 12H4.5z"/>
            <path fill="#EA4335" d="M12 3c-1.74 0-3.41.5-4.83 1.36L12 12H4.5C4.5 7.03 8.53 3 12 3z"/>
          </svg> */}
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </div>
  );
}
