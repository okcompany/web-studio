import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../../utils/storage.js';
import { isAdminRequest, unauthorizedResponse } from '../../../utils/adminAuth.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export async function GET() {
  try {
    const portfolio = await getPortfolioItems();
    return new Response(JSON.stringify({ data: portfolio.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }), { status: 200, headers: JSON_HEADERS });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch portfolio' }), { status: 500, headers: JSON_HEADERS });
  }
}

export async function POST(req) {
  if (!isAdminRequest(req)) return unauthorizedResponse();
  try {
    const item = await req.json();
    if (!item.folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400, headers: JSON_HEADERS });
    }
    await addPortfolioItem(item);
    return new Response(JSON.stringify({ success: true }), { status: 201, headers: JSON_HEADERS });
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    return new Response(JSON.stringify({ error: 'Failed to add portfolio item' }), { status: 500, headers: JSON_HEADERS });
  }
}

export async function PUT(req) {
  if (!isAdminRequest(req)) return unauthorizedResponse();
  try {
    const item = await req.json();
    if (!item.folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400, headers: JSON_HEADERS });
    }
    await updatePortfolioItem(item.folder_name, item);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: JSON_HEADERS });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return new Response(JSON.stringify({ error: 'Failed to update portfolio item' }), { status: 500, headers: JSON_HEADERS });
  }
}

export async function DELETE(req) {
  if (!isAdminRequest(req)) return unauthorizedResponse();
  try {
    const { folder_name } = await req.json();
    if (!folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400, headers: JSON_HEADERS });
    }
    await deletePortfolioItem(folder_name);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: JSON_HEADERS });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete portfolio item' }), { status: 500, headers: JSON_HEADERS });
  }
}
