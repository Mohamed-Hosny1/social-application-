import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <div className=" mainPage  ">
        <div className="custom-bg text-amber-50">
          <div className="flex items-center justify-center h-screen px-2">
            <div className="text-center text-xl">
              <h1>404</h1>
              <p className=" mt-4">Oops! Page not found</p>
              <p className="mt-4 mb-10">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <a href="/" className="rounded-full p-4  custom-btn">
                Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
