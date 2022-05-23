### wedding-site

My Jekyll-powered wedding website. Adapted from [menzenski/wedding-site][1]. The Jekyll theme is a port of the [Spectral Theme][2] by [HTML5 UP][3].

Favicons generated using [Real Favicon Generator][4].
Submitable forms using [Formspree][5].
Favicon by [Noah Camp from the Noun Project][6].

[1]: https://github.com/menzenski/wedding-site
[2]: https://html5up.net/spectral
[3]: https://html5up.net/
[4]: https://realfavicongenerator.net
[5]: https://formspree.io/
[6]: https://thenounproject.com/term/elephant/15906/

## Setup 

install rbenv somehow, then 

```sh 
rbenv install 3.0.0
rbenv local 3.0.0
rbenv rehash

gem install --user-install bundler jekyll

jekyll serve
```

# Deploy 

`jekyll build` 
`./sync`
