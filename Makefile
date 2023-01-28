START = "\033[92m"
END = "\033[0m"

#         _____  _______ _______
# |      |     | |       |_____| |
# |_____ |_____| |_____  |     | |_____

run-tests: # run all test suites
	@cd logging && \
	 npm run test

run-tests-coverage: # run all test suites with coverage
	@cd logging && \
	 npm run test-coverage

bugsnag-source-maps:
	@echo ${START}"Sending source maps to Bugsnag..."${END}
	@cd logging && \
 	 bugsnag-source-maps upload-node \
 	   --overwrite \
       --api-key 6b1e0dac71f299d84e0b0a3fd429c9ce \
       --app-version 1.2.3 \
       --source-map dist/index.js.map \
       --bundle dist/index.js

sls-invoke-local: # invoke all functions locally for testing purposes
	@#make bugsnag-source-maps
	@echo ${START}"Invoking Lambda function logging locally..."${END}
	@BUGSNAG_API_KEY=6b1e0dac71f299d84e0b0a3fd429c9ce serverless invoke local --function logging --data '{"message":"Test 3"}'

sls-package:
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
	@sls deploy

# _     _ _______         _____  _______  ______ _______
# |_____| |______ |      |_____] |______ |_____/ |______
# |     | |______ |_____ |       |______ |    \_ ______|

install-dependencies:
	@cd logging && \
	 npm install