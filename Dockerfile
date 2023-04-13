FROM node

WORKDIR /app
COPY . .

RUN npm install
CMD ["npm", "start"]

EXPOSE 7777