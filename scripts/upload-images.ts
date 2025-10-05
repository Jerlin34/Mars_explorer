import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MarsData {
  images: Array<{
    id: number;
    image_path: string;
    class_name: string;
    class_id: number;
  }>;
}

async function uploadImages() {
  console.log('🚀 Mars Image Upload Script');
  console.log('============================\n');

  const zipPath = process.argv[2];
  
  if (!zipPath) {
    console.error('❌ Please provide the path to your zip file');
    console.log('Usage: npm run upload-images <path-to-zip-file>');
    process.exit(1);
  }

  if (!fs.existsSync(zipPath)) {
    console.error(`❌ Zip file not found: ${zipPath}`);
    process.exit(1);
  }

  // Read mars_data.json to get the image paths
  const dataPath = path.resolve(__dirname, '..', 'public', 'mars_data.json');
  const marsData: MarsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  console.log(`📊 Found ${marsData.images.length} images in mars_data.json`);
  
  // Create images directory in public
  const imagesDir = path.resolve(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Extract zip file
  console.log(`\n📦 Extracting zip file: ${zipPath}`);
  
  const extractDir = path.resolve(__dirname, '..', 'temp_extract');
  
  // Import unzipper dynamically
  const unzipper = await import('unzipper');
  
  await pipeline(
    createReadStream(zipPath),
    unzipper.Extract({ path: extractDir })
  );
  
  console.log('✅ Extraction complete\n');
  
  // Find and copy images
  let copiedCount = 0;
  let notFoundCount = 0;
  const notFoundImages: string[] = [];
  
  console.log('📋 Mapping and copying images...\n');
  
  for (const imageData of marsData.images) {
    const imagePath = imageData.image_path;
    const filename = path.basename(imagePath);
    
    // Search for the file in the extracted directory
    const sourceFile = await findFile(extractDir, filename);
    
    if (sourceFile) {
      // Create subdirectory structure if needed
      const relativePath = imagePath.replace(/\\/g, '/');
      const targetPath = path.join(imagesDir, relativePath);
      const targetDir = path.dirname(targetPath);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Copy the file
      fs.copyFileSync(sourceFile, targetPath);
      copiedCount++;
      
      if (copiedCount % 100 === 0) {
        console.log(`  ✓ Copied ${copiedCount} images...`);
      }
    } else {
      notFoundCount++;
      notFoundImages.push(filename);
    }
  }
  
  // Clean up temp directory
  fs.rmSync(extractDir, { recursive: true, force: true });
  
  // Summary
  console.log('\n============================');
  console.log('📈 Upload Summary:');
  console.log(`✅ Successfully copied: ${copiedCount} images`);
  console.log(`❌ Not found: ${notFoundCount} images`);
  
  if (notFoundImages.length > 0 && notFoundImages.length <= 20) {
    console.log('\nMissing files:');
    notFoundImages.forEach(f => console.log(`  - ${f}`));
  } else if (notFoundImages.length > 20) {
    console.log(`\nFirst 20 missing files:`);
    notFoundImages.slice(0, 20).forEach(f => console.log(`  - ${f}`));
    console.log(`  ... and ${notFoundImages.length - 20} more`);
  }
  
  console.log('\n✨ Upload complete!');
}

async function findFile(dir: string, filename: string): Promise<string | null> {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const found = await findFile(fullPath, filename);
      if (found) return found;
    } else if (file === filename) {
      return fullPath;
    }
  }
  
  return null;
}

uploadImages().catch(console.error);
