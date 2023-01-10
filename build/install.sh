# Install git
apt update
apt install -y git

# Download assets
git clone https://github.com/guskikalola/lgsm_webpanel_assets assets

# Extract wanted assets
mv ./assets/gameBanners ./public/gameBanners

# Remove no longer needed packages
apt remove -y git