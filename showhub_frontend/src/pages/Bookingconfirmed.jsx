import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

export default function BookingConfirmed() {
  const navigate = useNavigate();

  useEffect(() => {
    alert('Your booking has been confirmed and details have been sent to your registered email');
    navigate('/home');
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
    </div>
  );
}
