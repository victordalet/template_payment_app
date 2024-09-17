FROM node:20-alpine
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
COPY . .
RUN npm install --force
RUN npm run build --production
RUN npm install -g serve
CMD serve -s build