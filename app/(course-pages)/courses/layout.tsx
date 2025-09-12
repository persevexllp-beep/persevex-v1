import CoursePageNavbar from "@/app/components/CoursesAppbar";
import { CourseScrollProvider } from "../contexts/courseScrollContext";

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