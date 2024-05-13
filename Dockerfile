FROM node:18-alpine as ui-build 

WORKDIR /usr/app/client
COPY client/package*.json ./
RUN npm install 
COPY client/src/ ./src
COPY client/public/ ./public 
COPY client/public/index.html ./

RUN npm run build

FROM node:18-alpine as server-build 

WORKDIR /usr/app 

COPY setupProxy.js ./
COPY --from=ui-build /usr/app/client/dist ./client/dist 
WORKDIR /usr/app/server/

COPY server/package*.json ./
RUN npm install 

COPY server/server.js ./

ENV NODE_ENV=production 

EXPOSE 3000

CMD ["node", "server.js"]