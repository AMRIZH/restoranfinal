import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  email: string;
  rating: number;
  text: string;
  image: string;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
};

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [testimonialText, setTestimonialText] = useState("");
  const [testimonialRating, setTestimonialRating] = useState(1);
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialEmail, setTestimonialEmail] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentTestimonials, setCurrentTestimonials] = useState(testimonials);

  useEffect(() => {
    setIsClient(true); // Ensures that the component is rendered only on the client-side
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", testimonialName);
    formData.append("email", testimonialEmail);
    formData.append("rating", String(testimonialRating));
    formData.append("text", testimonialText);

    if (imagePreview) {
      const imageFile = dataURLtoFile(imagePreview, "image.jpg");
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch(
        "https://yoloverse.pythonanywhere.com/api/contact/testimonials/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const newTestimonial = await res.json();
        setCurrentTestimonials((prevTestimonials) => [
          ...prevTestimonials,
          newTestimonial,
        ]);
        
        alert("Testimonial submitted successfully!");
        
        // Clear form fields
        setTestimonialName("");
        setTestimonialEmail("");
        setTestimonialRating(1);
        setTestimonialText("");
        setImagePreview(null);
      } else {
        alert("Failed to submit testimonial");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("An error occurred while submitting your testimonial.");
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] ?? "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const renderStars = (rating: number) => {
    const fullStars = "★";
    const emptyStars = "☆";
    let stars = "";

    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? fullStars : emptyStars;
    }

    return stars;
  };

  if (!isClient) {
    return <div>Loading...</div>; // Ensure we don't render the dynamic content until after hydration
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Add Navbar here */}
      <main className="container mx-auto p-4 flex-1 space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Testimonials
        </h2>

        <form
          className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
          onSubmit={handleFormSubmit}
        >
          <h3 className="text-xl font-semibold mb-4">
            Submit Your Testimonial
          </h3>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={testimonialName}
              onChange={(e) => setTestimonialName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={testimonialEmail}
              onChange={(e) => setTestimonialEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-700"
            >
              Rating (1 to 5)
            </label>
            <input
              type="number"
              id="rating"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="5"
              value={testimonialRating}
              onChange={(e) => setTestimonialRating(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700"
            >
              Testimonial Text
            </label>
            <textarea
              id="text"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={testimonialText}
              onChange={(e) => setTestimonialText(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="mt-1 block w-full border-2 border-gray-300 p-2"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {imagePreview && (
              <div className="mt-2">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="object-cover rounded-full"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Submit Testimonial
          </button>
        </form>

        <div className="space-y-6">
          {currentTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center space-x-4">
                {testimonial.image && (
                  <Image
                    src={`https://yoloverse.pythonanywhere.com${testimonial.image}`}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.email}</p>
                  <p className="text-sm text-gray-700">{testimonial.text}</p>
                  <p className="text-sm text-gray-500">
                    Rating: {renderStars(testimonial.rating)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(
      "https://yoloverse.pythonanywhere.com/api/contact/testimonials/"
    );
    const data = await res.json();

    return { props: { testimonials: data } };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return { props: { testimonials: [] } };
  }
}

export default Testimonials;
