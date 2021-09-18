build:
	docker build \
		-t ehuan2/htn-rabbithole:latest \
		-f Dockerfile \
	.

run:
	docker-compose up

push:
	docker push ehuan2/htn-rabbithole:latest