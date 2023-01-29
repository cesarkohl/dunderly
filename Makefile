ifneq (,$(wildcard ./.env))
    include .env
    export
endif

START = "\033[92m"
END = "\033[0m"

#         _____  _______ _______
# |      |     | |       |_____| |
# |_____ |_____| |_____  |     | |_____

tests-run: # run all test suites
	@cd logging && \
	 npm run test

tests-run-coverage: # run all test suites with coverage
	@cd logging && \
	 npm run test-coverage

lint-run: # run ESLint on all TS files
	@echo ${START}"Running ESLint against TypeScript files..."${END}
	@npx eslint ./logging

sls-invoke-local: # invoke all functions locally for testing purposes
	@echo ${START}"Invoking Lambda function logging locally..."${END}
	@make lint-run
	@make clear-build
	@serverless invoke local --function logging --data '{"message":"Test 3"}'

sls-package: # package at ./serverless
	@echo ${START}"Building CloudFormation script at ./serverless ..."${END}
	@serverless package

#  _____   ______  _____  ______
# |_____] |_____/ |     | |     \
# |       |    \_ |_____| |_____/

sls-console: # enable serverless.com console: https://console.serverless.com/
	@sls --console

sls-invoke-prod: # invoke all functions in production
	@echo ${START}"Invoking Lambda function logging in production..."${END}
	@make lint-run
	@make clear-build
	@serverless invoke --function logging --data '{"message":"Test 3"}'

sls-deploy: # deploy to aws
	@echo ${START}"Deploying to AWS..."${END}
	@sls deploy

# _     _ _______         _____  _______  ______ _______
# |_____| |______ |      |_____] |______ |_____/ |______
# |     | |______ |_____ |       |______ |    \_ ______|

clear-build:
	@rm -rf .build