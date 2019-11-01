FROM node:12.6.0-alpine
WORKDIR /script
ENV PATH /script/node_modules/.bin:$PATH
COPY . /script
RUN npm install
EXPOSE 3001 22
CMD ["npm", "start"]
