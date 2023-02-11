# Bundle static assets with nginx
FROM nexus.rzd/nginx:1.21.0-alpine as production
# Add your nginx.conf
COPY test_nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /var/log/react
RUN touch /var/log/react/access.log
RUN touch /var/log/react/error.log
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
