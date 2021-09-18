build:
	docker build \
		-t ehuan2/htn-rabbithole:latest \
		-f Dockerfile \
	.

run:
	docker-compose up

run-db:
	docker-compose up -d db redis 

db-psql:
	docker exec -it backend_db_1 /bin/sh

push:
	docker push ehuan2/htn-rabbithole:latest

db-migrate:
	docker cp setup/migrations.sql backend_db_1:/migrations.sql
	docker exec -it backend_db_1 psql -U postgres -f migrations.sql