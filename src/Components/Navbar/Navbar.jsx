import React, { useContext } from "react"; 

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { NavLink ,useNavigate} from "react-router-dom";
import { CounterContext } from "../../contexts/counterContext"; 
import { authContext } from "../../contexts/authContext";


export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { counter } = useContext(CounterContext); 
  const { setIsLoggedIn, isLoggedIn } = useContext(authContext);
  const navigate = useNavigate()

  const menuItems = ["Home", "Categories", "Brands", "Cart"];

  function LogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/Login");
  }

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} isBordered shouldHideOnScroll>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">FreshCart {counter}</p>
        </NavbarBrand>
      </NavbarContent>
{
  isLoggedIn &&
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <NavLink color="foreground" to={item === "Home" ? "/" : "/" + item.toLowerCase()}>
              {item}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>
}

      <NavbarContent justify="end">
      {
  isLoggedIn ? 
    <NavbarItem>
      <Button onPress={LogOut} color="danger" variant="flat">
        Sign Out
      </Button>
    </NavbarItem>
   : 
    <>
      <NavbarItem className="hidden lg:flex">
        <NavLink to={"/login"}>Login</NavLink>
      </NavbarItem>
      <NavbarItem>
        <Button color="primary" variant="flat">
          <NavLink to={"/register"}>Sign Up</NavLink>
        </Button>
      </NavbarItem>
    </>
  
}

      </NavbarContent>

{
      isMenuOpen &&
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={`${item}-${index}`}>
            <NavLink className="w-full" color={"foreground"} to={item === "Home" ? "/" : "/" + item.toLowerCase()} size="lg">
              {item}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
}
    </Navbar>
  );
}


