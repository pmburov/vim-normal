# Vim-Normal

This is a "glue" plugin that brings an additional mode to call my other plugins commands, something like NORMAL mode in Vim, with Vim-like shortcuts.

It combines some default-ish Vim stuff with my custom keybindings partially ported from my Vim configs.

## Integrations

- [vim-marks](https://github.com/pmburov/vim-marks)
- [vim-change](https://github.com/pmburov/vim-change)
- [vim-flash](https://github.com/pmburov/vim-flash)

## Keybindings

| Command | Action                          |
| ------- | ------------------------------- |
| alt+\   | Activate "NORMAL" mode          |
| m       | Add mark                        |
| `       | Go to mark                      |
| c i     | Change inside                   |
| c a     | Change around                   |
| z z     | Center screen                   |
| shift+[ | Move up paragraph               |
| shift+] | Move down paragraph             |
| g g     | Go to the beginning of the file |
| shift+g | Go to the end of the file       |
| s v     | Split vertically                |
| x x     | close active editor             |
| ]       | Focus right split editor        |
| [       | Focus left split editor         |
| f f     | Flash activate                  |
| f r     | Flash line upwards              |
| f v     | Flash line downwards            |
| f s     | Flash select mode               |
