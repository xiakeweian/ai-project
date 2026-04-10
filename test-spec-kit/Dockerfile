FROM nginx:1.22.0
RUN rm -rf /usr/share/nginx/html/*
COPY ./build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 80
