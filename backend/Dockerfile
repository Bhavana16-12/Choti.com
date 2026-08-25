FROM node:20-alpine

# Install Python 3, pip, and yt-dlp
RUN apk add --no-cache python3 py3-pip && \
    pip3 install --no-cache-dir --break-system-packages yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
