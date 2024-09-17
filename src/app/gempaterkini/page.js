'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [gempaData, setGempaData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/gempaterkini');
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
    <div className="container mx-auto p-4">
      <div className="flex gap-2 mb-2">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      <Link href="/">Kembali</Link>
        </button>
      <h1 className="text-2xl font-bold mb-4">Info Gempa Terkini</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 mb:h-20">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">No</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tanggal</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Jam</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Magnitude</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Kedalaman</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Wilayah</th>
            </tr>
          </thead>
          <tbody>
            {gempaData.map((gempa, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{gempa.Tanggal}</td>
                <td className="border border-gray-300 px-4 py-2">{gempa.Jam}</td>
                <td className="border border-gray-300 px-4 py-2">{gempa.Magnitude}</td>
                <td className="border border-gray-300 px-4 py-2">{gempa.Kedalaman}</td>
                <td className="border border-gray-300 px-4 py-2">{gempa.Wilayah}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1 className="text-end">Source : BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</h1>
      </div>
    </div>
  );
}
