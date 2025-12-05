import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CreateListing = () => {

  const Navigate = useNavigate()

  // For tracking current user which user is creating a listings
  const { currentUser } = useSelector((state) => state.user);

  // For tracking error and loading while creating list
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  // Files chosen by user for image
  const [files, setFiles] = useState([]);

  // All uploaded image URLs will be stored here
  const [imageUrls, setImageUrls] = useState([]);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,  
  })



  // HANDLE IMAGE UPLOAD FUNCTION
  // --------------------------------------------------------
  const handleImageUpload = async () => {
    // if no file return
    if (files.length === 0) return;

    const uploadedUrls = [];

    // Loop through each selected file
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      // Backend expects: req.files.image
      formData.append("image", files[i]);

      const uploadRes = await fetch("/api/listing/upload-image", {
        method: "POST",
        body: formData,
      });

      // Convert response to JSON
      const data = await uploadRes.json();

      // URL from backend push into array
      uploadedUrls.push(data.url);
    }

    // Add new uploaded URLs to existing ones
    setImageUrls((prev) => [...prev, ...uploadedUrls]);


    setFormData((prev) => ({
    ...prev,
    imageUrls: [...prev.imageUrls, ...uploadedUrls],
  }));

    console.log("Uploaded Images:", uploadedUrls);
  };


  // DELETE IMAGE FROM PREVIEW + STATE
  // --------------------------------------------------------
  const handleDeleteImage = (url) => {
    // Filter out the selected URL
    setImageUrls((prev) => prev.filter((img) => img !== url));
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData, type: e.target.id
      })
    }

      if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

   if (e.target.type === "number" || e.target.type === "text" || e.target.tagName === "TEXTAREA"){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  }


  // HANDLE FORM SUBMISSION (Create Listing)
  // -----------------------------------------
  const handleSubmit = async (e) => {
  e.preventDefault(); // 🔹 Prevent page reload

  try {

    // VALIDATION BEFORE SENDING TO BACKEND 
    if (imageUrls.length < 1) {
      return setError("You have to upload at least one image");
    }

    // Discount price must be LESS than regular price
    if (+formData.regularPrice < +formData.discountPrice) {
      return setError("Discount Price must be lower than regular price");
    }

    // START LOADING + RESET ERROR
    setLoading(true);
    setError(false);

    // SEND REQUEST TO BACKEND TO CREATE LISTING
    const res = await fetch("/api/listing/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      //  Send full form data + uploaded image URLs + which user created the listing
      body: JSON.stringify({
        ...formData,
        imageUrls,
        userRef: currentUser._id,//current user info
      }),
    });

    // GET RESPONSE FROM BACKEND
    const data = await res.json();
    setLoading(false);

    if (data.success === false) {
      return setError(data.message);
    }

    // REDIRECT TO THE NEW LISTING PAGE
    Navigate(`/listing/${data._id}`);

  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      {/* == MAIN FORM START === */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">

          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
           onChange={handleChange}
            value={formData.name}/>

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}/>

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}/>

          {/* Checkbox Group */}
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}/>
              <span>Sell</span>
            </div>

            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}/>
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5"  
              onChange={handleChange}
              checked={formData.parking} />
              <span>Parking spot</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" 
              onChange={handleChange}
              checked={formData.furnished}/>
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5"
               onChange={handleChange}
               checked={formData.offer}/>
              <span>Offer</span>
            </div>
          </div>

          {/* Numbers (Beds, Bath, Price etc.) */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}/>
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}/>
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="10"
                max="500"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}/>

               <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>)}
              </div>

            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}/>

                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* === RIGHT SIDE : IMAGE UPLOAD + PREVIEW === */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          {/* IMAGE INPUT AND UPLOAD BUTTON */}
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)} // Save selected files
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple/>

            <button 
              type="button"
              onClick={handleImageUpload}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>

          {/* === IMAGE PREVIEW + DELETE BUTTON ==== */}
          <div className="flex flex-col gap-3 mt-3">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded-lg">
                <img
                  src={url}
                  alt="uploaded"
                  className="w-28 h-20 object-cover rounded-lg"/>

                <button
                  type="button"
                  onClick={() => handleDeleteImage(url)}
                  className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white uppercase">
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* FINAL SUBMIT BUTTON */}
          <button disabled={loading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
