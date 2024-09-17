import Link from 'next/link';
import Image from 'next/image';
import earthquakeIMG from '../assets/images/earthquake.jpg'; // Pastikan Anda memiliki file SVG di folder 'public'

export default function Home() {
  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${earthquakeIMG.src})`, // Menggunakan SVG sebagai background
        backgroundSize: 'cover',
      }}
    >
      <h1 className="text-4xl font-bold mb-8">Info Gempa</h1>
      <nav className="space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/gempaterkini">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                Daftar 15 Gempabumi M 5.0+
              </button>
            </Link>
          </li>
          <li>
            <Link href="/gempadirasakan">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                Daftar 15 Gempabumi Dirasakan
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
