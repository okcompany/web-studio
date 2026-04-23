import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../../utils/fileStorage.js';
import { isAdminRequest, unauthorizedResponse } from '../../../utils/adminAuth.js';

export async function GET() {
  try {
    const portfolio = await getPortfolioItems();
    return new Response(JSON.stringify({ data: portfolio.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) }), { status: 200 });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch portfolio' }), { status: 500 });
  }
}

export async function POST(req) {
  if (!isAdminRequest(req)) return unauthorizedResponse();
  try {
    const item = await req.json();
    if (!item.folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400 });
    }
    await addPortfolioItem(item);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    return new Response(JSON.stringify({ error: 'Failed to add portfolio item' }), { status: 500 });
  }
}

export async function PUT(req) {
  if (!isAdminRequest(req)) return unauthorizedResponse();
  try {
    const item = await req.json();
    if (!item.folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400 });
    }
    await updatePortfolioItem(item.folder_name, item);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return new Response(JSON.stringify({ error: 'Failed to update portfolio item' }), { status: 500 });
  }
}

export async function DELETE(req) {
  if (!isAdminRequest(req)) return unauthorizedResponse();
  try {
    const { folder_name } = await req.json();
    if (!folder_name) {
      return new Response(JSON.stringify({ error: 'folder_name is required' }), { status: 400 });
    }
    await deletePortfolioItem(folder_name);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete portfolio item' }), { status: 500 });
  }
}
