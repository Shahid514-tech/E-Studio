import { Home } from "@/views/HomePage";
import { Error } from "@/views/ErrorPage";
import App from "../App";
import { SingInPage } from "@/views/SignInPage";
import { SignUpPage } from "@/views/SignUpPage";
import { PathPage } from "@/views/PathPage";
import { DataProvider } from "@/components/data/DataContext";
import { Courses } from "@/views/CoursesPage";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "home",
        element: (
          <DataProvider>
            <Home />
          </DataProvider>
        ),
      },
      {
        path: "courses",
        element: (
          <DataProvider>
            <Courses />
          </DataProvider>
        ),
      },
      {
        path: "path",
        element: <PathPage />, // Placeholder for the path page
      }
    ],
  },
  {
    path: "sign-in",
    element: <SingInPage />,
  },
  {
    path: "sign-up",
    element: <SignUpPage />,
  },
];
