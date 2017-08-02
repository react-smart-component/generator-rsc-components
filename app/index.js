/**
 * @since 2017-07-11 20:09
 * @author chenyiqin
 */

const path = require('path');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.option('version', {
            desc: 'version of package',
            type: String,
            defaults: '0.0.1',
        });

        this.option('author', {
            desc: 'author of package',
            type: String,
            default: '',
        });

        this.option('pkgName', {
            desc: 'name of package',
            type: String,
            defaults: ''
        });

        this.option('repo', {
            desc: 'git repositry url of package',
            type: String,
            default: '',
        });

        this.option('homePage', {
            desc: 'homePage of package',
            type: String,
            default: '',
        });
    }

    initialize() {
        const {
            appname,
            options,
        } = this;
        this.appname = appname.replace(/\s/g, '-');
        this._packageName = options.pkgName || `rsc-${appname}`;
        this._author = options.author;
        this._repo = options.repo || `https://github.com/react-smart-component/${appname}`;
        this._version = options.version;
        this._homepage = options.homePage || this._repo;
        this.log(`initializing ${this.appname}`);
    }

    write() {
        this._write();
    }

    _write() {
        const files = [
            './react-native',
            '.editorconfig',
            '.eslintignore',
            '.eslintrc',
            'LICENSE',
            'CHANGELOG.md',
            'development.zh-CN.md',
            'README.md',
            'gitignore',
            'npmignore',
            'index.js',
            'index.native.js',
            'npmrc',
            'travis.yml',
            'package.json',
            'tsconfig.json',
            'webpack.config.js'
        ];
        const {
            appname,
            _packageName,
            _author,
            _repo,
            _version,
            _homepage,
        } = this;
        files.forEach((fileName) => {
            let newFileName = fileName;
            // https://github.com/npm/npm/issues/1862
            if (fileName === 'gitignore' || fileName === 'npmignore') {
                newFileName = fileName === 'gitignore' ? '.gitignore' : '.npmignore';
            } else if (fileName === 'npmrc') {
                newFileName = '.npmrc';
            } else if (fileName === 'travis.yml') {
                newFileName = '.travis.yml';
            }
            this.fs.copyTpl(
                this.templatePath(fileName),
                this.destinationPath(newFileName),
                {
                    appname,
                    _packageName,
                    _author,
                    _repo,
                    _version,
                    _homepage,
                }
            );
        });
    }

    _mkdir() {
        mkdirp('__tests__');
        mkdirp('components');
        mkdirp('docs');
        mkdirp('site');
        mkdirp('typings');
        this.log('    mkdir __tests__');
        this.log('    mkdir components');
        this.log('    mkdir docs');
        this.log('    mkdir site');
        this.log('    mkdir typings');
    }

    end() {
        this.log('✨  done!');
        process.exit(-1);
    }
};
