import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";

// Swiper components (slider container + slides)
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper core engine
import SwiperCore from "swiper";

// For navigation arrows (next/prev)
import { Navigation } from "swiper/modules";

// Swiper default styles
import "swiper/css/bundle";
import ListingItems from "../components/ListingItems";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(offerListings);

  // Enable arrow navigation globally for Swiper
  SwiperCore.use([Navigation]);

  useEffect(() => {
    // for fetching offer listings
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings()
      } catch (error) {
        console.log(error);
      }
    };

    // for fetching rent listings
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings()
      } catch (error) {
        console.log(error);
      }
    };

    // for fetching sale listings
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>

        <div className="text-gray-400 text-xs sm:text-sm">
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>

        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
          Let's get started...
        </Link>
      </div>

      <Swiper navigation>
        {offerListings && offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: "cover"}}
                className="h-[650px]"
                key={listing._id}>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>



      {/* listing resutly */}
     <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 w-full lg:w-[90%]">
        {offerListings &&
          offerListings.length > 0 && ( // if there is offerlisting and length is greater then 0 run
            <div className="mt-10">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent offers
                </h2>

                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}>
                  Show more offers
                </Link>

              </div>
              <div className="flex flex-wrap gap-4 w-full">
                {offerListings.map((listing) => (
                  <ListingItems listings={listing} key={listing._id}/>
                ))}
              </div>
            </div>
          )}

      </div>

        {/* listing resutly */}
     <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 w-full lg:w-[90%]">
        {rentListings &&
          rentListings.length > 0 && ( // if there is offerlisting and length is greater then 0 run
            <div className="mt-10">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                 Recent places for rent
                </h2>

                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}>
                  Show more Rent
                </Link>

              </div>
              <div className="flex flex-wrap gap-4 w-full">
                {rentListings.map((listing) => (
                  <ListingItems listings={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

      </div>


        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 w-full lg:w-[90%]">
        {saleListings &&
          saleListings.length > 0 && ( // if there is offerlisting and length is greater then 0 run
            <div className="mt-10">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-800 hover:underline"
                  to={"/search?offer=true"}>
                  Show more sales
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 w-full">
                {saleListings.map((listing) => (
                  <ListingItems listings={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

      </div>
    </div>
  );
};

export default Home;
