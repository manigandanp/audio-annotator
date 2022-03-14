FROM node:17.6.0

VOLUME [ "/data" ]

WORKDIR /audio-annotator/

# COPY . /usr/app/

# RUN npm install

EXPOSE 3000

# CMD echo hello-node
CMD npm run dev