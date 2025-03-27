import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/userSlice";
import axios from 'axios'
import { toast } from "sonner";
import { Toaster } from "./sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate()

  const handleRegister = async (e: any) => {
   try {
     e.preventDefault();
     console.log(user)
     // Perform registration logic here
     const apiUrl = import.meta.env.VITE_DB_URL;
     const registeredUser = await axios.post(`${apiUrl}/api/v1/users/register`, user)
     if(registeredUser.data.success){
       toast.success("Registered Successfully!!!!", {
         closeButton: true,
         position: "top-right",
       })
       dispatch(login(user));
       navigate('/login')
       return;
     }
   } catch (error) {
     toast.error("Sorry, Registration Failed!!!", {
       closeButton: true,
       position: "top-right",
     });
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if(name === 'username') {
      value = value.replace(/\s/g, ""); // Remove spaces
      value = value.toLowerCase(); // Convert to lowercase
    }
    dispatch(login({ ...user, [name]: value }));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster></Toaster>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src="../../../img/register_page.avif"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Blogium</h1>
                <Separator className="my-4" />
                <p className="text-muted-foreground text-balance">Register</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="jack"
                  required
                  name="firstName"
                  value={user.firstName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Daniels"
                  required
                  name="lastName"
                  value={user.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="jackdaniels"
                  required
                  name="userName"
                  value={user.username}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jackdaniels@gmail.com"
                  required
                  name="email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  placeholder="********"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleRegister}>
                Register
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
