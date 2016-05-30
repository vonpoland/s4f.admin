module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.task()
  shipit.task('deployAndInstall', ['deploy'], function () {
    return shipit.remote('cd ' + shipit.config.deployTo +'/current && npm install && npm run jspm install && npm run gulp && passenger-config restart-app ' + shipit.config.deployTo)
  });

  shipit.initConfig({
    default: {
      deployTo: '/var/www/screen4fans-admin',
      repositoryUrl: 'ssh://git@bitbucket.org/vonpo/bigscreen-admin.git',
      workspace: '/var/lib/jenkins/deploy-tmp',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '/home/marcin/dev/ssh/key.ppk',
      shallowClone: true
    },
    adminDev: {
            branch: 'new-look',
            servers: 'screen4fans@40.115.23.130',
    }
  });


};