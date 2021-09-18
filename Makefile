build:
	docker build \
		-t ehuan2/htn-rabbithole:latest \
		-f Dockerfile \
	.

run:
	docker-compose up

run-db:
	docker-compose -f docker-compose.db.yml up -d db redis 

db-psql:
	docker exec -it backend_db_1 /bin/sh

push:
	docker push ehuan2/htn-rabbithole:latest