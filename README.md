cdebi-d3-drupal-term-cooccurrence
=================================

Set-Up

Need node, NPM, and bower installed.

1. Clone the repo and cd into the directory
2. npm install
3. bower install
4. python -m SimpleHTTPServer 8000 (or your favorite local server)
5. open the files in your browser at localhost:8000

To run the db node scripts, you need a config file that points at your db.

Place a file at: config/config.js

That looks like this...

module.exports = {
  host: 'hostname',
  user: 'username',
  pswd: 'password',
  dbnm: 'database'
};
