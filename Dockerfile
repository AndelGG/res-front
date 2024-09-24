FROM nginx:alpine

WORKDIR /usr/src/app/client

COPY ./dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]