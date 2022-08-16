run:
	npx ts-node src
build:
	 docker build -t klarulor/anonimbot .
arm:
	 docker build -t klarulor/anonimbot:arm --platform linux/arm64 .