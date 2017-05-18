## MagicSpring-js

JavaScript port of [mpclauser's](https://hackaday.io/MikeC) [3D printed "Magic Spring"](https://hackaday.io/project/20198-3d-printed-magic-spring) for printing
slinky-like coils on a 3D Printer (FDM).

### Usage

Currently a raw port which when run with node:
```bash
node magicspring.js
```
will echo out the gcode to your terminal.

Better use is to redirect output to a file:
```bash
node magicspring.js > my_spring.gcode
```

### Future

I hope to migrate this project to a webservice where users can generate their own
springs by entering a few details specific to their own printer.
