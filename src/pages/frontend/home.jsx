import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import Text from "@/components/ui/text";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router";
import { useState } from "react";

function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-gradient-to-r from-blue-500 to-green-400">
      <div className="w-full p-8 text-center bg-white rounded-lg shadow-xl max-w-7xl">
        <Heading className="text-4xl font-bold text-gray-800 animate__animated animate__fadeIn">
          Welcome to Al Rashid Panjabi Bazar and Cloth
        </Heading>
        <Text className="mt-4 text-lg text-gray-600 animate__animated animate__fadeIn animate__delay-1s">
          Premium tailoring and fabrics at your service. Experience elegance with every stitch.
        </Text>

        {/* New Hero Section with Text & Button Align */}
        <div className="mt-8 space-y-4 text-center">
          <div className="text-xl font-semibold text-gray-700">
            Get started today with our premium services and fabrics!
          </div>

          {/* Align the action buttons and links */}
          <div className="flex justify-center gap-8 mt-6">
            {/* Sign Up Button */}
            <Button className="px-10 py-4 text-white transition-all duration-300 ease-in-out transform border-2 border-blue-600 rounded-full shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-700 hover:scale-105 hover:text-white">
              <Link to="/register">Sign Up</Link>
            </Button>

            {/* Log In Button */}
            <Button
              variant=""
              className="px-10 py-4 text-white transition-all duration-300 ease-in-out transform border-2 border-green-600 rounded-full shadow-xl bg-gradient-to-r from-green-500 to-green-600 hover:bg-green-700 hover:scale-105 hover:text-white"
            >
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8 border-t-2 border-gray-300" />

        {/* Hero Image Card with Text Animation */}
        <Card className="max-w-md p-6 mx-auto mt-10 bg-gray-100 rounded-lg shadow-md">
          <img
            src="https://images.pexels.com/photos/9824794/pexels-photo-9824794.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Tailoring Services"
            className="object-cover w-full h-56 transition-transform duration-500 transform rounded-lg hover:scale-105"
          />
          <Text className="mt-4 font-semibold text-gray-700 animate__animated animate__fadeIn animate__delay-2s">
            Explore Our Premium Tailoring Services and Fabric Collection.
            Designed for Your Style.
          </Text>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
