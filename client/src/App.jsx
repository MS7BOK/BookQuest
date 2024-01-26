import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, SavedBooks, Login, Signup } from './pages';
import Navbar from './components/Navbar';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';


const client = new ApolloClient({
  uri: '/graphql', // Replace with your server's GraphQL endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<SavedBooks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}



// export default App;
// import './App.css';
// import { Outlet } from 'react-router-dom';

// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// }

// export default App;
