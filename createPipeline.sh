branch=main
if [ -z "$LBC_REPO_NAME" ] ; then
  echo "Your environment variables are not properly configured.  Make sure that you have filled out setupEnvironment.sh and that script is set to run as part of your PATH"
  exit 1
fi

if [ -z "$GITHUB_TOKEN" ] ; then
  echo "Your environment variable GITHUB_TOKEN is not properly configured.  Make sure that you have added it to your .bash_profile"
  exit 1
fi

if [ -z "$LBC_GROUP_NAME" ] ; then
  echo "Your environment variable LBC_GROUP_NAME is not properly configured.  Make sure that you have added it to your .bash_profile"
  exit 1
fi


echo "Outputting parameters for the pipeline..."
echo "Project name: $LBC_PROJECT_NAME"
echo "LBC Group Name: $$LBC_GROUP_NAME"
echo "Repo path: $LBC_REPO_NAME"
echo "Branch: $branch"

aws cloudformation create-stack --stack-name $LBC_PROJECT_NAME-$LBC_GROUP_NAME --template-url https://ata-deployment-scripts.s3.us-east-1.amazonaws.com/CICDPipeline-LBC.yml --parameters ParameterKey=ProjectName,ParameterValue=$LBC_PROJECT_NAME ParameterKey=GithubUserName,ParameterValue=$GITHUB_USERNAME ParameterKey=LBCGroupName,ParameterValue=$LBC_GROUP_NAME ParameterKey=Repo,ParameterValue=$LBC_REPO_NAME ParameterKey=Branch,ParameterValue=$branch ParameterKey=GithubToken,ParameterValue=$GITHUB_TOKEN --capabilities CAPABILITY_IAM
