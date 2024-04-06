FROM denoland/deno:latest as base

WORKDIR /

COPY . ./

RUN deno cache build.ts
RUN deno cache prod.ts

CMD ["task", "prod"]