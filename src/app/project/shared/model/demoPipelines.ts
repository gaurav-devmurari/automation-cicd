import { Azure } from '../components/azure/azure.model';
import { BitBucket } from '../components/bitbucket/bitbucket.model';
import { GitHub } from '../components/github/github.model';
import { GitLab } from '../components/gitlab/gitlab.model';

export const BitBucketArray: { [key: string]: BitBucket[] } = {
  angular: [
    {
      name: 'develop',
      type: 'branch',
      steps: [
        {
          name: 'Install Dependencies',
          actions: ['npm install', 'npm run lint', 'npm run demo'],
        },
        {
          name: 'Run Unit Tests',
          actions: ['npm run test'],
        },
        {
          name: 'Build Angular Application',
          actions: ['npm run build'],
        },
      ],
    },
    {
      name: 'v1.0.0',
      type: 'tag',
      steps: [
        {
          name: 'Deploy to Staging',
          actions: [
            'docker build -t my-angular-app:staging .',
            'docker push my-angular-app:staging',
          ],
        },
        {
          name: 'Run Smoke Tests',
          actions: ['npm run smoke-test'],
        },
      ],
    },
  ],
  react: [
    {
      name: 'develop',
      type: 'branch',
      steps: [
        {
          name: 'Install Dependencies',
          actions: ['npm install', 'npm run lint'],
        },
        {
          name: 'Run Unit Tests',
          actions: ['npm run test -- --coverage --watchAll=false'],
        },
        {
          name: 'Build React Application',
          actions: ['npm run build'],
        },
      ],
    },
    {
      name: 'v1.0.0',
      type: 'tag',
      steps: [
        {
          name: 'Deploy to Staging',
          actions: [
            'docker build -t my-react-app:staging .',
            'docker push my-react-app:staging',
          ],
        },
        {
          name: 'Run Smoke Tests',
          actions: ['npm run smoke-test'],
        },
      ],
    },
  ],
  nodeJS: [
    {
      name: 'develop',
      type: 'branch',
      steps: [
        {
          name: 'Install Dependencies',
          actions: ['npm install', 'npm run lint'],
        },
        {
          name: 'Run Unit Tests',
          actions: ['npm run test -- --coverage --watchAll=false'],
        },
        {
          name: 'Build Node.js Application',
          actions: ['npm run build'],
        },
      ],
    },
    {
      name: 'v1.0.0',
      type: 'tag',
      steps: [
        {
          name: 'Deploy to Staging',
          actions: [
            'docker build -t my-node-app:staging .',
            'docker push my-node-app:staging',
          ],
        },
        {
          name: 'Run Smoke Tests',
          actions: ['npm run smoke-test'],
        },
      ],
    },
  ],
  NET: [
    {
      name: 'develop',
      type: 'branch',
      steps: [
        {
          name: 'Install Dependencies',
          actions: ['dotnet restore'],
        },
        {
          name: 'Build Solution',
          actions: ['dotnet build --configuration Release'],
        },
        {
          name: 'Run Unit Tests',
          actions: [
            'dotnet test --configuration Release --no-build --collect:"Code Coverage"',
          ],
        },
      ],
    },
    {
      name: 'v1.0.0',
      type: 'tag',
      steps: [
        {
          name: 'Deploy to Staging',
          actions: [
            'docker build -t my-dotnet-app:staging .',
            'docker push my-dotnet-app:staging',
          ],
        },
        {
          name: 'Run Smoke Tests',
          actions: [
            'dotnet run --project ./tests/SmokeTests/SmokeTestProject.csproj',
          ],
        },
      ],
    },
  ],
};

export const GitHubArray: { [key: string]: GitHub[] } = {
  angular: [
    {
      github_name: 'angular-awesome-pipeline',
      on: {
        pull: {
          branches: ['develop', 'feature/*'],
        },
        push: {
          branches: ['main', 'develop'],
        },
        pull_request: {
          branches: ['main', 'release/*'],
        },
      },
      git_jobs: [
        {
          build: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { name: 'Checkout repository', uses: 'actions/checkout@v3' },
              {
                name: 'Setup Node.js environment',
                uses: 'actions/setup-node@v3',
              },
              { name: 'Install dependencies', run: 'npm install' },
              { name: 'Lint the code', run: 'npm run lint' },
              {
                name: 'Run unit tests',
                run: 'npm run test -- --watch=false --code-coverage',
              },
              { name: 'Build Angular project', run: 'npm run build --prod' },
            ],
          },
        },
        {
          deploy: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { name: 'Checkout repository', uses: 'actions/checkout@v3' },
              {
                name: 'Setup Node.js environment',
                uses: 'actions/setup-node@v3',
              },
              { name: 'Install dependencies', run: 'npm install' },
              { name: 'Build Angular project', run: 'npm run build --prod' },
              {
                name: 'Deploy to Staging',
                run: 'docker build -t my-angular-app:staging . && docker push my-angular-app:staging',
              },
            ],
          },
        },
      ],
    },
  ],
  react: [
    {
      github_name: 'react-awesome-pipeline',
      on: {
        pull: {
          branches: ['develop', 'feature/*'],
        },
        push: {
          branches: ['main', 'develop'],
        },
        pull_request: {
          branches: ['main', 'release/*'],
        },
      },
      git_jobs: [
        {
          build: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { name: 'Checkout repository', uses: 'actions/checkout@v3' },
              {
                name: 'Setup Node.js environment',
                uses: 'actions/setup-node@v3',
              },
              { name: 'Install dependencies', run: 'npm install' },
              { name: 'Lint the code', run: 'npm run lint' },
              {
                name: 'Run unit tests',
                run: 'npm run test -- --watch=false --code-coverage',
              },
              { name: 'Build React app', run: 'npm run build' },
            ],
          },
        },
        {
          deploy: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { name: 'Checkout repository', uses: 'actions/checkout@v3' },
              {
                name: 'Setup Node.js environment',
                uses: 'actions/setup-node@v3',
              },
              { name: 'Install dependencies', run: 'npm install' },
              { name: 'Build React app', run: 'npm run build' },
              {
                name: 'Deploy to Staging',
                run: 'docker build -t my-react-app:staging . && docker push my-react-app:staging',
              },
            ],
          },
        },
      ],
    },
  ],
  nodeJS: [
    {
      github_name: 'nodejs-awesome-pipeline',
      on: {
        pull: {
          branches: ['develop', 'feature/*'],
        },
        push: {
          branches: ['main', 'develop'],
        },
        pull_request: {
          branches: ['main', 'release/*'],
        },
      },
      git_jobs: [
        {
          build: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { name: 'Checkout repository', uses: 'actions/checkout@v3' },
              {
                name: 'Setup Node.js environment',
                uses: 'actions/setup-node@v3',
              },
              { name: 'Install dependencies', run: 'npm install' },
              { name: 'Run linting', run: 'npm run lint' },
              { name: 'Run unit tests', run: 'npm test' },
            ],
          },
        },
        {
          deploy: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { name: 'Checkout repository', uses: 'actions/checkout@v3' },
              {
                name: 'Setup Node.js environment',
                uses: 'actions/setup-node@v3',
              },
              { name: 'Install dependencies', run: 'npm install' },
              {
                name: 'Build the Node.js app',
                run: 'npm run build',
              },
              {
                name: 'Deploy to Staging',
                run: 'docker build -t my-node-app:staging . && docker push my-node-app:staging',
              },
            ],
          },
        },
      ],
    },
  ],
  NET: [
    {
      github_name: 'dotnet-awesome-pipeline',
      on: {
        pull: {
          branches: ['develop', 'feature/*'],
        },
        push: {
          branches: ['main', 'develop'],
        },
        pull_request: {
          branches: ['main', 'release/*'],
        },
      },
      git_jobs: [
        {
          build: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { name: 'Checkout repository', uses: 'actions/checkout@v3' },
              {
                name: 'Set up .NET environment',
                uses: 'actions/setup-dotnet@v3',
              },
              { name: 'Restore dependencies', run: 'dotnet restore' },
              {
                name: 'Build the project',
                run: 'dotnet build --configuration Release',
              },
              {
                name: 'Run unit tests',
                run: 'dotnet test --configuration Release',
              },
            ],
          },
        },
        {
          deploy: {
            'runs-on': 'ubuntu-latest',
            steps: [
              { name: 'Checkout repository', uses: 'actions/checkout@v3' },
              {
                name: 'Set up .NET environment',
                uses: 'actions/setup-dotnet@v3',
              },
              { name: 'Restore dependencies', run: 'dotnet restore' },
              {
                name: 'Build the project',
                run: 'dotnet build --configuration Release',
              },
              {
                name: 'Publish the app',
                run: 'dotnet publish --configuration Release --output ./publish',
              },
              {
                name: 'Build and push Docker image',
                run: 'docker build -t my-dotnet-app:staging . && docker push my-dotnet-app:staging',
              },
            ],
          },
        },
      ],
    },
  ],
};

export const GitLabArray: { [key: string]: GitLab[] } = {
  react: [
    {
      stages: ['install', 'test', 'build', 'deploy'],
      rules: {
        rule1: [
          {
            keyword: 'if',
            value: '$CI_COMMIT_REF_NAME == "main"',
          },
          {
            keyword: 'changes',
            value: 'src/**/*',
          },
        ],
        rule2: [
          {
            keyword: 'exists',
            value: 'Dockerfile',
          },
          {
            keyword: 'when',
            value: 'on_success',
          },
        ],
      },
      rule_name: ['rule1', 'rule2'],
      jobs: [
        {
          job_name: 'install_dependencies',
          stage: 'install',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Installing dependencies'",
            'npm install',
            'npm run lint',
          ],
        },
        {
          job_name: 'run_tests',
          stage: 'test',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Running tests'",
            'npm run test -- --coverage --watchAll=false',
          ],
        },
        {
          job_name: 'build_react_app',
          stage: 'build',
          rules: ['rule1', 'rule2'],
          script: ["echo 'Building React app'", 'npm run build'],
        },
        {
          job_name: 'deploy_to_docker',
          stage: 'deploy',
          rules: ['rule2', 'rule1'],
          script: [
            "echo 'Deploying to Docker'",
            'docker build -t my-react-app:latest .',
            'docker push my-react-app:latest',
          ],
        },
      ],
    },
  ],
  angular: [
    {
      stages: ['install', 'test', 'build', 'deploy'],
      rules: {
        rule1: [
          {
            keyword: 'if',
            value: '$CI_COMMIT_REF_NAME == "main"',
          },
          {
            keyword: 'changes',
            value: 'src/**/*',
          },
        ],
        rule2: [
          {
            keyword: 'exists',
            value: 'Dockerfile',
          },
          {
            keyword: 'when',
            value: 'on_success',
          },
        ],
      },
      rule_name: ['rule1', 'rule2'],
      jobs: [
        {
          job_name: 'install_dependencies',
          stage: 'install',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Installing dependencies'",
            'npm install',
            'npm run lint',
          ],
        },
        {
          job_name: 'run_tests',
          stage: 'test',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Running tests'",
            'npm run test -- --coverage --watchAll=false',
          ],
        },
        {
          job_name: 'build_angular_app',
          stage: 'build',
          rules: ['rule1', 'rule2'],
          script: ["echo 'Building Angular app'", 'npm run build --prod'],
        },
        {
          job_name: 'deploy_to_docker',
          stage: 'deploy',
          rules: ['rule2', 'rule1'],
          script: [
            "echo 'Deploying Angular app to Docker'",
            'docker build -t my-angular-app:latest .',
            'docker push my-angular-app:latest',
          ],
        },
      ],
    },
  ],
  nodeJS: [
    {
      stages: ['install', 'test', 'build', 'deploy'],
      rules: {
        rule1: [
          {
            keyword: 'if',
            value: '$CI_COMMIT_REF_NAME == "main"',
          },
          {
            keyword: 'changes',
            value: 'src/**/*',
          },
        ],
        rule2: [
          {
            keyword: 'exists',
            value: 'Dockerfile',
          },
          {
            keyword: 'when',
            value: 'on_success',
          },
        ],
      },
      rule_name: ['rule1', 'rule2'],
      jobs: [
        {
          job_name: 'install_dependencies',
          stage: 'install',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Installing dependencies'",
            'npm install',
            'npm run lint',
          ],
        },
        {
          job_name: 'run_tests',
          stage: 'test',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Running tests'",
            'npm run test -- --coverage --watchAll=false',
          ],
        },
        {
          job_name: 'build_node_app',
          stage: 'build',
          rules: ['rule1', 'rule2'],
          script: ["echo 'Building Node.js app'", 'npm run build'],
        },
        {
          job_name: 'deploy_to_docker',
          stage: 'deploy',
          rules: ['rule2', 'rule1'],
          script: [
            "echo 'Deploying Node.js app to Docker'",
            'docker build -t my-node-app:latest .',
            'docker push my-node-app:latest',
          ],
        },
      ],
    },
  ],
  NET: [
    {
      stages: ['install', 'test', 'build', 'deploy'],
      rules: {
        rule1: [
          {
            keyword: 'if',
            value: '$CI_COMMIT_REF_NAME == "main"',
          },
          {
            keyword: 'changes',
            value: 'src/**/*',
          },
        ],
        rule2: [
          {
            keyword: 'exists',
            value: 'Dockerfile',
          },
          {
            keyword: 'when',
            value: 'on_success',
          },
        ],
      },
      rule_name: ['rule1', 'rule2'],
      jobs: [
        {
          job_name: 'install_dependencies',
          stage: 'install',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Installing dependencies'",
            'dotnet restore',
            'dotnet build',
            'dotnet lint',
          ],
        },
        {
          job_name: 'run_tests',
          stage: 'test',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Running tests'",
            'dotnet test --configuration Release --no-build --collect:"Code Coverage"',
          ],
        },
        {
          job_name: 'build_dotnet_app',
          stage: 'build',
          rules: ['rule1', 'rule2'],
          script: [
            "echo 'Building .NET app'",
            'dotnet publish --configuration Release --output ./publish',
          ],
        },
        {
          job_name: 'deploy_to_docker',
          stage: 'deploy',
          rules: ['rule2', 'rule1'],
          script: [
            "echo 'Deploying .NET app to Docker'",
            'docker build -t my-dotnet-app:latest .',
            'docker push my-dotnet-app:latest',
          ],
        },
      ],
    },
  ],
};

export const AzureArray: { [key: string]: Azure[] } = {
  angular: [
    {
      trigger: ['main', 'develop'],
      azure_stages: [
        {
          stage: 'Build',
          displayName: 'Build Stage',
          jobs: [
            {
              job: 'Build_Angular_App',
              displayName: 'Build the Angular Application',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Install Dependencies',
                  script: 'npm install',
                },
                {
                  displayName: 'Run Linting',
                  script: 'npm run lint',
                },
                {
                  displayName: 'Build Angular Application',
                  script: 'npm run build --prod',
                },
              ],
            },
          ],
        },
        {
          stage: 'Test',
          displayName: 'Test Stage',
          jobs: [
            {
              job: 'Run_Unit_Tests',
              displayName: 'Run Unit Tests',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Install Dependencies for Testing',
                  script: 'npm install',
                },
                {
                  displayName: 'Run Unit Tests',
                  script: 'npm run test -- --watch=false --code-coverage',
                },
                {
                  displayName: 'Tests Complete',
                  script: 'echo "Unit tests completed."',
                },
              ],
            },
          ],
        },
        {
          stage: 'Deploy',
          displayName: 'Deploy Stage',
          jobs: [
            {
              job: 'Deploy_Angular_App',
              displayName: 'Deploy the Angular Application',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Build Docker Image for Staging',
                  script: 'docker build -t my-angular-app:staging .',
                },
                {
                  displayName: 'Push Docker Image to Repository',
                  script: 'docker push my-angular-app:staging',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  react: [
    {
      trigger: ['main', 'develop'],
      azure_stages: [
        {
          stage: 'Build',
          displayName: 'Build Stage',
          jobs: [
            {
              job: 'Build_React_App',
              displayName: 'Build the React Application',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Install Dependencies',
                  script: 'npm install',
                },
                {
                  displayName: 'Run Linting',
                  script: 'npm run lint',
                },
                {
                  displayName: 'Build React Application',
                  script: 'npm run build',
                },
              ],
            },
          ],
        },
        {
          stage: 'Test',
          displayName: 'Test Stage',
          jobs: [
            {
              job: 'Run_Unit_Tests',
              displayName: 'Run Unit Tests',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Install Dependencies for Testing',
                  script: 'npm install',
                },
                {
                  displayName: 'Run Unit Tests',
                  script: 'npm run test -- --coverage --watchAll=false',
                },
                {
                  displayName: 'Tests Complete',
                  script: 'echo "Unit tests completed."',
                },
              ],
            },
          ],
        },
        {
          stage: 'Deploy',
          displayName: 'Deploy Stage',
          jobs: [
            {
              job: 'Deploy_React_App',
              displayName: 'Deploy the React Application',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Build Docker Image for Staging',
                  script: 'docker build -t my-react-app:staging .',
                },
                {
                  displayName: 'Push Docker Image to Repository',
                  script: 'docker push my-react-app:staging',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  nodeJS: [
    {
      trigger: ['main', 'develop'],
      azure_stages: [
        {
          stage: 'Build',
          displayName: 'Build Stage',
          jobs: [
            {
              job: 'Build_NodeJS_App',
              displayName: 'Build the Node.js Application',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Install Dependencies',
                  script: 'npm install',
                },
                {
                  displayName: 'Run Linting',
                  script: 'npm run lint',
                },
                {
                  displayName: 'Build Node.js Application',
                  script: 'npm run build',
                },
              ],
            },
          ],
        },
        {
          stage: 'Test',
          displayName: 'Test Stage',
          jobs: [
            {
              job: 'Run_Unit_Tests',
              displayName: 'Run Unit Tests',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Install Dependencies for Testing',
                  script: 'npm install',
                },
                {
                  displayName: 'Run Unit Tests',
                  script: 'npm run test -- --coverage --watchAll=false',
                },
                {
                  displayName: 'Tests Complete',
                  script: 'echo "Unit tests completed."',
                },
              ],
            },
          ],
        },
        {
          stage: 'Deploy',
          displayName: 'Deploy Stage',
          jobs: [
            {
              job: 'Deploy_NodeJS_App',
              displayName: 'Deploy the Node.js Application',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Build Docker Image for Staging',
                  script: 'docker build -t my-nodejs-app:staging .',
                },
                {
                  displayName: 'Push Docker Image to Repository',
                  script: 'docker push my-nodejs-app:staging',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  NET: [
    {
      trigger: ['main', 'develop'],
      azure_stages: [
        {
          stage: 'Build',
          displayName: 'Build Stage',
          jobs: [
            {
              job: 'Build_NET_App',
              displayName: 'Build the .NET Application',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Install .NET SDK',
                  script:
                    'wget https://dotnet.microsoft.com/download/dotnet/scripts/v1/dotnet-install.sh -O dotnet-install.sh && bash dotnet-install.sh --channel LTS',
                },
                {
                  displayName: 'Restore Dependencies',
                  script: 'dotnet restore',
                },
                {
                  displayName: 'Build Solution',
                  script: 'dotnet build --configuration Release',
                },
              ],
            },
          ],
        },
        {
          stage: 'Test',
          displayName: 'Test Stage',
          jobs: [
            {
              job: 'Run_Unit_Tests',
              displayName: 'Run Unit Tests',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Restore Dependencies for Testing',
                  script: 'dotnet restore',
                },
                {
                  displayName: 'Run Unit Tests',
                  script:
                    'dotnet test --configuration Release --no-build --collect:"Code Coverage"',
                },
                {
                  displayName: 'Tests Complete',
                  script: 'echo "Unit tests completed."',
                },
              ],
            },
          ],
        },
        {
          stage: 'Deploy',
          displayName: 'Deploy Stage',
          jobs: [
            {
              job: 'Deploy_NET_App',
              displayName: 'Deploy the .NET Application',
              pool: {
                vmImage: 'ubuntu-latest',
              },
              steps: [
                {
                  displayName: 'Build Docker Image for Staging',
                  script: 'docker build -t my-dotnet-app:staging .',
                },
                {
                  displayName: 'Push Docker Image to Repository',
                  script: 'docker push my-dotnet-app:staging',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
