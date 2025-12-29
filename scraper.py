import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import uuid

# Configuration
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9"
}

def get_high_res_img(img_tag):
    """Marketplaces often hide high-res URLs in these attributes."""
    return img_tag.get('data-zoom-image') or \
           img_tag.get('data-src') or \
           img_tag.get('src')

def scrape_flipkart_product(url):
    try:
        print(f"\n[*] Processing: {url}")
        res = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(res.text, 'html.parser')

        # 1. Create Folder based on product name (or UUID if name fails)
        title_tag = soup.find('span', {'class': 'B_NuCI'}) # Flipkart Title Class
        title = title_tag.get_text(strip=True) if title_tag else "product_" + uuid.uuid4().hex[:4]
        
        # Clean folder name for Windows/Linux compatibility
        folder_name = "".join([c for c in title if c.isalnum() or c in (' ', '-', '_')]).rstrip()[:30]
        product_path = os.path.join("products", folder_name)
        os.makedirs(product_path, exist_ok=True)

        # 2. Save Description to des.txt
        # Flipkart often puts descriptions in a specific div or meta tag
        desc_text = ""
        desc_div = soup.find('div', {'class': '_1mX1oR'}) # Common description class
        if desc_div:
            desc_text = desc_div.get_text(separator=' ').strip()
        else:
            # Fallback to meta description
            meta_desc = soup.find('meta', {'name': 'description'})
            desc_text = meta_desc['content'] if meta_desc else "No description available."
        
        with open(os.path.join(product_path, "des.txt"), "w", encoding="utf-8") as f:
            f.write(desc_text[:300]) # Limit to 300 chars for your catalog
        print(f"  [+] Saved description to des.txt")

        # 3. Download High-Quality Images
        # Focus on main product gallery images
        img_tags = soup.find_all('img', {'class': 'q6DClP'}) or soup.find_all('img')
        img_urls = []
        for img in img_tags:
            src = get_high_res_img(img)
            if src and 'http' in src and 'pixel' not in src:
                # Replace small thumbnail dimensions with high-res ones if found in URL
                high_res_url = src.replace('/128/128/', '/832/832/') 
                img_urls.append(high_res_url)

        unique_imgs = list(dict.fromkeys(img_urls))[:6]
        
        for idx, img_url in enumerate(unique_imgs, start=1):
            try:
                img_res = requests.get(img_url, headers=HEADERS, timeout=10)
                if img_res.status_code == 200:
                    with open(os.path.join(product_path, f"{idx}.jpg"), 'wb') as f:
                        f.write(img_res.content)
            except:
                continue
        
        print(f"  [+] Saved {len(unique_imgs)} images to {product_path}")

    except Exception as e:
        print(f"  [!] Error: {e}")

def main():
    if not os.path.exists("links.txt"):
        print("Please create links.txt and add Flipkart URLs.")
        return
    
    if not os.path.exists("products"):
        os.makedirs("products")

    with open("links.txt", "r") as f:
        links = [line.strip() for line in f if line.strip()]

    for link in links:
        scrape_flipkart_product(link)

if __name__ == "__main__":
    main()