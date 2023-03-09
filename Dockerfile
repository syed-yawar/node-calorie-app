FROM node:14.17.3
#FROM mongo:4.4.4
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 5090
CMD [ "npm","start" ]
#docker build -t backend .
#docker run --publish 3001:3001 --network host backend
#For Future we can add docker-compose file for frontend, mongo and backend app