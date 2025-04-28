FROM rust:1.86-bullseye AS builder
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY .sqlx ./.sqlx
RUN cargo fetch
ENV SQLX_OFFLINE=true
RUN cargo build --release

FROM debian:bullseye-slim
WORKDIR /app
COPY --from=builder /app/target/release/server /app/server
EXPOSE 8000
CMD ["/app/server"]
