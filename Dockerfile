FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app

# Set working directory

WORKDIR /usr/src/app

# install typescript

RUN npm install -g ts-node

# Install app dependencies

COPY package*.json ./

RUN npm install

# Bundle app source

COPY . .

# Expose port 3000

EXPOSE 3000

# Run app

CMD ["npm", "start"]