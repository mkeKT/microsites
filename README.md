# microsites
Microsite 3.0 sites

## Running

To view the microsites locally, it's possible to run an ad-hoc HTTP static server from the command line with [Ruby](https://www.ruby-lang.org/) or [Python](https://www.python.org/) via:

```sh
python -m http.server
```

```sh
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

The avaiable HTML files can then be viewed at [http://localhost:8000/MKE-Health/](http://localhost:8000/MKE-Health/)
