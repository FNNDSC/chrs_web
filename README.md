# Web-based `chrs`

## Overview

This repo is an extremely simple "thought" experiment about using `chrs` via a web interface. It relies on a deployed [pfchrs](https://github.com/FNNDSC/pfchrs) server.

## Here be dragons

A lot of assumptions are hard coded into the `js` file. This is probably bad.

## How to use

* Make sure `pfchrs` is up and running somewhere reachable.
* Make sure a "user" has been added to `pfchrs` with a key.
* Edit the `js` file with the address and the key name.

## Start this app

```bash
python -m http.server
```

Should do the trick.


## This is hard. Why should I edit code just to run this?

I did say this was a thought experiment, right?

_-30-_

