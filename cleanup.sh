#!/bin/bash
set -eo pipefail

echo "Deleting Application LBC_DEPLOY_STACK"
echo "This may take 2-3 minutes...  But if takes more than 5 minutes then it may have failed. Check your CloudFormation Stack on the AWS UI for errors."
aws cloudformation delete-stack --stack-name $LBC_DEPLOY_STACK
aws cloudformation wait stack-delete-complete --stack-name $LBC_DEPLOY_STACK


echo "Checking Artifact Bucket $LBC_ARTIFACT_BUCKET"
if [ -z "$(aws s3api head-bucket --bucket "$LBC_ARTIFACT_BUCKET" 2>&1)" ] ; then
  echo "Deleting Artifact Bucket $LBC_ARTIFACT_BUCKET"
  aws s3 rm s3://$LBC_ARTIFACT_BUCKET --recursive
  aws s3api delete-objects --bucket $LBC_ARTIFACT_BUCKET --delete "$(aws s3api list-object-versions --bucket $LBC_ARTIFACT_BUCKET --query='{Objects: Versions[].{Key:Key,VersionId:VersionId}}' --output=json)" 1>/dev/null
  aws s3api delete-objects --bucket $LBC_ARTIFACT_BUCKET --delete "$(aws s3api list-object-versions --bucket $LBC_ARTIFACT_BUCKET --query='{Objects: DeleteMarkers[].{Key:Key,VersionId:VersionId}}' --output=json)" 1>/dev/null
  aws s3 rb --force s3://$LBC_ARTIFACT_BUCKET
fi

echo "Deleting Pipeline $LBC_PIPELINE_STACK"
echo "This may take 2-3 minutes...  But if takes more than 5 minutes then it may have failed. Check your CloudFormation Stack on the AWS UI for errors."
aws cloudformation delete-stack --stack-name $LBC_PIPELINE_STACK
aws cloudformation wait stack-delete-complete --stack-name $LBC_PIPELINE_STACK

rm -rf build .gradle target
