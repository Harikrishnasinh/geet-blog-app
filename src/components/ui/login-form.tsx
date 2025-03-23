import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/userSlice";
import { Toaster } from "./sonner";
import { toast } from "sonner";
import { useState } from "react";
import { axiosPost } from '../../handleApi/index.ts'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const user = useSelector((state: any) => state.auth.user);
  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      const oPayload = {
        email: user.email,
        password: user.password,
      };
      const logInUser: any = await axiosPost('/api/v1/users/login', oPayload)
      console.log(logInUser);
      if (logInUser.success) {
        toast.success("Login Successfully!!!!", {
          closeButton: true, 
          position: "top-right",
        });
        dispatch(login(user));
        localStorage.setItem("auth", logInUser.refreshToken);
        localStorage.setItem('user', JSON.stringify(logInUser.user));
        navigate("/");
        console.log('here')
        return;
      }
    } catch (error) {
      console.log(error)
      toast.error("Sorry, Login Failed!!!", {
        closeButton: true,
        position: "top-right",
      });
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(login({ ...user, [name]: value }));
  };

  const handlePasswordVisibilityToggle = () => {
    if(!user.password.length){
      toast.error('Please fill the password field',{
        position: "top-right",
        closeButton: true
      })
      return;
    }
    setPasswordVisibility(passwordVisibility === "text" ? "password" : "text");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster />
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Blogium</h1>
                <Separator className="my-4" />
                <p className="text-muted-foreground text-balance">Login</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <span
                    onClick={handlePasswordVisibilityToggle}
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {passwordVisibility === 'text' ? <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>
                    }
                  </span>
                </div>
                <Input
                  id="password"
                  type={passwordVisibility}
                  required
                  name="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                  placeholder="********"
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin}>
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="../../../img/login_hero.avif"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
