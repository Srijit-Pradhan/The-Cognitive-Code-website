const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || 'mock_key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Multer config for in-memory processing
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  }
});

const uploadToSupabase = async (file, bucket) => {
  if (!file) return null;
  
  // Create a unique filename
  const filename = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });
    
  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }
  
  // Return the public URL
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(filename);
    
  return publicUrlData.publicUrl;
};

module.exports = {
  supabase,
  upload,
  uploadToSupabase
};
