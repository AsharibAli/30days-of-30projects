"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent } from "react"; // Import useState and ChangeEvent from React
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component
import { CalendarIcon, StarIcon } from "lucide-react"; // Import icons from lucide-react
import Image from "next/image"; // Import Next.js Image component
import ClipLoader from "react-spinners/ClipLoader";

// Define the MovieDetails type
type MovieDetails = {
  Title: string;
  Year: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Genre: string;
  Director: string;
  Actors: string;
  Runtime: string;
  Released: string;
};

export default function MovieSearch() {
  // State to manage the search term input by the user
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State to manage the movie details retrieved from the API
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  // State to manage the loading state during API fetch
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage any error messages from the API
  const [error, setError] = useState<string | null>(null);

  // Function to handle the search button click
  const handleSearch = async (): Promise<void> => {
    setLoading(true); // Set loading to true while fetching data
    setError(null); // Reset error state
    setMovieDetails(null); // Reset movie details state
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovieDetails(data); // Set movie details state with the fetched data
    } catch (error: any) {
      setError(error.message); // Set error state with the error message
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Function to handle changes in the search input field
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value); // Update the search term state with input value
  };

  // JSX return statement rendering the Movie Search UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        {/* Title of the Movie Search component */}
        <h1 className="text-3xl font-bold mb-1 text-center">Movie Search</h1>
        <p className="mb-6 text-center">
          Search for any movies and display details.
        </p>
        <div className="flex items-center mb-6">
          {/* Search input field */}
          <Input
            type="text"
            placeholder="Enter a movie title"
            value={searchTerm}
            onChange={handleChange}
            className="flex-1 mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Search button */}
          <Button
            onClick={handleSearch}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600"
          >
            Search
          </Button>
        </div>
        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center">
            <ClipLoader className="w-6 h-6 text-blue-500" />
          </div>
        )}
        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}. Please try searching for another movie.
          </div>
        )}
        {/* Movie details */}
        {movieDetails && (
          <div className="flex flex-col items-center">
            <div className="w-full mb-4">
              {/* Movie poster image */}
              <Image
                src={
                  movieDetails.Poster !== "N/A"
                    ? movieDetails.Poster
                    : "/placeholder.svg"
                }
                alt={movieDetails.Title}
                width={200}
                height={300}
                className="rounded-md shadow-md mx-auto"
              />
            </div>
            <div className="w-full text-center">
              <h2 className="text-2xl font-bold mb-2">{movieDetails.Title}</h2>
              <p className="text-gray-600 mb-4 italic">{movieDetails.Plot}</p>
              {/* Movie details section */}
              <div className="flex justify-center items-center text-gray-500 mb-2">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span className="mr-4">{movieDetails.Year}</span>
                <StarIcon className="w-4 h-4 mr-1 fill-yellow-500" />
                <span>{movieDetails.imdbRating}</span>
              </div>
              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4">
                  <strong>Genre:</strong> {movieDetails.Genre}
                </span>
              </div>
              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4">
                  <strong>Director:</strong> {movieDetails.Director}
                </span>
              </div>
              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4">
                  <strong>Actors:</strong> {movieDetails.Actors}
                </span>
              </div>
              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4">
                  <strong>Runtime:</strong> {movieDetails.Runtime}
                </span>
              </div>
              <div className="flex justify-center items-center text-gray-500 mb-2">
                <span className="mr-4">
                  <strong>Released:</strong> {movieDetails.Released}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
