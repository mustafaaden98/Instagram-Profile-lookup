import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const rapidApiRes = await fetch('https://instagram120.p.rapidapi.com/api/instagram/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': process.env.RAPIDAPI_HOST!,
        'x-rapidapi-key': process.env.RAPIDAPI_KEY!,
      },
      body: JSON.stringify({ username }),
    });

    const data = await rapidApiRes.json();

    if (!rapidApiRes.ok) {
      return NextResponse.json({ error: data }, { status: rapidApiRes.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
