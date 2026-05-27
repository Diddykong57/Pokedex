const { execSync } = require("child_process");
const fs = require("fs");

const stackName = process.env.STACK_NAME;
const region = process.env.AWS_REGION ?? "eu-west-3";

if (!stackName) {
    throw new Error("Missing STACK_NAME environment variable");
}

const clientId = execSync(
    `aws cloudformation describe-stacks --region ${region} --stack-name ${stackName} --query "Stacks[0].Outputs[?OutputKey=='UserPoolClientId'].OutputValue" --output text`,
    { encoding: "utf8" }
).trim();

fs.writeFileSync(
    "docs/swagger-config.js",
    `window.POKEDEX_SWAGGER_CONFIG = {\n    cognitoClientId: "${clientId}"\n};\n`
);

console.log(`Updated Swagger Cognito client ID for ${stackName}: ${clientId}`);
