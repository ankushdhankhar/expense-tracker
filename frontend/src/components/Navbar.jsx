import React from "react";
import Logo from "./shared/Logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        "https://expense-tracker-backend-xhfv.onrender.com/api/v1/user/logout"
      );
      if (res.data.success) {
        navigate("/Login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="border-b border-gray-300 ">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <Logo />
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <Button variant="link" onClick={logoutHandler}>
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/Login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/Signup">
              <Button>Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
