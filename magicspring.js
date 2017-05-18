
var magicspring = function () {
    //storage for starting, current, and previous points, and offset
    var x1, y1, z1, x2, y2, z2, xo, yo, zo, dx, dy, dz, e, de, i, t, avr, wid,
    //inner and outer radius instead of diameter
    ir, or, lh, h, delta, angle, extr, ecalc, fudge, l = null;
    t = 210;//temperature
    avr = 32.5;
    wid = 5;
    ir = avr - (wid / 2);//inner radius
    or = avr + (wid / 2);//outer radius of helix
    lh = 0.8;//"layer height"in mm(distance in z direction traveled for every revolution in the xy plane
    delta = 1;//change in angle(degrees) for every "zigzag" from inner to outer radius, or back
    angle = 0;//starting angle
    h = 70;//height of total helix in mm
    extr = 0.026;//extrusion factor(mm extruder/mm movement) todo: change to calculated extrusion with fudge factor
    fudge = 0.45;//fudge factor
    xo = or + 5;//x offset in mm
    yo = or + 10;//y offset in mm
    zo = 0;//z offset in mm
    x1 = x2 = xo + ir;
    y1 = y2 = yo;
    z1 = z2 = zo;
    e = 0;
    /*
     * needed plastic/layer=height of layer*width of layer*2pi(averige radius)=lh*(or-ir)*2pi((ir+or)/2)
     * movement per layer=width of layer*number of zigzags per layer=(or-ir)*(360/delta)
     * plastic per mm of filament=pi*(1.75/2)^2
     * 
     * mm extr/mm move=((plastic/layer)/(movement/layer))/(plastic/mm fil)
     * 
     * width of layer cancels out! this makes sense because doubling the width of the spring doubles the cross sectional area, but it also doubles the actual movement per unit width
     * 
     * */
    ecalc = ((lh * Math.PI * (or + ir)) / (360 / delta)) / ((1.75 / 2) * (1.75 / 2) * Math.PI);
    try {
        console.info(`;temp:${t}`);
        console.info(`;outer radius:${or}`);
        console.info(`;inner radius:${ir}`);
        console.info(`;layer height:${lh}`);
        console.info(`;degrees of movement per zigzag:${delta}`);
        console.info(`;overall height:${h}`);
        console.info(`;extrusion factor:${extr}`);
        console.info(`;calculated extrusion factor:${ecalc}`);
        console.info(`;z offset:${zo}`);
        extr = ecalc * fudge;
        console.info("G21");
        console.info(`M104 S${t}`);
        console.info("G28 X0 Y0");
        console.info("G28 Z0");
        console.info("G29");
        console.info(`M109 S${t}`);
        console.info("G90");
        console.info("G92 E0");
        console.info("G1 F1700");
        console.info("M106 S255");
        console.info(`G1 X${x1} Y${y1} Z${z1} E${e}`);
        for (i = 0; i < (360 / delta); i++) {
            angle = delta * i;
            x2 = Math.cos(/* toRadians */ (function (x) { return x * Math.PI / 180; })(angle)) * or;
            y2 = Math.sin(/* toRadians */ (function (x) { return x * Math.PI / 180; })(angle)) * or;
            x2 += xo;
            y2 += yo;
            z2 = zo + i * (lh / (360 / delta));
            //z2=z1+(lh/(360/delta));
            dx = x2 - x1;
            dy = y2 - y1;
            dz = z2 - z1;
            de = extr * (i / (360 / delta)) * (Math.sqrt(dx * dx + dy * dy + dz * dz));
            e += de;
            console.info(`G1 X${x2} Y${y2} Z${z2} E${e}`);
            x1 = x2;
            y1 = y2;
            z1 = z2;
            //i++;
            angle = delta * i;
            x2 = Math.cos(/* toRadians */ (function (x) { return x * Math.PI / 180; })(angle)) * ir;
            y2 = Math.sin(/* toRadians */ (function (x) { return x * Math.PI / 180; })(angle)) * ir;
            x2 += xo;
            y2 += yo;
            z2 = zo + i * (lh / (360 / delta));
            //z2=z1+(lh/(360/delta));
            dx = x2 - x1;
            dy = y2 - y1;
            dz = z2 - z1;
            de = extr * (i / (360 / delta)) * (Math.sqrt(dx * dx + dy * dy + dz * dz));
            e += de;
            console.info(`G1 X${x2} Y${y2} Z${z2} E${e}`);
            x1 = x2;
            y1 = y2;
            z1 = z2;
        }
        for (i = (360 / delta); i < (h / lh) * (360 / delta); i++) {
            angle = delta * i;
            x2 = Math.cos(/* toRadians */ (function (x) { return x * Math.PI / 180; })(angle)) * or;
            y2 = Math.sin(/* toRadians */ (function (x) { return x * Math.PI / 180; })(angle)) * or;
            x2 += xo;
            y2 += yo;
            z2 = zo + i * (lh / (360 / delta));
            //z2=z1+(lh/(360/delta));
            dx = x2 - x1;
            dy = y2 - y1;
            dz = z2 - z1;
            de = extr * (Math.sqrt(dx * dx + dy * dy + dz * dz));
            e += de;
            console.info(`G1 X${x2} Y${y2} Z${z2} E${e}`)
            x1 = x2;
            y1 = y2;
            z1 = z2;
            //i++;
            angle = delta * i;
            x2 = Math.cos(/* toRadians */ (function (x) { return x * Math.PI / 180; })(angle)) * ir;
            y2 = Math.sin(/* toRadians */ (function (x) { return x * Math.PI / 180; })(angle)) * ir;
            x2 += xo;
            y2 += yo;
            z2 = zo + i * (lh / (360 / delta));
            //z2=z1+(lh/(360/delta));
            dx = x2 - x1;
            dy = y2 - y1;
            dz = z2 - z1;
            de = extr * (Math.sqrt(dx * dx + dy * dy + dz * dz));
            e += de;
            console.info(`G1 X${x2} Y${y2} Z${z2} E${e}`);
            x1 = x2;
            y1 = y2;
            z1 = z2;
        }
        console.info("G92 E0");
        console.info("M107");
        console.info("M104 S0");
        console.info("G28 X0");
        console.info("M84");
        console.info("");
    }
    catch (e1) {
        console.error(e1.message, e1);
    }
    finally {
        process.exit();
    }
    ;
};

magicspring();