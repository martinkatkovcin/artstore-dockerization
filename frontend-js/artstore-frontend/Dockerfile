FROM node:19.0-alpine
WORKDIR /artstore-frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm i -g @quasar/cli
EXPOSE 8000
CMD ["quasar", "dev"]
