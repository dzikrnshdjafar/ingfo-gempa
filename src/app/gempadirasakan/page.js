'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic'; // Dynamic import to ensure it's client-side
import Link from 'next/link';

// Dynamic import of MapComponent (only loads in client-side)
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false // This ensures it's not server-side rendered
});

export default function Home() {
  const [gempaData, setGempaData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/gempadirasakan');
        setGempaData(response.data.Infogempa.gempa);
      } catch (error) {
        console.error('Error fetching gempa data:', error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched or error occurs
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Peta Gempa */}
      <div className="relative h-screen">
        <button className="absolute top-8 left-20 z-10 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Link href="/">Kembali</Link>
        </button>
        <div className="absolute inset-0 z-0">
          <MapComponent gempaData={gempaData} />
        </div>
        <h1 className="absolute text-end z-20 bottom-2 left-5">
          Source: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
        </h1>
      </div>
    </>
  );
}
