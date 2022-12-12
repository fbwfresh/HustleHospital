# Step One- Fill out the CAPSTONE_REPO_NAME and GITHUB_GROUP_NAME in all LOWERCASE.

# Step Two - configure your shell to always have these variables.
# For OSX / Linux
# Copy and paste ALL of the properties below into your .bash_profile in your home directly

# For Windows
# Copy and paste ALL of the properties below into your .bashrc file in your home directory

# In IntelliJ Terminal
# Type source ./setupEnvironment.sh

# Confirm set up by using echo $CAPSTONE_REPO_NAME and it should return what you typed in.

# Fill out the following values
# The path of your repo on github. Don't include the whole URL, just the part after github.com/KenzieAcademy-SoftwareEngineering/
export LBC_GROUP_NAME=replacethiswithyourgroupname
export LBC_REPO_NAME=ata-lbc-project-$GITHUB_USERNAME

# Do not modify the rest of these unless you have been instructed to do so.
export LBC_PROJECT_NAME=lbcproject
export LBC_PIPELINE_STACK=$LBC_PROJECT_NAME-$LBC_GROUP_NAME
export LBC_ARTIFACT_BUCKET=$LBC_PROJECT_NAME-$LBC_GROUP_NAME-artifacts
export LBC_DEPLOY_STACK=$LBC_PROJECT_NAME-$LBC_GROUP_NAME-application
export LBC_APPLICATION_NAME=$LBC_PROJECT_NAME-$LBC_GROUP_NAME-application
export LBC_ENVIRONMENT_NAME=$LBC_PROJECT_NAME-$LBC_GROUP_NAME-environment-dev
