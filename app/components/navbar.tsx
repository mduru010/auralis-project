"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { auth, signIn, logOut } from "../lib/firebase";
import Image from "next/image";
import { onAuthStateChanged, User } from "firebase/auth";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Library", href: "/library" },
    { name: "Discover", href: "/discover" },
  ];

  return (
    <nav className="bg-dark p-4 text-gold flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold">Auralis</h1>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`hover:text-white ${
              pathname === link.href ? "border-b-2 border-gold" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Profile / Login Button */}
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Image
                src={user.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gold"
              />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 bg-dark text-gold rounded-md shadow-md p-4 flex flex-col">
                <p className="text-center font-medium">{user.displayName}</p>
                <button
                  className="mt-2 bg-gold text-dark px-4 py-2 rounded-md hover:bg-opacity-80"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-gold text-dark px-4 py-2 rounded-md hover:bg-opacity-80"
            onClick={signIn}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
