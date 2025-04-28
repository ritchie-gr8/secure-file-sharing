APP_NAME=secure-file-sharing
BUILD_DIR=target/release

build:
	@echo "Building the project..."
	cargo build --release

clean:
	@echo "Cleaning the project..."
	cargo clean

run:
	@echo "Running the project..."
	cargo run

docker-build:
	@echo "Building the Docker image..."
	docker build -t $(APP_NAME):latest .

docker-run:
	@echo "Running the Docker container..."
	docker run -p 8000:8000 $(APP_NAME):latest
