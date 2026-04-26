import {
  getNewsItems,
  addNewsItem,
  updateNewsItem,
  deleteNewsItem,
} from '../src/utils/storage.js';
import { isAdminRequest, sendUnauthorized } from '../src/utils/adminAuth.js';
import { jsonBody } from './cmsApi.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const news = await getNewsItems();
      res.status(200).json({
        data: news.sort(
          (a, b) =>
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
        ),
      });
      return;
    }

    if (!isAdminRequest(req)) {
      sendUnauthorized(res);
      return;
    }

    if (req.method === 'POST') {
      const item = jsonBody(req);
      if (!item || !item.folder_name) {
        res.status(400).json({ error: 'folder_name is required' });
        return;
      }
      const saved = await addNewsItem(item);
      res.status(201).json({ success: true, item: saved });
      return;
    }
    if (req.method === 'PUT') {
      const item = jsonBody(req);
      if (!item || !item.folder_name) {
        res.status(400).json({ error: 'folder_name is required' });
        return;
      }
      const saved = await updateNewsItem(item.folder_name, item);
      res.status(200).json({ success: true, item: saved });
      return;
    }
    if (req.method === 'DELETE') {
      const { folder_name } = jsonBody(req);
      if (!folder_name) {
        res.status(400).json({ error: 'folder_name is required' });
        return;
      }
      await deleteNewsItem(folder_name);
      res.status(200).json({ success: true });
      return;
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('News API error:', error);
    res.status(500).json({ error: error.message || 'Failed' });
  }
}
