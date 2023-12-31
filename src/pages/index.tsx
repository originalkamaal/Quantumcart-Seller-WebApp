import React, { useEffect, useState } from "react";
import { BtnBorderedRounded } from "../components/btnBorderedRounded";
import { Link, useNavigate } from "react-router-dom";
import Login from "./auth/login";
import ProtectedContainerV2 from "../containers/check_auth";
import { useDispatch } from "react-redux";
import CheckAuth from "../containers/check_auth";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (

    <div id="app">
      <div className="h-20 flex items-center px-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex">
            <span className="font-bold text-2xl">LOGO</span>
            <ul className="flex px-10 gap-6 items-center">
              <li>
                <a href="/sell-online/pricing">Fee Structure</a>
              </li>
              <li>
                <a href="/sell-online/faq">FAQs</a>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <BtnBorderedRounded
              className="bg-yellow-400"
              onClick={() => {
                navigate("/register");
              }}
            >
              Start Selling
            </BtnBorderedRounded>
            <BtnBorderedRounded className="bg-green-400" onClick={() => { navigate("/login"); }}>
              Login
            </BtnBorderedRounded>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <div>
        <div>
          <div className="relative">
            <div className="w-full h-80 bg-green-400  flex items-center justify-center">
              <div>
                <p className="text-3xl text-center font-bold w-80 py-4">
                  Launch your business in 10 minutes
                </p>
                <div className="flex justify-center">
                  <Link to="/register">
                    <BtnBorderedRounded className="bg-yellow-400">
                      Start Selling
                    </BtnBorderedRounded>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Why Sell With Us Section */}
      <div className="py-10 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Why Sell With Us?</h2>
          <p className="text-gray-600">
            Join a thriving community of sellers and take your business to new heights.
            Here are some reasons to choose our marketplace:
          </p>
          <ul className="list-disc text-left mt-4">
            <li>Global Reach: Reach customers around the world.</li>
            <li>Easy Setup: Start selling in just a few easy steps.</li>
            <li>Secure Transactions: Ensure secure transactions with our trusted platform.</li>
            {/* Add more reasons */}
          </ul>
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="py-10 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">What Our Sellers Say</h2>
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Add testimonial cards */}
            {/* Example:
              <div className="m-4">
                <p className="text-lg font-semibold">John Doe</p>
                <p className="text-gray-600">"I love selling on this platform. It's user-friendly and has increased my sales."</p>
              </div>
              */}
          </div>
        </div>
      </div>
      {/* Get Started Section */}
      <div className="py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Get Started Today</h2>
          <p className="text-gray-600">
            Ready to take your business to the next level? Join our marketplace and start selling today.
          </p>
          <div className="mt-6">
            <Link to="/register">
              <BtnBorderedRounded className="bg-yellow-400">Start Selling Now</BtnBorderedRounded>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAuth(Home);
