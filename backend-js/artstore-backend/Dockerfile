FROM node:19.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081
CMD [ "node", "server.ts" ]

# Command above is used to run microservice architecture. If you want to run camunda or kafka architectures,
# you need to run the .js/.ts files in app/camunda and app/kafka respectively. Each file is bundled to be run
# separately, but they need other endpoints to function normally, which weren't implemented in camunda and kafka.
# So, in order to run camunda server, you need to run server.ts as well as workers in app/camunda folder. To run
# kafka, you need to again run server.ts and workers in app/kafka folder.

# For kafka, frontend.ts is used to test functionality of kafka messaging if the kafka library doesn't work on
# frontend due to dependency conflict (we had such problem and it took a lot of time to fix). Also note that
# kafka by default keeps all messages in the topic and rerunning the server starts from beginning by default,
# so in case there are some leftover messages, the workers will attept to consume them again.
