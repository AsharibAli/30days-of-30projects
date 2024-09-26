"use client"; // Enables client-side rendering for this component

import { useState } from "react"; // Import useState hook from React
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Import custom Card components
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Import custom Avatar components
import Link from "next/link"; // Import Link component from Next.js
import {
  ExternalLinkIcon,
  ForkliftIcon,
  LocateIcon,
  RecycleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"; // Import icons from lucide-react
import ClipLoader from "react-spinners/ClipLoader";

// Define the UserProfile type
type UserProfile = {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
};

// Define the UserRepo type
type UserRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
};

export default function GitHubProfileViewer() {
  // State to manage the inputted GitHub username
  const [username, setUsername] = useState<string>("");
  // State to manage the fetched user profile data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  // State to manage the fetched user repositories data
  const [userRepos, setUserRepos] = useState<UserRepo[]>([]);
  // State to manage the loading state
  const [loading, setLoading] = useState<boolean>(false);
  // State to manage any error messages
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user data from GitHub API
  const fetchUserData = async (): Promise<void> => {
    setLoading(true); // Set loading to true while fetching data
    setError(null); // Reset error state
    try {
      const profileResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!profileResponse.ok) {
        throw new Error("User not found");
      }
      const profileData = await profileResponse.json();
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (!reposResponse.ok) {
        throw new Error("Repositories not found");
      }
      const reposData = await reposResponse.json();
      setUserProfile(profileData); // Set user profile state with fetched data
      setUserRepos(reposData); // Set user repositories state with fetched data
    } catch (error: any) {
      setError(error.message); // Set error state with the error message
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchUserData();
  };

  // JSX return statement rendering the GitHub Profile Viewer UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <Card className="w-full max-w-3xl p-6 space-y-4 shadow-lg rounded-lg bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">
            GitHub Profile Viewer
          </CardTitle>
          <CardDescription className="text-gray-600">
            Search for a GitHub username and view their profile and
            repositories, search like: AsharibAli
          </CardDescription>
        </CardHeader>
        {/* Form to input GitHub username */}
        <form onSubmit={handleSubmit} className="mb-8 px-6">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Enter a GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 border rounded-md p-2"
            />
            <Button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              {loading ? <ClipLoader className="w-4 h-4 text-white" /> : "Search"}
            </Button>
          </div>
        </form>
        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {/* Display user profile and repositories if data is fetched */}
        {userProfile && (
          <div className="grid gap-8 px-6">
            {/* User profile section */}
            <div className="grid md:grid-cols-[120px_1fr] gap-6">
              <Avatar className="w-30 h-30 border">
                <AvatarImage src={userProfile.avatar_url} />
                <AvatarFallback>
                  {userProfile.login.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{userProfile.login}</h2>
                  <Link
                    href={userProfile.html_url}
                    target="_blank"
                    className="text-black"
                    prefetch={false}
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-gray-600">{userProfile.bio}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
                    <span>{userProfile.followers} Followers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
                    <span>{userProfile.following} Following</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LocateIcon className="w-4 h-4" />
                    <span>{userProfile.location || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* User repositories section */}
            <div className="grid gap-6">
              <h3 className="text-xl font-bold">Repositories</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {userRepos.map((repo) => (
                  <Card
                    key={repo.id}
                    className="shadow-md rounded-lg bg-white border"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <RecycleIcon className="w-6 h-6" />
                        <CardTitle>
                          <Link
                            href={repo.html_url}
                            target="_blank"
                            className="hover:text-black"
                            prefetch={false}
                          >
                            {repo.name}
                          </Link>
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {repo.description || "No description"}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <StarIcon className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                        <ForkliftIcon className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <Link
                        href={repo.html_url}
                        target="_blank"
                        className="text-black hover:underline"
                        prefetch={false}
                      >
                        View on GitHub
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
