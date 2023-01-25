#         _____  _______ _______
# |      |     | |       |_____| |
# |_____ |_____| |_____  |     | |_____

sls-invoke-local: # invoke all functions locally for testing purposes
	@echo "$@"
	@echo "Running logging..."
	@serverless invoke local --function logging

#  _____   ______  _____  ______
# |_____] |_____/ |     | |     \
# |       |    \_ |_____| |_____/

sls-console: # enable serverless.com console: https://console.serverless.com/
	@echo "$@"
	@sls --console

sls-invoke: # invoke all functions locally for testing purposes
	@echo "$@"
	@echo "Running logging..."
	@serverless invoke --function logging

_tsc-build: # build all js files
	@echo "$@"
	@tsc logging/index.ts

sls-deploy: # deploy to aws
	@echo "$@"
	@make _tsc-build
	@sls deploy
