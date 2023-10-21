import { NextResponse, NextRequest } from 'next/server' 


import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic';

// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const prompt = searchParams.get('query') || "nothing"

  // const supabase = createRouteHandlerClient<Database>({ cookies })
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const questions = await supabase.from('Question').select().filter('topic', 'eq', prompt);
  return NextResponse.json({questions});
}