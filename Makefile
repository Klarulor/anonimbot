run:
	npx ts-node src
build:
	 docker build -t klarulor/anonimbot .
arm:
	 docker build -t klarulor/anonimbot:arm --platform linux/arm64 .
	 
push:
	make build
	make arm
	docker push klarulor/anonimbot:arm
	docker push klarulor/anonimbot
