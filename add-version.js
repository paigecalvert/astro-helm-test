import fs from 'fs';
import path from 'path';

// Function to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to copy file and update slug
function copyFileWithSlugUpdate(srcPath, destPath, locale) {
  const content = fs.readFileSync(srcPath, 'utf8');
  
  // Update slug from v1.0 to v2.0 in the frontmatter
  const updatedContent = content.replace(
    new RegExp(`slug: ${locale}/v1\\.0/`, 'g'),
    `slug: ${locale}/v2.0/`
  );
  
  fs.writeFileSync(destPath, updatedContent);
}

// Function to copy directory recursively
function copyDirectory(src, dest, locale) {
  ensureDir(dest);
  
  const items = fs.readdirSync(src);
  
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath, locale);
    } else if (stat.isFile() && (item.endsWith('.md') || item.endsWith('.mdx'))) {
      copyFileWithSlugUpdate(srcPath, destPath, locale);
    } else {
      // Copy other files as-is
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Main function
function addVersion() {
  const locales = ['es', 'fr', 'pt', 'uk', 'ja'];
  const version = 'v2.0';
  
  console.log(`🚀 Adding ${version} version across all locales...\n`);
  
  // Handle English (root locale) first
  console.log('📁 Creating English (root) v2.0 content...');
  const englishSrc = 'src/content/docs/v1.0';
  const englishDest = `src/content/docs/${version}`;
  
  if (fs.existsSync(englishSrc)) {
    copyDirectory(englishSrc, englishDest, '');
    console.log('✅ English v2.0 content created');
  }
  
  // Handle other locales
  locales.forEach(locale => {
    console.log(`📁 Creating ${locale.toUpperCase()} ${version} content...`);
    
    const srcPath = `src/content/docs/${locale}/v1.0`;
    const destPath = `src/content/docs/${locale}/${version}`;
    
    if (fs.existsSync(srcPath)) {
      copyDirectory(srcPath, destPath, locale);
      console.log(`✅ ${locale.toUpperCase()} ${version} content created`);
    } else {
      console.log(`⚠️  ${locale.toUpperCase()} v1.0 source not found, skipping...`);
    }
  });
  
  // Create v2.0 version configuration
  console.log('\n📝 Creating v2.0 version configuration...');
  
  const v1Config = JSON.parse(fs.readFileSync('src/content/versions/v1.0.json', 'utf8'));
  const v2ConfigPath = `src/content/versions/${version}.json`;
  
  fs.writeFileSync(v2ConfigPath, JSON.stringify(v1Config, null, 2));
  console.log('✅ v2.0 version configuration created');
  
  console.log('\n🎉 Version addition completed successfully!');
  console.log(`📊 Total new files: ~${(locales.length + 1) * 206}`);
  console.log('\n⚠️  Remember to update astro.config.mjs to include the new version in the versions array!');
  console.log('⚠️  Add: { slug: "v2.0", label: "v2.0" }');
}

// Run the script
addVersion(); 