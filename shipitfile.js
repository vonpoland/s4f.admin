module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.blTask('clean-pm2', function () {
        return shipit.remote('node ' + shipit.config.pm2Path + ' delete admin')
    });

    shipit.blTask('start-pm2', function () {
        return shipit.remote('cd ' + shipit.config.deployTo + '/current && NODE_ENV=production node '  + shipit.config.pm2Path + ' start --name admin ' + shipit.config.deployTo + '/current/app.js')
    });

    shipit.blTask('install-dependencies', function () {
        return shipit.remote('NODE_ENV=production cd ' + shipit.config.deployTo + '/current && npm install && npm run jspm install && npm run gulp')
    });

    shipit.task('deployAndInstall', ['deploy', 'clean-pm2', 'install-dependencies', 'start-pm2'], function () {
    });

    shipit.initConfig({
        default: {
            pm2Path: '/home/mkrawczyk/domains/screen4fans.com/pm2/node_modules/pm2/bin/pm2',
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
            deployTo: '/home/mkrawczyk/domains/screen4fans.com/bigscreen-admin',
            branch: 'master',
            servers: 'mkrawczyk@screen4fans.com',
            key: '/var/jenkins_home/.ssh/prod_key'
        },
        test: {
            workspace: '/m/dev/temp-sync/test', // this is on local
            repositoryUrl: 'https://github.com/mourner/hello-lib.git',
            deployTo: '/home/marcin/deploy-test',
            branch: 'master',
            servers: 'marcin@192.168.1.146',
            key: '/m/dev/key/key'
        },
        test2: {
            deployTo: '/home/mkrawczyk/domains/screen4fans.com/bigscreen-admin',
            workspace: '/m/dev/temp-sync/test', // this is on local
            servers: 'mkrawczyk@screen4fans.com',
        }
    });
};