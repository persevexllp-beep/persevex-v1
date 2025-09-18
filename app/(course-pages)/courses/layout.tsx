import CoursePageNavbar from "@/app/components/CoursesAppbar";
import { CourseScrollProvider } from "../contexts/courseScrollContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Persevex",
  description: "Empowering careers",
};

export default function CoursePagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap the navbar and children with the new provider
    <CourseScrollProvider>
      <CoursePageNavbar />
      {children}
    </CourseScrollProvider>
  );
}