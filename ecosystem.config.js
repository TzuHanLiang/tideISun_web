module.exports = {
  // app 部份
  apps : [{
    name: 'API',
    // 入口檔案，以mermer-framework為例
    script: 'bin/main.js', 

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'one two', // 我們不需要傳入參數
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',

    env: {
      NODE_ENV: 'development'
    },
   // --env production 開始時注入的環境變量
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  // 部署部份
  deploy : {
    // 發佈階段部署的環境
    production : {
      // 使用者名稱
      user : 'ubuntu',
      // 要部署到的主機的IP地址
      key  : `${process.env.HOME}/.ssh/tideiSun.pem`, // 進行身份驗證的公鑰的路徑
      host : '13.113.22.215', // 也可以通過將IPs /主機名以arry傳入來實現多主機部署
      // branch （分支）
      ref  : 'origin/master',
      // 要 clone 的 Git repository
      repo : 'https://github.com/BOLT-Protocol/TideiSunOfficial.git',
      // 目標服務器上應用程序的路徑
      path : '/etc/TideiSunOfficial',
      // cloned後要在服務器上執行的命令
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      // 必須在此env的所有應用程序中註入的環境變量(我沒有加)
      env : {
        "NODE_ENV": "production"
      }
    },
    // 開發階段部署的環境
    staging : {
      user : "node",
      host : "212.83.163.1",
      ref : "origin/master",
      repo : "git@github.com:repo.git",
      path : "/etc/[reponame]",
      "post-deploy" : "pm2 startOrRestart ecosystem.config.js --env dev",
      env  : {
        "NODE_ENV": "staging"
      }
    }
  }
};