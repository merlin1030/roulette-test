FROM node:18.16.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV MONGO_URI=mongodb://mongo:27017/rouletteDb
RUN npm run build
RUN cp -r src/views dist/
EXPOSE 3000
CMD [ "npm", "start" ]