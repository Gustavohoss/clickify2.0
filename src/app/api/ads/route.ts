import { NextRequest, NextResponse } from 'next/server';

const FB_GRAPH_VERSION = 'v19.0';
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

export async function GET(req: NextRequest) {
  if (!ACCESS_TOKEN) {
    return NextResponse.json({ error: { message: 'Facebook Access Token não está configurado no servidor.' } }, { status: 500 });
  }

  const { searchParams } = req.nextUrl;
  const proxyUrl = searchParams.get('proxyUrl');

  let requestUrl: string;

  if (proxyUrl) {
    const url = new URL(proxyUrl);
    if (!url.searchParams.has('access_token')) {
      url.searchParams.set('access_token', ACCESS_TOKEN);
    }
    requestUrl = url.toString();
  } else {
    const searchTerm = searchParams.get('search_terms');
    if (!searchTerm) {
      return NextResponse.json({ error: { message: 'O termo de busca é obrigatório.' } }, { status: 400 });
    }

    const fields = 'ad_creative_body,ad_creative_link_caption,ad_creative_link_description,ad_creative_link_title,ad_delivery_start_time,funding_entity,page_name,page_id,publisher_platforms,spend,impressions,ad_snapshot_url';
    
    const params = new URLSearchParams({
      search_terms: searchTerm,
      ad_type: 'ALL',
      ad_reached_countries: "['BR']",
      fields: fields,
      access_token: ACCESS_TOKEN,
      limit: searchParams.get('limit') || '25',
    });

    requestUrl = `https://graph.facebook.com/${FB_GRAPH_VERSION}/ads_archive?${params.toString()}`;
  }

  try {
    const response = await fetch(requestUrl, {
      headers: {
        'Accept': 'application/json',
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: data.error || { message: 'Um erro desconhecido ocorreu na API da Meta.' } }, { status: response.status });
    }
    
    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json({ error: { message: error.message || 'Ocorreu um erro de servidor desconhecido.' } }, { status: 500 });
  }
}
