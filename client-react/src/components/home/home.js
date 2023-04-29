import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Pharmacy Service!</h1>
      <Link to="/login" className="btn btn-primary">Log In</Link>
    </div>
  );
}

export default HomePage;