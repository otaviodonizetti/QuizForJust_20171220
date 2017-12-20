FROM node:7
ENV HOME=/home/app
COPY package.json package-lock.json $HOME/marvel/
WORKDIR $HOME/marvel
RUN npm install --silent --progress=false
COPY . $HOME/marvel/
CMD ["npm", "start"]