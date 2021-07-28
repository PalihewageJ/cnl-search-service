FROM --platform=${TARGETPLATFORM:-linux/amd64} openfaas/of-watchdog:0.7.2 as watchdog
FROM 374320175743.dkr.ecr.ap-southeast-1.amazonaws.com/basedockerimage:latest

ARG TARGETPLATFORM
ARG BUILDPLATFORM

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog


# Wrapper/boot-strapper
WORKDIR /home/app
COPY . .

RUN npm install

RUN npm run build

# chmod for tmp is for a buildkit issue (@alexellis)
RUN chown app:app -R /home/app/dist

USER app

ENV cgi_headers="true"
ENV fprocess="node dist/main.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]