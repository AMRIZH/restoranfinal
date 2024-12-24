import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "@/components/CarouselHomepage";
import Link from "next/link";

interface Profile {
  logo: string;
  name: string;
  about_us: string;
}

interface OpeningHour {
  id: number;
  day: string;
  opening_time: string;
  closing_time: string;
}

interface Hour {
  id: number;
  day: string;
  opening_time: string;
  closing_time: string;
}

const Home = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);

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

    // Fetch opening hours data from the API
    const fetchOpeningHours = async () => {
      try {
        const response = await fetch(
          "https://yoloverse.pythonanywhere.com/api/opening-hour/"
        );
        const data = await response.json();
        // Format the time to remove seconds (HH:MM)
        const formattedData = data.map((hour: Hour) => ({
          ...hour,
          opening_time: hour.opening_time.slice(0, 5), // Remove seconds
          closing_time: hour.closing_time.slice(0, 5), // Remove seconds
        }));
        setOpeningHours(formattedData);
      } catch (error) {
        console.error("Error fetching opening hours:", error);
      }
    };

    fetchProfile();
    fetchOpeningHours();
  }, []);

  if (!profile || openingHours.length === 0) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Carousel />
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-between px-12">
        {/* Text Section */}
        <div className="w-1/2 space-y-6">
          <h1 className="text-6xl font-bold text-blue-600 leading-tight">
            HUNGRY? <span className="text-gray-800">Just wait</span>
          </h1>
          <h2 className="text-6xl font-bold text-gray-800 leading-tight">
            food at <span className="text-blue-600">your door</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qui magni
            delectus tenetur autem, sint veritatis!
          </p>
          <div className="mt-6 space-x-4">
          <Link
            href="/menus"
            className="px-4 py-2 bg-white text-blue-600 border border-blue-600 text-lg font-medium rounded-lg hover:bg-gray-100"
          >
            See all foods
          </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-1/2 h-[80vh] flex items-center justify-end">
          <Image
            src="/images/motor.png"
            alt="Motor delivery"
            layout="intrinsic"
            width={600}
            height={600}
            objectFit="contain"
          />
        </div>
      </div>
      {/* Profile Section */}
      <div className="bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Image
              src={profile.logo}
              alt="Logo"
              width={160}
              height={160}
              className="mx-auto"
            />
            <h1 className="text-4xl font-bold text-gray-800 mt-4">
              {profile.name}
            </h1>
            <p className="mt-2 text-gray-600">{profile.about_us}</p>
          </div>
        </div>
      </div>
      {/* Opening Hours Section */}
      <div className="bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-600 text-center">
            Opening Hours
          </h2>
          <div className="overflow-x-auto mt-4">
            <table className="max-w-3xl mx-auto table-auto border-collapse border border-blue-500 rounded-lg">
              <thead>
                <tr className="bg-blue-200">
                  <th className="px-6 py-3 text-left text-blue-700 font-semibold">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-blue-700 font-semibold">
                    Opening Time
                  </th>
                  <th className="px-6 py-3 text-left text-blue-700 font-semibold">
                    Closing Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {openingHours.map((hour) => (
                  <tr key={hour.id} className="border-b hover:bg-blue-50">
                    <td className="px-6 py-3 text-gray-700">{hour.day}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {hour.opening_time}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {hour.closing_time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
