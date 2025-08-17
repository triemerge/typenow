const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-gray-500 mt-2">page not found</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          go home
        </a>
      </div>
    </div>
  );
};

export default NotFound;