import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AdminRoute from "@/components/auth/AdminRoute";
import HomeNavigation from "@/components/layout/HomeNavigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Countries from "./pages/Countries";
import Itinerary from "./pages/Itinerary";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={
                  <>
                    <HomeNavigation />
                    <Profile />
                  </>
                } />
                <Route path="/countries" element={
                  <AdminRoute>
                    <Countries />
                  </AdminRoute>
                } />
                <Route path="/itinerary" element={
                  <>
                    <HomeNavigation />
                    <Itinerary />
                  </>
                } />
                <Route path="/community" element={
                  <>
                    <HomeNavigation />
                    <Community />
                  </>
                } />
                <Route path="/community/create" element={
                  <>
                    <HomeNavigation />
                    <CreatePost />
                  </>
                } />
                <Route path="/community/post/:postId" element={
                  <>
                    <HomeNavigation />
                    <PostDetail />
                  </>
                } />
                <Route path="/admin" element={
                  <AdminRoute>
                    <HomeNavigation />
                    <Admin />
                  </AdminRoute>
                } />
                <Route path="*" element={
                  <>
                    <HomeNavigation />
                    <NotFound />
                  </>
                } />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;