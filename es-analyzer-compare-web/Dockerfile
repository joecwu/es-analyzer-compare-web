FROM node:8

ENV NODE_ENV production

# Create app directory
WORKDIR /es-analyzer-compare-web

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

VOLUME ["/es-analyzer-compare-web/config"]

CMD [ "npm", "start" ]

EXPOSE 80
