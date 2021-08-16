FROM --platform=${TARGETPLATFORM:-linux/amd64} openfaas/of-watchdog:0.7.2 as watchdog
ARG TARGETPLATFORM

FROM 328680294982.dkr.ecr.ap-southeast-1.amazonaws.com/rapid/rapid-base:latest as build
#FROM rapid-base as build

WORKDIR /usr/src/app
#COPY --from=base /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM 328680294982.dkr.ecr.ap-southeast-1.amazonaws.com/rapid/rapid-production:latest as prod
#FROM rapid-production as prod

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog


WORKDIR /usr/src/app
RUN rm -f package*.json
copy package.json .
COPY --from=build /usr/src/app/dist ./dist

RUN chown node:node -R /usr/src/app/dist
USER node

ENV cgi_headers="true"
ENV fprocess="node dist/main"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3080"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]

#CMD ["npm", "run", "start:prod"]