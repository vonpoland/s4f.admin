module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

   // shipit.task('deployAndInstall', ['deploy'], function () {
   //     return shipit.remote('cd ' + shipit.config.deployTo + '/current && npm install && npm run jspm install && npm run gulp && passenger-config restart-app ' + shipit.config.deployTo + '/current')
   // });

    shipit.task('deployAndInstall', ['deploy'], function () {
        return shipit.remote('cd ' + shipit.config.deployTo + '/current && npm install && npm run jspm install && npm run gulp')
    });

    shipit.initConfig({
        default: {
            deployTo: '/var/www/screen4fans-admin',
            repositoryUrl: 'ssh://git@bitbucket.org/vonpo/bigscreen-admin.git',
            workspace: '/var/lib/jenkins/deploy-tmp',
            ignores: ['.git', 'node_modules'],
            keepReleases: 2,
            deleteOnRollback: false,
            key: '/var/jenkins/.ssh/key.ppk',
            shallowClone: true
        },
        dev: {
            branch: 'master',
            servers: 'screen4fans@40.115.23.130'
        },
        production: {
            workspace: '/var/jenkins_home/deploy-tmp',
            deployTo: '/home/mkrawczyk/domains/screen4fans.com/bigscree-admin',
            branch: 'master',
            servers: 'mkrawczyk@screen4fans.com',
            key: '/var/jenkins_home/.ssh/prod_key'
        }
    });
};