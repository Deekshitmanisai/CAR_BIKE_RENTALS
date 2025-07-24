import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BikeAdmin from './components/bike-admin/BikeAdmin';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Login from './components/login/Login';
import Signup from './components/Signup';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase, { rrfConfig } from './firebase/config';
import 'firebase/compat/auth';
import 'firebase/compat/database'; // or 'firebase/compat/firestore' if you use Firestore
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import UserBikes from './components/user/Bikes';
import Checkout from './components/user/Checkout';
import BookingHistory from './components/user/BookingHistory';
import Cars from './components/user/Cars';

class App extends React.Component {
  render() {
    const rrfProps = {
      firebase,
      config: rrfConfig,
      dispatch: store.dispatch,
    };
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <BrowserRouter>
            <Routes>
              {/* Public routes (no sidebar/nav) */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/my-bookings" element={<BookingHistory />} />
              <Route path="/cars" element={<Cars />} />

              {/* User-facing bikes page (no admin controls) */}
              <Route path="/bikes" element={<UserBikes />} />

              {/* Private routes (with sidebar/nav) */}
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Layout />
                  </RequireAuth>
                }
              >
                <Route index element={<Home />} />
                <Route path="admin/bikes" element={<BikeAdmin />} />
                {/* Add more private routes here */}
              </Route>
            </Routes>
          </BrowserRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

export default App;
