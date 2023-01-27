START = "\033[92m"
END = "\033[0m"

#         _____  _______ _______
# |      |     | |       |_____| |
# |_____ |_____| |_____  |     | |_____

install-dependencies:
	@pushd logging && \
	 npm install

run-tests: # run all test suites
	@pushd logging && \
	 npm run test

run-tests-coverage: # run all test suites with coverage
	@pushd logging && \
	 npm run test-coverage

sls-invoke-local: # invoke all functions locally for testing purposes
	@make _tsc-build
	@echo ${START}"Invoking Lambda function logging locally..."${END}
	@serverless invoke local --function logging --data '{"message":"Test 3"}'

sls-package:
	@make _tsc-build
	@echo ${START}"Building CloudFormation script at ./serverless ..."${END}
	@serverless package

#  _____   ______  _____  ______
# |_____] |_____/ |     | |     \
# |       |    \_ |_____| |_____/

sls-console: # enable serverless.com console: https://console.serverless.com/
	@echo "$@"
	@sls --console

sls-invoke-prod: # invoke all functions in production
	@echo "$@"
	@echo ${START}"Invoking Lambda function logging in production..."${END}
	@serverless invoke --function logging --data '{"message":"Test 3"}'

sls-deploy: # deploy to aws
	@echo ${START}"Deploying to AWS..."${END}
	@make _tsc-build
	@sls deploy

# _     _ _______         _____  _______  ______ _______
# |_____| |______ |      |_____] |______ |_____/ |______
# |     | |______ |_____ |       |______ |    \_ ______|

_tsc-build: # build all js files
	@echo ${START}"Bundling into a single JS file..."${END}
	@pushd logging && \
	 npm run build