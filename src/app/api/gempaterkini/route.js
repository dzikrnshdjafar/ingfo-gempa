import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json');
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error(new Error('Error fetching data from BMKG'));
  }
}
