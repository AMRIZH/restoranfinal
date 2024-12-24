// src/components/Footer.tsx

import { useEffect, useState } from "react";
import Image from "next/image";
interface Profile {
  logo: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

const Footer = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Fetch profile data from the API
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://yoloverse.pythonanywhere.com/api/profile/"
        );
        const data = await response.json();
        setProfile(data[0]); // Assuming only one profile
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="text-center mb-6">
          <Image
            src={profile.logo}
            alt="Logo"
            width={80} // Set a specific width (adjust as needed)
            height={80} // Set a specific height (adjust as needed)
            className="mx-auto" // Tailwind class for centering
          />
        </div>

        {/* Contact Information */}
        <div className="text-center mb-6">
          <p className="text-lg">{profile.address}</p>
          <p className="text-lg">{profile.phone}</p>
          <p className="text-lg">{profile.email}</p>
        </div>

        {/* Social Media Links */}
        <div className="text-center space-x-6">
          <a
            href={profile.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            Facebook
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            Instagram
          </a>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
