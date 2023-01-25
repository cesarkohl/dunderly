#         _____  _______ _______
# |      |     | |       |_____| |
# |_____ |_____| |_____  |     | |_____

sls-invoke-local: # invoke all functions locally for testing purposes
	@make _tsc-build
	@echo "Running logging..."
	@serverless invoke local --function logging --data '{"message":"Test"}'

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

sls-deploy: # deploy to aws
	@echo "$@"
	@echo "Deploying to AWS..."
	@make _tsc-build
	@sls deploy

# _     _ _______         _____  _______  ______ _______
# |_____| |______ |      |_____] |______ |_____/ |______
# |     | |______ |_____ |       |______ |    \_ ______|

_tsc-build: # build all js files
	@echo "Building JS files..."
	@tsc logging/index.ts