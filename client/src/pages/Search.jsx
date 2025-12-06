import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Search = () => {

  const navigate = useNavigate();

  // for track inputs 
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });


//   for api loading and store search result  
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  // URL → Sidebar Data sync + Listings Fetch
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    // set filters into sidebar if found in URL
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    // set filters into sidebar if found in URL
    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);


     // handleChange → har input / to update checkbox inputs
   const handleChange = (e) => {
   
    // any of the property filters: all, rent, sale
    if (id === 'all' || id === 'rent' || id === 'sale') {
      setSidebardata({ ...sidebardata, type: id });
    }

    // search input change
    if (id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: value });
    }

    // checkboxes: parking, furnished, offer
    if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setSidebardata({ ...sidebardata, [id]: e.target.checked, // true / false update
      });
    }

    // sort dropdown
    if (id === 'sort_order') {
      const sort = value.split('_')[0];  // example: createdAt
      const order = value.split('_')[1]; // example: asc
      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  


  //  handleSubmit  forcoverting side bar data into url
  const handleSubmit = (e) => {
    e.preventDefault();

    // to create new URL parameters 
    const urlParams = new URLSearchParams();

    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);

    // convert object to query string
    const searchQuery = urlParams.toString();

    // browser URL update, page redirect
    navigate(`/search?${searchQuery}`);
  };



  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>

        {/* form  for search and add filters */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>

            <label className='whitespace-nowrap font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}/>
          </div>
          
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='all' className='w-5' 
              onChange={handleChange}
              checked={sidebardata.type === 'all'}/>
              <span>Rent & Sale</span>
            </div>
            
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' 
               onChange={handleChange}
              checked={sidebardata.type === 'rent'}/>
              <span>Rent</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5'
               onChange={handleChange}
              checked={sidebardata.type === 'sale'} />
              <span>Sale</span>
            </div>
            
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5'
              onChange={handleChange}
              checked={sidebardata.offer}/>
              <span>Offer</span>
            </div>
          </div>


          {/* parking and furnished check  */}
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5'
               onChange={handleChange}
              checked={sidebardata.parking} />
              <span>Parking</span>
            </div>

            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5'
               onChange={handleChange}
              checked={sidebardata.parking} />
              <span>Furnished</span>
            </div>
          </div>

          {/* dropdown for price and latest oldest listings */}
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select onChange={handleChange}
            defaultValue={'created_at_desc'}
            id='sort_order' 
            className='border rounded-lg p-3'>
            <option value='regularPrice_desc'>Price high to low</option>
            <option value='regularPrice_asc'>Price low to hight</option>
            <option value='createdAt_desc'>Latest</option>
            <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>

      <div className=''>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
      </div>
    </div>
  )
}

export default Search