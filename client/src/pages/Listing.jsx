//---------------------------------------- For Specific Listing ------------------------------------------- //
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

// Swiper components (slider container + slides)
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper core engine
import SwiperCore from "swiper";

// For navigation arrows (next/prev)
import { Navigation } from "swiper/modules";

// Swiper default styles
import "swiper/css/bundle";

import {  FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare,} from 'react-icons/fa';


import Contact from "../components/Contact";


const Listing = () => {

  const {currentUser} = useSelector((state) => state.user);

  // Enable arrow navigation globally for Swiper
  SwiperCore.use([Navigation]);

  // Store listing data
  const [listing, setListing] = useState(null);

  // Manage loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // for store copy 
  const [copied, setCopied] = useState(false);

  const [contact, setContact] = useState(false); 

  // Get the :listingId from URL
  const params = useParams();


  // Fetch listing whenever listingId changes
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        // API call to backend
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        // Backend error
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        // Save data
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        // Any fetch error
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {/* Loading message */}
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}

      {/* Error message */}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}

      {/* Show UI only when listing exists */}
      {listing && !loading && !error && (

        <div>
          {/* Swiper slider for images */}
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}>
                  </div>
              </SwiperSlide>
            ))}
          </Swiper>


          {/* Copy link button */}
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {/* Copy message popup */}
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}


          {/* Listing details section */}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">

            {/* Name + price */}
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer ? listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>


            {/* Address */}
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>


            {/* Rent/Sale badge + Discount */}
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>


              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>


            {/* Description */}
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>


            {/* Property features (beds, baths, parking, etc.) */}
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : `${listing.bedrooms} bed `}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : `${listing.bathrooms} bath `}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {/* if current user is and listing is not of that person who created that and no contact then show contact button */}
             {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>
                Contact landlord
              </button>
            )}
            
                      {/* sending listing info to contact */}
            {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
