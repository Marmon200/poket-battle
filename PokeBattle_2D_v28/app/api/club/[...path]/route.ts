import {env} from 'cloudflare:workers';
import {handle} from '../../../../lib/server';
export const dynamic='force-dynamic';
export async function GET(r:Request){return handle(r,env)}
export async function POST(r:Request){return handle(r,env)}
