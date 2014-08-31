# diff-dotfiles

Recursive diff, only descending into first directory

Helpful for diffing dotfiles.git repo files against your ~/

diff -r is great, but there's a lot of files in ~/ that I don't need in git, so get tons and tons of "Only in..." output that I don't care about.

## Installation

- Install Node.js
- Get these repo files and `npm install` deps
 
    git clone https://github.com/markmontymark/diff-dotfiles
    npm install

## Usage

    node ~/git-repos/diff-dotfiles/ ~/git-repos/my-dotfile-repo-dir/ ~/
    
