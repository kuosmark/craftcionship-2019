FROM node:12.6.0-alpine
WORKDIR /server
ENV PATH /server/node_modules/.bin:$PATH
COPY . /server
RUN npm install
EXPOSE 3001 22
CMD ["npm", "start"]
